'use client'

import React, { useEffect } from 'react'
import { useResponseStore } from '@/store/response-store'
import { usePDFPreviewContext } from '@/features/pdf-preview'

/**
 * Bridge component that syncs the global response store with PDF preview context
 *
 * This component ensures that the existing store state stays in sync with the
 * new PDF preview context, maintaining backward compatibility.
 */
export function PDFPreviewStoreBridge({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    hoveredSegmentId,
    showAllBoundingBoxes,
    setHoveredSegmentId,
    setShowAllBoundingBoxes,
  } = usePDFPreviewContext()

  const { hoveredChunkId, showAllBboxes, setHoveredChunkId, setShowAllBboxes } =
    useResponseStore()

  // Sync hovered segment ID between store and context
  useEffect(() => {
    if (hoveredChunkId !== hoveredSegmentId) {
      setHoveredSegmentId(hoveredChunkId)
    }
  }, [hoveredChunkId, hoveredSegmentId, setHoveredSegmentId])

  useEffect(() => {
    if (hoveredSegmentId !== hoveredChunkId) {
      setHoveredChunkId(hoveredSegmentId)
    }
  }, [hoveredSegmentId, hoveredChunkId, setHoveredChunkId])

  // Sync show all bounding boxes between store and context
  useEffect(() => {
    if (showAllBboxes !== showAllBoundingBoxes) {
      setShowAllBoundingBoxes(showAllBboxes)
    }
  }, [showAllBboxes, showAllBoundingBoxes, setShowAllBoundingBoxes])

  useEffect(() => {
    if (showAllBoundingBoxes !== showAllBboxes) {
      setShowAllBboxes(showAllBoundingBoxes)
    }
  }, [showAllBoundingBoxes, showAllBboxes, setShowAllBboxes])

  return <>{children}</>
}
