import Groq from "groq-sdk";

export async function handler(event) {
  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const body = JSON.parse(event.body);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: "Wewe ni Dantchai AI. Msaidizi mwelewa. Jibu kwa Kiswahili fupi na kwa pointi." },
        { role: "user", content: body.message }
      ],
      model: "llama-3.1-8b-instant", // <-- HUU NDIO MPYA WA KAZI SASA
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ reply: chatCompletion.choices[0].message.content }),
    };
  } catch (error) {
    console.error("ERROR:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message }),
    };
  }
}