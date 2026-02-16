
'use plain';
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, User, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const pathname = usePathname();

    // Sólo mostramos el navbar en la home por ahora, o en todas partes menos watch
    const isWatchPage = pathname?.startsWith('/watch/');
    const isWelcomePage = pathname === '/welcome';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (isWatchPage || isWelcomePage) return null;

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-[100] transition-all duration-500 ease-in-out ${isScrolled
                    ? 'bg-max-black/95 backdrop-blur-xl border-b border-white/5 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                    : 'bg-gradient-to-b from-max-black/90 via-max-black/40 to-transparent py-6'
                    }`}
            >
                <div className="px-6 md:px-16 flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center gap-10">
                        <Link href="/" className="text-3xl font-black text-white tracking-tighter hover:scale-105 transition-transform">
                            AYSÉN<span className="text-max-accent">.DOC</span>
                        </Link>

                        {/* Desktop Navigation - Max Style (Bold Uppercase) */}
                        <ul className="hidden md:flex items-center gap-8 text-sm font-black text-gray-300 tracking-wide uppercase">
                            <li>
                                <Link href="/" className="hover:text-white transition decoration-max-accent underline-offset-8 hover:underline">Inicio</Link>
                            </li>
                            <li>
                                <Link href="/#series" className="hover:text-white transition decoration-max-accent underline-offset-8 hover:underline">Series</Link>
                            </li>
                            <li>
                                <Link href="/#naturaleza" className="hover:text-white transition decoration-max-accent underline-offset-8 hover:underline">Películas</Link>
                            </li>
                            {/* New Donation Link */}
                            <li>
                                <Link href="/apoyar" className="text-max-accent hover:text-white transition flex items-center gap-2 decoration-white underline-offset-8 hover:underline">
                                    <Heart className="w-4 h-4 fill-current" /> APOYAR
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-6 text-white">
                        <Search
                            className="w-6 h-6 cursor-pointer hover:text-max-accent transition"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        />
                        <div className="relative group">
                            <Bell className="w-6 h-6 cursor-pointer hover:text-max-accent transition hidden sm:block" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-max-accent rounded-full text-[10px] flex items-center justify-center font-black animate-pulse">2</span>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-max-blue to-max-accent p-[2px] group-hover:scale-110 transition duration-300">
                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                    <User className="w-6 h-6 text-gray-300" />
                                </div>
                            </div>
                            <span className="hidden lg:block text-sm font-bold group-hover:text-max-accent transition">Mi Cuenta</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Basic Search Overlay */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-3xl p-20 flex flex-col items-center">
                    <button
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute top-10 right-10 text-white hover:text-max-accent transition-colors"
                    >
                        <Search className="w-10 h-10 rotate-45" />
                    </button>
                    <input
                        autoFocus
                        type="text"
                        placeholder="Buscar documentales, series o productoras..."
                        className="w-full max-w-4xl bg-transparent border-b-2 border-white/20 text-4xl md:text-6xl font-black text-white focus:outline-none focus:border-max-accent py-8 placeholder:text-white/10 uppercase tracking-tighter"
                    />
                </div>
            )}
        </>
    );
}
