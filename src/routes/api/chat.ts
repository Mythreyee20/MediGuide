import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

type ChatRequestBody = { messages?: unknown; language?: "en" | "ta" };

const SYSTEM_EN = `You are MediGuide, a friendly multilingual hospital helpdesk assistant.
Your job: based on patient-described symptoms, suggest the most appropriate hospital department
(e.g. Cardiology, Orthopedics, ENT, General Medicine, Pediatrics, Dermatology, Neurology,
Gastroenterology, Obstetrics & Gynecology, Emergency).

Respond with:
1. A brief empathetic acknowledgement (1 sentence).
2. **Suggested Department:** <name>
3. **Why:** 1-2 short sentences.
4. **What to do now:** short bullet list (where to go, urgency level, what to bring).
5. If symptoms sound like a medical emergency (chest pain, stroke signs, severe bleeding, difficulty breathing, unconsciousness), tell them to go to Emergency immediately.

Always end with: "This is guidance only, not a medical diagnosis."`;

const SYSTEM_TA = `நீங்கள் MediGuide — ஒரு நட்பான பன்மொழி மருத்துவமனை உதவி உதவியாளர்.
நோயாளியின் அறிகுறிகளின் அடிப்படையில் பொருத்தமான மருத்துவத் துறையை (Cardiology, Orthopedics, ENT, General Medicine, Pediatrics, Dermatology, Neurology, Gastroenterology, Obstetrics & Gynecology, Emergency போன்றவை) பரிந்துரைக்கவும்.

தமிழில் பதிலளிக்கவும்:
1. ஒரு குறுகிய அனுதாப வாக்கியம்.
2. **பரிந்துரைக்கப்பட்ட துறை:** <பெயர்>
3. **காரணம்:** 1-2 வாக்கியங்கள்.
4. **இப்போது என்ன செய்ய வேண்டும்:** சிறு பட்டியல்.
5. அவசர அறிகுறிகள் (மார்பு வலி, பக்கவாதம் அறிகுறிகள், கடுமையான இரத்தப்போக்கு, மூச்சுத்திணறல்) இருந்தால் உடனடியாக Emergency-க்கு செல்லச் சொல்லுங்கள்.

எப்பொழுதும் இப்படி முடிக்கவும்: "இது வழிகாட்டுதல் மட்டுமே, மருத்துவ நோயறிதல் அல்ல."`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages, language } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-2.5-flash"),
          system: language === "ta" ? SYSTEM_TA : SYSTEM_EN,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
        });
      },
    },
  },
});
