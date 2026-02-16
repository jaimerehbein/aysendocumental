
import { Heart, PlayCircle, Star } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { WelcomeHero } from '@/components/welcome/WelcomeHero';

export default function Welcome() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-max-accent selection:text-white">

            {/* --- HERO SECTION --- */}
            <WelcomeHero mode="video" videoId="AhP5tg_9iE0" />

            {/* --- VALUE PROPOSITION (Max Style Grid) --- */}
            <section className="py-20 px-6 md:px-16 bg-gradient-to-b from-black to-gray-900/40">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700">
                            <PlayCircle className="w-8 h-8 text-max-accent" />
                        </div>
                        <h3 className="text-xl font-bold">Sin Límites</h3>
                        <p className="text-gray-400">Disfruta de documentales exclusivos y series completas sin interrupciones.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700">
                            <Star className="w-8 h-8 text-max-accent" />
                        </div>
                        <h3 className="text-xl font-bold">Curaduría Experta</h3>
                        <p className="text-gray-400">Contenido seleccionado por historiadores y cineastas locales.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700">
                            <Heart className="w-8 h-8 text-max-accent" />
                        </div>
                        <h3 className="text-xl font-bold">Comunidad</h3>
                        <p className="text-gray-400">Un espacio creado para preservar nuestra identidad.</p>
                    </div>
                </div>
            </section>

            {/* --- DONATION SECTION (Respectful & Premium) --- */}
            <section className="py-24 px-6 md:px-16 bg-max-brand relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
                    <Heart className="w-12 h-12 text-pink-500 mx-auto animate-pulse" fill="currentColor" />

                    <h2 className="text-3xl md:text-5xl font-bold text-white">Tu apoyo mantiene viva la historia</h2>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Aysén Documental es un esfuerzo independiente y gratuito. Si valoras nuestro trabajo de preservación y difusión,
                        considera realizar una donación voluntaria. Cada aporte nos ayuda a digitalizar más cintas y filmar nuevas historias.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 max-w-3xl mx-auto">
                        <button className="group bg-white/5 border border-white/10 hover:bg-white/10 p-6 rounded-xl transition-all hover:-translate-y-1">
                            <div className="text-2xl font-bold text-white mb-2">$1.000</div>
                            <div className="text-sm text-blue-200">Café Solidario</div>
                        </button>
                        <button className="group bg-gradient-to-br from-max-accent to-blue-700 p-6 rounded-xl shadow-lg transform scale-105 border border-white/20">
                            <div className="text-2xl font-bold text-white mb-2">$5.000</div>
                            <div className="text-sm text-white/90">Guardián del Archivo</div>
                            <div className="mt-3 text-xs font-bold uppercase tracking-widest bg-white/20 py-1 rounded">Más Popular</div>
                        </button>
                        <button className="group bg-white/5 border border-white/10 hover:bg-white/10 p-6 rounded-xl transition-all hover:-translate-y-1">
                            <div className="text-2xl font-bold text-white mb-2">$10.000</div>
                            <div className="text-sm text-blue-200">Productor Asociado</div>
                        </button>
                    </div>

                    <div className="pt-8">
                        <button className="text-blue-200 hover:text-white underline text-sm">
                            ¿Prefieres otro monto? Haz clic aquí
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
