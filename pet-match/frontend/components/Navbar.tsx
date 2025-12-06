import Link from 'next/link';
import { PawPrint, Menu } from 'lucide-react';

export const Navbar = () => {
    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-orange-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-2">
                        <div className="bg-paw-orange-400 p-2 rounded-xl text-white transform -rotate-6 transition-transform hover:rotate-0">
                            <PawPrint size={24} fill="currentColor" />
                        </div>
                        <span className="font-bold text-2xl text-slate-800 tracking-tight">
                            Pet<span className="text-paw-orange-500">Match</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <Link href="#how-it-works" className="text-slate-600 hover:text-paw-orange-500 font-medium transition-colors">
                            How it Works
                        </Link>
                        <Link href="#examples" className="text-slate-600 hover:text-paw-orange-500 font-medium transition-colors">
                            Gallery
                        </Link>
                        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-all hover:scale-105 shadow-lg shadow-purple-500/20">
                            Start Creating 🎨
                        </button>
                    </div>

                    <div className="md:hidden">
                        <button className="p-2 text-slate-600">
                            <Menu />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
