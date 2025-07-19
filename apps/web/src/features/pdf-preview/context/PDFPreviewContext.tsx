'use client'

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from 'react'
import { PDFPreviewContextType, PDFPreviewContextState } from '../types'

/**
 * Initial state for PDF preview context
 */
const initialState: PDFPreviewContextState = {
  hoveredSegmentId: null,
  showAllBoundingBoxes: false,
  documentMetadata: {
    numPages: null,
    isLoading: true,
    error: false,
  },
  pageDimensions: {
    width: 0,
    displayWidth: 0,
  },
}

/**
 * Actions for PDF preview state management
 */
type PDFPreviewAction =
  | { type: 'SET_HOVERED_SEGMENT'; payload: string | null }
  | { type: 'SET_SHOW_ALL_BOUNDING_BOXES'; payload: boolean }
  | {
      type: 'SET_DOCUMENT_METADATA'
      payload: Partial<PDFPreviewContextState['documentMetadata']>
    }
  | {
      type: 'SET_PAGE_DIMENSIONS'
      payload: Partial<PDFPreviewContextState['pageDimensions']>
    }

/**
 * Reducer for PDF preview state
 */
function pdfPreviewReducer(
  state: PDFPreviewContextState,
  action: PDFPreviewAction
): PDFPreviewContextState {
  switch (action.type) {
    case 'SET_HOVERED_SEGMENT':
      return {
        ...state,
        hoveredSegmentId: action.payload,
      }
    case 'SET_SHOW_ALL_BOUNDING_BOXES':
      return {
        ...state,
        showAllBoundingBoxes: action.payload,
      }
    case 'SET_DOCUMENT_METADATA':
      return {
        ...state,
        documentMetadata: {
          ...state.documentMetadata,
          ...action.payload,
        },
      }
    case 'SET_PAGE_DIMENSIONS':
      return {
        ...state,
        pageDimensions: {
          ...state.pageDimensions,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

/**
 * PDF Preview Context
 */
const PDFPreviewContext = createContext<PDFPreviewContextType | null>(null)

/**
 * Props for PDF Preview Provider
 */
interface PDFPreviewProviderProps {
  children: ReactNode
  initialShowAllBoundingBoxes?: boolean
}

/**
 * PDF Preview Provider component
 */
export function PDFPreviewProvider({
  children,
  initialShowAllBoundingBoxes = false,
}: PDFPreviewProviderProps) {
  const [state, dispatch] = useReducer(pdfPreviewReducer, {
    ...initialState,
    showAllBoundingBoxes: initialShowAllBoundingBoxes,
  })

  const setHoveredSegmentId = useCallback((id: string | null) => {
    dispatch({ type: 'SET_HOVERED_SEGMENT', payload: id })
  }, [])

  const setShowAllBoundingBoxes = useCallback((show: boolean) => {
    dispatch({ type: 'SET_SHOW_ALL_BOUNDING_BOXES', payload: show })
  }, [])

  const setDocumentMetadata = useCallback(
    (metadata: Partial<PDFPreviewContextState['documentMetadata']>) => {
      dispatch({ type: 'SET_DOCUMENT_METADATA', payload: metadata })
    },
    []
  )

  const setPageDimensions = useCallback(
    (dimensions: Partial<PDFPreviewContextState['pageDimensions']>) => {
      dispatch({ type: 'SET_PAGE_DIMENSIONS', payload: dimensions })
    },
    []
  )

  const contextValue: PDFPreviewContextType = {
    ...state,
    setHoveredSegmentId,
    setShowAllBoundingBoxes,
    setDocumentMetadata,
    setPageDimensions,
  }

  return (
    <PDFPreviewContext.Provider value={contextValue}>
      {children}
    </PDFPreviewContext.Provider>
  )
}

/**
 * Hook to use PDF Preview context
 */
export function usePDFPreviewContext(): PDFPreviewContextType {
  const context = useContext(PDFPreviewContext)
  if (!context) {
    throw new Error(
      'usePDFPreviewContext must be used within a PDFPreviewProvider'
    )
  }
  return context
}
