"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, ArrowRight, Github, Chrome, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface AuthOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthOverlay({ isOpen, onClose }: AuthOverlayProps) {
    const [mode, setMode] = useState<'login' | 'register'>('login');

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,1)] backdrop-blur-2xl"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-max-accent/20 rounded-full blur-[80px]" />
                        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-[80px]" />

                        <div className="relative p-8 md:p-10 space-y-8">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="text-center space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-max-accent/10 border border-max-accent/20 text-max-accent text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                                    <ShieldCheck className="w-3 h-3" /> Acceso Seguro
                                </div>
                                <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
                                    {mode === 'login' ? 'Bienvenido de Vuelta' : 'Comienza el Viaje'}
                                </h2>
                                <p className="text-zinc-400 text-sm">
                                    {mode === 'login' ? 'Ingresa para continuar explorando la Patagonia.' : 'Crea tu cuenta gratuita para guardar tus favoritos.'}
                                </p>
                            </div>

                            {/* Forms */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-max-accent transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="tu@email.com"
                                            className="w-full bg-zinc-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-max-accent/50 focus:border-max-accent/50 transition-all placeholder:text-zinc-600"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Contraseña</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-max-accent transition-colors" />
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full bg-zinc-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-max-accent/50 focus:border-max-accent/50 transition-all placeholder:text-zinc-600"
                                        />
                                    </div>
                                </div>

                                {mode === 'login' && (
                                    <div className="text-right">
                                        <button className="text-xs font-bold text-zinc-500 hover:text-max-accent transition-colors">
                                            ¿Olvidaste tu contraseña?
                                        </button>
                                    </div>
                                )}

                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="w-full bg-max-accent hover:bg-blue-600 text-white font-black py-4 rounded-2xl transition-all shadow-[0_10px_30px_rgba(63,117,255,0.3)] hover:shadow-[0_15px_40px_rgba(63,117,255,0.4)] flex items-center justify-center gap-2 group"
                                >
                                    {mode === 'login' ? 'INICIAR SESIÓN' : 'CREAR CUENTA'}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="relative py-2">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/5"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                                    <span className="bg-zinc-900 px-4 text-zinc-500">O continuar con</span>
                                </div>
                            </div>

                            {/* Social Logins */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl transition-all text-white font-bold text-sm">
                                    <Chrome className="w-4 h-4" /> Google
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 py-3 rounded-xl transition-all text-white font-bold text-sm">
                                    <Github className="w-4 h-4" /> GitHub
                                </button>
                            </div>

                            {/* Footer Link */}
                            <div className="text-center pt-2">
                                <p className="text-zinc-500 text-sm">
                                    {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
                                    <button
                                        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                                        className="ml-2 font-black text-white hover:text-max-accent transition-colors underline decoration-max-accent/30 underline-offset-4"
                                    >
                                        {mode === 'login' ? 'Regístrate Gratis' : 'Inicia Sesión'}
                                    </button>
                                </p>
                            </div>
                        </div>

                        {/* Bottom Banner */}
                        <div className="bg-max-accent/10 border-t border-white/5 p-4 text-center">
                            <p className="text-[10px] text-zinc-400 uppercase tracking-[0.1em] font-medium">
                                Al ingresar, aceptas nuestros <Link href="#" className="text-white hover:underline">Términos</Link> y <Link href="#" className="text-white hover:underline">Privacidad</Link>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
