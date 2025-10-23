import type { ReactNode } from "react";
import { createPortal } from "react-dom";

const portalRoot = document.getElementById('portal-root');

export default function Portal({ children }: { children: ReactNode }) {
    if (!portalRoot) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4">
            {children}
        </div>,
        portalRoot
    );
}