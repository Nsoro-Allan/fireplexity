'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggleAdvanced() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="relative inline-flex h-8 w-16 items-center rounded-full border border-border bg-background/50 backdrop-blur-sm">
                <div className="h-6 w-6 animate-pulse rounded-full bg-muted ml-1" />
            </div>
        )
    }

    const isDark = theme === 'dark'

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="group relative inline-flex h-8 w-16 items-center rounded-full border border-border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {/* Track background */}
            <div className={`absolute inset-0 rounded-full transition-all duration-500 ${isDark
                    ? 'bg-gradient-to-r from-slate-700 to-slate-800'
                    : 'bg-gradient-to-r from-orange-200 to-yellow-200'
                }`} />

            {/* Sliding thumb */}
            <div className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-background shadow-lg transition-all duration-500 ease-out ${isDark ? 'translate-x-9' : 'translate-x-1'
                }`}>
                {/* Icons with crossfade */}
                <Sun
                    className={`absolute h-3 w-3 text-orange-500 transition-all duration-300 ${isDark ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                        }`}
                />
                <Moon
                    className={`absolute h-3 w-3 text-blue-400 transition-all duration-300 ${isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}
                />
            </div>

            {/* Background icons */}
            <div className="absolute inset-0 flex items-center justify-between px-2">
                <Sun className={`h-3 w-3 transition-all duration-300 ${isDark ? 'text-slate-500' : 'text-orange-400'
                    }`} />
                <Moon className={`h-3 w-3 transition-all duration-300 ${isDark ? 'text-blue-300' : 'text-slate-400'
                    }`} />
            </div>

            {/* Glow effect */}
            <div className={`absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${isDark
                    ? 'bg-blue-400/10 shadow-lg shadow-blue-400/20'
                    : 'bg-orange-400/10 shadow-lg shadow-orange-400/20'
                }`} />
        </button>
    )
}