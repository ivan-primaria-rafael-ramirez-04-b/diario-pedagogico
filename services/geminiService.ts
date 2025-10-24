
import { GoogleGenAI } from "@google/genai";

// Assume API_KEY is set in the environment
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || "YOUR_API_KEY_HERE" });

export async function getPedagogicalSuggestion(
  context: string,
  topic: string,
  objective: string
): Promise<string> {
  const model = "gemini-2.5-pro";

  const systemInstruction = `
    Eres un experto asesor pedagógico y diseñador instruccional especializado en el contexto educativo rural de México, específicamente para el nivel de educación básica (primaria).
    Tu misión es proporcionar a los docentes estrategias, dinámicas y actividades innovadoras, prácticas y relevantes que puedan implementar en sus aulas.
    Debes considerar las características de las escuelas rurales: aulas multigrado, recursos limitados, y la importancia de conectar el aprendizaje con el entorno y la cultura local de los estudiantes.
    Tus respuestas deben ser claras, estructuradas y directamente aplicables. Utiliza un formato de Markdown para organizar la información con encabezados, listas y negritas para facilitar la lectura.
    Siempre debes proponer 3 opciones de actividades distintas, cada una con una breve descripción, los materiales necesarios (priorizando recursos locales o de bajo costo), y los pasos a seguir.
    Finaliza con una sección de 'Consideraciones para Aulas Multigrado' donde adaptas las sugerencias para diferentes niveles de grado trabajando simultáneamente.
  `;

  const userPrompt = `
    **Contexto del Aula:** ${context}
    **Tema a Desarrollar:** ${topic}
    **Objetivo de Aprendizaje:** ${objective}

    Basado en esta información, genera 3 propuestas de actividades pedagógicas.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Lo sentimos, ha ocurrido un error al generar la sugerencia. Por favor, revisa la configuración de tu API Key o inténtalo de nuevo más tarde.";
  }
}

export async function getTitleSuggestion(content: string): Promise<string> {
  const model = "gemini-2.5-flash";

  const systemInstruction = `
    Eres un asistente de redacción para un blog de educadores. Tu tarea es leer el contenido de una publicación de blog y generar un título corto, atractivo y descriptivo para ella.
    El título debe ser conciso (máximo 10 palabras), reflejar el tema principal de la publicación y ser adecuado para un público de docentes y supervisores escolares.
    Responde ÚNICAMENTE con el texto del título, sin comillas, sin prefijos como "Título:" ni ninguna otra explicación.
  `;
  
  const userPrompt = `
    Aquí está el contenido de la publicación:
    ---
    ${content}
    ---
    Genera un título para esta publicación.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    // Clean up response, remove potential quotes
    return response.text.trim().replace(/^"|"$/g, '');
  } catch (error) {
    console.error("Error calling Gemini API for title suggestion:", error);
    throw new Error("Failed to generate title suggestion.");
  }
}
