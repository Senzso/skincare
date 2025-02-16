import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  const { product } = await req.json()

  const prompt = `Analizoni produktin e mëposhtëm të kujdesit për lëkurën, trupin ose flokët: "${product}". Jepni një vlerësim nga 1-10 për shëndetin e tij, shpjegoni përbërësit kryesorë të përdorur dhe sa të shëndetshëm ose të pashëndetshëm janë ata. Mbani shpjegimin konciz dhe përqendrohuni në aspektet më të rëndësishme. Nëse përmenden disa produkte, analizoni vetëm të parin. Përgjigja juaj duhet të jetë në formatin e mëposhtëm:

<strong>Vlerësimi ShendetiYt:</strong> [Numri nga 1-10]<br><br>

<strong>Analiza:</strong><br>
[Shpjegimi i shkurtër i produktit, përbërësve kryesorë dhe efekteve të tyre në shëndetin e lëkurës, trupit ose flokëve]<br><br>

<strong>Përbërësit kryesorë:</strong><br>
• <strong>[Përbërësi 1]:</strong> [Përshkrim i shkurtër]<br>
• <strong>[Përbërësi 2]:</strong> [Përshkrim i shkurtër]<br>
• <strong>[Përbërësi 3]:</strong> [Përshkrim i shkurtër]<br><br>

<strong>Përfundim:</strong><br>
[Një fjali përmbyllëse për produktin dhe si ndikon në shëndetin e lëkurës, trupit ose flokëve]`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
      system:
        "Ju jeni një ekspert i ShendetiYt që ofron analiza të sakta dhe koncize të produkteve të kujdesit për lëkurën, trupin dhe flokët në gjuhën shqipe, duke u fokusuar në shëndetin e përgjithshëm. Përdorni HTML për formatim (<strong>, <br>).",
    })

    return new Response(JSON.stringify({ analysis: text }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error generating analysis:", error)
    return new Response(JSON.stringify({ error: "Dështoi analizimi i produktit" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

