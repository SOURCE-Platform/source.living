"use client"

import * as React from "react"
import { CircularMenuBackground } from "./CircularMenuBackground"

export interface MenuItem {
    id: string
    label: string
    icon: React.ReactNode | null
    onClick: () => void
    disabled?: boolean
}

export interface CircularMenuProps {
    /** Array of menu items to display */
    items: MenuItem[]
    /** Position of the menu button */
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    /** Size of the small dot when closed (in pixels) */
    dotSize?: number
    /** Size of the expanded circle (in rem) */
    expandedSize?: number
    /** Show the menu on scroll up behavior */
    hideOnScroll?: boolean
    /** Custom trigger button content */
    triggerContent?: React.ReactNode
    /** Custom styling classes */
    className?: string
    /** Dark mode theme */
    darkMode?: boolean
}

export function CircularMenu({
    items,
    position = 'top-left',
    dotSize = 12,
    expandedSize = 42.5,
    hideOnScroll = true,
    triggerContent,
    className = '',
    darkMode = false
}: CircularMenuProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const [opacity, setOpacity] = React.useState(1)
    const [forceVisible, setForceVisible] = React.useState(false)
    const [menuMounted, setMenuMounted] = React.useState(false)
    const lastYRef = React.useRef(0)
    React.useEffect(() => {
        setMounted(true)
    }, [])

    React.useEffect(() => {
        if (!hideOnScroll) return

        const onScroll = () => {
            // When menu is open, keep the dot fully visible and ignore scroll fade
            if (isOpen) {
                setOpacity(1)
                lastYRef.current = window.scrollY || 0
                return
            }

            const y = window.scrollY || 0
            const lastY = lastYRef.current
            const delta = y - lastY

            if (delta < 0) {
                setForceVisible(true)
                setOpacity(1)
            } else if (delta > 0) {
                if (forceVisible) setForceVisible(false)
                const next = Math.max(0, Math.min(1, 1 - y / 500))
                setOpacity(next)
            } else if (!forceVisible) {
                const next = Math.max(0, Math.min(1, 1 - y / 500))
                setOpacity(next)
            }

            lastYRef.current = y
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [forceVisible, isOpen, hideOnScroll])

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            // Check if click is outside both the toggle button and menu
            if (!target.closest('.circular-menu-container') && !target.closest('.circular-menu-items')) {
                setIsOpen(false)
            }
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('keydown', handleKeyDown)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    const getPositionStyles = (isExpanded = false) => {
        if (isExpanded) {
            // Position for expanded circle (can be off-screen)
            const expandedPositions = {
                'top-left': { left: '40px', top: '40px' },
                'top-right': { right: '-650px', top: '100px' },
                'bottom-left': { left: '40px', bottom: '40px' },
                'bottom-right': { right: '-250px', bottom: '40px' }
            }
            return expandedPositions[position]
        } else {
            // Position for small dot (visible on screen)
            const dotPositions = {
                'top-left': { left: '40px', top: '40px' },
                'top-right': { right: '40px', top: '40px' },
                'bottom-left': { left: '40px', bottom: '40px' },
                'bottom-right': { right: '40px', bottom: '40px' }
            }
            return dotPositions[position]
        }
    }

    const getTransformStyle = (isExpanded = false) => {
        if (position.includes('right')) {
            return isExpanded ? 'translate(-50%, -50%)' : 'translate(-50%, -50%)'
        } else if (position.includes('left')) {
            return 'translate(-50%, -50%)'
        }
        return 'translate(-50%, -50%)'
    }

    const getContainerPositionStyles = () => {
        // Center the 40x40px hover area around the dot (dot is at 40px from edges, centered)
        // So hover area needs to be at 40px from edges minus half its size (20px) = 20px from edges
        const positions = {
            'top-left': { left: '20px', top: '20px' },
            'top-right': { right: '40px', top: '20px' },
            'bottom-left': { left: '20px', bottom: '20px' },
            'bottom-right': { right: '20px', bottom: '20px' }
        }
        return positions[position]
    }

    if (!mounted) {
        return (
            <div
                className={`w-12 h-12 rounded-full bg-white dark:bg-gray-900 animate-pulse ${className}`}
                style={{
                    position: 'fixed',
                    ...getPositionStyles(false),
                    transform: getTransformStyle(false),
                    zIndex: 9999
                }}
            />
        )
    }

    return (
        <>
            {/* Hover area and toggle button */}
            <div
                className={`fixed w-10 h-10 z-[9999] cursor-pointer group circular-menu-container ${className}`}
                style={{
                    overflow: 'visible',
                    ...getContainerPositionStyles()
                }}
                onClick={() => {
                    setIsOpen((prev) => {
                        const next = !prev
                        if (next) setMenuMounted(true)
                        return next
                    })
                }}
            >
                {/* Single circle that scales from small dot to large background */}
                <div
                    className={`absolute rounded-full transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center group
            ${isOpen ? `w-[${expandedSize}rem] h-[${expandedSize}rem]` : `w-[${dotSize}px] h-[${dotSize}px]`}
            ${!isOpen ? 'group-hover:scale-125 group-active:scale-150' : ''}
            ${isOpen ? 'shadow-none' : 'shadow-lg'}`}
                    style={{
                        position: 'fixed',
                        ...getPositionStyles(isOpen),
                        transform: getTransformStyle(isOpen),
                        transformOrigin: 'center center',
                        willChange: 'width, height',
                        overflow: 'visible',
                        pointerEvents: 'auto',
                        minWidth: `${dotSize}px`,
                        minHeight: `${dotSize}px`,
                        background: isOpen
                            ? 'transparent'
                            : (darkMode ? '#ffffff' : '#000000'),
                        opacity: isOpen ? 1 : opacity,
                        width: isOpen ? `${expandedSize}rem` : `${dotSize}px`,
                        height: isOpen ? `${expandedSize}rem` : `${dotSize}px`,
                    }}
                >
                    {/* Inner circle for content */}
                    {isOpen && (
                        <div
                            className="absolute inset-[1px] rounded-full bg-transparent"
                            style={{
                                background: 'transparent',
                            }}
                        />
                    )}
                    {/* Three.js background with tunnel animation */}
                    {isOpen && (
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                            <CircularMenuBackground darkMode={darkMode} isOpen={isOpen} />
                        </div>
                    )}

                    {/* Default trigger content */}
                    {!isOpen && triggerContent && (
                        <div className="flex items-center justify-center w-full h-full relative z-10">
                            {triggerContent}
                        </div>
                    )}
                </div>
            </div>

            {/* Menu Items - Separate from circle with fade in/out */}
            {menuMounted && (
                <div
                    className={`fixed z-[10001] circular-menu-items transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    style={{
                        ...getContainerPositionStyles(),
                        right: position.includes('right') ? '0' : 'auto',
                        left: position.includes('left') ? '0' : 'auto',
                        top: position.includes('top') ? '0' : 'auto',
                        bottom: position.includes('bottom') ? '0' : 'auto'
                    }}
                    onTransitionEnd={() => {
                        if (!isOpen) setMenuMounted(false)
                    }}
                >
                    <div className={`flex flex-col space-y-2 p-2 ${position.includes('left') ? 'items-start' : 'items-end'}`}>
                        {items.map((item) => {
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={(e) => {
                                        if (item.disabled) return
                                        e.stopPropagation()
                                        item.onClick()
                                        setIsOpen(false)
                                    }}
                                    className={`group flex items-center text-lg transition-colors duration-200 px-4 py-3 pr-6 rounded-[32px] 
                    ${item.disabled ? 'cursor-default' : 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/5'}
                    ${darkMode ? 'text-white' : 'text-black'}
                    ${item.disabled ? '' : ''} 
                    justify-end`}
                                >
                                    {item.icon ? (
                                        <div className="flex-shrink-0">
                                            {item.icon}
                                        </div>
                                    ) : (
                                        <span className="link-underline-animate">
                                            {item.label}
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
