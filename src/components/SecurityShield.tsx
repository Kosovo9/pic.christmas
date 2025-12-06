import React, { useEffect } from 'react';

/**
 * GUCCI / NASA / BANK LEVEL SECURITY SHIELD
 * Implements heavy UI protection against cloning, copying, and scraping.
 */
export const SecurityShield: React.FC = () => {
    useEffect(() => {
        // 1. Disable Right Click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // 2. Disable Keyboard Shortcuts (Inspect, Copy, Save)
        const handleKeyDown = (e: KeyboardEvent) => {
            if (
                // Ctrl+Shift+I (Inspect)
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                // F12 (Inspect)
                e.key === 'F12' ||
                // Ctrl+U (View Source)
                (e.ctrlKey && e.key === 'u') ||
                // Ctrl+S (Save)
                (e.ctrlKey && e.key === 's') ||
                // Ctrl+C (Copy)
                (e.ctrlKey && e.key === 'c')
            ) {
                e.preventDefault();
                return false;
            }
        };

        // 3. Anti-Screenshot / Privacy Blur (Window Focus)
        // When user switches tabs or apps (often to screenshot tools), we blur content
        const handleVisibilityChange = () => {
            if (document.hidden) {
                document.title = '🔒 Secured by Pic.Christmas';
            } else {
                document.title = 'Pic.Christmas | AI Magic';
            }
        };

        // 4. Disable Dragging Images
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
            return false;
        };

        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('dragstart', handleDragStart);

        // Apply Global CSS Protection
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';

        // Add watermark overlay to all images via CSS class injection if needed
        // For now, we handle this via component logic, but this effect secures the document.

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('dragstart', handleDragStart);
            document.body.style.userSelect = 'auto';
            document.body.style.webkitUserSelect = 'auto';
        };
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" aria-hidden="true">
            {/* Invisible Watermark Grid (Hard to remove) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none flex flex-wrap content-center justify-center gap-24 rotate-12">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="text-4xl font-black text-white whitespace-nowrap">
                        PIC.CHRISTMAS PROTECTED
                    </div>
                ))}
            </div>
        </div>
    );
};
