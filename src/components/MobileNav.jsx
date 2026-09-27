import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Camera, Layers, User } from 'lucide-react';

export default function MobileNav({ onOpenUpload, onOpenReportNeed }) {
  const location = useLocation();

  const isHomeActive = location.pathname === '/';
  const isIntelligenceActive = location.pathname.startsWith('/intelligence');
  const isCasesActive = location.pathname.startsWith('/project') || (location.pathname === '/dashboard' && location.search.includes('projects'));

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-1.5 shadow-sm">
      <div className="flex items-center justify-around relative">

        {/* 1. Home */}
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${isHomeActive ? 'text-teal-800 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </Link>

        {/* 2. Intelligence */}
        <Link
          to="/intelligence"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${isIntelligenceActive ? 'text-teal-800 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Intelligence</span>
        </Link>

        {/* 3. Evidence (Visually emphasized, restrained teal, no bounce, no glow) */}
        <div className="-mt-4 flex flex-col items-center">
          <button
            onClick={() => onOpenUpload(null)}
            className="w-10 h-10 rounded-full bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white shadow-2xs border-2 border-white transition-colors flex items-center justify-center cursor-pointer"
            title="Submit Protected Evidence"
          >
            <Camera className="w-4 h-4" />
          </button>
          <span className="text-[10px] font-medium text-slate-700 mt-0.5">Evidence</span>
        </div>

        {/* 4. Cases */}
        <Link
          to="/dashboard?tab=projects"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${isCasesActive ? 'text-teal-800 font-semibold' : 'text-slate-500 hover:text-slate-900'
            }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span>Cases</span>
        </Link>

        {/* 5. Profile */}
        <Link
          to="/dashboard"
          className="flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-mono text-slate-500 hover:text-slate-800 transition-colors"
        >
          <User className="w-5 h-5 mb-0.5 text-slate-400" />
          <span>Profile</span>
        </Link>

      </div>
    </div>
  );
}