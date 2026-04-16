/* eslint-disable react/no-unescaped-entities */
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { SpeakUpIcons, SpeakUpIconKey } from "@/lib/icon-map";
import Button from "@/components/ui/Button";

const Box = ({
  label,
  className = "bg-primary/20",
}: {
  label: string;
  className?: string;
}) => (
  <div
    className={`flex items-center justify-center p-4 rounded border border-primary/30 font-mono text-[10px] text-primary ${className}`}
  >
    {label}
  </div>
);

export default function ComponentsGallery() {

  if(process.env.NODE_ENV === "production"){
    notFound();
  };

  const iconKeys = Object.keys(SpeakUpIcons) as SpeakUpIconKey[];

  // Helper para las cajas visuales del Container

  return (
    <div className="my-12 p-8 bg-soft min-h-screen space-y-16">
      {/* --- HEADER --- */}
      <header>
        <h1 className="text-secondary uppercase tracking-tight">
          Design System Gallery
        </h1>
        <p className="text-gray-medium mt-2 lead">
          Biblioteca de componentes reutilizables y activos para SpeakUp
          Institute.
        </p>
      </header>

      {/* --- SECCIÓN: CONTAINERS & LAYOUT --- */}
      <section className="space-y-12">
        <div className="flex items-center gap-3 mb-8">
          <SpeakUpIcons.dashboard className="text-primary" size={24} />
          <h2 className="text-2xl font-bold italic m-0 text-secondary">
            Layout Containers
          </h2>
        </div>

        <div className="space-y-12 bg-white p-8 rounded-2xl border border-line shadow-sm">
          {/* 1. ANCHOS DE CONTENEDOR (Default, MD, SM) */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-gray-medium uppercase tracking-widest border-b border-line pb-2">
              Anchos de Contenedor (Standard Widths)
            </h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  variant="default" (max-w-7xl)
                </span>
                <Container className="bg-soft border border-dashed border-line py-4">
                  <Box label="Default Container" className="w-full" />
                </Container>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  variant="md" (max-w-4xl)
                </span>
                <Container
                  variant="md"
                  className="bg-soft border border-dashed border-line py-4"
                >
                  <Box
                    label="Medium Container (Blog/Articles)"
                    className="w-full"
                  />
                </Container>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  variant="sm" (max-w-2xl)
                </span>
                <Container
                  variant="sm"
                  className="bg-soft border border-dashed border-line py-4"
                >
                  <Box
                    label="Small Container (Forms/Auth)"
                    className="w-full"
                  />
                </Container>
              </div>
            </div>
          </div>

          {/* 2. GRIDS DINÁMICOS */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-gray-medium uppercase tracking-widest border-b border-line pb-2">
              Grids de Columnas Equitativas
            </h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  variant="2-col"
                </span>
                <Container
                  variant="2-col"
                  className="bg-soft border border-dashed border-line py-4"
                >
                  <Box label="Column 1" /> <Box label="Column 2" />
                </Container>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  variant="3-col"
                </span>
                <Container
                  variant="3-col"
                  className="bg-soft border border-dashed border-line py-4"
                >
                  <Box label="Column 1" /> <Box label="Column 2" />{" "}
                  <Box label="Column 3" />
                </Container>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  variant="4-col"
                </span>
                <Container
                  variant="4-col"
                  className="bg-soft border border-dashed border-line py-4"
                >
                  <Box label="C1" /> <Box label="C2" /> <Box label="C3" />{" "}
                  <Box label="C4" />
                </Container>
              </div>
            </div>
          </div>

          {/* 3. LAYOUTS ESPECIALES (Sidebars & Golden) */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-gray-medium uppercase tracking-widest border-b border-line pb-2">
              Layouts Proporcionales (Sidebars & Golden Ratio)
            </h4>
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  variant="sidebar" (1/3 + 2/3)
                </span>
                <Container
                  variant="sidebar"
                  className="bg-soft border border-dashed border-line py-4"
                >
                  <Box
                    label="Aside"
                    className="bg-secondary/10 border-secondary/20 text-secondary"
                  />
                  <Box label="Main Content" />
                </Container>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  variant="sidebar-right" (2/3 + 1/3)
                </span>
                <Container
                  variant="sidebar-right"
                  className="bg-soft border border-dashed border-line py-4"
                >
                  <Box label="Main Content" />
                  <Box
                    label="Aside"
                    className="bg-secondary/10 border-secondary/20 text-secondary"
                  />
                </Container>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  variant="golden" (1 : 1.618)
                </span>
                <Container
                  variant="golden"
                  className="bg-soft border border-dashed border-line py-4"
                >
                  <Box
                    label="Minor"
                    className="bg-accent/10 border-accent/20 text-accent"
                  />
                  <Box label="Major (Golden Area)" />
                </Container>
              </div>
            </div>
          </div>

          {/* 4. FULLBLEED VARIANTS */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-gray-medium uppercase tracking-widest border-b border-line pb-2">
              Fullbleed (Edge-to-Edge)
            </h4>
            <div className="space-y-8">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  variant="fullbleed" (Centered inner)
                </span>
                <Container variant="fullbleed" className="bg-secondary py-6">
                  <Box
                    label="I'm centered but my background is infinite"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </Container>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  variant="fullbleed-raw" (No inner container)
                </span>
                <Container
                  variant="fullbleed-raw"
                  className="bg-accent py-4 px-10"
                >
                  <div className="flex justify-between items-center text-white font-bold italic">
                    <span>RAW CONTENT</span>
                    <span>NO LIMITS</span>
                    <span>EDGE TO EDGE</span>
                  </div>
                </Container>
              </div>
            </div>
          </div>

          {/* 5. PROPS DE ESPACIADO (GAP & PY) */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-gray-medium uppercase tracking-widest border-b border-line pb-2">
              Spacing Controls (Gap & Padding Vertical)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  gap="gap-2" (Tight)
                </span>
                <Container
                  variant="4-col"
                  gap="gap-2"
                  className="bg-soft border border-line py-4"
                >
                  <Box label="1" /> <Box label="2" /> <Box label="3" />{" "}
                  <Box label="4" />
                </Container>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400">
                  py="py-12" (Section Spacing)
                </span>
                <Container
                  variant="default"
                  py="py-12"
                  className="bg-soft border border-line"
                >
                  <Box
                    label="Container with Large Vertical Padding"
                    className="w-full"
                  />
                </Container>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN: INTERACTIVE BUTTONS --- */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <SpeakUpIcons.quickTip className="text-primary" size={24} />
          <h2 className="text-2xl font-bold italic m-0 text-secondary">
            Interactive Buttons
          </h2>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-line shadow-sm space-y-12">
          {/* 1. Variantes de Color */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-medium uppercase tracking-widest border-b border-line pb-2">
              Core Variants
            </h4>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="neutral">Neutral Main</Button>
              <Button variant="warning">Warning Tip</Button>
              <Button variant="danger">Delete / Danger</Button>
              <Button variant="social" icon="google" className="bg-white">
                Sign with Google
              </Button>
            </div>
          </div>

          {/* 2. Comportamiento de Iconos */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-medium uppercase tracking-widest border-b border-line pb-2">
              Icon Integration
            </h4>
            <div className="flex flex-wrap gap-4 text-secondary">
              <Button variant="primary" icon="academy">
                Academy Portal
              </Button>
              <Button
                variant="secondary"
                icon="arrowRight"
                iconPosition="right"
              >
                Get Started
              </Button>
              <Button variant="neutral" icon="download">
                Download PDF
              </Button>
              <Button variant="ghost" icon="settings">
                Configure
              </Button>
            </div>
          </div>

          {/* 3. Estados Especiales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Ghost & Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-medium uppercase tracking-widest border-b border-line pb-2">
                Ghost & Links
              </h4>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="ghost">Ghost Button</Button>
                <div className="bg-secondary p-4 rounded-xl">
                  <Button variant="ghost-light">Ghost Light (on dark)</Button>
                </div>
              </div>
            </div>

            {/* Disabled & Full Width */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-medium uppercase tracking-widest border-b border-line pb-2">
                Disabled State
              </h4>
              <div className="flex flex-wrap gap-4">
                <Button variant="disabled">Action Disabled</Button>
                <Button variant="primary" disabled>
                  Native Disabled
                </Button>
              </div>
            </div>
          </div>

          {/* 4. Layout: Full Width */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gray-medium uppercase tracking-widest border-b border-line pb-2">
              Width Control
            </h4>
            <div className="max-w-md space-y-2">
              <span className="text-[10px] font-mono text-slate-400">
                fullWidth=&#123;true&#125;
              </span>
              <Button variant="primary" fullWidth icon="premium">
                Upgrade to Premium Plan
              </Button>
            </div>
          </div>

          {/* Nota Técnica */}
          <div className="bg-soft p-4 rounded-xl border-l-4 border-primary">
            <p className="text-xs text-main leading-relaxed">
              <strong>Technical Note:</strong> Este componente es polimórfico.
              Si incluyes una prop <code>href</code>, se renderiza
              automáticamente como un componente <code>Link</code> de Next.js.
              Si el href empieza con <code>#</code>, activa el{" "}
              <strong>Smooth Scroll</strong> integrado.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN: ICONOS --- */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <SpeakUpIcons.academy className="text-primary" size={24} />
          <h2 className="text-2xl font-bold italic m-0">Icon Library</h2>
        </div>

        {/* REGLAS DE ICONOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-line">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Tamaños Estándar
            </h3>
            <div className="flex items-end gap-6 text-secondary">
              <div className="text-center">
                <SpeakUpIcons.academy size={16} />
                <span className="text-[10px] text-gray-medium block mt-1">
                  16px
                </span>
              </div>
              <div className="text-center">
                <SpeakUpIcons.academy size={20} />
                <span className="text-[10px] text-gray-medium block mt-1">
                  20px
                </span>
              </div>
              <div className="text-center">
                <SpeakUpIcons.academy size={24} />
                <span className="text-[10px] text-gray-medium block mt-1">
                  24px
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-line">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Colores de Marca
            </h3>
            <div className="flex gap-4">
              <SpeakUpIcons.quickTip size={28} className="text-primary" />
              <SpeakUpIcons.academy size={28} className="text-secondary" />
              <SpeakUpIcons.premium size={28} className="text-accent" />
              <SpeakUpIcons.warning size={28} className="text-amber-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-line">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
              Stroke Weights
            </h3>
            <div className="flex gap-8 text-secondary">
              <div className="text-center">
                <SpeakUpIcons.lab size={28} strokeWidth={2} />
                <span className="text-[10px] text-gray-medium block mt-1">
                  REGULAR
                </span>
              </div>
              <div className="text-center">
                <SpeakUpIcons.lab size={28} strokeWidth={2.5} />
                <span className="text-[10px] text-gray-medium block mt-1">
                  BOLD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* GRILLA DE ICONOS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {iconKeys.map((key) => {
            const Icon = SpeakUpIcons[key];
            return (
              <div
                key={key}
                className="flex flex-col items-center p-6 bg-white rounded-xl border border-line hover:border-primary transition-all group"
              >
                <div className="mb-4 text-main group-hover:text-primary group-hover:scale-110 transition-transform">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <code className="text-[10px] font-mono bg-soft px-2 py-1 rounded text-gray-medium w-full text-center truncate">
                  {key}
                </code>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="text-center text-gray-medium text-[10px] uppercase tracking-[0.2em] pt-16">
        SpeakUp Institute &copy; 2026 — Design System v1.0
      </footer>
    </div>
  );
}
