import { Link } from "react-router-dom";

const PLACEHOLDER = "/images/placeholder.jpg";

export default function PlantCard({ tanaman }) {
  return (
    <div className="plant-card bg-white rounded-3xl md:rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
      <div className="h-40 md:h-64 relative overflow-hidden bg-slate-100">
        <img
          src={tanaman.foto}
          alt={tanaman.nama_lokal}
          className="plant-img w-full h-full object-cover transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER;
            e.currentTarget.onerror = null;
          }}
        />
      </div>
      <div className="p-4 md:p-8 flex flex-col flex-grow">
        <h4 className="text-sm md:text-xl font-black text-slate-900 leading-tight mb-1 truncate">
          {tanaman.nama_lokal}
        </h4>
        <p className="text-emerald-600 italic font-bold mb-4 md:mb-5 text-[9px] md:text-sm truncate leading-none">
          {tanaman.nama_latin}
        </p>
        <div className="mt-auto">
          <Link
            to={`/tanaman/${tanaman.id}`}
            className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg"
          >
            <span>Detail</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
