'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Github, ExternalLink } from 'lucide-react';
import { Publication } from '@/types/publication';
import { useMessages } from '@/lib/i18n/useMessages';
import { splitVenueHighlight } from '@/lib/utils';
import FormattedBibTeXText from '@/components/publications/FormattedBibTeXText';
import PaperThumbnail from '@/components/publications/PaperThumbnail';

interface SelectedPublicationsProps {
    publications: Publication[];
    title?: string;
    enableOnePageMode?: boolean;
}

export default function SelectedPublications({ publications, title, enableOnePageMode = false }: SelectedPublicationsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.selectedPublications;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-serif font-bold text-primary">{resolvedTitle}</h2>
                <Link
                    href={enableOnePageMode ? "/#publications" : "/publications"}
                    prefetch={true}
                    className="text-accent hover:text-accent-dark text-sm font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
                >
                    {messages.home.viewAll} →
                </Link>
            </div>
            <div className="space-y-4">
                {publications.map((pub, index) => (
                    <motion.div
                        key={pub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="bg-neutral-50 dark:bg-neutral-800 p-4 rounded-lg shadow-sm border border-neutral-200 dark:border-[rgba(148,163,184,0.24)] hover:shadow-md transition-all duration-200"
                    >
                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                            {pub.preview && (
                                <div className="w-full sm:w-44 md:w-48 flex-shrink-0">
                                    <PaperThumbnail src={`/papers/${pub.preview}`} alt={pub.title} />
                                </div>
                            )}
                            <div className="flex-grow min-w-0">
                                <h3 className="font-semibold text-primary mb-2 leading-tight">
                            <FormattedBibTeXText nodes={pub.titleNodes} fallback={pub.title} />
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-1">
                            {pub.authors.map((author, idx) => (
                                <span key={idx}>
                                    <span className={author.isHighlighted ? 'font-semibold text-accent' : ''}>
                                        {author.name}
                                    </span>
                                    {author.isCoAuthor && (
                                        <sup className={`ml-0.5 ${author.isHighlighted ? 'text-accent font-semibold' : 'text-neutral-600 dark:text-neutral-500'}`}>*</sup>
                                    )}
                                    {author.isCorresponding && (
                                        <sup className={`ml-0 ${author.isHighlighted ? 'text-accent' : 'text-neutral-600 dark:text-neutral-500'}`}>†</sup>
                                    )}
                                    {idx < pub.authors.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-500 mb-2">
                            {(() => {
                                const { prefix, highlight } = splitVenueHighlight(pub.journal || pub.conference);
                                return (
                                    <>
                                        {prefix}
                                        <strong className="font-semibold text-primary">
                                            {highlight}{pub.year ? `${highlight || !prefix ? ' ' : ' '}${pub.year}` : ''}
                                        </strong>
                                    </>
                                );
                            })()}
                            {pub.authors.some((a) => a.isCoAuthor) && (
                                <strong className="ml-2 text-xs font-semibold text-primary">({messages.publications.equalContribution})</strong>
                            )}
                        </p>
                        {pub.description && (
                            <p className="text-sm text-neutral-500 dark:text-neutral-500 line-clamp-2">
                                {pub.description}
                            </p>
                        )}
                        {(pub.url || pub.code || pub.doi) && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {pub.url && (
                                    <a
                                        href={pub.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-accent hover:bg-accent hover:text-white transition-colors"
                                    >
                                        <FileText className="h-3.5 w-3.5 mr-1.5" />
                                        {pub.url.includes('arxiv.org') ? 'arXiv' : messages.publications.paper}
                                    </a>
                                )}
                                {pub.code && (
                                    <a
                                        href={pub.code}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-accent hover:bg-accent hover:text-white transition-colors"
                                    >
                                        <Github className="h-3.5 w-3.5 mr-1.5" />
                                        {pub.code.includes('github.com') ? 'GitHub' : messages.publications.code}
                                    </a>
                                )}
                                {pub.doi && (
                                    <a
                                        href={`https://doi.org/${pub.doi}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:border-accent hover:bg-accent hover:text-white transition-colors"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                                        DOI
                                    </a>
                                )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}
