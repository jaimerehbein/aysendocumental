
import { Heart, PlayCircle, Star, ArrowRight } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { WelcomeHero } from '@/components/welcome/WelcomeHero';

export default function Welcome() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-max-accent selection:text-white">

            {/* --- HERO SECTION --- */}
            <WelcomeHero mode="video" videoId="AhP5tg_9iE0" />

            {/* --- MISSION STATEMENT (Propósito del Proyecto) --- */}
            <section className="py-24 px-6 md:px-16 bg-zinc-950">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="space-y-4 text-center">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">Propósito del Proyecto</h2>
                        <div className="w-24 h-1 bg-max-accent mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <p className="text-xl text-zinc-300 leading-relaxed font-light">
                                Aysén Documental es una plataforma de <strong className="text-white font-bold">compilación y recopilación</strong> de material audiovisual histórico y contemporáneo de nuestra región, principalmente alojado en YouTube.
                            </p>
                            <p className="text-zinc-400 leading-relaxed font-light">
                                Este es un proyecto <strong className="text-white font-bold">sin fines de lucro</strong>. Las reproducciones de los videos se realizan directamente desde sus fuentes originales, beneficiando a los canales y productores con un incremento en sus visualizaciones y alcance.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md space-y-4">
                            <div className="flex items-center gap-3 text-max-accent">
                                <Star className="w-6 h-6 fill-current" />
                                <span className="font-black uppercase tracking-widest text-sm">Apoyo Local</span>
                            </div>
                            <p className="text-sm text-zinc-300 leading-relaxed italic">
                                "Buscamos fortalecer la identidad de Aysén, sirviendo como un puente entre el creador y la comunidad, preservando nuestra memoria visual para las futuras generaciones."
                            </p>
                            <div className="pt-4 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center font-black text-xs">AD</div>
                                <div>
                                    <div className="text-xs font-bold text-white uppercase tracking-wider">Equipo Aysén Documental</div>
                                    <div className="text-[10px] text-zinc-500 uppercase">Patagonia, Chile</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- VALUE PROPOSITION --- */}
            <section className="py-20 px-6 md:px-16 bg-black">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="space-y-4 group">
                        <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full flex items-center justify-center border border-white/5 group-hover:border-max-accent/50 transition-colors">
                            <PlayCircle className="w-8 h-8 text-max-accent" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tighter italic transition-colors group-hover:text-max-accent">Sin Límites</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">Acceso instantáneo a la mayor colección de relatos patagónicos.</p>
                    </div>
                    <div className="space-y-4 group text-white">
                        <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full flex items-center justify-center border border-white/5 group-hover:border-max-accent/50 transition-colors text-white">
                            <Star className="w-8 h-8 text-max-accent" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tighter italic transition-colors group-hover:text-max-accent">Aysenino de Corazón</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">Contenido seleccionado con orgullo por nuestra propia gente.</p>
                    </div>
                    <div className="space-y-4 group">
                        <div className="w-16 h-16 mx-auto bg-zinc-900 rounded-full flex items-center justify-center border border-white/5 group-hover:border-max-accent/50 transition-colors">
                            <Heart className="w-8 h-8 text-max-accent" />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tighter italic transition-colors group-hover:text-max-accent">Comunidad Viva</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">Un archivo que crece gracias a la colaboración regional.</p>
                    </div>
                </div>
            </section>

            {/* --- DONATION SECTION (Respectful & Premium) --- */}
            <section className="py-24 px-6 md:px-16 bg-max-brand relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
                <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] text-white">
                        Apoyo a la Mantención
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic leading-none drop-shadow-2xl">
                        Hecho a pulso <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">por ayseninos</span>
                    </h2>

                    <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light">
                        Mantenemos este sitio online de forma independiente. Si valoras este esfuerzo por preservar nuestra memoria, considera un aporte para cubrir los costos de servidor y operación.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-4xl mx-auto">
                        <button className="group bg-zinc-900/40 backdrop-blur-md border border-white/10 hover:border-white/30 p-8 rounded-3xl transition-all hover:-translate-y-2">
                            <div className="text-3xl font-black text-white mb-2">$1.000</div>
                            <div className="text-xs font-bold text-blue-300 uppercase tracking-widest">Aporte Semilla</div>
                        </button>
                        <button className="group bg-gradient-to-br from-max-accent to-blue-700 p-8 rounded-3xl shadow-2xl transform scale-110 border border-white/20 relative">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-max-brand text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Recomendado</div>
                            <div className="text-3xl font-black text-white mb-2">$5.000</div>
                            <div className="text-xs font-bold text-white uppercase tracking-widest">Colaborador Activo</div>
                        </button>
                        <button className="group bg-zinc-900/40 backdrop-blur-md border border-white/10 hover:border-white/30 p-8 rounded-3xl transition-all hover:-translate-y-2 text-white">
                            <div className="text-3xl font-black text-white mb-2">$10.000</div>
                            <div className="text-xs font-bold text-blue-300 uppercase tracking-widest">Guardián del Sitio</div>
                        </button>
                    </div>

                    <div className="pt-12">
                        <button className="text-blue-200 hover:text-white font-bold uppercase tracking-widest text-xs flex items-center gap-2 mx-auto transition-colors">
                            <ArrowRight className="w-4 h-4" /> Otros montos de donación
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
