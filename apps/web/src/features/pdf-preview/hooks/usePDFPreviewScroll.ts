'use client'

import { useCallback, useEffect, useRef } from 'react'
import { usePDFPreviewContext } from '../context/PDFPreviewContext'
import { ProcessedBoundingBox } from '../types'

/**
 * Props for the PDF preview scroll hook
 */
interface UsePDFPreviewScrollProps {
  /** Array of processed bounding box data */
  bboxes: ProcessedBoundingBox[]
  /** Reference to the scrollable container element */
  scrollContainerRef: React.RefObject<HTMLDivElement | null>
  /** References to individual page elements, keyed by page number */
  pageRefs: React.RefObject<Record<number, HTMLDivElement | null>>
  /** Scroll delay in milliseconds */
  scrollDelay?: number
}

/**
 * Custom hook for managing PDF viewer scroll functionality
 *
 * This hook provides intelligent scrolling behavior for PDF documents with bounding boxes.
 * It automatically scrolls to specific pages and positions based on hovered segments,
 * with smooth animations and proper positioning calculations.
 *
 * Features:
 * - Automatic scrolling to pages when segments are hovered
 * - Precise positioning within pages based on bounding box coordinates
 * - Debounced scrolling to prevent excessive scroll events
 * - Smooth scroll animations
 * - Cleanup of timeouts on unmount
 */
export function usePDFPreviewScroll({
  bboxes,
  scrollContainerRef,
  pageRefs,
  scrollDelay = 300,
}: UsePDFPreviewScrollProps) {
  const { hoveredSegmentId } = usePDFPreviewContext()
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  /**
   * Scrolls to a specific page with optional positioning based on hovered segments.
   *
   * This function handles intelligent scrolling that considers:
   * - Whether there's a currently hovered segment on the target page
   * - Precise positioning within the page based on bounding box coordinates
   * - Smooth scrolling animations with appropriate timing
   * - Fallback to basic page scrolling if no specific segment is targeted
   */
  const scrollToPage = useCallback(
    (pageNumber: number) => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        if (scrollContainerRef.current && pageRefs.current?.[pageNumber]) {
          const pageElement = pageRefs.current[pageNumber]
          if (pageElement) {
            const container = scrollContainerRef.current
            const containerRect = container.getBoundingClientRect()
            const pageRect = pageElement.getBoundingClientRect()

            const bbox = hoveredSegmentId
              ? bboxes.find(
                  (box) =>
                    box.id === hoveredSegmentId &&
                    box.bbox.page_number === pageNumber
                )
              : null

            if (bbox) {
              const originalPageHeight = bbox.page_height
              const relativePosition = bbox.bbox.top / originalPageHeight
              const offsetInPage = pageRect.height * relativePosition
              const targetScrollTop =
                pageElement.offsetTop +
                offsetInPage -
                containerRect.height * 0.1

              container.scrollTo({
                top: targetScrollTop,
                behavior: 'smooth',
              })
            } else if (
              pageRect.top < containerRect.top ||
              pageRect.bottom > containerRect.bottom
            ) {
              pageElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest',
              })
            }
          }
        }
      }, scrollDelay)
    },
    [scrollContainerRef, pageRefs, bboxes, hoveredSegmentId, scrollDelay]
  )

  // Effect to automatically scroll when a segment is hovered
  useEffect(() => {
    if (!hoveredSegmentId) return

    const target = bboxes.find((box) => box.id === hoveredSegmentId)
    const page = target?.bbox.page_number
    if (page != null) {
      scrollToPage(page)
    }
  }, [hoveredSegmentId, bboxes, scrollToPage])

  // Cleanup effect to clear timeouts on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return { scrollToPage }
}
