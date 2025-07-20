# PDF Preview Usage Guide

This guide demonstrates how to use the PDF Preview component with mock data and various configurations.

## Quick Start

### 1. Basic Usage

```tsx
import { PDFPreview, PDFPreviewProvider } from '@/features/pdf-preview'

// Mock data structure
const mockChunks = [
  {
    chunk_id: 'chunk-1',
    chunk_length: 150,
    embed: 'Document content summary',
    segments: [
      {
        segment_id: 'title-1',
        bbox: { top: 50, left: 100, width: 400, height: 30, page_number: 1 },
        segment_type: 'Title',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Document Title',
        confidence: 0.95
      }
    ]
  }
]

function MyComponent() {
  return (
    <PDFPreviewProvider>
      <PDFPreview
        url="/path/to/document.pdf"
        chunks={mockChunks}
        onSegmentHover={(segmentId) => console.log('Hovered:', segmentId)}
        onSegmentClick={(segment) => console.log('Clicked:', segment)}
      />
    </PDFPreviewProvider>
  )
}
```

### 2. With Custom Configuration

```tsx
import { PDFPreview, PDFPreviewProvider } from '@/features/pdf-preview'
import type { PDFPreviewConfig } from '@/features/pdf-preview/types'

const config: PDFPreviewConfig = {
  showAllBoundingBoxes: false,
  enableTextLayer: true,
  enableAnnotationLayer: true,
  segmentColors: {
    Title: {
      border: '#ff6b6b',
      background: 'rgba(255, 107, 107, 0.1)',
      backgroundHover: 'rgba(255, 107, 107, 0.2)',
    },
    Text: {
      border: '#45b7d1',
      background: 'rgba(69, 183, 209, 0.1)',
      backgroundHover: 'rgba(69, 183, 209, 0.2)',
    },
  },
  scrollBehavior: {
    scrollDelay: 300,
    smooth: true,
  },
}

function MyComponent() {
  return (
    <PDFPreviewProvider>
      <PDFPreview
        url="/path/to/document.pdf"
        chunks={mockChunks}
        config={config}
        onSegmentHover={handleSegmentHover}
        onSegmentClick={handleSegmentClick}
        onDocumentLoad={(numPages) => console.log('Loaded:', numPages, 'pages')}
        onDocumentError={(error) => console.error('Error:', error)}
      />
    </PDFPreviewProvider>
  )
}
```

### 3. Backward Compatibility (Adapter)

```tsx
import { PDFPreviewAdapter, PDFPreviewProvider } from '@/features/pdf-preview'

// For existing applications with different chunk structure
function ExistingComponent({ url, chunks }) {
  return (
    <PDFPreviewProvider>
      <PDFPreviewAdapter
        url={url}
        chunks={chunks}
        showAllBoundingBoxes={false}
        onSegmentHover={handleSegmentHover}
        onSegmentClick={handleSegmentClick}
      />
    </PDFPreviewProvider>
  )
}
```

## Mock Data Examples

### Research Paper Structure

```typescript
const researchPaperChunks = [
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
        segment_id: 'abstract-1',
        bbox: { top: 130, left: 50, width: 512, height: 80, page_number: 1 },
        segment_type: 'Text',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'This paper presents novel approaches to document analysis...',
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
  }
]
```

### Business Document Structure

```typescript
const businessDocumentChunks = [
  {
    chunk_id: 'chunk-1',
    chunk_length: 120,
    embed: 'Business report executive summary',
    segments: [
      {
        segment_id: 'header-1',
        bbox: { top: 30, left: 50, width: 512, height: 25, page_number: 1 },
        segment_type: 'PageHeader',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Q4 2023 Financial Report',
        confidence: 0.98
      },
      {
        segment_id: 'table-1',
        bbox: { top: 100, left: 50, width: 512, height: 200, page_number: 1 },
        segment_type: 'Table',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Revenue: $1.2M\nExpenses: $800K\nProfit: $400K',
        confidence: 0.87
      },
      {
        segment_id: 'formula-1',
        bbox: { top: 350, left: 100, width: 412, height: 40, page_number: 1 },
        segment_type: 'Formula',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'ROI = (Net Profit / Total Investment) × 100',
        confidence: 0.96
      }
    ]
  }
]
```

