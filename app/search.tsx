'use client'

import { Search, Loader2, ArrowRight } from 'lucide-react'
import { useState } from 'react'

interface SearchComponentProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void
  isLoading: boolean
}

export function SearchComponent({ handleSubmit, input, handleInputChange, isLoading }: SearchComponentProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto pt-8 sm:pt-12 px-4 sm:px-6 lg:px-0 w-full">
      <div className="relative group animate-fade-up [animation-duration:600ms] [animation-delay:200ms] [animation-fill-mode:forwards] opacity-0">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Search className="h-5 w-5 text-muted-foreground transition-colors duration-200" />
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              if (input.trim()) {
                handleSubmit(e as any)
              }
            }
            if (e.key === 'Escape') {
              setIsFocused(false)
                ; (e.target as HTMLInputElement).blur()
            }
          }}
          placeholder="Ask anything..."
          disabled={isLoading}
          className={`
            w-full h-14 sm:h-16 pl-12 pr-16 sm:pr-20 text-sm sm:text-base min-w-0
            bg-white/80 dark:bg-zinc-900/80
            border border-gray-200/60 dark:border-zinc-700/50
            rounded-2xl
            placeholder:text-muted-foreground/70
            text-foreground
            transition-all duration-300 ease-out
            outline-none
            backdrop-blur-md
            ${isFocused || input ? 'shadow-lg shadow-black/5 dark:shadow-black/20 border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-900' : 'shadow-sm'}
            ${isFocused ? 'ring-2 ring-[#ff4d00]/20 dark:ring-[#ff4d00]/30' : ''}
            disabled:opacity-60 disabled:cursor-not-allowed
            hover:border-gray-300 dark:hover:border-zinc-600
            hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20
            hover:bg-white dark:hover:bg-zinc-900
          `}
        />

        {/* Submit Button Area */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {/* Keyboard shortcut hint */}
          {isFocused && input && (
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-zinc-800 rounded-md text-xs text-muted-foreground animate-fade-in [animation-duration:200ms]">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-zinc-700 rounded text-[10px] font-mono border border-gray-200 dark:border-zinc-600">
                ⏎
              </kbd>
              <span>to search</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !input || input.trim() === ''}
            className={`
              w-10 h-10
              rounded-xl
              flex items-center justify-center
              transition-all duration-200 ease-out
              ${isLoading || !input || input.trim() === ''
                ? 'bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed'
                : 'bg-[#ff4d00] hover:bg-[#e64400] text-white shadow-lg shadow-[#ff4d00]/25 hover:shadow-xl hover:shadow-[#ff4d00]/30 active:scale-95'
              }
              group/button
              ${isLoading ? 'animate-pulse' : ''}
            `}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
            )}
          </button>
        </div>


      </div>

      {/* Search suggestions or shortcuts */}
      {isFocused && !input && (
        <div className="mt-6 animate-fade-up [animation-duration:300ms] [animation-delay:100ms] [animation-fill-mode:forwards] opacity-0">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground/70">
              Try asking about news, research, or any topic you're curious about
            </p>
          </div>

          {/* Quick suggestion pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto px-4">
            {[
              "Latest tech news",
              "Stock market trends",
              "Climate change research",
              "AI developments"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleInputChange({ target: { value: suggestion } } as any)}
                className="px-3 py-1.5 text-xs bg-gray-50 dark:bg-zinc-800/50 text-gray-600 dark:text-gray-400 rounded-full border border-gray-200/50 dark:border-zinc-700/50 hover:bg-gray-100 dark:hover:bg-zinc-700/50 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </form>
  )
}