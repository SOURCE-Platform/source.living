import * as React from 'react'

export interface MenuItem {
    id: string
    label: string
    icon: React.ReactNode | null
    onClick: () => void
    disabled?: boolean
}

export interface CircularMenuProps {
    items: MenuItem[]
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    dotSize?: number
    expandedSize?: number
    hideOnScroll?: boolean
    triggerContent?: React.ReactNode
    className?: string
    darkMode?: boolean
}

export interface CircularMenuBackgroundProps {
    darkMode: boolean
    isOpen: boolean
}
