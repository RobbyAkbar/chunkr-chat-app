'use client'

import React from 'react'
import { PDFPreview, PDFPreviewProvider } from '../'
import { PDFPreviewChunk, PDFPreviewSegment } from '../types'
import { Chunk, Segment } from '@/client'

/**
 * Adapter props that accept the original types
 */
interface PDFPreviewAdapterProps {
  /** URL or file path of the PDF document to display */
  url: string
  /** Array of original chunks from the API */
  chunks: Chunk[]
  /** Whether to show all bounding boxes by default */
  showAllBoundingBoxes?: boolean
  /** Called when a segment is hovered */
  onSegmentHover?: (segmentId: string | null) => void
  /** Called when a segment is clicked */
  onSegmentClick?: (segment: Segment) => void
  /** Called when the PDF loads successfully */
  onDocumentLoad?: (numPages: number) => void
  /** Called when the PDF fails to load */
  onDocumentError?: (error: Error) => void
  /** Custom class name for styling */
  className?: string
}

/**
 * Convert original API types to PDF preview types
 */
function convertChunksToPDFPreviewChunks(chunks: Chunk[]): PDFPreviewChunk[] {
  return chunks.map((chunk) => ({
    chunk_id: chunk.chunk_id,
    chunk_length: chunk.chunk_length,
    embed: chunk.embed,
    segments: chunk.segments.map(
      (segment): PDFPreviewSegment => ({
        segment_id: segment.segment_id,
        bbox: {
          top: segment.bbox.top,
          left: segment.bbox.left,
          width: segment.bbox.width,
          height: segment.bbox.height,
          page_number: segment.page_number,
        },
        segment_type: segment.segment_type as any, // Type assertion for compatibility
        page_number: segment.page_number,
        page_width: segment.page_width,
        page_height: segment.page_height,
        content: segment.content,
        html: segment.html,
        markdown: segment.markdown,
        llm: segment.llm,
        confidence: segment.confidence,
        image: segment.image,
      })
    ),
  }))
}

/**
 * PDF Preview Adapter Component
 *
 * This component serves as a bridge between the existing application types
 * and the new PDF preview feature. It converts the original API types to
 * the PDF preview types and provides the same interface as the original components.
 */
export function PDFPreviewAdapter({
  url,
  chunks,
  showAllBoundingBoxes = false,
  onSegmentHover,
  onSegmentClick,
  onDocumentLoad,
  onDocumentError,
  className,
}: PDFPreviewAdapterProps) {
  // Convert chunks to PDF preview format
  const pdfPreviewChunks = convertChunksToPDFPreviewChunks(chunks)

  // Handle segment click with original type conversion
  const handleSegmentClick = (segment: PDFPreviewSegment) => {
    // Find the original segment from the chunks
    const originalSegment = chunks
      .flatMap((chunk) => chunk.segments)
      .find((seg) => seg.segment_id === segment.segment_id)

    if (originalSegment && onSegmentClick) {
      onSegmentClick(originalSegment)
    }
  }

  return (
    <PDFPreviewProvider initialShowAllBoundingBoxes={showAllBoundingBoxes}>
      <PDFPreview
        url={url}
        chunks={pdfPreviewChunks}
        config={{
          showAllBoundingBoxes,
          enableTextLayer: false,
          enableAnnotationLayer: false,
        }}
        onSegmentHover={onSegmentHover}
        onSegmentClick={handleSegmentClick}
        onDocumentLoad={onDocumentLoad}
        onDocumentError={onDocumentError}
        className={className}
      />
    </PDFPreviewProvider>
  )
}
