/**
 * Mock data for PDF Preview component testing
 * 
 * This file contains various examples of chunk structures that can be used
 * to test the PDF Preview component with different document types.
 */

import type { PDFPreviewChunk } from '../types'

/**
 * Simple single-chunk example with basic segment types
 */
export const simpleMockChunks: PDFPreviewChunk[] = [
  {
    chunk_id: 'simple-chunk-1',
    chunk_length: 100,
    embed: 'Simple document content',
    segments: [
      {
        segment_id: 'title-1',
        bbox: { top: 50, left: 100, width: 400, height: 30, page_number: 1 },
        segment_type: 'Title',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Sample Document Title',
        confidence: 0.95
      },
      {
        segment_id: 'text-1',
        bbox: { top: 100, left: 50, width: 512, height: 100, page_number: 1 },
        segment_type: 'Text',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'This is a sample text segment for testing the PDF Preview component.',
        confidence: 0.90
      }
    ]
  }
]

/**
 * Research paper example with multiple segment types
 */
export const researchPaperChunks: PDFPreviewChunk[] = [
  {
    chunk_id: 'research-chunk-1',
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
    chunk_id: 'research-chunk-2',
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
    chunk_id: 'research-chunk-3',
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

/**
 * Business document example with financial data
 */
export const businessDocumentChunks: PDFPreviewChunk[] = [
  {
    chunk_id: 'business-chunk-1',
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
        segment_id: 'title-1',
        bbox: { top: 70, left: 100, width: 412, height: 30, page_number: 1 },
        segment_type: 'Title',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Quarterly Financial Performance',
        confidence: 0.95
      },
      {
        segment_id: 'table-1',
        bbox: { top: 120, left: 50, width: 512, height: 200, page_number: 1 },
        segment_type: 'Table',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Revenue: $1.2M\nExpenses: $800K\nProfit: $400K\nGrowth: 15%',
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
      },
      {
        segment_id: 'text-1',
        bbox: { top: 420, left: 50, width: 512, height: 100, page_number: 1 },
        segment_type: 'Text',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'The company achieved strong performance in Q4 with significant revenue growth...',
        confidence: 0.89
      }
    ]
  }
]

/**
 * Multi-page document example
 */
export const multiPageChunks: PDFPreviewChunk[] = [
  {
    chunk_id: 'page1-chunk-1',
    chunk_length: 100,
    embed: 'First page content',
    segments: [
      {
        segment_id: 'title-1',
        bbox: { top: 50, left: 100, width: 400, height: 30, page_number: 1 },
        segment_type: 'Title',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Multi-Page Document',
        confidence: 0.95
      },
      {
        segment_id: 'text-1',
        bbox: { top: 100, left: 50, width: 512, height: 150, page_number: 1 },
        segment_type: 'Text',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'This is the content of the first page...',
        confidence: 0.90
      }
    ]
  },
  {
    chunk_id: 'page2-chunk-1',
    chunk_length: 120,
    embed: 'Second page content',
    segments: [
      {
        segment_id: 'section-1',
        bbox: { top: 50, left: 50, width: 200, height: 25, page_number: 2 },
        segment_type: 'SectionHeader',
        page_number: 2,
        page_width: 612,
        page_height: 792,
        content: 'Chapter 2: Advanced Topics',
        confidence: 0.94
      },
      {
        segment_id: 'text-2',
        bbox: { top: 100, left: 50, width: 512, height: 200, page_number: 2 },
        segment_type: 'Text',
        page_number: 2,
        page_width: 612,
        page_height: 792,
        content: 'This is the content of the second page with more detailed information...',
        confidence: 0.88
      },
      {
        segment_id: 'list-1',
        bbox: { top: 320, left: 70, width: 492, height: 80, page_number: 2 },
        segment_type: 'List',
        page_number: 2,
        page_width: 612,
        page_height: 792,
        content: '• Key Point 1\n• Key Point 2\n• Key Point 3\n• Key Point 4',
        confidence: 0.91
      }
    ]
  },
  {
    chunk_id: 'page3-chunk-1',
    chunk_length: 80,
    embed: 'Third page content',
    segments: [
      {
        segment_id: 'footer-1',
        bbox: { top: 750, left: 50, width: 512, height: 20, page_number: 3 },
        segment_type: 'PageFooter',
        page_number: 3,
        page_width: 612,
        page_height: 792,
        content: 'Page 3 of 3',
        confidence: 0.98
      },
      {
        segment_id: 'text-3',
        bbox: { top: 100, left: 50, width: 512, height: 300, page_number: 3 },
        segment_type: 'Text',
        page_number: 3,
        page_width: 612,
        page_height: 792,
        content: 'This is the final page of the document with concluding remarks...',
        confidence: 0.85
      }
    ]
  }
]

