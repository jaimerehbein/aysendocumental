
'use plain';
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, User, Heart } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Sólo mostramos el navbar en la home por ahora, o en todas partes menos watch
    // En watch/[id] solemos querer una UI más limpia o un botón de volver específico
    const isWatchPage = pathname?.startsWith('/watch/');
    const isWelcomePage = pathname === '/welcome';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (isWatchPage || isWelcomePage) return null;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-max-black/95 backdrop-blur-md border-b border-gray-800/50 py-4 shadow-lg'
                    : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-6'
                }`}
        >
            <div className="px-6 md:px-16 flex items-center justify-between">
                {/* Logo Area */}
                <div className="flex items-center gap-10">
                    <Link href="/" className="text-3xl font-black text-white tracking-tighter hover:scale-105 transition-transform">
                        AYSÉN<span className="text-max-accent">.DOC</span>
                    </Link>

                    {/* Desktop Navigation - Max Style (Bold Uppercase) */}
                    <ul className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-300 tracking-wide">
                        <li className="hover:text-white transition cursor-pointer hover:underline decoration-max-accent underline-offset-8">INICIO</li>
                        <li className="hover:text-white transition cursor-pointer hover:underline decoration-max-accent underline-offset-8">SERIES</li>
                        <li className="hover:text-white transition cursor-pointer hover:underline decoration-max-accent underline-offset-8">PELÍCULAS</li>
                        {/* New Donation Link */}
                        <li className="text-max-accent hover:text-white transition cursor-pointer hover:underline decoration-white underline-offset-8 flex items-center gap-2">
                            <Heart className="w-4 h-4 fill-current" /> APOYAR
                        </li>
                    </ul>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6 text-white">
                    <Search className="w-6 h-6 cursor-pointer hover:text-max-accent transition" />
                    <Bell className="w-6 h-6 cursor-pointer hover:text-max-accent transition hidden sm:block" />

                    {/* User Profile - Max uses a circle avatar often with a gradient border */}
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-max-blue to-max-accent p-[2px] group-hover:scale-110 transition duration-300">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                <User className="w-6 h-6 text-gray-300" />
                                {/* <img src="https://github.com/shadcn.png" className="w-full h-full object-cover" /> */}
                            </div>
                        </div>
                        <span className="hidden lg:block text-sm font-bold group-hover:text-max-accent transition">Mi Cuenta</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
