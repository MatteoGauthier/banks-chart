import { useState, ChangeEvent } from "react"
import { parseCSV } from "../lib/csv"
import * as Plot from "@observablehq/plot"
import LineChart from "../components/LineChart"
import { Transaction } from "../lib/types"
import HeatMap from "../components/HeatMap"

export default function Home() {
  const [csvData, setCsvData] = useState<string>()

  const [json, setJson] = useState<Transaction[]>()

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setCsvData(text)
    }
    reader.readAsText(file)
  }

  const handleParse = () => {
    if (!csvData) return
    const json = parseCSV(csvData)
    console.log("🚀 ~ file: index.tsx:26 ~ json:", json)
    setJson(json)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload a CSV file</h1>
      <input type="file" onChange={handleFileUpload} />
      <button className={"px-4 py-2 bg-blue-600 text-white"} onClick={handleParse}>
        Parse CSV
      </button>
      {json && (
        <LineChart
          chart={() =>
            Plot.plot({
              marks: [
                Plot.ruleY([0]),
                Plot.axisX({ ticks: "month" }),
                Plot.gridX(),
                Plot.lineY(json, { x: "Date", y: "balance", stroke: "steelblue", tip: "x" }),
                // Plot.barY(data, { x: "Date", y: "balance", sort: { x: "y", reverse: true }, tip: "x" }),
              ],
              width: 1000,
            })
          }
        />
      )}
      {json && (
        <LineChart
          chart={() =>
            Plot.plot({
              y: {
                grid: true,
                tickFormat: "+f",
              },
              color: {
                scheme: "BuRd",
                legend: true,
              },
              marks: [Plot.ruleY([0]), Plot.dot(json, { x: "Date", y: "balance", stroke: "amountType" })],
            })
          }
        />
      )}
      {json && <HeatMap data={json} />}
    </div>
  )
}
