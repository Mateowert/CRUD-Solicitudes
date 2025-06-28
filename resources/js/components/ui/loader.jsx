import { cn } from "@/lib/utils"

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
}

const colorClasses = {
  primary: "text-blue-600",
  secondary: "text-gray-600",
  white: "text-white",
  gray: "text-gray-400",
}

export default function Loader({ variant = "spinner", size = "md", color = "primary", className }) {
  const baseClasses = cn(sizeClasses[size], colorClasses[color], className)

  const renderSpinner = () => (
    <div className={cn(baseClasses, "animate-spin")}>
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "rounded-full animate-pulse",
            size === "sm" ? "w-1 h-1" : size === "md" ? "w-2 h-2" : size === "lg" ? "w-3 h-3" : "w-4 h-4",
            colorClasses[color].replace("text-", "bg-"),
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: "1.4s",
          }}
        />
      ))}
    </div>
  )

  const renderBars = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse",
            size === "sm" ? "w-1" : size === "md" ? "w-1.5" : size === "lg" ? "w-2" : "w-3",
            colorClasses[color].replace("text-", "bg-"),
          )}
          style={{
            height: `${20 + i * 10}%`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: "1.2s",
          }}
        />
      ))}
    </div>
  )

  const renderPulse = () => (
    <div className={cn(baseClasses, "animate-pulse rounded-full", colorClasses[color].replace("text-", "bg-"))} />
  )

  const renderRing = () => (
    <div className={cn(baseClasses, "animate-spin")}>
      <div className="w-full h-full rounded-full border-4 border-gray-200">
        <div
          className={cn("w-full h-full rounded-full border-4 border-transparent border-t-current", colorClasses[color])}
        />
      </div>
    </div>
  )

  switch (variant) {
    case "dots":
      return renderDots()
    case "bars":
      return renderBars()
    case "pulse":
      return renderPulse()
    case "ring":
      return renderRing()
    default:
      return renderSpinner()
  }
}

// Componente de página completa con overlay
export function FullPageLoader({ variant = "spinner", size = "lg", message = "Cargando...", overlay = true }) {
  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center z-50",
        overlay ? "bg-white/80 backdrop-blur-sm" : "",
      )}
    >
      <Loader variant={variant} size={size} />
      {message && <p className="mt-4 text-sm text-gray-600 font-medium">{message}</p>}
    </div>
  )
}

// Componente inline para botones
export function ButtonLoader({ size = "sm" }) {
  return <Loader variant="spinner" size={size} color="white" className="mr-2" />
}
