'use client'

import React, { useState, useCallback } from 'react'
import { usePDFPreviewContext } from '../context/PDFPreviewContext'
import { usePDFPreviewBoundingBoxes } from '../hooks/usePDFPreviewBoundingBoxes'
import { PDFPreviewChunk, PDFPreviewConfig } from '../types'
import { getSegmentTypeColors, calculateBoundingBoxStyle } from '../utils'

/**
 * Props for the bounding box display component
 */
interface BoundingBoxDisplayProps {
  /** Array of document chunks with structured JSON schema */
  chunks: PDFPreviewChunk[]
  /** Configuration for the PDF preview */
  config?: PDFPreviewConfig
  /** Called when a segment is hovered */
  onSegmentHover?: (segmentId: string | null) => void
  /** Called when a segment is clicked */
  onSegmentClick?: (segment: any) => void
}

/**
 * Component for displaying bounding boxes over PDF pages
 *
 * This component renders interactive bounding boxes that overlay on PDF pages
 * to highlight different document segments. It supports hover interactions,
 * custom styling, and segment type labeling.
 */
export function BoundingBoxDisplay({
  chunks,
  config,
  onSegmentHover,
  onSegmentClick,
}: BoundingBoxDisplayProps) {
  const { setHoveredSegmentId } = usePDFPreviewContext()
  const { visibleBoundingBoxes } = usePDFPreviewBoundingBoxes({ chunks })
  const [hoveredBoxId, setHoveredBoxId] = useState<string | null>(null)
  const [hoveredBboxIndex, setHoveredBboxIndex] = useState<number | null>(null)

  const handleMouseEnter = useCallback(
    (segmentId: string, index: number, boxKey: string) => {
      setHoveredSegmentId(segmentId)
      setHoveredBboxIndex(index)
      setHoveredBoxId(boxKey)
      onSegmentHover?.(segmentId)
    },
    [setHoveredSegmentId, onSegmentHover]
  )

  const handleMouseLeave = useCallback(() => {
    setHoveredSegmentId(null)
    setHoveredBboxIndex(null)
    setHoveredBoxId(null)
    onSegmentHover?.(null)
  }, [setHoveredSegmentId, onSegmentHover])

  const handleClick = useCallback(
    (box: any) => {
      const segment = chunks
        .flatMap((chunk) => chunk.segments)
        .find((seg) => seg.segment_id === box.id)
      if (segment) {
        onSegmentClick?.(segment)
      }
    },
    [chunks, onSegmentClick]
  )

  return (
    <div className="absolute inset-0 pointer-events-none">
      {visibleBoundingBoxes.map((box, index) => {
        const colors = getSegmentTypeColors(
          box.segment_type,
          config?.segmentColors
        )
        const style = calculateBoundingBoxStyle(box)
        const boxKey = `${box.id}-${index}`
        const isHovered = hoveredBoxId === boxKey

        if (!style) return null

        return (
          <div
            key={boxKey}
            className="absolute border transition-opacity pointer-events-auto bg-transparent cursor-pointer"
            style={{
              ...style,
              borderColor: colors.border,
              backgroundColor: isHovered
                ? `${colors.backgroundHover}20`
                : 'transparent',
              borderWidth: '1px',
            }}
            onMouseEnter={() => handleMouseEnter(box.id, index, boxKey)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(box)}
            role="button"
            tabIndex={0}
            aria-label={`${box.segment_type} segment`}
          >
            {hoveredBboxIndex === index && (
              <div
                className="absolute -top-6 left-0 px-2 py-1 border text-xs rounded whitespace-nowrap z-10 text-white"
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.backgroundHover,
                  borderWidth: '1px',
                }}
              >
                {box.segment_type}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
