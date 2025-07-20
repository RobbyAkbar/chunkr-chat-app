'use client'

import { useMemo } from 'react'
import { usePDFPreviewContext } from '../context/PDFPreviewContext'
import { PDFPreviewChunk, ProcessedBoundingBox } from '../types'
import { processBoundingBoxes } from '../utils'

/**
 * Props for the PDF preview bounding boxes hook
 */
interface UsePDFPreviewBoundingBoxesProps {
  /** Array of document chunks with structured JSON schema */
  chunks: PDFPreviewChunk[]
}

/**
 * Custom hook for managing PDF preview bounding boxes
 *
 * This hook processes document chunks and provides filtered bounding boxes
 * based on the current state (show all vs. show hovered only).
 *
 * Features:
 * - Processes chunks to extract bounding box information
 * - Filters visible bounding boxes based on hover state and settings
 * - Memoizes processed data for performance
 * - Provides both all bounding boxes and visible subset
 */
export function usePDFPreviewBoundingBoxes({
  chunks,
}: UsePDFPreviewBoundingBoxesProps) {
  const { hoveredSegmentId, highlightedSegmentId, showAllBoundingBoxes } = usePDFPreviewContext()

  /**
   * Process all bounding boxes from chunks
   */
  const allBoundingBoxes = useMemo(() => {
    return processBoundingBoxes(chunks) as ProcessedBoundingBox[]
  }, [chunks])

  /**
   * Filter visible bounding boxes based on current state
   */
  const visibleBoundingBoxes = useMemo(() => {
    // If there's a highlighted segment, show only that one
    if (highlightedSegmentId) {
      console.log('Showing only highlighted segment:', highlightedSegmentId)
      return allBoundingBoxes.filter((box) => box.id === highlightedSegmentId)
    }
    
    // If show all bounding boxes is enabled, show all
    if (showAllBoundingBoxes) {
      console.log('Showing all bounding boxes:', allBoundingBoxes.length)
      return allBoundingBoxes
    }
    
    // Otherwise, show only the hovered segment
    console.log('Showing only hovered segment:', hoveredSegmentId)
    return allBoundingBoxes.filter((box) => {
      if (!hoveredSegmentId) return false
      return box.id === hoveredSegmentId
    })
  }, [allBoundingBoxes, hoveredSegmentId, highlightedSegmentId, showAllBoundingBoxes])

  /**
   * Get bounding boxes for a specific page
   */
  const getBoundingBoxesForPage = useMemo(() => {
    return (pageNumber: number) => {
      return visibleBoundingBoxes.filter(
        (box) => box.bbox.page_number === pageNumber
      )
    }
  }, [visibleBoundingBoxes])

  /**
   * Find a specific bounding box by segment ID
   */
  const findBoundingBoxById = useMemo(() => {
    return (segmentId: string) => {
      return allBoundingBoxes.find((box) => box.id === segmentId)
    }
  }, [allBoundingBoxes])

  return {
    allBoundingBoxes,
    visibleBoundingBoxes,
    getBoundingBoxesForPage,
    findBoundingBoxById,
  }
}
