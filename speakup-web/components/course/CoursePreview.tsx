// CoursePreview.tsx — Versión Refactorizada
export default function CoursePreview() {
  return (
    <div className="w-full isolate">
      <div className="relative border-2 border-slate-200 rounded-2xl bg-slate-50 overflow-hidden shadow-sm">
        {/* Capa de Cuadrícula */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="relative z-10">
          {/* Barra Superior */}
          <div className="bg-slate-200/50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
              <div className="w-3 h-3 rounded-full bg-slate-300"></div>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Module_Assembler_v1.0
            </span>
          </div>

          {/* Reducimos el padding interno para que no "explote" dentro de la columna móvil */}
          <div className="p-6 md:p-10 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center font-mono text-sm text-slate-400">
                {`{ }`}
              </div>
            </div>

            <div className="max-w-md space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                Compilando...
              </h2>

              <div className="bg-slate-900 text-primary font-mono text-[10px] p-3 rounded-lg text-left shadow-lg w-full">
                <div className="flex gap-2">
                  <span className="animate-pulse">{`> SYNC_MANUALS`}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-slate-400 italic">
                    "Language assembly..."
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
