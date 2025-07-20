/**
 * PDF Preview Examples - Index
 * 
 * This file exports all examples and mock data for easy importing.
 */

// Export mock data
export * from './mockData'
export { default as mockData } from './mockData'

// Export examples (if they exist)
export { default as BasicExample } from './BasicExample'

// Re-export main components for convenience
export { PDFPreview, PDFPreviewProvider, PDFPreviewAdapter } from '../index'
export type { PDFPreviewChunk, PDFPreviewConfig } from '../types' 