'use client'

import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import { usePDFPreviewContext } from '../context/PDFPreviewContext'
import { usePDFPreviewScroll } from '../hooks/usePDFPreviewScroll'
import { usePDFPreviewBoundingBoxes } from '../hooks/usePDFPreviewBoundingBoxes'
import { BoundingBoxDisplay } from './BoundingBoxDisplay'
import { PDFPreviewProps } from '../types'
import { debounce } from '../utils'

// Configure PDF.js worker source for rendering PDFs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

/**
 * Loading component
 */
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
  )
}

/**
 * Main PDF Preview component
 *
 * This component provides a complete PDF viewing experience with:
 * - PDF document rendering using react-pdf
 * - Responsive page sizing based on container width
 * - Interactive bounding box overlays for document segments
 * - Scroll synchronization and page navigation
 * - Loading states and error handling
 * - Context-based state management
 */
export function PDFPreview({
  url,
  chunks,
  config,
  onSegmentHover,
  onSegmentClick,
  onDocumentLoad,
  onDocumentError,
  className = '',
}: PDFPreviewProps) {
  const {
    documentMetadata,
    pageDimensions,
    setDocumentMetadata,
    setPageDimensions,
  } = usePDFPreviewContext()

  // Refs for DOM elements and page tracking
  const containerRef = useRef<HTMLDivElement>(null) // Main container for resize observation
  const scrollContainerRef = useRef<HTMLDivElement>(null) // Scrollable container
  const pageRefs = useRef<Record<number, HTMLDivElement | null>>({}) // Individual page references

  // Get processed bounding boxes
  const { allBoundingBoxes } = usePDFPreviewBoundingBoxes({ chunks })

  // Custom hook for PDF viewer scroll functionality
  usePDFPreviewScroll({
    bboxes: allBoundingBoxes,
    scrollContainerRef,
    pageRefs,
    scrollDelay: config?.scrollBehavior?.scrollDelay,
  })

  // Debounced function to update display width
  const debouncedSetPdfWidth = useMemo(
    () =>
      debounce((width: number) => {
        setPageDimensions({ displayWidth: width })
      }, 200),
    [setPageDimensions]
  )

  // Initialize display width when width is first set
  useEffect(() => {
    if (pageDimensions.width > 0 && pageDimensions.displayWidth === 0) {
      setPageDimensions({ displayWidth: pageDimensions.width })
    }
  }, [pageDimensions.width, pageDimensions.displayWidth, setPageDimensions])

  // Handle successful PDF document loading
  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setDocumentMetadata({
        numPages,
        isLoading: false,
        error: false,
      })
      onDocumentLoad?.(numPages)
    },
    [setDocumentMetadata, onDocumentLoad]
  )

  // Handle PDF document loading errors
  const onDocumentLoadError = useCallback(
    (error: Error) => {
      setDocumentMetadata({
        isLoading: false,
        error: true,
      })
      onDocumentError?.(error)
      console.error('Error loading PDF:', error)
    },
    [setDocumentMetadata, onDocumentError]
  )

  // Set up resize observer for responsive width calculation
  useEffect(() => {
    const observedContainer = containerRef.current
    if (!observedContainer) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Calculate new width with padding (32px) and minimum width (200px)
        const width = Math.max(Math.round(entry.contentRect.width - 32), 200)
        if (width !== pageDimensions.width) {
          setPageDimensions({ width })
          debouncedSetPdfWidth(width)
        }
      }
    })

    resizeObserver.observe(observedContainer)
    return () => {
      debouncedSetPdfWidth.cancel?.()
      resizeObserver.disconnect()
    }
  }, [debouncedSetPdfWidth, pageDimensions.width, setPageDimensions])

  // Memoized page component for performance
  const MemoizedPage = React.memo(function MemoizedPage({
    pageNumber,
    pageWidth,
  }: {
    pageNumber: number
    pageWidth: number
  }) {
    return (
      <div
        className="relative"
        data-page-number={pageNumber}
        ref={(el) => {
          pageRefs.current[pageNumber] = el
        }}
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={config?.enableTextLayer ?? false}
          renderAnnotationLayer={config?.enableAnnotationLayer ?? false}
          width={pageWidth}
          loading={''}
        />
      </div>
    )
  })

  // Generate pages array for rendering
  const pages = useMemo(() => {
    if (!documentMetadata.numPages || pageDimensions.displayWidth === 0)
      return null
    return Array.from({ length: documentMetadata.numPages }, (_, index) => (
      <MemoizedPage
        key={index + 1}
        pageNumber={index + 1}
        pageWidth={pageDimensions.displayWidth}
      />
    ))
  }, [documentMetadata.numPages, pageDimensions.displayWidth, MemoizedPage])

  const shouldShowLoader = documentMetadata.isLoading || documentMetadata.error

  return (
    <div
      className={`relative h-full w-full max-w-full pdf-container ${className}`}
      ref={containerRef}
    >
      {shouldShowLoader && (
        <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center bg-background">
          <LoadingSpinner />
        </div>
      )}

      <div
        className="h-full overflow-auto flex flex-col items-center min-w-[200px] box-border"
        ref={scrollContainerRef}
      >
        <div className="flex flex-col items-center justify-start relative">
          <Document
            noData={<LoadingSpinner />}
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            className="flex flex-col items-center"
            loading={<LoadingSpinner />}
          >
            {pages}
          </Document>

          <BoundingBoxDisplay
            chunks={chunks}
            config={config}
            onSegmentHover={onSegmentHover}
            onSegmentClick={onSegmentClick}
          />
        </div>
      </div>
    </div>
  )
}
