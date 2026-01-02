'use client'

import { CircularMenu, MenuItem } from '@w3rk17/circular-menu-next'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import { Mail, Monitor, Moon, Sun } from 'lucide-react'
import Image from 'next/image'

export function MobileNav() {
    const { resolvedTheme, setTheme } = useTheme()
    const router = useRouter()

    const menuItems: MenuItem[] = [
        {
            id: 'home',
            label: '',
            icon: (
                <div className="flex items-center gap-2">
                    <Image
                        src="/logo/SOURCE-pictogram.svg"
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-full flex-shrink-0 invert dark:invert-0"
                    />
                    <Image
                        src="/logo/SOURCE-wordmark.svg"
                        alt="SOURCE"
                        width={80}
                        height={24}
                        className="flex-shrink-0 invert dark:invert-0"
                    />
                </div>
            ),
            onClick: () => router.push('/')
        },
        {
            id: 'contact',
            label: 'Contact',
            icon: <Mail className="h-5 w-5" />,
            onClick: () => router.push('/#contact')
        },
        {
            id: 'theme-light',
            label: 'Light',
            icon: <Sun className="h-5 w-5" />,
            onClick: () => setTheme('light')
        },
        {
            id: 'theme-dark',
            label: 'Dark',
            icon: <Moon className="h-5 w-5" />,
            onClick: () => setTheme('dark')
        },
        {
            id: 'theme-system',
            label: 'System',
            icon: <Monitor className="h-5 w-5" />,
            onClick: () => setTheme('system')
        }
    ]

    return (
        <CircularMenu
            items={menuItems}
            position="top-right"
            hideOnScroll={true}
            darkMode={resolvedTheme === 'dark'}
            dotSize={12}
            expandedSize={42.5}
        />
    )
}
