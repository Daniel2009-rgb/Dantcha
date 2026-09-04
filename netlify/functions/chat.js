import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function handler(event) {
  if (event.httpMethod!== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message } = JSON.parse(event.body);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system", 
          content: "Wewe ni Dantech AI. Ni msaidizi wa AI aliyetengenezwa na Dantcha. Jibu kwa Kiswahili kwa upole na ukiwa na msaada. Jina lako ni Dantech AI."
        },
        { role: "user", content: message }
      ],
      model: "openai/gpt-oss-20b",
    });

    const reply = completion.choices[0]?.message?.content || "Samahani sikupata jibu";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: reply }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Kuna error: " + error.message }),
    };
  }
      }
