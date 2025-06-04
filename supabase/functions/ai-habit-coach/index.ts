
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { prompt, type, habitName, habitDescription, context } = await req.json()
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured')
    }

    // Construct specific prompts based on the type of AI assistance requested
    let systemPrompt = ""
    let userPrompt = ""

    switch (type) {
      case 'motivation':
        systemPrompt = "You are an encouraging habit coach. Provide short, motivational tips (2-3 sentences) that are specific and actionable. Be warm, supportive, and positive."
        userPrompt = `Give me a motivational tip for my habit: "${habitName}". ${habitDescription ? `Description: ${habitDescription}` : ''} ${context ? `Additional context: ${context}` : ''}`
        break
      
      case 'habit-stacking':
        systemPrompt = "You are a habit coach specializing in habit stacking. Suggest 2-3 complementary habits that could be stacked with the existing habit. Be specific and practical."
        userPrompt = `I have this habit: "${habitName}". ${habitDescription ? `Description: ${habitDescription}` : ''} Suggest habits I could stack with this one. ${context ? `My other habits: ${context}` : ''}`
        break
      
      case 'overcoming-challenges':
        systemPrompt = "You are an empathetic habit coach. Help users overcome obstacles with their habits. Provide understanding, reframe negative thoughts, and offer practical solutions. Keep responses encouraging and actionable."
        userPrompt = `I'm struggling with my habit: "${habitName}". ${habitDescription ? `Description: ${habitDescription}` : ''} ${context ? `My challenge: ${context}` : ''} Help me overcome this obstacle.`
        break
      
      case 'celebration':
        systemPrompt = "You are an enthusiastic habit coach celebrating user achievements. Create joyful, personalized celebration messages (2-3 sentences). Be genuinely excited and acknowledge their effort."
        userPrompt = `Celebrate my achievement with habit: "${habitName}". ${context ? `Achievement details: ${context}` : ''} Make it feel special and motivating!`
        break
      
      case 'brainstorming':
        systemPrompt = "You are a creative habit coach. Help users brainstorm specific, achievable habits based on their goals. Suggest 3-4 concrete habit ideas with brief explanations."
        userPrompt = `Help me brainstorm habits for this goal: "${prompt || habitName}". ${context ? `Additional context: ${context}` : ''} Suggest specific, actionable habits.`
        break
      
      default:
        systemPrompt = "You are a helpful habit coach. Provide encouraging, practical advice about habit formation."
        userPrompt = prompt || `Help me with my habit: "${habitName}"`
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser request: ${userPrompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 200,
        }
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to help with your habits! Please try again."

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: aiResponse,
        type: type 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in ai-habit-coach function:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Sorry, I encountered an issue. Please try again later.',
        details: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
