/**
 * Basic Example for PDF Preview Component
 * 
 * This example shows the simplest way to use the PDF Preview component
 * with mock data and basic event handling.
 */

import { PDFPreview, PDFPreviewProvider } from '../index'
import { simpleMockChunks } from './mockData'

export const BasicExample = () => {
  // Simple event handlers
  const handleSegmentHover = (segmentId: string | null) => {
    if (segmentId) {
      console.log('Hovered segment:', segmentId)
    }
  }

  const handleSegmentClick = (segment: any) => {
    console.log('Clicked segment:', segment)
  }

  const handleDocumentLoad = (numPages: number) => {
    console.log('Document loaded with', numPages, 'pages')
  }

  const handleDocumentError = (error: Error) => {
    console.error('Document failed to load:', error)
  }

  return (
    <div className="basic-example">
      <h2>Basic PDF Preview Example</h2>
      <p>This example shows basic usage with simple mock data.</p>
      
      <div className="pdf-container" style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
        <PDFPreviewProvider>
          <PDFPreview
            url="/sample-document.pdf"
            chunks={simpleMockChunks}
            onSegmentHover={handleSegmentHover}
            onSegmentClick={handleSegmentClick}
            onDocumentLoad={handleDocumentLoad}
            onDocumentError={handleDocumentError}
            className="w-full"
          />
        </PDFPreviewProvider>
      </div>
      
      <div className="info" style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <h3>Instructions:</h3>
        <ul>
          <li>Hover over the bounding boxes to see segment information</li>
          <li>Click on segments to select them</li>
          <li>Check the browser console for event logs</li>
        </ul>
      </div>
    </div>
  )
}

export default BasicExample 