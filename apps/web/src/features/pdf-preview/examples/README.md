# PDF Preview Examples

This directory contains examples and sample data for using the PDF Preview component.

## Files Overview

- **`mockData.ts`** - Comprehensive mock data for testing different document types
- **`UsageGuide.md`** - Detailed usage guide with code examples
- **`BasicExample.tsx`** - Simple example component (requires React setup)
- **`README.md`** - This file

## Quick Start

### 1. Import Mock Data

```typescript
import { 
  simpleMockChunks, 
  researchPaperChunks, 
  businessDocumentChunks,
  mockData 
} from '@/features/pdf-preview/examples/mockData'
```

### 2. Basic Usage

```typescript
import { PDFPreview, PDFPreviewProvider } from '@/features/pdf-preview'
import { simpleMockChunks } from '@/features/pdf-preview/examples/mockData'

function MyComponent() {
  return (
    <PDFPreviewProvider>
      <PDFPreview
        url="/path/to/document.pdf"
        chunks={simpleMockChunks}
        onSegmentHover={(segmentId) => console.log('Hovered:', segmentId)}
        onSegmentClick={(segment) => console.log('Clicked:', segment)}
      />
    </PDFPreviewProvider>
  )
}
```

## Available Mock Data

### Simple Example
```typescript
import { simpleMockChunks } from '@/features/pdf-preview/examples/mockData'
```
- Single chunk with title and text segments
- Good for basic testing

### Research Paper
```typescript
import { researchPaperChunks } from '@/features/pdf-preview/examples/mockData'
```
- Multiple chunks with various segment types
- Includes title, text, section headers, lists, tables, formulas, captions
- Spans multiple pages

### Business Document
```typescript
import { businessDocumentChunks } from '@/features/pdf-preview/examples/mockData'
```
- Financial report structure
- Includes headers, tables, formulas, text
- Good for business document testing

### Multi-Page Document
```typescript
import { multiPageChunks } from '@/features/pdf-preview/examples/mockData'
```
- Three pages with different content
- Tests page navigation and multi-page rendering

### Comprehensive Test
```typescript
import { comprehensiveChunks } from '@/features/pdf-preview/examples/mockData'
```
- All segment types in one document
- Perfect for testing all features

### Edge Cases
```typescript
import { emptyChunks, minimalChunks } from '@/features/pdf-preview/examples/mockData'
```
- Empty chunks for testing error handling
- Minimal data for performance testing

## Mock Data Structure

Each mock data follows this structure:

```typescript
interface PDFPreviewChunk {
  chunk_id: string
  chunk_length: number
  embed: string
  segments: PDFPreviewSegment[]
}

interface PDFPreviewSegment {
  segment_id: string
  bbox: {
    top: number
    left: number
    width: number
    height: number
    page_number: number
  }
  segment_type: 'Title' | 'Text' | 'SectionHeader' | 'List' | 'Table' | 'Formula' | 'Caption' | 'FootNote' | 'PageHeader' | 'PageFooter'
  page_number: number
  page_width: number
  page_height: number
  content: string
  confidence: number
}
```

## Usage Examples

### 1. Basic Implementation

```typescript
import { PDFPreview, PDFPreviewProvider } from '@/features/pdf-preview'
import { simpleMockChunks } from './mockData'

export function BasicPDFViewer() {
  const handleSegmentHover = (segmentId: string | null) => {
    console.log('Hovered:', segmentId)
  }

  const handleSegmentClick = (segment: any) => {
    console.log('Clicked:', segment)
  }

  return (
    <PDFPreviewProvider>
      <PDFPreview
        url="/sample.pdf"
        chunks={simpleMockChunks}
        onSegmentHover={handleSegmentHover}
        onSegmentClick={handleSegmentClick}
      />
    </PDFPreviewProvider>
  )
}
```

### 2. With Custom Configuration

