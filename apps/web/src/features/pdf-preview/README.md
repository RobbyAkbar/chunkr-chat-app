# PDF Preview Feature

A standalone, reusable PDF preview component for handling PDF documents with structured JSON schema chunks and bounding box display.

## Features

- **PDF Document Rendering**: Uses react-pdf for high-quality PDF rendering
- **Responsive Design**: Automatically adapts to container width with debounced resize handling
- **Bounding Box Overlays**: Interactive overlays for document segments from structured JSON schema
- **Scroll Synchronization**: Intelligent scrolling to specific segments and pages
- **Hover Interactions**: Visual feedback and reference handling for document segments
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Context Management**: State management with React Context for complex interactions
- **Backward Compatibility**: Seamless integration with existing applications

## Quick Start

### Basic Usage

```tsx
import { PDFPreview, PDFPreviewProvider } from '@/features/pdf-preview'

function MyComponent() {
  const chunks = [
    // Your structured JSON schema chunks
  ]

  return (
    <PDFPreviewProvider>
      <PDFPreview
        url="/path/to/document.pdf"
        chunks={chunks}
        onSegmentHover={(segmentId) => console.log('Hovered:', segmentId)}
        onSegmentClick={(segment) => console.log('Clicked:', segment)}
      />
    </PDFPreviewProvider>
  )
}
```

### With Existing Types (Adapter)

```tsx
import { PDFPreviewAdapter } from '@/features/pdf-preview'
import { Chunk } from '@/client'

function ExistingComponent({ url, chunks }: { url: string; chunks: Chunk[] }) {
  return (
    <PDFPreviewAdapter
      url={url}
      chunks={chunks}
      showAllBoundingBoxes={false}
    />
  )
}
```

## API Reference

### Components

#### `PDFPreview`

Main PDF preview component with full control over configuration.

**Props:**
- `url` (string): PDF document URL or file path
- `chunks` (PDFPreviewChunk[]): Document chunks with structured JSON schema
- `config?` (PDFPreviewConfig): Configuration options
- `onSegmentHover?` (function): Callback when segment is hovered
- `onSegmentClick?` (function): Callback when segment is clicked
- `onDocumentLoad?` (function): Callback when PDF loads successfully
- `onDocumentError?` (function): Callback when PDF fails to load
- `className?` (string): Additional CSS classes

#### `PDFPreviewAdapter`

Adapter component for backward compatibility with existing types.

**Props:**
- `url` (string): PDF document URL or file path
- `chunks` (Chunk[]): Original API chunks
- `showAllBoundingBoxes?` (boolean): Show all bounding boxes by default
- Additional props same as PDFPreview

#### `PDFPreviewProvider`

Context provider for state management.

**Props:**
- `children` (ReactNode): Child components
- `initialShowAllBoundingBoxes?` (boolean): Initial state for showing all bounding boxes

### Hooks

#### `usePDFPreviewContext()`

Access the PDF preview context state and actions.

**Returns:**
- `hoveredSegmentId`: Currently hovered segment ID
- `showAllBoundingBoxes`: Whether to show all bounding boxes
- `documentMetadata`: PDF document information
- `pageDimensions`: Current page width and display width
- `setHoveredSegmentId`: Function to set hovered segment
- `setShowAllBoundingBoxes`: Function to toggle bounding box display
- `setDocumentMetadata`: Function to update document metadata
- `setPageDimensions`: Function to update page dimensions

#### `usePDFPreviewScroll(props)`

Manage scroll behavior and page navigation.

**Props:**
- `bboxes`: Array of processed bounding box data
- `scrollContainerRef`: Reference to scrollable container
- `pageRefs`: References to page elements
- `scrollDelay?`: Scroll delay in milliseconds

**Returns:**
- `scrollToPage`: Function to scroll to specific page

#### `usePDFPreviewBoundingBoxes(props)`

Process and filter bounding boxes from chunks.

**Props:**
- `chunks`: Array of document chunks

