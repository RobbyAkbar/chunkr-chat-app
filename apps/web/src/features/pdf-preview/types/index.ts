/**
 * Type definitions for PDF Preview feature
 */

/**
 * Bounding box coordinates for document elements
 */
export interface PDFPreviewBoundingBox {
  /** The top coordinate of the bounding box */
  top: number
  /** The left coordinate of the bounding box */
  left: number
  /** The width of the bounding box */
  width: number
  /** The height of the bounding box */
  height: number
  /** The page number where this bounding box is located (1-indexed) */
  page_number: number
}

/**
 * Segment types for different document elements
 */
export type PDFPreviewSegmentType =
  | 'Title'
  | 'SectionHeader'
  | 'Text'
  | 'List'
  | 'Table'
  | 'Picture'
  | 'Caption'
  | 'Formula'
  | 'FootNote'
  | 'PageHeader'
  | 'PageFooter'

/**
 * Document segment containing content and positioning information
 */
export interface PDFPreviewSegment {
  /** Unique identifier for the segment */
  segment_id: string
  /** Bounding box coordinates for the segment */
  bbox: PDFPreviewBoundingBox
  /** Type of document segment */
  segment_type: PDFPreviewSegmentType
  /** Page number where this segment is located */
  page_number: number
  /** Original page width for scaling calculations */
  page_width: number
  /** Original page height for scaling calculations */
  page_height: number
  /** Text content of the segment */
  content?: string
  /** HTML representation of the segment */
  html?: string
  /** Markdown representation of the segment */
  markdown?: string
  /** LLM-generated content for the segment */
  llm?: string | null
  /** Confidence score for the segment */
  confidence?: number | null
  /** Presigned URL to the segment image */
  image?: string | null
}

/**
 * Document chunk containing one or more segments
 */
export interface PDFPreviewChunk {
  /** Unique identifier for the chunk */
  chunk_id?: string
  /** Total number of tokens in the chunk */
  chunk_length: number
  /** Suggested text to be embedded for the chunk */
  embed?: string | null
  /** Collection of document segments that form this chunk */
  segments: PDFPreviewSegment[]
}

/**
 * Configuration options for PDF preview behavior
 */
export interface PDFPreviewConfig {
  /** Whether to show all bounding boxes by default */
  showAllBoundingBoxes?: boolean
  /** Whether to enable text layer rendering */
  enableTextLayer?: boolean
  /** Whether to enable annotation layer rendering */
  enableAnnotationLayer?: boolean
  /** Custom colors for different segment types */
  segmentColors?: Partial<
    Record<
      PDFPreviewSegmentType,
      {
        border: string
        background: string
        backgroundHover: string
      }
    >
  >
  /** Scroll behavior configuration */
  scrollBehavior?: {
    /** Delay before scrolling in milliseconds */
    scrollDelay?: number
    /** Smooth scroll behavior */
    smooth?: boolean
  }
}

/**
 * Props for the main PDFPreview component
 */
export interface PDFPreviewProps {
  /** URL or file path of the PDF document to display */
  url: string
  /** Array of document chunks with structured JSON schema */
  chunks: PDFPreviewChunk[]
  /** Configuration options for the PDF preview */
  config?: PDFPreviewConfig
  /** Called when a segment is hovered */
  onSegmentHover?: (segmentId: string | null) => void
  /** Called when a segment is clicked */
  onSegmentClick?: (segment: PDFPreviewSegment) => void
  /** Called when the PDF loads successfully */
  onDocumentLoad?: (numPages: number) => void
  /** Called when the PDF fails to load */
  onDocumentError?: (error: Error) => void
  /** Custom class name for styling */
  className?: string
}

/**
 * Internal processed bounding box data with scaling information
 */
export interface ProcessedBoundingBox {
  bbox: PDFPreviewBoundingBox
  id: string
  page_width: number
  page_height: number
  segment_type: PDFPreviewSegmentType
}

/**
 * Context state for PDF preview
 */
export interface PDFPreviewContextState {
  /** Currently hovered segment ID */
  hoveredSegmentId: string | null
  /** Whether to show all bounding boxes */
  showAllBoundingBoxes: boolean
  /** PDF document metadata */
  documentMetadata: {
    numPages: number | null
    isLoading: boolean
    error: boolean
  }
  /** Current page dimensions */
  pageDimensions: {
    width: number
    displayWidth: number
  }
}

/**
 * Context actions for PDF preview
 */
export interface PDFPreviewContextActions {
  /** Set the currently hovered segment */
  setHoveredSegmentId: (id: string | null) => void
  /** Toggle showing all bounding boxes */
  setShowAllBoundingBoxes: (show: boolean) => void
  /** Update document metadata */
  setDocumentMetadata: (
    metadata: Partial<PDFPreviewContextState['documentMetadata']>
  ) => void
  /** Update page dimensions */
  setPageDimensions: (
    dimensions: Partial<PDFPreviewContextState['pageDimensions']>
  ) => void
}

/**
 * Combined context type
 */
export type PDFPreviewContextType = PDFPreviewContextState &
  PDFPreviewContextActions

// Re-export everything for convenience
export * from './index'
