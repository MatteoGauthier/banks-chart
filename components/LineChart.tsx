import * as Plot from "@observablehq/plot"
import * as d3 from "d3"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Transaction } from "../lib/types"

export default function LineChart<T>({ chart }: { chart: () => (HTMLElement | SVGSVGElement) & Plot.Plot }) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const plot = useMemo(() => {
    try {
      return chart()
    } catch (error) {
      console.error(error)
    }
  }, [chart])

  useEffect(() => {
    try {
      if (plot) containerRef?.current?.append(plot)
    } catch (error) {
      console.error(error)
    }

    return () => plot?.remove()
  }, [plot])

  return <div ref={containerRef} />
}
