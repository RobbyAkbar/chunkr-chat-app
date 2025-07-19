'use client'

import React, { useState } from 'react'
import {
  PDFPreview,
  PDFPreviewProvider,
  PDFPreviewAdapter,
  usePDFPreviewContext,
  type PDFPreviewChunk,
  type PDFPreviewSegment,
} from '@/features/pdf-preview'
import { Button } from '@/components/ui/button'

/**
 * Example usage of the PDF Preview feature
 *
 * This component demonstrates different ways to use the extracted PDF preview feature:
 * 1. Basic usage with PDFPreview component
 * 2. Adapter usage for existing types
 * 3. Context usage for state management
 */

// Example PDF preview controls using context
function PDFPreviewControls() {
  const {
    showAllBoundingBoxes,
    setShowAllBoundingBoxes,
    hoveredSegmentId,
    documentMetadata,
  } = usePDFPreviewContext()

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <Button
        variant={showAllBoundingBoxes ? 'default' : 'outline'}
        onClick={() => setShowAllBoundingBoxes(!showAllBoundingBoxes)}
      >
        {showAllBoundingBoxes ? 'Hide All Boxes' : 'Show All Boxes'}
      </Button>

      <div className="text-sm text-muted-foreground">
        {documentMetadata.isLoading && 'Loading PDF...'}
        {documentMetadata.error && 'Error loading PDF'}
        {documentMetadata.numPages && `${documentMetadata.numPages} pages`}
      </div>

      {hoveredSegmentId && (
        <div className="text-sm text-blue-600">Hovered: {hoveredSegmentId}</div>
      )}
    </div>
  )
}

// Example PDFPreview usage with all features
function AdvancedPDFPreviewExample() {
  const [selectedSegment, setSelectedSegment] =
    useState<PDFPreviewSegment | null>(null)

  // Example chunks data (in real usage, this would come from your API)
  const exampleChunks: PDFPreviewChunk[] = [
    {
      chunk_id: 'chunk-1',
      chunk_length: 150,
      embed: 'Example text content for embedding...',
      segments: [
        {
          segment_id: 'segment-1',
          bbox: { top: 100, left: 50, width: 200, height: 30, page_number: 1 },
          segment_type: 'Title',
          page_number: 1,
          page_width: 600,
          page_height: 800,
          content: 'Document Title',
          html: '<h1>Document Title</h1>',
          markdown: '# Document Title',
        },
        {
          segment_id: 'segment-2',
          bbox: { top: 150, left: 50, width: 500, height: 100, page_number: 1 },
          segment_type: 'Text',
          page_number: 1,
          page_width: 600,
          page_height: 800,
          content: 'This is example paragraph content...',
          html: '<p>This is example paragraph content...</p>',
          markdown: 'This is example paragraph content...',
        },
      ],
    },
  ]

  const handleSegmentClick = (segment: PDFPreviewSegment) => {
    setSelectedSegment(segment)
    console.log('Segment clicked:', segment)
  }

  const handleSegmentHover = (segmentId: string | null) => {
    console.log('Segment hovered:', segmentId)
  }

  return (
    <PDFPreviewProvider initialShowAllBoundingBoxes={false}>
      <div className="h-screen flex flex-col">
        <PDFPreviewControls />

        <div className="flex-1 flex">
          {/* PDF Preview */}
          <div className="flex-1">
            <PDFPreview
              url="/example-document.pdf" // Replace with actual PDF URL
              chunks={exampleChunks}
              config={{
                enableTextLayer: false,
                enableAnnotationLayer: false,
                segmentColors: {
                  Title: {
                    border: '#3b82f6',
                    background: '#3b82f6',
                    backgroundHover: '#2563eb',
                  },
                  Text: {
                    border: '#10b981',
                    background: '#10b981',
                    backgroundHover: '#059669',
                  },
                },
                scrollBehavior: {
                  scrollDelay: 300,
                  smooth: true,
                },
              }}
              onSegmentHover={handleSegmentHover}
              onSegmentClick={handleSegmentClick}
              onDocumentLoad={(numPages) =>
                console.log('PDF loaded:', numPages)
              }
              onDocumentError={(error) => console.error('PDF error:', error)}
            />
          </div>

          {/* Sidebar with segment details */}
          <div className="w-80 border-l p-4">
            <h3 className="font-medium mb-4">Segment Details</h3>
            {selectedSegment ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">ID:</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedSegment.segment_id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Type:</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedSegment.segment_type}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Content:</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedSegment.content}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Page:</label>
                  <p className="text-sm text-muted-foreground">
                    {selectedSegment.page_number}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Bounding Box:</label>
                  <pre className="text-xs text-muted-foreground bg-muted p-2 rounded">
                    {JSON.stringify(selectedSegment.bbox, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Click on a segment to see its details
              </p>
            )}
          </div>
        </div>
      </div>
    </PDFPreviewProvider>
  )
}

// Simple adapter example for backward compatibility
function SimplePDFPreviewExample({
  url,
  chunks,
}: {
  url: string
  chunks: any[]
}) {
  return (
    <div className="h-96">
      <PDFPreviewAdapter
        url={url}
        chunks={chunks}
        showAllBoundingBoxes={true}
        onSegmentHover={(segmentId) => console.log('Hovered:', segmentId)}
        onSegmentClick={(segment) => console.log('Clicked:', segment)}
      />
    </div>
  )
}

export {
  AdvancedPDFPreviewExample,
  SimplePDFPreviewExample,
  PDFPreviewControls,
}
