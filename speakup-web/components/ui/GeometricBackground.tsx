export default function GeometricBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

      {/* Blobs de color — esquinas */}
      <div className="absolute -top-1 -right-1 w-48 h-48 rotate-45 rounded-2xl bg-linear-0 from-sky-950 to-sky-500 blur-2xl sm:w-72 sm:h-72" />
      <div className="absolute -bottom-1 -left-1 w-48 h-48 rotate-45 rounded-2xl bg-linear-0 from-green-400 to-green-950 blur-2xl sm:w-72 sm:h-72" />

      {/* Rombos decorativos — derecha */}
      <div className="absolute top-[20%] -right-16 opacity-70 hidden sm:block">
        <div className="absolute top-20 right-12 w-40 h-40 rotate-45 border-2 border-sky-400/35 rounded-2xl" />
        <div className="absolute top-52 right-36 w-16 h-16 rotate-45 border-2 border-sky-500/45 rounded-lg" />
      </div>

      {/* Rombos decorativos — izquierda */}
      <div className="absolute bottom-[15%] -left-20 opacity-70 hidden sm:block">
        <div className="absolute bottom-24 left-28 w-44 h-44 rotate-45 border-2 border-green-400/35 rounded-2xl" />
        <div className="absolute bottom-56 left-52 w-20 h-20 rotate-45 border-2 border-green-400/45 rounded-lg" />
      </div>

    </div>
  )
}