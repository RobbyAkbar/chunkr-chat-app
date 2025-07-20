'use client'

import React, { memo } from 'react'
import { PDFPreviewAdapter, PDFPreviewProvider } from '@/features/pdf-preview'
import { PDFPreviewStoreBridge } from '@/features/pdf-preview/components/PDFPreviewStoreBridge'
import { Chunk } from '@/client'
import { useResponseStore } from '@/store/response-store'

/**
 * PDFViewerComponent - Updated to use the extracted PDF preview feature
 *
 * This component now uses the extracted PDFPreviewAdapter which provides:
 * - PDF document rendering with react-pdf
 * - Responsive page sizing based on container width
 * - Bounding box overlays for document chunks/segments
 * - Scroll synchronization and page navigation
 * - Loading states and error handling
 * - Context-based state management
 * - Backward compatibility with existing store
 *
 * @param url - The URL or file path of the PDF document to display
 * @param chunks - Array of document chunks containing segments with bounding box data
 */
function PDFViewerComponent({ url, chunks }: { url: string; chunks: Chunk[] }) {
  const showAllBboxes = useResponseStore((state) => state.showAllBboxes)

  return (
    <PDFPreviewProvider initialShowAllBoundingBoxes={showAllBboxes}>
      <PDFPreviewStoreBridge>
        <PDFPreviewAdapter
          url={url}
          chunks={chunks}
          showAllBoundingBoxes={showAllBboxes}
          className="pdf-container"
        />
      </PDFPreviewStoreBridge>
    </PDFPreviewProvider>
  )
}

export default memo(PDFViewerComponent)
