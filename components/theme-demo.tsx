'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme-toggle'
import { ThemeToggleAdvanced } from '@/components/theme-toggle-advanced'

export function ThemeDemo() {
    return (
        <div className="p-8 space-y-8">
            <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Theme System Demo</h2>
                <p className="text-muted-foreground">
                    Experience smooth transitions between light and dark modes
                </p>

                <div className="flex items-center justify-center gap-4">
                    <div className="text-center space-y-2">
                        <p className="text-sm font-medium">Advanced Toggle</p>
                        <ThemeToggleAdvanced />
                    </div>
                    <div className="text-center space-y-2">
                        <p className="text-sm font-medium">Icon Toggle</p>
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">Interactive Elements</h3>
                    <div className="space-y-3">
                        <Button className="w-full">Primary Button</Button>
                        <Button variant="secondary" className="w-full">Secondary Button</Button>
                        <Button variant="outline" className="w-full">Outline Button</Button>
                        <Button variant="ghost" className="w-full">Ghost Button</Button>
                    </div>
                </Card>

                <Card className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">Form Elements</h3>
                    <div className="space-y-3">
                        <Input placeholder="Enter your name" />
                        <Input placeholder="Enter your email" type="email" />
                        <Input placeholder="Search..." />
                    </div>
                </Card>

                <Card className="p-6 space-y-4">
                    <h3 className="text-xl font-semibold">Color Palette</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="h-8 bg-primary rounded flex items-center justify-center text-primary-foreground text-xs">Primary</div>
                        <div className="h-8 bg-secondary rounded flex items-center justify-center text-secondary-foreground text-xs">Secondary</div>
                        <div className="h-8 bg-accent rounded flex items-center justify-center text-accent-foreground text-xs">Accent</div>
                        <div className="h-8 bg-muted rounded flex items-center justify-center text-muted-foreground text-xs">Muted</div>
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium text-green-600 dark:text-green-400">✓ System Detection</h4>
                        <p className="text-sm text-muted-foreground">Automatically detects your system preference</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium text-green-600 dark:text-green-400">✓ Smooth Transitions</h4>
                        <p className="text-sm text-muted-foreground">300ms animated transitions for all elements</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium text-green-600 dark:text-green-400">✓ Persistent Storage</h4>
                        <p className="text-sm text-muted-foreground">Remembers your preference across sessions</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="font-medium text-green-600 dark:text-green-400">✓ Accessible</h4>
                        <p className="text-sm text-muted-foreground">Full keyboard navigation and screen reader support</p>
                    </div>
                </div>
            </Card>
        </div>
    )
}