## Event Handling Examples

### Basic Event Handlers

```typescript
const handleSegmentHover = (segmentId: string | null) => {
  if (segmentId) {
    console.log('Hovered segment:', segmentId)
    // Update UI state, show tooltip, etc.
  }
}

const handleSegmentClick = (segment: PDFPreviewSegment) => {
  console.log('Clicked segment:', segment)
  // Navigate to section, show details, etc.
}

const handleDocumentLoad = (numPages: number) => {
  console.log('Document loaded with', numPages, 'pages')
  // Update loading state, enable navigation, etc.
}

const handleDocumentError = (error: Error) => {
  console.error('Document failed to load:', error)
  // Show error message, retry button, etc.
}
```

### Advanced Event Handling with State

```typescript
import { useState } from 'react'

function PDFViewerWithState() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)
  const [documentInfo, setDocumentInfo] = useState({
    numPages: null,
    isLoading: true,
    error: false
  })

  const handleSegmentHover = (segmentId: string | null) => {
    setHoveredSegment(segmentId)
  }

  const handleSegmentClick = (segment: PDFPreviewSegment) => {
    setSelectedSegment(segment.segment_id)
    // Additional logic like scrolling to segment
  }

  const handleDocumentLoad = (numPages: number) => {
    setDocumentInfo({
      numPages,
      isLoading: false,
      error: false
    })
  }

  const handleDocumentError = (error: Error) => {
    setDocumentInfo({
      numPages: null,
      isLoading: false,
      error: true
    })
  }

  return (
    <div>
      <div className="info-panel">
        {documentInfo.numPages && <p>Pages: {documentInfo.numPages}</p>}
        {hoveredSegment && <p>Hovered: {hoveredSegment}</p>}
        {selectedSegment && <p>Selected: {selectedSegment}</p>}
      </div>
      
      <PDFPreviewProvider>
        <PDFPreview
          url="/document.pdf"
          chunks={mockChunks}
          onSegmentHover={handleSegmentHover}
          onSegmentClick={handleSegmentClick}
          onDocumentLoad={handleDocumentLoad}
          onDocumentError={handleDocumentError}
        />
      </PDFPreviewProvider>
    </div>
  )
}
```

## Custom Styling Examples

### Custom Segment Colors

```typescript
const customColors: PDFPreviewConfig = {
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
  }
}
```

### Custom Scroll Behavior

```typescript
const customScrollConfig: PDFPreviewConfig = {
  scrollBehavior: {
    scrollDelay: 500, // Delay before scrolling
    smooth: true,     // Smooth scrolling
  },
}
```

## Integration Patterns

### With Existing State Management

```typescript
import { PDFPreviewStoreBridge } from '@/features/pdf-preview'

function PDFViewerWithStore() {
  // Your existing state management
  const [pdfState, setPdfState] = useState({
    showAllBoxes: false,
    selectedSegment: null,
    hoveredSegment: null
  })

  return (
    <PDFPreviewProvider>
      <PDFPreviewStoreBridge
        showAllBoundingBoxes={pdfState.showAllBoxes}
        onShowAllBoundingBoxesChange={(show) => 
          setPdfState(prev => ({ ...prev, showAllBoxes: show }))
        }
      />
      <PDFPreview
        url="/document.pdf"
        chunks={chunks}
        config={{ showAllBoundingBoxes: pdfState.showAllBoxes }}
        onSegmentHover={(segmentId) => 
          setPdfState(prev => ({ ...prev, hoveredSegment: segmentId }))
        }
        onSegmentClick={(segment) => 
          setPdfState(prev => ({ ...prev, selectedSegment: segment.segment_id }))
        }
      />
    </PDFPreviewProvider>
  )
}
```

### With React Context

