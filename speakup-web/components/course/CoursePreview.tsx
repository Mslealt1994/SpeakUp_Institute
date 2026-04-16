/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import { useEffect, useState, useRef } from "react";
import Button from "@/components/ui/Button";
import demoCourse from "@/content/course/demoCourse.json";

interface CoursePreviewProps {
  onClose: () => void;
}

export default function CoursePreview({ onClose }: CoursePreviewProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastLesson = currentIndex === demoCourse.length - 1;
  const isAdvancingRef = useRef(false);

  const handleNext = () => {
    if (isLastLesson || isAdvancingRef.current) return;
    isAdvancingRef.current = true;
    setCurrentIndex((prev) => {
      setTimeout(() => {
        isAdvancingRef.current = false;
      }, 500);
      return prev + 1;
    });
  };

  return (
    <section className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-0 md:p-6">
      <div className="bg-[#1c1c1e] w-full h-full md:h-[92vh] max-w-screen-2xl rounded-none md:rounded-2xl shadow-2xl border border-white/10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
        {/* Barra de título macOS */}
        <div className="h-12 bg-[#2c2c2e] flex flex-row-reverse items-center justify-between px-6 border-b border-white/5 shrink-0">
          <div className="flex gap-2.5">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29]" />
            {/* CORRECCIÓN: div → button para accesibilidad */}
            <button
              onClick={onClose}
              aria-label="Cerrar preview"
              className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] cursor-pointer hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            />
          </div>
          <div className="flex-1 text-center pr-16">
            <span className="text-[12px] text-gray-400 font-mono uppercase tracking-[0.2em]">
              PROYECTO: VISION_SPEAKUP // MÓDULO: 1
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#161617]">
          <div className="max-w-7xl mx-auto p-6 md:p-12">
            {/* ============================================================
                ZONA: VIDEO / PLACEHOLDER (ULTRA-TECH EDITION)
               ============================================================ */}
            <div className="w-full aspect-video bg-[#0a0a0b] rounded-xl border border-white/10 shadow-[0_0_60px_-15px_rgba(0,0,0,0.7)] mb-12 relative overflow-hidden group">
              {/* 1. Fondo de Malla (Grid) sutil */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />
              {/* 2. Esquinas Decorativas (HUD) */}
              <div className="absolute inset-0 p-4 pointer-events-none">
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-sm" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-sm" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-sm" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-sm" />
              </div>

              {/* 3. Contenido Central */}
              {/* CORRECCIÓN: bg-radial-gradient (clase inexistente) → gradient inline via style */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(88,204,2,0.08) 0%, transparent 70%)",
                }}
              >
                {/* Glitch Loader */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 border border-primary/20 rounded-full animate-ping absolute inset-0" />
                  <div className="w-16 h-16 border-t-2 border-primary rounded-full animate-spin" />
                </div>

                <div className="text-center space-y-2 z-20">
                  <div className="text-primary font-mono text-xs tracking-[0.4em] uppercase animate-pulse">
                    {`> CONNECTING_TO_CORE_STREAM`}
                  </div>
                  <div className="text-white/20 font-mono text-[10px] uppercase tracking-widest">
                    Buffer: {demoCourse[currentIndex].id} // Latency: 24ms
                  </div>
                </div>
              </div>

              {/* 4. Decoración Lateral (Metadata sim) */}
              <div className="absolute bottom-6 left-8 hidden md:block">
                <div className="flex gap-4">
                  <div className="h-8 w-px bg-primary/40" />
                  <div className="flex flex-col justify-center">
                    <span className="text-[9px] text-primary/60 font-mono leading-none">
                      REC
                    </span>
                    <span className="text-[11px] text-white/80 font-mono font-bold leading-none uppercase">
                      Live_Preview
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* ============================================================ */}

            {/* ============================================================
                ZONA: CONTENIDO INTERACTIVO (Full Width Layout)
               ============================================================ */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
              {/* Info de Lección (8 columnas) */}
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 rounded-full bg-primary text-black text-[10px] font-black uppercase tracking-tighter">
                      Preview Activo
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <h2 className="text-5xl md:text-6xl font-heading italic font-black text-white leading-[0.95] tracking-tighter">
                    {demoCourse[currentIndex].title}
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Duración", val: "12:00 min" },
                    { label: "Nivel", val: "Basic" },
                    { label: "Formato", val: "Interactive" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/2 border border-white/5"
                    >
                      <p className="text-[10px] text-white/30 uppercase font-mono mb-1">
                        {item.label}
                      </p>
                      <p className="text-white font-medium">{item.val}</p>
                    </div>
                  ))}
                </div>

                <div className="max-w-none">
                  <p className="text-xl text-white/50 italic border-l-2 border-primary pl-6">
                    La evolución no es un cambio de herramientas, es un cambio
                    de perspectiva. En esta lección aprenderás por qué el método
                    tradicional ha fallado y cómo esta nueva arquitectura mental
                    acelerará tu aprendizaje.
                  </p>
                </div>
              </div>

              {/* Sidebar de Progreso (4 columnas) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-2xl bg-[#1c1c1e] border border-white/10 sticky top-0">
                  <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.2em] mb-6 flex justify-between">
                    <span>Contenido del Curso</span>
                    <span className="text-primary">
                      {currentIndex + 1} / {demoCourse.length}
                    </span>
                  </p>

                  <div className="space-y-3">
                    {demoCourse.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className={`group p-4 rounded-xl border transition-all cursor-default ${
                          index === currentIndex
                            ? "bg-primary border-primary text-black shadow-[0_0_20px_rgba(88,204,2,0.3)]"
                            : "bg-white/2 border-white/5 text-white/40 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs font-bold opacity-50">
                            0{index + 1}
                          </span>
                          <p className="text-sm font-bold truncate flex-1">
                            {lesson.title}
                          </p>
                          {index === currentIndex && (
                            <div className="w-2 h-2 rounded-full bg-black animate-ping" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/10">
              <div className="flex items-center gap-6">
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={isLastLesson}
                >
                  {isLastLesson ? "Finalizar Experiencia" : "Siguiente Lección"}
                </Button>
                <Button variant="secondary" onClick={onClose}>
                  Cerrar Preview
                </Button>
              </div>

              <div className="flex flex-col items-end gap-2">
                <p className="text-white/20 text-[11px] font-mono uppercase tracking-[0.3em]">
                  Dominio de la habilidad
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-64 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary shadow-[0_0_15px_rgba(88,204,2,0.5)] transition-all duration-700 ease-out"
                      style={{
                        width: `${((currentIndex + 1) / demoCourse.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-primary font-mono font-bold text-sm">
                    {Math.round(((currentIndex + 1) / demoCourse.length) * 100)}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
