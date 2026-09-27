import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, ChevronDown, CheckCircle, Database, Megaphone, BarChart3 } from 'lucide-react';
import { MOCK_USER_ROLES } from '../data/mockProjects';

export default function Navbar({
  onOpenUpload,
  onOpenReportNeed,
  onOpenDataMethod,
  currentRole,
  onSelectRole,
  isLiveSupabase
}) {
  const location = useLocation();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const activeRoleObj = MOCK_USER_ROLES.find(r => r.id === currentRole) || MOCK_USER_ROLES[0];

  return (
    <header className="sticky top-0 z-30 bg-white/98 backdrop-blur-md border-b border-slate-200/80 text-slate-900 transition-colors shadow-2xs">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-[5vw]">
        <div className="flex items-center justify-between h-15">

          {/* Brand Logo: Clean Typographic & Institutional */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex flex-col group py-1">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 font-sans group-hover:text-teal-900 transition-colors">
                  ANTICRO
                </span>
                <span className="text-slate-300 font-light text-xs">|</span>
                <span className="text-[11px] px-1.5 py-0.2 rounded-md bg-slate-100 text-slate-700 font-mono font-bold border border-slate-200">
                  CR-1
                </span>
              </div>
              <span className="text-[10px] text-slate-500 hidden sm:inline font-normal leading-tight font-sans">
                Civic Infrastructure Intelligence & Accountability
              </span>
            </Link>

            <div className="hidden xl:flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono border bg-slate-50 border-slate-200 text-slate-600 font-medium">
              <span>BRICS Track 1: DPI</span>
            </div>
          </div>

          {/* Navigation Links - Institutional Command Bar */}
          <nav className="hidden md:flex items-center space-x-0.5 lg:space-x-1">
            <Link
              to="/"
              className={`px-2.5 py-1.5 rounded-md text-xs tracking-tight transition-colors ${location.pathname === '/' || (location.pathname === '/dashboard' && location.search.includes('overview'))
                  ? 'bg-slate-100 text-slate-950 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-medium'
                }`}
            >
              Overview
            </Link>
            <Link
              to="/intelligence"
              className={`px-2.5 py-1.5 rounded-md text-xs tracking-tight transition-colors ${location.pathname === '/intelligence' || (location.pathname === '/dashboard' && location.search.includes('intelligence'))
                  ? 'bg-slate-100 text-slate-950 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-medium'
                }`}
            >
              Intelligence
            </Link>
            <Link
              to="/decision"
              className={`px-2.5 py-1.5 rounded-md text-xs tracking-tight transition-colors ${location.pathname === '/decision' || location.pathname === '/decision-view' || (location.pathname === '/dashboard' && location.search.includes('decision'))
                  ? 'bg-slate-100 text-slate-950 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-medium'
                }`}
            >
              Decision View
            </Link>
            <Link
              to="/dashboard?tab=infrastructure"
              className={`px-2.5 py-1.5 rounded-md text-xs tracking-tight transition-colors ${location.pathname === '/dashboard' && (!location.search || location.search.includes('infrastructure'))
                  ? 'bg-slate-100 text-slate-950 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-medium'
                }`}
            >
              Infrastructure
            </Link>
            <Link
              to="/dashboard?tab=projects"
              className={`px-2.5 py-1.5 rounded-md text-xs tracking-tight transition-colors ${location.pathname.startsWith('/project') || (location.pathname === '/dashboard' && location.search.includes('projects'))
                  ? 'bg-slate-100 text-slate-950 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-medium'
                }`}
            >
              Projects
            </Link>
            <Link
              to="/dashboard?tab=evidence"
              className={`px-2.5 py-1.5 rounded-md text-xs tracking-tight transition-colors flex items-center gap-1 ${location.pathname === '/evidence' || (location.pathname === '/dashboard' && location.search.includes('evidence'))
                  ? 'bg-slate-100 text-slate-950 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-medium'
                }`}
            >
              <Camera className="w-3.5 h-3.5 text-slate-500" />
              <span>Evidence</span>
            </Link>
            <Link
              to="/dashboard?tab=data"
              className={`px-2.5 py-1.5 rounded-md text-xs tracking-tight transition-colors flex items-center gap-1 ${location.pathname === '/data' || (location.pathname === '/dashboard' && location.search.includes('data'))
                  ? 'bg-slate-100 text-slate-950 font-semibold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-medium'
                }`}
              title="View Data Provenance & Priority Methodology"
            >
              <Database className="w-3.5 h-3.5 text-slate-500" />
              <span>Data & Method</span>
            </Link>
          </nav>

          {/* Actions: Report Need | Citizen Role | English | Profile Dropdown */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenReportNeed}
              className="inline-flex items-center space-x-1.5 bg-teal-800 hover:bg-teal-900 text-white font-semibold px-3 py-1.5 rounded-md text-xs shadow-xs transition-colors cursor-pointer border border-teal-900 tracking-tight"
            >
              <Megaphone className="w-3.5 h-3.5" />
              <span>Report Need</span>
            </button>

            {/* Role Tag (Citizen) */}
            <div className="hidden sm:inline-flex items-center px-2 py-1 rounded-md text-[11px] font-mono font-medium bg-slate-50 border border-slate-200 text-slate-700">
              <span className="capitalize">{activeRoleObj.role || 'Citizen'}</span>
            </div>

            {/* Language Tag (English) */}
            <div className="hidden lg:inline-flex items-center px-2 py-1 rounded-md text-[11px] font-mono text-slate-600 bg-slate-50 border border-slate-200" title="Supported: English, Hindi, and 6 Regional Indian Languages">
              <span>English</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer shadow-2xs"
                title="Profile & Simulated User Role"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                <div className="flex flex-col text-left">
                  <span className="text-slate-400 text-[9px] uppercase font-mono font-semibold tracking-wider">Profile</span>
                  <span className="font-mono text-slate-800 text-[11px] font-medium leading-none">{activeRoleObj.pseudonym}</span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-card py-1.5 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] text-slate-400 uppercase font-semibold tracking-wider">
                    Simulate User Role
                  </div>
                  {MOCK_USER_ROLES.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        onSelectRole(role.id);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-50 transition-colors cursor-pointer ${currentRole === role.id ? 'bg-slate-50/80 text-teal-800 font-medium' : 'text-slate-700'
                        }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-slate-900">{role.name}</span>
                        <span className="text-[11px] font-mono text-slate-400">{role.pseudonym}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        {role.status === 'verification_pending' ? (
                          <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded">
                            Pending
                          </span>
                        ) : (
                          <span className="text-[10px] bg-slate-100 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded">
                            Active
                          </span>
                        )}
                        {currentRole === role.id && <CheckCircle className="w-3.5 h-3.5 text-teal-700" />}
                      </div>
                    </button>
                  ))}
                  <div className="px-3 pt-2 mt-1 border-t border-slate-100 text-[10px] text-slate-400">
                    * Raw identities are shielded under rule #9. Pseudonyms are used publicly.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}