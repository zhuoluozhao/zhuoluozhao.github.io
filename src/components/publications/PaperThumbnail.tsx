'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';

interface PaperThumbnailProps {
    src: string;
    alt: string;
    className?: string;
}

export default function PaperThumbnail({ src, alt, className = '' }: PaperThumbnailProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label={`Preview figure for ${alt}`}
                className={`group relative block w-full aspect-[16/10] rounded-lg overflow-hidden bg-white border border-neutral-200 dark:border-neutral-700 cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-accent/50 ${className}`}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-contain p-1.5 transition-transform duration-200 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 240px"
                />
                <span className="pointer-events-none absolute bottom-1.5 right-1.5 inline-flex items-center justify-center rounded-md bg-neutral-900/70 p-1 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <ZoomIn className="h-3.5 w-3.5" />
                </span>
            </button>

            {isOpen && typeof document !== 'undefined' && createPortal(
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={alt}
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-[92vw] max-h-[90vh] rounded-xl bg-white p-3 shadow-2xl border border-neutral-200"
                    >
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close figure preview"
                            className="absolute -top-3 -right-3 rounded-full bg-neutral-900 p-1.5 text-white shadow-md hover:bg-accent transition-colors"
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <Image
                            src={src}
                            alt={alt}
                            width={1600}
                            height={1000}
                            className="max-h-[82vh] w-auto max-w-[88vw] object-contain"
                        />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
