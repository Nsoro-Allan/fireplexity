'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { FileText, Sparkles, Search } from "lucide-react"

interface ContentSkeletonProps {
    showSources?: boolean
    showAnswer?: boolean
    showImages?: boolean
    showNews?: boolean
}

export function ContentSkeleton({
    showSources = true,
    showAnswer = true,
    showImages = false,
    showNews = false
}: ContentSkeletonProps) {
    return (
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 pb-8 px-4 sm:px-0">
            {/* Query skeleton */}
            <div className="opacity-0 animate-mobile-fade-up [animation-duration:300ms] [animation-fill-mode:forwards]">
                <Skeleton className="h-6 sm:h-8 w-3/4 mb-4 sm:mb-6" />
            </div>

            {/* Sources skeleton */}
            {showSources && (
                <div className="opacity-0 animate-fade-up [animation-duration:500ms] [animation-delay:200ms] [animation-fill-mode:forwards]">
                    <div className="flex items-center gap-2 mb-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 h-24 sm:h-28 w-full min-w-0">
                                <div className="absolute inset-0 bg-white/90 dark:bg-zinc-800/90" />
                                <div className="relative p-3 flex flex-col justify-between h-full">
                                    <div className="flex items-center gap-1.5">
                                        <Skeleton className="w-4 h-4 rounded" />
                                        <Skeleton className="h-2 flex-1" />
                                    </div>
                                    <Skeleton className="h-3 w-full mb-1" />
                                    <Skeleton className="h-3 w-3/4 mb-2" />
                                    <Skeleton className="h-2 w-12" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Images skeleton */}
            {showImages && (
                <div className="opacity-0 animate-fade-up [animation-duration:500ms] [animation-delay:300ms] [animation-fill-mode:forwards] lg:hidden">
                    <div className="flex items-center gap-2 mb-3">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="aspect-square rounded-lg overflow-hidden">
                                <Skeleton className="w-full h-full" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* News skeleton */}
            {showNews && (
                <div className="opacity-0 animate-fade-up [animation-duration:500ms] [animation-delay:400ms] [animation-fill-mode:forwards] lg:hidden">
                    <div className="flex items-center gap-2 mb-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-4 w-12" />
                    </div>
                    <div className="space-y-3">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <div className="flex items-center gap-2">
                                            <Skeleton className="h-3 w-20" />
                                            <Skeleton className="h-3 w-16" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Answer skeleton */}
            {showAnswer && (
                <div className="opacity-0 animate-fade-up [animation-duration:500ms] [animation-delay:500ms] [animation-fill-mode:forwards]">
                    <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                        <div className="pt-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full mt-2" />
                            <Skeleton className="h-4 w-3/4 mt-2" />
                        </div>
                        <div className="pt-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6 mt-2" />
                        </div>
                    </div>
                </div>
            )}

            {/* Follow-up questions skeleton */}
            <div className="opacity-0 animate-fade-up [animation-duration:500ms] [animation-delay:600ms] [animation-fill-mode:forwards]">
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-4 w-4 text-muted-foreground" />
                    <Skeleton className="h-4 w-16" />
                </div>
                <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full rounded-xl" />
                    ))}
                </div>
            </div>
        </div>
    )
}