```typescript
import { PDFPreview, PDFPreviewProvider } from '@/features/pdf-preview'
import { researchPaperChunks } from './mockData'
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
}

export function ConfiguredPDFViewer() {
  return (
    <PDFPreviewProvider>
      <PDFPreview
        url="/research-paper.pdf"
        chunks={researchPaperChunks}
        config={config}
        onSegmentHover={(id) => console.log('Hovered:', id)}
        onSegmentClick={(segment) => console.log('Clicked:', segment)}
      />
    </PDFPreviewProvider>
  )
}
```

### 3. With State Management

```typescript
import { useState } from 'react'
import { PDFPreview, PDFPreviewProvider } from '@/features/pdf-preview'
import { businessDocumentChunks } from './mockData'

export function PDFViewerWithState() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null)

  return (
    <div>
      <div className="controls">
        <p>Selected: {selectedSegment || 'None'}</p>
        <p>Hovered: {hoveredSegment || 'None'}</p>
      </div>
      
      <PDFPreviewProvider>
        <PDFPreview
          url="/business-report.pdf"
          chunks={businessDocumentChunks}
          onSegmentHover={setHoveredSegment}
          onSegmentClick={(segment) => setSelectedSegment(segment.segment_id)}
        />
      </PDFPreviewProvider>
    </div>
  )
}
```

### 4. Testing Different Document Types

```typescript
import { PDFPreview, PDFPreviewProvider } from '@/features/pdf-preview'
import { mockData } from './mockData'

export function DocumentTypeTester() {
  const [documentType, setDocumentType] = useState('simple')
  
  const getChunks = () => {
    switch (documentType) {
      case 'research': return mockData.research
      case 'business': return mockData.business
      case 'multiPage': return mockData.multiPage
      case 'comprehensive': return mockData.comprehensive
      default: return mockData.simple
    }
  }

  return (
    <div>
      <select value={documentType} onChange={(e) => setDocumentType(e.target.value)}>
        <option value="simple">Simple</option>
        <option value="research">Research Paper</option>
        <option value="business">Business Document</option>
        <option value="multiPage">Multi-Page</option>
        <option value="comprehensive">Comprehensive</option>
      </select>
      
      <PDFPreviewProvider>
        <PDFPreview
          url="/test-document.pdf"
          chunks={getChunks()}
          onSegmentHover={(id) => console.log('Hovered:', id)}
          onSegmentClick={(segment) => console.log('Clicked:', segment)}
        />
      </PDFPreviewProvider>
    </div>
  )
}
```

## Testing Scenarios

### 1. Basic Functionality
- Use `simpleMockChunks` to test basic rendering
- Verify hover and click events work
- Check that bounding boxes display correctly

### 2. Multi-Page Documents
- Use `multiPageChunks` to test page navigation
- Verify scroll behavior between pages
- Test segment visibility across pages

### 3. All Segment Types
- Use `comprehensiveChunks` to test all segment types
- Verify different colors for each type
- Test hover states for each segment type

### 4. Performance Testing
- Use `minimalChunks` for performance testing
- Use `emptyChunks` to test error handling
- Test with large documents

### 5. Business Documents
- Use `businessDocumentChunks` for financial data
- Test table and formula rendering
- Verify complex document structures

## Integration Tips

1. **Start Simple**: Begin with `simpleMockChunks` to verify basic functionality
2. **Test Events**: Always implement hover and click handlers for debugging
3. **Use Console**: Check browser console for event logs and errors
4. **Test Different Types**: Try various mock data to test different scenarios
5. **Customize Colors**: Use custom configurations to match your app's design

## Troubleshooting

### Common Issues

1. **No bounding boxes showing**: Check that chunks have valid bbox coordinates
2. **Type errors**: Ensure all required properties are provided in segment structure
3. **Performance issues**: Use `showAllBoundingBoxes: false` for large documents
4. **PDF not loading**: Ensure PDF URL is accessible and file exists

### Debug Steps

1. Check browser console for errors
2. Verify chunk structure matches expected format
3. Test with simple mock data first
4. Ensure all dependencies are installed

## Next Steps

- Read the main [README.md](../README.md) for complete API documentation
- Check the [UsageGuide.md](./UsageGuide.md) for detailed examples
- Explore the component source code for advanced customization
- Integrate with your existing state management system 