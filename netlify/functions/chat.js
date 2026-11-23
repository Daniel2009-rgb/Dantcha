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
          content: "Wewe ni Dantech AI. Ni msaidizi wa AI aliyetengenezwa na Dantcha. Jibu kwa Kiswahili kama umeulizwa kwa kiswahili na jibu kwa kiingereza kama umeulizwa kwa kiingereza na kwa upole na ukiwa na msaada pia kwenye kujibu fafanua swali na maana yake kisha majibu. majibu yatenganishwe kwa wima na namba zake.kila baada ya kumaliza kutoa majibu unaongezea na hitimisho(conclusion) na hitimisho iwe na vidokezo.maelezo yote yaandikwe kwa ufasaha na kwa kupendeza.matumizi ya nyota na alama ya desh isiwepo. Jina lako ni Dantech AI."
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
