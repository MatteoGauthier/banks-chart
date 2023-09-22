import * as Plot from "@observablehq/plot"
import * as d3 from "d3"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Transaction } from "../lib/types"

export default function HeatMap<T>({ data }: { data: Transaction[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const plot = useMemo(() => {
    try {
      const chart = Plot.rectY(
        data,
        Plot.binX(
          { y: "sum" },
          // @ts-ignore
          { x: "Date", y: (d) => (Number(d.Amount) > 0 ? 1 : -1), fill: "amountType", tip: true, interval: "week" }
        )
      ).plot({ y: { label: "Frequency" } })
      return chart
    } catch (error) {
      console.error(error)
    }
  }, [data])

  useEffect(() => {
    try {
      if (plot) containerRef?.current?.append(plot)
    } catch (error) {
      console.error(error)
    }

    return () => plot?.remove()
  }, [data, plot])

  return <div ref={containerRef} />
}
