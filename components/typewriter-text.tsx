'use client'

import { useState, useEffect, useRef } from 'react'

interface TypewriterTextProps {
    text: string
    speed?: number
    className?: string
    onComplete?: () => void
    startDelay?: number
}

export function TypewriterText({
    text,
    speed = 30,
    className = '',
    onComplete,
    startDelay = 0
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        // Reset state when text changes
        setDisplayedText('')
        setCurrentIndex(0)
        setIsComplete(false)

        // Clear any existing intervals/timeouts
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        if (!text) return

        // Start typing after delay
        timeoutRef.current = setTimeout(() => {
            intervalRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1

                    if (nextIndex >= text.length) {
                        if (intervalRef.current) {
                            clearInterval(intervalRef.current)
                        }
                        setIsComplete(true)
                        onComplete?.()
                        return prevIndex
                    }

                    return nextIndex
                })
            }, speed)
        }, startDelay)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [text, speed, onComplete, startDelay])

    useEffect(() => {
        setDisplayedText(text.slice(0, currentIndex))
    }, [currentIndex, text])

    return (
        <span className={className}>
            {displayedText}
            {!isComplete && (
                <span className="typewriter-cursor text-orange-500 ml-0.5 font-bold">|</span>
            )}
        </span>
    )
}