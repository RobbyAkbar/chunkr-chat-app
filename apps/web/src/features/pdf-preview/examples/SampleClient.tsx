import React, { useState } from 'react'
import { PDFPreview, PDFPreviewAdapter, PDFPreviewProvider } from '../index'
import type { PDFPreviewChunk, PDFPreviewConfig } from '../types'

/**
 * Sample Client for PDF Preview Component
 * 
 * This example demonstrates:
 * - Basic usage with mock data
 * - Advanced configuration options
 * - Event handling
 * - Custom styling
 * - Adapter usage for backward compatibility
 */

// Mock PDF URL - replace with your actual PDF
const MOCK_PDF_URL = '/sample-document.pdf'

// Mock data representing a research paper with different segment types
const MOCK_CHUNKS: PDFPreviewChunk[] = [
  {
    chunk_id: 'chunk-1',
    chunk_length: 150,
    embed: 'Research paper introduction and methodology',
    segments: [
      {
        segment_id: 'title-1',
        bbox: { top: 50, left: 100, width: 400, height: 30, page_number: 1 },
        segment_type: 'Title',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Advanced Machine Learning Techniques for Document Analysis',
        confidence: 0.95
      },
      {
        segment_id: 'author-1',
        bbox: { top: 90, left: 100, width: 300, height: 20, page_number: 1 },
        segment_type: 'Text',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Dr. Jane Smith, Dr. John Doe',
        confidence: 0.88
      },
      {
        segment_id: 'abstract-1',
        bbox: { top: 130, left: 50, width: 512, height: 80, page_number: 1 },
        segment_type: 'Text',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'This paper presents novel approaches to document analysis using machine learning techniques...',
        confidence: 0.92
      }
    ]
  },
  {
    chunk_id: 'chunk-2',
    chunk_length: 200,
    embed: 'Methodology and experimental setup',
    segments: [
      {
        segment_id: 'section-1',
        bbox: { top: 250, left: 50, width: 200, height: 25, page_number: 1 },
        segment_type: 'SectionHeader',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: '1. Introduction',
        confidence: 0.94
      },
      {
        segment_id: 'text-1',
        bbox: { top: 285, left: 50, width: 512, height: 120, page_number: 1 },
        segment_type: 'Text',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Document analysis has become increasingly important in the digital age...',
        confidence: 0.89
      },
      {
        segment_id: 'list-1',
        bbox: { top: 420, left: 70, width: 492, height: 60, page_number: 1 },
        segment_type: 'List',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: '• Natural Language Processing\n• Computer Vision\n• Machine Learning',
        confidence: 0.91
      }
    ]
  },
  {
    chunk_id: 'chunk-3',
    chunk_length: 180,
    embed: 'Results and conclusions',
    segments: [
      {
        segment_id: 'table-1',
        bbox: { top: 100, left: 50, width: 512, height: 150, page_number: 2 },
        segment_type: 'Table',
        page_number: 2,
        page_width: 612,
        page_height: 792,
        content: 'Experimental Results\nAccuracy: 95.2%\nPrecision: 94.8%\nRecall: 95.1%',
        confidence: 0.87
      },
      {
        segment_id: 'formula-1',
        bbox: { top: 300, left: 100, width: 412, height: 40, page_number: 2 },
        segment_type: 'Formula',
        page_number: 2,
        page_width: 612,
        page_height: 792,
        content: 'F1 = 2 * (precision * recall) / (precision + recall)',
        confidence: 0.96
      },
      {
        segment_id: 'caption-1',
        bbox: { top: 350, left: 50, width: 512, height: 20, page_number: 2 },
        segment_type: 'Caption',
        page_number: 2,
        page_width: 612,
        page_height: 792,
        content: 'Figure 1: Performance comparison of different algorithms',
        confidence: 0.85
      }
    ]
  }
]

