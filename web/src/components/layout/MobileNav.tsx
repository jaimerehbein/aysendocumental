
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bookmark, DownloadCloud, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

const navItems = [
    { label: 'Inicio', href: '/', icon: Home },
    { label: 'Guardados', href: '/saved', icon: Bookmark },
    { label: 'Descargas', href: '/downloads', icon: DownloadCloud },
    { label: 'Buscar', href: '/search', icon: Search },
];

export const MobileNav = () => {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gradient-to-t from-black via-black/95 to-transparent pb-6 pt-4 px-4 border-t border-white/5 backdrop-blur-xl">
            <div className="flex items-center justify-around max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="relative flex flex-col items-center gap-1 group"
                        >
                            <div className={clsx(
                                "p-2 rounded-full transition-all duration-300",
                                isActive ? "text-white scale-110" : "text-zinc-500 hover:text-zinc-300"
                            )}>
                                <Icon className={clsx("w-6 h-6", isActive && "text-max-accent")} />

                                {isActive && (
                                    <motion.div
                                        layoutId="mobileNavActive"
                                        className="absolute -inset-1 bg-max-accent/10 rounded-full blur-md"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </div>
                            <span className={clsx(
                                "text-[10px] font-bold uppercase tracking-widest transition-colors duration-300",
                                isActive ? "text-white" : "text-zinc-600"
                            )}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