```typescript
import { usePDFPreviewContext } from '@/features/pdf-preview'

function PDFControls() {
  const {
    showAllBoundingBoxes,
    setShowAllBoundingBoxes,
    hoveredSegmentId
  } = usePDFPreviewContext()

  return (
    <div className="controls">
      <label>
        <input
          type="checkbox"
          checked={showAllBoundingBoxes}
          onChange={(e) => setShowAllBoundingBoxes(e.target.checked)}
        />
        Show All Bounding Boxes
      </label>
      {hoveredSegmentId && (
        <p>Hovered: {hoveredSegmentId}</p>
      )}
    </div>
  )
}
```

## Complete Example

```typescript
import React, { useState } from 'react'
import { PDFPreview, PDFPreviewProvider } from '@/features/pdf-preview'
import type { PDFPreviewChunk, PDFPreviewConfig } from '@/features/pdf-preview/types'

// Mock data
const mockChunks: PDFPreviewChunk[] = [
  {
    chunk_id: 'chunk-1',
    chunk_length: 150,
    embed: 'Document content',
    segments: [
      {
        segment_id: 'title-1',
        bbox: { top: 50, left: 100, width: 400, height: 30, page_number: 1 },
        segment_type: 'Title',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Sample Document',
        confidence: 0.95
      },
      {
        segment_id: 'text-1',
        bbox: { top: 100, left: 50, width: 512, height: 100, page_number: 1 },
        segment_type: 'Text',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'This is sample content for the document.',
        confidence: 0.90
      }
    ]
  }
]

// Configuration
const config: PDFPreviewConfig = {
  showAllBoundingBoxes: false,
  enableTextLayer: true,
  enableAnnotationLayer: true,
  segmentColors: {
    Title: {
      border: '#ff6b6b',
      background: 'rgba(255, 107, 107, 0.1)',
      backgroundHover: 'rgba(255, 107, 107, 0.2)',
    },
    Text: {
      border: '#45b7d1',
      background: 'rgba(69, 183, 209, 0.1)',
      backgroundHover: 'rgba(69, 183, 209, 0.2)',
    },
  },
}

function PDFViewer() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)

  const handleSegmentHover = (segmentId: string | null) => {
    setHoveredSegment(segmentId)
    console.log('Hovered segment:', segmentId)
  }

  const handleSegmentClick = (segment: any) => {
    setSelectedSegment(segment.segment_id)
    console.log('Clicked segment:', segment)
  }

  const handleDocumentLoad = (numPages: number) => {
    console.log('Document loaded with', numPages, 'pages')
  }

  const handleDocumentError = (error: Error) => {
    console.error('Document failed to load:', error)
  }

  return (
    <div className="pdf-viewer">
      <div className="controls">
        <h2>PDF Preview Controls</h2>
        <div className="info">
          {hoveredSegment && <p>Hovered: {hoveredSegment}</p>}
          {selectedSegment && <p>Selected: {selectedSegment}</p>}
        </div>
      </div>

      <div className="pdf-container">
        <PDFPreviewProvider>
          <PDFPreview
            url="/sample-document.pdf"
            chunks={mockChunks}
            config={config}
            onSegmentHover={handleSegmentHover}
            onSegmentClick={handleSegmentClick}
            onDocumentLoad={handleDocumentLoad}
            onDocumentError={handleDocumentError}
            className="w-full"
          />
        </PDFPreviewProvider>
      </div>
    </div>
  )
}

export default PDFViewer
```

## Troubleshooting

### Common Issues

1. **PDF not loading**: Ensure the PDF URL is accessible and the file exists
2. **Bounding boxes not showing**: Check that chunks have valid bbox coordinates
3. **Type errors**: Ensure all required properties are provided in the chunk structure
4. **Performance issues**: Consider using `showAllBoundingBoxes: false` for large documents

### Debug Tips

- Use browser console to check for errors
- Verify chunk structure matches the expected format
- Test with a simple PDF first before using complex documents
- Check that all required dependencies are installed

## Next Steps

- Explore the full API reference in the main README
- Check out the component source code for advanced customization
- Integrate with your existing state management system
- Add custom styling to match your application's design 