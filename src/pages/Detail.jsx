import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { tanamanData } from "../data/tanaman";

const PLACEHOLDER = "/images/placeholder.jpg";

export default function Detail() {
  const { id } = useParams();
  const tanaman = tanamanData.find((t) => t.id === id);

  // Scroll ke atas setiap buka halaman detail
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Update meta tag untuk OG (open graph) tiap ganti tanaman
  useEffect(() => {
    if (!tanaman) return;
    document.title = `${tanaman.nama_lokal} - PUSPA Bappeda Sleman`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = tanaman.mengenal;
  }, [tanaman]);

  if (!tanaman) return <Navigate to="/" replace />;

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar isDetail />

      <main className="max-w-3xl mx-auto pt-20 pb-12 px-4">
        <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-xl overflow-hidden border border-slate-100">
          {/* FOTO HERO */}
          <div className="relative h-[250px] md:h-[450px] bg-slate-100">
            <img
              src={tanaman.foto}
              alt={tanaman.nama_lokal}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = PLACEHOLDER;
                e.currentTarget.onerror = null;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-3xl md:text-5xl font-black mb-1 leading-tight tracking-tighter">
                {tanaman.nama_lokal}
              </h2>
              <p className="text-lg md:text-xl text-emerald-400 italic font-medium leading-none">
                {tanaman.nama_latin}
              </p>
            </div>
          </div>

          <div className="p-6 md:p-12 space-y-10">
            {/* INFO GRID */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-emerald-50 transition-colors">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">
                  Klasifikasi
                </p>
                <p className="text-xs md:text-sm font-bold text-slate-700">
                  {tanaman.klasifikasi}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:bg-emerald-50 transition-colors">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none">
                  Daerah Asal
                </p>
                <p className="text-xs md:text-sm font-bold text-slate-700">
                  {tanaman.asal}
                </p>
              </div>
            </div>

            {/* MENGENAL */}
            <section>
              <h3 className="text-sm font-black text-slate-900 mb-3 uppercase tracking-wider flex items-center gap-2">
                <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                Mengenal Tanaman Ini
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base text-justify">
                {tanaman.mengenal}
              </p>
            </section>

            {/* MANFAAT */}
            <section>
              <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                Manfaat Utama
              </h3>
              <div className="space-y-3">
                {tanaman.manfaat.map((m, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <span className="mt-0.5 w-5 h-5 flex-shrink-0 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-[9px] font-black">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-0.5">
                        {m.kategori}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {m.isi}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PERAWATAN */}
            <section>
              <h3 className="text-sm font-black text-slate-900 mb-3 uppercase tracking-wider flex items-center gap-2">
                <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                Tips Perawatan
              </h3>
              <div className="bg-emerald-50 p-6 rounded-2xl text-emerald-900 text-sm md:text-base italic leading-relaxed">
                {tanaman.perawatan}
              </div>
            </section>

            {/* DAFTAR PUSTAKA (DENGAN LINK AKTIF) */}
            {tanaman.daftar_pustaka && (
              <section className="pt-4">
                <h3 className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                  Daftar Pustaka
                </h3>
                <div className="space-y-3">
                  {tanaman.daftar_pustaka.map((pustaka, idx) => {
                    // Logika untuk memisahkan teks dan link (mencari kata "http")
                    const splitIndex = pustaka.indexOf("http");
                    const textPart =
                      splitIndex !== -1
                        ? pustaka.substring(0, splitIndex)
                        : pustaka;
                    const linkPart =
                      splitIndex !== -1 ? pustaka.substring(splitIndex) : null;

                    return (
                      <p
                        key={idx}
                        className="text-[10px] md:text-xs text-slate-400 italic leading-relaxed"
                      >
                        • {textPart}
                        {linkPart && (
                          <a
                            href={linkPart}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-500 hover:text-emerald-700 underline break-all ml-1"
                          >
                            {linkPart}
                          </a>
                        )}
                      </p>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* NAVIGASI BALIK */}
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-emerald-700 font-bold text-sm hover:underline"
          >
            <svg
              className="w-4 h-4"
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
            Lihat semua tanaman
          </Link>
        </div>
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
