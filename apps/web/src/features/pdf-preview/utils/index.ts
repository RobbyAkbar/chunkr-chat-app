import { PDFPreviewSegmentType } from '../types'

/**
 * Default colors for different segment types
 */
const DEFAULT_SEGMENT_COLORS: Record<
  PDFPreviewSegmentType,
  {
    border: string
    background: string
    backgroundHover: string
  }
> = {
  Title: {
    border: '#3b82f6',
    background: '#3b82f6',
    backgroundHover: '#2563eb',
  },
  SectionHeader: {
    border: '#8b5cf6',
    background: '#8b5cf6',
    backgroundHover: '#7c3aed',
  },
  Text: {
    border: '#10b981',
    background: '#10b981',
    backgroundHover: '#059669',
  },
  List: {
    border: '#f59e0b',
    background: '#f59e0b',
    backgroundHover: '#d97706',
  },
  Table: {
    border: '#ef4444',
    background: '#ef4444',
    backgroundHover: '#dc2626',
  },
  Picture: {
    border: '#ec4899',
    background: '#ec4899',
    backgroundHover: '#db2777',
  },
  Caption: {
    border: '#06b6d4',
    background: '#06b6d4',
    backgroundHover: '#0891b2',
  },
  Formula: {
    border: '#84cc16',
    background: '#84cc16',
    backgroundHover: '#65a30d',
  },
  FootNote: {
    border: '#6b7280',
    background: '#6b7280',
    backgroundHover: '#4b5563',
  },
  PageHeader: {
    border: '#9ca3af',
    background: '#9ca3af',
    backgroundHover: '#6b7280',
  },
  PageFooter: {
    border: '#9ca3af',
    background: '#9ca3af',
    backgroundHover: '#6b7280',
  },
}

/**
 * Get colors for a specific segment type
 */
export function getSegmentTypeColors(
  segmentType: PDFPreviewSegmentType,
  customColors?: Partial<
    Record<
      PDFPreviewSegmentType,
      {
        border: string
        background: string
        backgroundHover: string
      }
    >
  >
) {
  return customColors?.[segmentType] || DEFAULT_SEGMENT_COLORS[segmentType]
}

/**
 * Process chunks to extract bounding box information
 */
export function processBoundingBoxes(chunks: any[]) {
  const allBboxes: Array<{
    bbox: any & { page_number: number }
    id: string
    page_width: number
    page_height: number
    segment_type: PDFPreviewSegmentType
  }> = []

  chunks.forEach((chunk) => {
    chunk.segments.forEach((segment: any) => {
      allBboxes.push({
        bbox: {
          ...segment.bbox,
          page_number: segment.page_number,
        },
        id: segment.segment_id,
        page_width: segment.page_width,
        page_height: segment.page_height,
        segment_type: segment.segment_type,
      })
    })
  })

  return allBboxes
}

/**
 * Calculate bounding box style for positioning on the PDF
 */
export function calculateBoundingBoxStyle(box: {
  bbox: {
    top: number
    left: number
    width: number
    height: number
    page_number: number
  }
  page_width: number
  page_height: number
}) {
  // Check if we're in a browser environment
  if (typeof document === 'undefined') {
    return null
  }

  const pageNumber = box.bbox.page_number
  const originalPageWidth = box.page_width
  const originalPageHeight = box.page_height

  // Find the page element to get its position and dimensions
  const pageElement = document.querySelector(
    `[data-page-number="${pageNumber}"]`
  ) as HTMLElement
  if (!pageElement) return null

  const pageRect = pageElement.getBoundingClientRect()
  const containerRect = pageElement
    .closest('.flex.flex-col.items-center.justify-start')
    ?.getBoundingClientRect()

  if (!containerRect) return null

  // Calculate the relative position within the container
  const relativeTop = pageRect.top - containerRect.top
  const relativeLeft = pageRect.left - containerRect.left

  // Calculate the scaled dimensions
  const scaleX = pageRect.width / originalPageWidth
  const scaleY = pageRect.height / originalPageHeight

  return {
    width: `${box.bbox.width * scaleX}px`,
    height: `${box.bbox.height * scaleY}px`,
    left: `${relativeLeft + box.bbox.left * scaleX}px`,
    top: `${relativeTop + box.bbox.top * scaleY}px`,
  }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null
  const debounced = (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }
  
  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }
  
  return debounced
}
