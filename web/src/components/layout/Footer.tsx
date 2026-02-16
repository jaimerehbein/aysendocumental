
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-black/90 text-gray-400 py-12 px-6 md:px-16 border-t border-gray-800 mt-12">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Social Icons */}
                <div className="flex gap-6">
                    <Facebook className="w-6 h-6 hover:text-white cursor-pointer transition" />
                    <Instagram className="w-6 h-6 hover:text-white cursor-pointer transition" />
                    <Twitter className="w-6 h-6 hover:text-white cursor-pointer transition" />
                    <Youtube className="w-6 h-6 hover:text-white cursor-pointer transition" />
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium">
                    <div className="space-y-3">
                        <p className="hover:underline cursor-pointer">Audio y Subtítulos</p>
                        <p className="hover:underline cursor-pointer">Prensa</p>
                        <p className="hover:underline cursor-pointer">Privacidad</p>
                    </div>
                    <div className="space-y-3">
                        <p className="hover:underline cursor-pointer">Descripción de audio</p>
                        <p className="hover:underline cursor-pointer">Relaciones con Inversionistas</p>
                        <p className="hover:underline cursor-pointer">Términos de Uso</p>
                    </div>
                    <div className="space-y-3">
                        <p className="hover:underline cursor-pointer">Centro de Ayuda</p>
                        <p className="hover:underline cursor-pointer">Empleo</p>
                        <p className="hover:underline cursor-pointer">Preferencias de cookies</p>
                    </div>
                    <div className="space-y-3">
                        <p className="hover:underline cursor-pointer">Tarjetas de Regalo</p>
                        <p className="hover:underline cursor-pointer">Información Corporativa</p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 text-xs text-gray-600">
                    <p>© 2026 Aysén Documental. Todos los derechos reservados.</p>
                    <p className="mt-2">Hecho con ❤️ en la Patagonia.</p>
                </div>
            </div>
        </footer>
    );
}
