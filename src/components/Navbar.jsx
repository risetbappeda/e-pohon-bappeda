import { Link, useLocation } from "react-router-dom";

export default function Navbar({ isDetail = false }) {
  return (
    <nav className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isDetail ? (
            <Link
              to="/"
              className="flex items-center gap-1 text-emerald-700 font-bold hover:bg-emerald-50 px-2 py-1.5 rounded-lg transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-sm font-bold">Beranda</span>
            </Link>
          ) : (
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/images/logo-sleman.png"
                alt="Logo Sleman"
                className="h-9 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <div className="flex flex-col">
                <h1 className="text-sm font-extrabold tracking-tight leading-none text-slate-900">
                  PUSPA
                </h1>
                <p className="text-[7px] font-black text-emerald-600 uppercase tracking-widest mt-1.5 leading-none">
                  Bappeda Sleman
                </p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
