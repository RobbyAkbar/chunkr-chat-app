'use client'

import React from 'react'
import { simpleMockChunks } from './mockData'

/**
 * Simple demo component to show bounding boxes without complex PDF rendering
 * This helps debug the bounding box positioning and visibility
 */
export const SimpleBoundingBoxDemo = () => {
  const chunks = simpleMockChunks

  return (
    <div className="p-6 bg-white border-2 border-gray-300 rounded-lg min-h-[400px] relative text-black">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Simple Bounding Box Demo</h2>
      
      {/* Mock PDF content */}
      <div className="relative bg-gray-50 p-8 rounded border min-h-[300px] text-black">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Sample PDF Document</h1>
        </div>
        <div className="text-gray-700">
          <p>This is a sample text segment for testing the PDF Preview component.</p>
        </div>
        
        {/* Bounding Boxes */}
        {chunks[0].segments.map((segment) => (
          <div
            key={segment.segment_id}
            className="absolute border-2 border-red-500 bg-red-100 bg-opacity-20 cursor-pointer hover:bg-opacity-40 transition-all"
            style={{
              left: `${segment.bbox.left}px`,
              top: `${segment.bbox.top}px`,
              width: `${segment.bbox.width}px`,
              height: `${segment.bbox.height}px`,
            }}
            title={`${segment.segment_type}: ${segment.content}`}
          >
            <div className="absolute -top-6 left-0 px-2 py-1 bg-red-500 text-white text-xs rounded">
              {segment.segment_type}
            </div>
          </div>
        ))}
      </div>
      
      {/* Debug Info */}
      <div className="mt-4 p-4 bg-gray-100 rounded text-black">
        <h3 className="font-semibold mb-2 text-gray-900">Debug Info:</h3>
        <p className="text-gray-800">Total segments: {chunks[0].segments.length}</p>
        <p className="text-gray-800">Segment types: {chunks[0].segments.map(s => s.segment_type).join(', ')}</p>
        <div className="mt-2">
          {chunks[0].segments.map((segment) => (
            <div key={segment.segment_id} className="text-sm text-gray-800">
              <strong className="text-gray-900">{segment.segment_type}:</strong> 
              left={segment.bbox.left}, top={segment.bbox.top}, 
              width={segment.bbox.width}, height={segment.bbox.height}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SimpleBoundingBoxDemo 