"use client"

import * as React from "react"

/**
 * Soft, theme-aware glow that follows the cursor across the viewport.
 * Falls back to a centered static gradient on touch devices and when
 * users prefer reduced motion.
 */
export function CursorGlow() {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    if (reduceMotion || isCoarse) return

    let frame = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY

    const setVars = (x: number, y: number) => {
      node.style.setProperty("--cursor-x", `${x}px`)
      node.style.setProperty("--cursor-y", `${y}px`)
    }
    setVars(currentX, currentY)

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      setVars(currentX, currentY)
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed inset-0 -z-10"
    />
  )
}