**Returns:**
- `allBoundingBoxes`: All processed bounding boxes
- `visibleBoundingBoxes`: Currently visible bounding boxes
- `getBoundingBoxesForPage`: Function to get bounding boxes for specific page
- `findBoundingBoxById`: Function to find bounding box by segment ID

### Types

#### `PDFPreviewChunk`

Document chunk containing one or more segments.

```typescript
interface PDFPreviewChunk {
  chunk_id?: string
  chunk_length: number
  embed?: string | null
  segments: PDFPreviewSegment[]
}
```

#### `PDFPreviewSegment`

Document segment with content and positioning information.

```typescript
interface PDFPreviewSegment {
  segment_id: string
  bbox: PDFPreviewBoundingBox
  segment_type: PDFPreviewSegmentType
  page_number: number
  page_width: number
  page_height: number
  content?: string
  html?: string
  markdown?: string
  llm?: string | null
  confidence?: number | null
  image?: string | null
}
```

#### `PDFPreviewBoundingBox`

Bounding box coordinates for document elements.

```typescript
interface PDFPreviewBoundingBox {
  top: number
  left: number
  width: number
  height: number
  page_number: number
}
```

#### `PDFPreviewConfig`

Configuration options for PDF preview behavior.

```typescript
interface PDFPreviewConfig {
  showAllBoundingBoxes?: boolean
  enableTextLayer?: boolean
  enableAnnotationLayer?: boolean
  segmentColors?: Partial<Record<PDFPreviewSegmentType, {
    border: string
    background: string
    backgroundHover: string
  }>>
  scrollBehavior?: {
    scrollDelay?: number
    smooth?: boolean
  }
}
```

## Customization

### Custom Segment Colors

```tsx
const config: PDFPreviewConfig = {
  segmentColors: {
    Title: {
      border: '#ff0000',
      background: '#ff0000',
      backgroundHover: '#cc0000',
    },
    Text: {
      border: '#00ff00',
      background: '#00ff00',
      backgroundHover: '#00cc00',
    },
  },
}

<PDFPreview url={url} chunks={chunks} config={config} />
```

### Custom Scroll Behavior

```tsx
const config: PDFPreviewConfig = {
  scrollBehavior: {
    scrollDelay: 500, // Delay before scrolling
    smooth: true,     // Smooth scrolling
  },
}
```

## Integration with Existing Applications

The PDF Preview feature is designed to be easily integrated into existing applications:

1. **Use PDFPreviewAdapter** for backward compatibility with existing types
2. **Use PDFPreviewStoreBridge** to sync with existing state management
3. **Gradual Migration** - Replace existing PDF components one by one

### Example Migration

```tsx
// Before
import PDFViewerComponent from '@/components/chat/pdf-viewer'

// After
import { PDFPreviewAdapter } from '@/features/pdf-preview'

// Usage remains the same
<PDFPreviewAdapter url={url} chunks={chunks} />
```

## Architecture

The PDF Preview feature follows a modular architecture:

```
features/pdf-preview/
├── components/          # React components
│   ├── PDFPreview.tsx
│   ├── PDFPreviewAdapter.tsx
│   ├── BoundingBoxDisplay.tsx
│   └── PDFPreviewStoreBridge.tsx
├── context/            # React Context for state management
│   └── PDFPreviewContext.tsx
├── hooks/              # Custom React hooks
│   ├── usePDFPreviewScroll.ts
│   └── usePDFPreviewBoundingBoxes.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── index.ts
└── index.ts           # Main exports
```

## Performance Considerations

- **Memoized Components**: Page components are memoized for optimal rendering
- **Debounced Resizing**: Resize events are debounced to prevent excessive calculations
- **Efficient Filtering**: Bounding boxes are filtered efficiently based on state
- **Lazy Rendering**: Only visible bounding boxes are rendered
- **Context Optimization**: Context updates are optimized to prevent unnecessary re-renders

## Browser Support

The PDF Preview feature supports all modern browsers that support:
- React 18+
- PDF.js (included with react-pdf)
- CSS Grid and Flexbox
- ResizeObserver API