// Custom configuration with different colors for segment types
const CUSTOM_CONFIG: PDFPreviewConfig = {
  showAllBoundingBoxes: false,
  enableTextLayer: true,
  enableAnnotationLayer: true,
  segmentColors: {
    Title: {
      border: '#ff6b6b',
      background: 'rgba(255, 107, 107, 0.1)',
      backgroundHover: 'rgba(255, 107, 107, 0.2)',
    },
    SectionHeader: {
      border: '#4ecdc4',
      background: 'rgba(78, 205, 196, 0.1)',
      backgroundHover: 'rgba(78, 205, 196, 0.2)',
    },
    Text: {
      border: '#45b7d1',
      background: 'rgba(69, 183, 209, 0.1)',
      backgroundHover: 'rgba(69, 183, 209, 0.2)',
    },
    List: {
      border: '#96ceb4',
      background: 'rgba(150, 206, 180, 0.1)',
      backgroundHover: 'rgba(150, 206, 180, 0.2)',
    },
    Table: {
      border: '#feca57',
      background: 'rgba(254, 202, 87, 0.1)',
      backgroundHover: 'rgba(254, 202, 87, 0.2)',
    },
    Formula: {
      border: '#ff9ff3',
      background: 'rgba(255, 159, 243, 0.1)',
      backgroundHover: 'rgba(255, 159, 243, 0.2)',
    },
    Caption: {
      border: '#54a0ff',
      background: 'rgba(84, 160, 255, 0.1)',
      backgroundHover: 'rgba(84, 160, 255, 0.2)',
    },
  },
  scrollBehavior: {
    scrollDelay: 300,
    smooth: true,
  },
}

// Mock data for adapter (simulating existing API types)
const MOCK_API_CHUNKS = [
  {
    chunk_id: 'api-chunk-1',
    chunk_length: 120,
    embed: 'API chunk data',
    segments: [
      {
        segment_id: 'api-segment-1',
        bbox: { top: 100, left: 50, width: 300, height: 50, page_number: 1 },
        segment_type: 'Text',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'This is API chunk data for backward compatibility',
        confidence: 0.90
      }
    ]
  }
]

export const SampleClient: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
  const [showAllBoxes, setShowAllBoxes] = useState(false)
  const [documentInfo, setDocumentInfo] = useState<{ numPages: number | null; isLoading: boolean }>({
    numPages: null,
    isLoading: false,
  })

  // Event handlers
  const handleSegmentHover = (segmentId: string | null) => {
    setHoveredSegment(segmentId)
    console.log('Hovered segment:', segmentId)
  }

  const handleSegmentClick = (segment: any) => {
    setSelectedSegment(segment.segment_id)
    console.log('Clicked segment:', segment)
  }

  const handleDocumentLoad = (numPages: number) => {
    setDocumentInfo({ numPages, isLoading: false })
    console.log('Document loaded with', numPages, 'pages')
  }

  const handleDocumentError = (error: Error) => {
    console.error('Document failed to load:', error)
    setDocumentInfo({ numPages: null, isLoading: false })
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">PDF Preview Sample Client</h1>
      
      {/* Controls */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Controls</h2>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showAllBoxes}
              onChange={(e) => setShowAllBoxes(e.target.checked)}
              className="rounded"
            />
            Show All Bounding Boxes
          </label>
          <div className="text-sm text-gray-600">
            {documentInfo.numPages && `Pages: ${documentInfo.numPages}`}
            {hoveredSegment && ` | Hovered: ${hoveredSegment}`}
            {selectedSegment && ` | Selected: ${selectedSegment}`}
          </div>
        </div>
      </div>

      {/* Basic Usage Example */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <div className="border rounded-lg overflow-hidden">
          <PDFPreviewProvider initialShowAllBoundingBoxes={showAllBoxes}>
            <PDFPreview
              url={MOCK_PDF_URL}
              chunks={MOCK_CHUNKS}
              config={CUSTOM_CONFIG}
              onSegmentHover={handleSegmentHover}
              onSegmentClick={handleSegmentClick}
              onDocumentLoad={handleDocumentLoad}
              onDocumentError={handleDocumentError}
              className="w-full"
            />
          </PDFPreviewProvider>
        </div>
      </div>

      {/* Adapter Usage Example */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Adapter Usage (Backward Compatibility)</h2>
        <div className="border rounded-lg overflow-hidden">
          <PDFPreviewProvider>
            <PDFPreviewAdapter
              url={MOCK_PDF_URL}
              chunks={MOCK_API_CHUNKS as any}
              showAllBoundingBoxes={showAllBoxes}
              onSegmentHover={handleSegmentHover}
              onSegmentClick={handleSegmentClick}
              onDocumentLoad={handleDocumentLoad}
              onDocumentError={handleDocumentError}
              className="w-full"
            />
          </PDFPreviewProvider>
        </div>
      </div>

      {/* Information Panel */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Usage Information</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Hover over bounding boxes to see segment information</li>
          <li>Click on segments to select them</li>
          <li>Toggle "Show All Bounding Boxes" to see all segments</li>
          <li>Different segment types have different colors</li>
          <li>Scroll to navigate through the document</li>
        </ul>
      </div>

      {/* Mock Data Structure */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Mock Data Structure</h3>
        <pre className="text-xs overflow-auto bg-white p-2 rounded border">
          {JSON.stringify(MOCK_CHUNKS[0], null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default SampleClient 