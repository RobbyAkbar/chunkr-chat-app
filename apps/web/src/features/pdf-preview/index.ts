/**
 * PDF Preview Feature - Standalone component for handling PDF preview with structured JSON schema chunks and bounding box display
 *
 * This feature provides:
 * - PDF document rendering with react-pdf
 * - Responsive page sizing and layout
 * - Bounding box overlays for document chunks/segments from structured JSON schema
 * - Scroll synchronization and page navigation
 * - Interactive hover states and reference handling
 * - Loading states and error handling
 */

export { PDFPreview } from './components/PDFPreview'
export { PDFPreviewAdapter } from './components/PDFPreviewAdapter'
export { PDFPreviewStoreBridge } from './components/PDFPreviewStoreBridge'
export { BoundingBoxDisplay } from './components/BoundingBoxDisplay'
export {
  PDFPreviewProvider,
  usePDFPreviewContext,
} from './context/PDFPreviewContext'
export type {
  PDFPreviewProps,
  PDFPreviewChunk,
  PDFPreviewSegment,
  PDFPreviewBoundingBox,
  PDFPreviewConfig,
  PDFPreviewSegmentType,
  ProcessedBoundingBox,
  PDFPreviewContextType,
} from './types'
export { usePDFPreviewScroll } from './hooks/usePDFPreviewScroll'
export { usePDFPreviewBoundingBoxes } from './hooks/usePDFPreviewBoundingBoxes'
export {
  getSegmentTypeColors,
  processBoundingBoxes,
  calculateBoundingBoxStyle,
  debounce,
} from './utils'
