export default function AudioWave() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="flex items-end gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-4 w-1 animate-pulse bg-purple-600"
            style={{
              animation: `audioWave 1s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
              height: `${Math.random() * 16 + 8}px`
            }}
          />
        ))}
      </div>
    </div>
  );
}