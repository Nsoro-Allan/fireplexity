'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const [isAnimating, setIsAnimating] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/50 backdrop-blur-sm">
                <div className="h-4 w-4 animate-pulse rounded-full bg-muted" />
            </div>
        )
    }

    const isDark = theme === 'dark'

    const handleToggle = () => {
        setIsAnimating(true)
        setTheme(isDark ? 'light' : 'dark')

        // Reset animation state after animation completes
        setTimeout(() => {
            setIsAnimating(false)
        }, 600)
    }

    return (
        <button
            onClick={handleToggle}
            className="group relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-accent hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            disabled={isAnimating}
        >
            {/* Background glow effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-400/20 to-blue-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Animated background for theme switch */}
            <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${isDark
                    ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50'
                    : 'bg-gradient-to-br from-orange-100/50 to-yellow-100/50'
                }`} />

            {/* Icon container with smooth rotation and scaling */}
            <div className={`relative flex items-center justify-center ${isAnimating ? 'animate-theme-switch' : ''
                }`}>
                <Sun
                    className={`absolute h-4 w-4 text-orange-500 transition-all duration-500 ease-out ${isDark
                            ? 'rotate-90 scale-0 opacity-0'
                            : 'rotate-0 scale-100 opacity-100'
                        }`}
                />
                <Moon
                    className={`absolute h-4 w-4 text-blue-400 transition-all duration-500 ease-out ${isDark
                            ? 'rotate-0 scale-100 opacity-100'
                            : '-rotate-90 scale-0 opacity-0'
                        }`}
                />
            </div>

            {/* Ripple effect on click */}
            <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-200 group-active:opacity-100">
                <div className="absolute inset-0 animate-ping rounded-lg bg-primary/20" />
            </div>

            {/* Subtle border highlight */}
            <div className={`absolute inset-0 rounded-lg border transition-all duration-300 ${isDark
                    ? 'border-blue-400/20 group-hover:border-blue-400/40'
                    : 'border-orange-400/20 group-hover:border-orange-400/40'
                }`} />
        </button>
    )
}