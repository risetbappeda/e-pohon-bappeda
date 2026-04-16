import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import PlantCard from "../components/PlantCard";
import { tanamanData } from "../data/tanaman";

export default function Home() {
  const [query, setQuery] = useState("");
  const katalogRef = useRef(null);

  const filtered = tanamanData.filter((t) => {
    const q = query.toLowerCase();
    return (
      t.nama_lokal.toLowerCase().includes(q) ||
      t.nama_latin.toLowerCase().includes(q) ||
      t.klasifikasi.toLowerCase().includes(q)
    );
  });

  const scrollToKatalog = () => {
    katalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <header className="min-h-screen flex flex-col items-center justify-center px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/kantor-bappeda.jpeg"
            alt="Kantor Bappeda Sleman"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 animate-fade-in-up pt-16 pb-16">
          <span className="inline-block bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-emerald-500/30">
            E-Pohon BAPPEDA SLEMAN
          </span>
          <h2 className="text-4xl md:text-7xl font-black mb-6 leading-tight tracking-tighter">
            Digitalisasi Flora <br />
            <span className="text-emerald-400">Bappeda Sleman</span>
          </h2>
          <p className="text-emerald-100/70 text-sm md:text-xl mb-8 max-w-2xl mx-auto font-medium leading-relaxed italic">
            Platform informasi digital untuk edukasi dan pendataan aset flora di
            lingkungan Bappeda Kabupaten Sleman.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
            <div className="relative w-full group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-600 group-focus-within:text-emerald-400 transition-colors">
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && scrollToKatalog()}
                placeholder="Cari nama tanaman..."
                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white text-slate-900 shadow-2xl outline-none focus:ring-4 focus:ring-emerald-500/40 transition-all font-semibold text-sm"
                autoComplete="off"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={scrollToKatalog}
                className="flex-1 md:flex-none px-8 py-4 bg-white text-emerald-700 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-emerald-50 transition-all whitespace-nowrap active:scale-95"
              >
                Cari
              </button>
              <button
                onClick={scrollToKatalog}
                className="flex-1 md:flex-none px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-900/40 hover:bg-emerald-400 transition-all whitespace-nowrap flex items-center justify-center active:scale-95"
              >
                Katalog
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToKatalog}
          className="animate-bounce-y absolute bottom-10 left-1/2 text-emerald-300/50 bg-transparent border-none cursor-pointer"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7-7-7"
            />
          </svg>
        </button>
      </header>

      {/* KATALOG */}
      <main
        ref={katalogRef}
        id="katalog"
        className="max-w-6xl mx-auto px-2 md:px-6 py-24"
      >
        <div className="text-center mb-8 px-4">
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tighter">
            Koleksi Tanaman
          </h3>
          <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
          <p className="text-slate-400 text-sm mt-4">
            {tanamanData.length} tanaman terdaftar
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-slate-400 py-12 text-sm">
            Tanaman tidak ditemukan.
          </p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
            {filtered.map((t) => (
              <PlantCard key={t.id} tanaman={t} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-12 px-6 text-center mt-8">
        <div className="flex flex-col items-center gap-4 mb-6">
          {/* Kalimat Singkat */}
          <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-[0.1em]">
            Terinspirasi dari Inovasi E-Pohon{" "}
            <span className="text-emerald-600">
              SMP Negeri 2 Ngemplak (2023)
            </span>
          </p>

          <div className="flex items-center justify-center gap-3">
            <img
              src="/images/logo-sleman.png"
              alt="Logo Sleman"
              className="h-7 w-auto grayscale opacity-40"
            />
            <div className="h-5 w-[1px] bg-slate-200" />
            <span className="text-[9px] font-black tracking-widest uppercase text-slate-400">
              Bappeda Kabupaten Sleman
            </span>
          </div>
        </div>

        <p className="text-slate-300 text-[8px] font-bold tracking-[0.2em] uppercase italic">
          © {new Date().getFullYear()} • E-Pohon Bappeda Sleman
        </p>
      </footer>
    </div>
  );
}
