
import { Heart, PlayCircle, Star, ArrowRight } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { WelcomeHero } from '@/components/welcome/WelcomeHero';

export default function Welcome() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-max-accent selection:text-white">

            {/* --- HERO SECTION --- */}
            <WelcomeHero mode="video" videoId="v_09wFxoaeQ" />

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

            {/* --- DISCRETE DONATION FOOTER --- */}
            <section className="py-20 px-6 md:px-16 bg-black border-t border-white/5">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-zinc-900/50 border border-white/10 rounded-[3rem] p-10 md:p-16 relative overflow-hidden group">
                        {/* Subtle background glow */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-max-accent/10 rounded-full blur-[80px] group-hover:bg-max-accent/20 transition-colors duration-700" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-max-accent/10 border border-max-accent/20 text-[10px] font-black uppercase tracking-[0.2em] text-max-accent">
                                    Aporte Voluntario
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
                                    Hecho a pulso <br />
                                    <span className="text-zinc-500 group-hover:text-white transition-colors duration-700">por ayseninos</span>
                                </h2>
                                <p className="text-zinc-400 leading-relaxed font-light text-sm max-w-sm">
                                    Aysén Documental es un esfuerzo independiente. Tu aporte nos ayuda directamente a cubrir los costos de servidor para mantener este archivo siempre libre y accesible.
                                </p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-max-accent/50 hover:bg-max-accent/5 transition-all text-white group/btn">
                                    <span className="text-lg font-black">$1k</span>
                                    <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1 group-hover/btn:text-max-accent">Semilla</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-max-accent border border-white/10 hover:scale-105 transition-all text-white shadow-xl shadow-max-accent/20 group/btn">
                                    <span className="text-lg font-black">$5k</span>
                                    <span className="text-[8px] font-bold text-white/70 uppercase tracking-widest mt-1">Socio</span>
                                </button>
                                <button className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-max-accent/50 hover:bg-max-accent/5 transition-all text-white group/btn">
                                    <span className="text-lg font-black">$10k</span>
                                    <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1 group-hover/btn:text-max-accent">Guardián</span>
                                </button>
                                <div className="col-span-3 pt-4 text-center">
                                    <button className="text-[10px] font-bold text-zinc-600 hover:text-max-accent uppercase tracking-[0.2em] transition-colors flex items-center gap-2 mx-auto">
                                        Personalizar Aporte <ArrowRight className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
