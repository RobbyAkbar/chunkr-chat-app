'use client'

import { PDFPreview, PDFPreviewProvider, usePDFPreviewContext } from '@/features/pdf-preview'
import { researchPaperChunks } from '@/features/pdf-preview/examples/mockData'
import { ChatInterface } from '@/components/chat/chat-interface'
import { PDFPreviewSegment } from '@/features/pdf-preview/types'
import { useState } from 'react'

function PDFPreviewContent() {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const { 
    setHighlightedSegmentId, 
    highlightedSegmentId, 
    setShowAllBoundingBoxes,
    showAllBoundingBoxes 
  } = usePDFPreviewContext()

  const handleSegmentHover = (segmentId: string | null) => {
    setHoveredSegment(segmentId)
    console.log('Hovered segment:', segmentId)
  }

  const handleSegmentClick = (segment: PDFPreviewSegment) => {
    setSelectedSegment(segment.segment_id)
    console.log('Clicked segment:', segment)
  }

  const handleReferenceClick = (segment: PDFPreviewSegment) => {
    setHighlightedSegmentId(segment.segment_id)
    setShowAllBoundingBoxes(false) // Hide all other bounding boxes
    console.log('Reference clicked:', segment)
    
    // Auto-clear highlight after 3 seconds
    setTimeout(() => {
      setHighlightedSegmentId(null)
      // Don't automatically restore showAllBoundingBoxes - let user control it via checkbox
    }, 3000)
  }

  const handleDocumentLoad = (numPages: number) => {
    console.log('Document loaded with', numPages, 'pages')
  }

  const handleDocumentError = (error: Error) => {
    console.error('Document failed to load:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">PDF Preview with Chat Interface</h1>
        <p className="text-sm text-gray-600 mt-1">
          Click on chat references to highlight corresponding sections in the PDF
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Side - PDF Viewer */}
        <div className="flex-1 flex flex-col border-r border-gray-200">
          {/* PDF Controls */}
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">PDF Document</h2>
              <div className="flex items-center space-x-4">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={showAllBoundingBoxes}
                    onChange={(e) => {
                      console.log('Checkbox changed:', e.target.checked)
                      setShowAllBoundingBoxes(e.target.checked)
                    }}
                    className="rounded"
                  />
                  Show All Bounding Boxes ({showAllBoundingBoxes ? 'ON' : 'OFF'})
                </label>
                {highlightedSegmentId && (
                  <div className="text-xs text-blue-600 font-medium">
                    Showing only highlighted segment
                  </div>
                )}
                <div className="text-xs text-gray-500">
                  {hoveredSegment && <span>Hovered: {hoveredSegment}</span>}
                  {selectedSegment && <span className="ml-2">Selected: {selectedSegment}</span>}
                  {highlightedSegmentId && <span className="ml-2 text-blue-600">Highlighted: {highlightedSegmentId}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* PDF Preview */}
          <div className="flex-1 bg-white overflow-hidden">
            <PDFPreview
              url="/sample-document.pdf"
              chunks={researchPaperChunks}
              onSegmentHover={handleSegmentHover}
              onSegmentClick={handleSegmentClick}
              onDocumentLoad={handleDocumentLoad}
              onDocumentError={handleDocumentError}
              className="w-full h-full"
              config={{
                showAllBoundingBoxes: showAllBoundingBoxes,
              }}
            />
          </div>
        </div>

        {/* Right Side - Chat Interface */}
        <div className="w-96 bg-white">
          <ChatInterface 
            onReferenceClick={handleReferenceClick}
            highlightedSegmentId={highlightedSegmentId}
            className="h-full"
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="fixed bottom-4 left-4 bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-sm">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Instructions</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Click on chat references to highlight and show only that PDF section</li>
          <li>• Other bounding boxes will be hidden when a reference is clicked</li>
          <li>• Hover over bounding boxes to see segment info</li>
          <li>• Toggle "Show All Bounding Boxes" to control visibility</li>
          <li>• Check browser console for event logs</li>
        </ul>
      </div>
    </div>
  )
}

export default function PDFPreviewTestPage() {
  return (
    <PDFPreviewProvider initialShowAllBoundingBoxes={true}>
      <PDFPreviewContent />
    </PDFPreviewProvider>
  )
} 