/**
 * Document with all segment types for comprehensive testing
 */
export const comprehensiveChunks: PDFPreviewChunk[] = [
  {
    chunk_id: 'comprehensive-chunk-1',
    chunk_length: 300,
    embed: 'Comprehensive document with all segment types',
    segments: [
      {
        segment_id: 'title-1',
        bbox: { top: 30, left: 100, width: 400, height: 30, page_number: 1 },
        segment_type: 'Title',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Comprehensive Document Test',
        confidence: 0.95
      },
      {
        segment_id: 'header-1',
        bbox: { top: 70, left: 50, width: 512, height: 20, page_number: 1 },
        segment_type: 'PageHeader',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Document Header',
        confidence: 0.90
      },
      {
        segment_id: 'section-1',
        bbox: { top: 110, left: 50, width: 200, height: 25, page_number: 1 },
        segment_type: 'SectionHeader',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: '1. Introduction',
        confidence: 0.94
      },
      {
        segment_id: 'text-1',
        bbox: { top: 150, left: 50, width: 512, height: 80, page_number: 1 },
        segment_type: 'Text',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'This is a comprehensive test document that includes all possible segment types...',
        confidence: 0.89
      },
      {
        segment_id: 'list-1',
        bbox: { top: 250, left: 70, width: 492, height: 60, page_number: 1 },
        segment_type: 'List',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: '• First item\n• Second item\n• Third item',
        confidence: 0.91
      },
      {
        segment_id: 'table-1',
        bbox: { top: 330, left: 50, width: 512, height: 120, page_number: 1 },
        segment_type: 'Table',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Data Table\nColumn 1 | Column 2\nValue 1 | Value 2',
        confidence: 0.87
      },
      {
        segment_id: 'formula-1',
        bbox: { top: 470, left: 100, width: 412, height: 40, page_number: 1 },
        segment_type: 'Formula',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'E = mc²',
        confidence: 0.96
      },
      {
        segment_id: 'caption-1',
        bbox: { top: 520, left: 50, width: 512, height: 20, page_number: 1 },
        segment_type: 'Caption',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Figure 1: Sample figure caption',
        confidence: 0.85
      },
      {
        segment_id: 'footnote-1',
        bbox: { top: 600, left: 50, width: 512, height: 30, page_number: 1 },
        segment_type: 'FootNote',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: '¹ This is a sample footnote',
        confidence: 0.88
      },
      {
        segment_id: 'footer-1',
        bbox: { top: 750, left: 50, width: 512, height: 20, page_number: 1 },
        segment_type: 'PageFooter',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Page 1 of 1',
        confidence: 0.98
      }
    ]
  }
]

/**
 * Empty chunks for testing edge cases
 */
export const emptyChunks: PDFPreviewChunk[] = []

/**
 * Chunks with minimal data for testing
 */
export const minimalChunks: PDFPreviewChunk[] = [
  {
    chunk_id: 'minimal-chunk-1',
    chunk_length: 50,
    embed: 'Minimal content',
    segments: [
      {
        segment_id: 'minimal-1',
        bbox: { top: 100, left: 100, width: 200, height: 50, page_number: 1 },
        segment_type: 'Text',
        page_number: 1,
        page_width: 612,
        page_height: 792,
        content: 'Minimal test content',
        confidence: 0.90
      }
    ]
  }
]

/**
 * Export all mock data for easy importing
 */
export const mockData = {
  simple: simpleMockChunks,
  research: researchPaperChunks,
  business: businessDocumentChunks,
  multiPage: multiPageChunks,
  comprehensive: comprehensiveChunks,
  empty: emptyChunks,
  minimal: minimalChunks
}

export default mockData 