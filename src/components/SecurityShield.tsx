"use client";

import { useEffect, useState } from "react";

/**
 * 🛡️ SECURITY SHIELD - ANTI-THEFT PROTOCOL
 * Prevents:
 * - Right Click
 * - Copy/Paste
 * - DevTools (F12, Ctrl+Shift+I)
 * - View Source (Ctrl+U)
 * - Dragging Images
 */
export const SecurityShield = () => {
    // const [devtoolsOpen, setDevtoolsOpen] = useState(false);

    useEffect(() => {
        // 1. Disable Right Click
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // 2. Disable Key Shortcuts (F12, Ctrl+U, Ctrl+Shift+I, Ctrl+S, Ctrl+P)
        const handleKeyDown = (e: KeyboardEvent) => {
            // F12 or Ctrl+Shift+I or Ctrl+Shift+J or Ctrl+Shift+C (DevTools)
            if (
                e.key === "F12" ||
                (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C"))
            ) {
                e.preventDefault();
                // alert("🔒 Protected Content");
                return false;
            }

            // Ctrl+U (View Source)
            if (e.ctrlKey && e.key === "u") {
                e.preventDefault();
                return false;
            }

            // Ctrl+S (Save Page)
            if (e.ctrlKey && e.key === "s") {
                e.preventDefault();
                return false;
            }

            // Ctrl+P (Print)
            if (e.ctrlKey && e.key === "p") {
                e.preventDefault();
                return false;
            }

            // Ctrl+C (Copy) - Optional, maybe annoying for users wanting to copy text inputs?
            // Let's only block if nothing is selected or selection logic is strict.
            // if (e.ctrlKey && e.key === "c") { }
        };

        // 3. Disable Dragging Images
        const handleDragStart = (e: DragEvent) => {
            e.preventDefault();
        };

        // 4. Debugger Trap (Advanced)
        // Detects if DevTools triggers a breakpoint
        const antiDebugger = () => {
            // This is a common technique to make DevTools hanging if opened
            // setInterval(() => {
            //    (function(){debugger;})();
            // }, 4000);
        };
        // antiDebugger(); // Uncomment for "Nuclear" mode (can annoy legit devs/users heavily)

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("dragstart", handleDragStart);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("dragstart", handleDragStart);
        };
    }, []);

    return (
        <style jsx global>{`
            /* 5. Disable Selection */
            body {
                -webkit-user-select: none; /* Safari */
                -ms-user-select: none; /* IE 10 and IE 11 */
                user-select: none; /* Standard syntax */
            }
            /* Allow selection in inputs */
            input, textarea {
                -webkit-user-select: text;
                user-select: text;
            }
            /* 6. Print Styles - Blank Page */
            @media print {
                html, body {
                    display: none !important;
                }
            }
        `}</style>
    );
};
