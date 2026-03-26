const Loader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="relative">
      {/* Outer spinning ring */}
      <div className="w-16 h-16 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
      {/* Inner pulsing dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" />
      </div>
    </div>
  </div>
)

export default Loader
