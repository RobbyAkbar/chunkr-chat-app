'use client'

import { useState } from 'react'
import { PDFPreviewSegment } from '@/features/pdf-preview/types'

interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  references?: PDFPreviewSegment[]
}

interface ChatInterfaceProps {
  onReferenceClick: (segment: PDFPreviewSegment) => void
  className?: string
  highlightedSegmentId?: string | null
}

export function ChatInterface({ onReferenceClick, className = '', highlightedSegmentId }: ChatInterfaceProps) {
  const [messages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'user',
      content: 'What is the main topic of this document?',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      type: 'assistant',
      content: 'Based on the document, the main topic is "Advanced Machine Learning Techniques for Document Analysis". This is clearly stated in the title section.',
      timestamp: new Date(Date.now() - 240000),
      references: [
        {
          segment_id: 'title-1',
          bbox: { top: 50, left: 100, width: 400, height: 30, page_number: 1 },
          segment_type: 'Title',
          page_number: 1,
          page_width: 612,
          page_height: 792,
          content: 'Advanced Machine Learning Techniques for Document Analysis',
          confidence: 0.95
        }
      ]
    },
    {
      id: '3',
      type: 'user',
      content: 'Who are the authors?',
      timestamp: new Date(Date.now() - 180000),
    },
    {
      id: '4',
      type: 'assistant',
      content: 'The authors are Dr. Jane Smith and Dr. John Doe. This information is found in the author section of the document.',
      timestamp: new Date(Date.now() - 120000),
      references: [
        {
          segment_id: 'author-1',
          bbox: { top: 90, left: 100, width: 300, height: 20, page_number: 1 },
          segment_type: 'Text',
          page_number: 1,
          page_width: 612,
          page_height: 792,
          content: 'Dr. Jane Smith, Dr. John Doe',
          confidence: 0.88
        }
      ]
    },
    {
      id: '5',
      type: 'user',
      content: 'What are the key technologies mentioned?',
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: '6',
      type: 'assistant',
      content: 'The document mentions several key technologies including Natural Language Processing, Computer Vision, and Machine Learning. These are listed in the methodology section.',
      timestamp: new Date(Date.now() - 30000),
      references: [
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
  ])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-900">Document Chat</h2>
        <p className="text-sm text-gray-600">Ask questions about the document</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="text-sm">{message.content}</div>
              
              {/* References */}
              {message.references && message.references.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-1">References:</div>
                  <div className="space-y-1">
                                         {message.references.map((reference, index) => (
                       <button
                         key={reference.segment_id}
                         onClick={() => onReferenceClick(reference)}
                         className={`block text-xs underline cursor-pointer text-left transition-colors ${
                           highlightedSegmentId === reference.segment_id
                             ? 'text-blue-800 font-semibold bg-blue-100 px-2 py-1 rounded'
                             : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-2 py-1 rounded'
                         }`}
                         title="Click to highlight this section in the PDF"
                       >
                         {reference.content?.substring(0, 50)}
                         {reference.content && reference.content.length > 50 ? '...' : ''}
                       </button>
                     ))}
                  </div>
                </div>
              )}
              
              <div className={`text-xs mt-1 ${
                message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Ask a question about the document..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Send
          </button>
        </div>
      </div>
    </div>
  )
} 