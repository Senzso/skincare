"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf } from "lucide-react"

export default function SkinCareAnalyzer() {
  const [product, setProduct] = useState("")
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const analyzeProduct = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      })
      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (error) {
      console.error("Error analyzing product:", error)
      setAnalysis("Gabim gjatë analizimit të produktit. Ju lutemi provoni përsëri.")
    }
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-sm bg-[#e9e4da] text-[#0d150e] border-[#0d150e] shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-center flex items-center justify-center gap-2">
          <Leaf className="w-6 h-6" />
          ShendetiYt
        </CardTitle>
        <CardDescription className="text-center">
          Analizuesi i produkteve të kujdesit për lëkurën, trupin dhe flokët
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Shkruani emrin e produktit"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="bg-[#e9e4da] text-[#0d150e] border-[#0d150e]"
          />
          <Button
            onClick={analyzeProduct}
            disabled={loading}
            className="bg-[#0d150e] text-[#e9e4da] hover:bg-[#1a2a1e] w-full"
          >
            {loading ? "Duke analizuar..." : "Analizo"}
          </Button>
        </div>
        {analysis && (
          <div className="mt-4 p-4 bg-[#d9d4ca] rounded-md text-sm">
            <div dangerouslySetInnerHTML={{ __html: analysis }} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

