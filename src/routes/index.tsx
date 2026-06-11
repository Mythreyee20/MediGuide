import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Send, Stethoscope, Loader2 } from "lucide-react";
import logo from "@/assets/logo.png";
import { DepartmentCard } from "@/components/DepartmentCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediGuide — AI Hospital Helpdesk" },
      { name: "description", content: "Multilingual AI-powered hospital navigation. Describe symptoms in English or Tamil and find the right department." },
      { property: "og:title", content: "MediGuide — AI Hospital Helpdesk" },
      { property: "og:description", content: "Multilingual AI-powered hospital navigation in English & Tamil." },
    ],
  }),
  component: Index,
});

type Lang = "en" | "ta";

const COPY = {
  en: {
    title: "MediGuide",
    tagline: "Describe your symptoms — we'll guide you to the right department.",
    placeholder: "e.g. I have chest pain and shortness of breath...",
    send: "Send",
    listening: "Listening…",
    voice: "Voice input",
    empty: "Tell me what's bothering you today.",
    examples: ["Headache and fever for 2 days", "Sharp lower back pain", "Child has ear pain"],
    disclaimer: "Guidance only — not a medical diagnosis.",
    you: "You",
    ai: "MediGuide",
    thinking: "Thinking…",
  },
  ta: {
    title: "MediGuide",
    tagline: "உங்கள் அறிகுறிகளைச் சொல்லுங்கள் — சரியான துறைக்கு வழிகாட்டுகிறோம்.",
    placeholder: "உதா: எனக்கு மார்பு வலியும் மூச்சுத்திணறலும் உள்ளது...",
    send: "அனுப்பு",
    listening: "கேட்கிறேன்…",
    voice: "குரல் உள்ளீடு",
    empty: "இன்று உங்களை என்ன தொந்தரவு செய்கிறது?",
    examples: ["2 நாட்களாக தலைவலி மற்றும் காய்ச்சல்", "கடுமையான முதுகுவலி", "குழந்தைக்கு காது வலி"],
    disclaimer: "வழிகாட்டுதல் மட்டுமே — மருத்துவ நோயறிதல் அல்ல.",
    you: "நீங்கள்",
    ai: "MediGuide",
    thinking: "சிந்திக்கிறது…",
  },
};

function Index() {
  const [lang, setLang] = useState<Lang>("en");
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const transport = new DefaultChatTransport({
    api: "/api/chat",
    body: { language: lang },
  });

  const { messages, sendMessage, status, error } = useChat({
    id: "mediguide",
    transport,
  });

  const t = COPY[lang];
  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [status]);

  const submit = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || isLoading) return;
    sendMessage({ text: value }, { body: { language: lang } });
    setInput("");
  };

  const toggleVoice = () => {
    if (typeof window === "undefined") return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert(lang === "ta" ? "உங்கள் உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை." : "Voice input not supported in this browser.");
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new SR();
    rec.lang = lang === "ta" ? "ta-IN" : "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    rec.onresult = (e: any) => {
      const text = Array.from(e.results).map((r: any) => r[0].transcript).join("");
      setInput(text);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    rec.start();
    recognitionRef.current = rec;
    setListening(true);
  };

  const renderText = (m: UIMessage) =>
    m.parts.map((p, i) => (p.type === "text" ? <span key={i}>{p.text}</span> : null));

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--gradient-hero)" }}>
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3">
          <img src={logo} alt="" width={40} height={40} className="rounded-lg" />
          <div>
            <h1 className="text-lg font-semibold text-foreground leading-tight">{t.title}</h1>
            <p className="text-xs text-muted-foreground">AI Hospital Helpdesk</p>
          </div>
        </div>
        <div className="flex bg-secondary rounded-full p-1 text-sm">
          <button
            onClick={() => setLang("en")}
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${lang === "en" ? "bg-primary text-primary-foreground shadow" : "text-secondary-foreground"}`}
          >English</button>
          <button
            onClick={() => setLang("ta")}
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${lang === "ta" ? "bg-primary text-primary-foreground shadow" : "text-secondary-foreground"}`}
          >தமிழ்</button>
        </div>
      </header>

      {/* Chat container */}
      <main className="flex-1 flex flex-col items-center px-4 py-6">
        <div className="w-full max-w-2xl flex-1 flex flex-col bg-card rounded-3xl border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-soft)" }}>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 min-h-[60vh] max-h-[70vh]">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-6 py-12">
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{t.tagline}</h2>
                  <p className="text-sm text-muted-foreground mt-2">{t.empty}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                  {t.examples.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => submit(ex)}
                      className="px-3 py-2 text-sm rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors border border-border"
                    >{ex}</button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((m, idx) => {
                const isLast = idx === messages.length - 1;
                const stillStreaming = isLast && isLoading && m.role === "assistant";
                const fullText = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                return (
                  <div key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-chat-user text-chat-user-foreground rounded-br-sm"
                        : "bg-secondary text-foreground rounded-bl-sm"
                    }`}>
                      <div className="text-[10px] uppercase tracking-wider opacity-70 mb-1">
                        {m.role === "user" ? t.you : t.ai}
                      </div>
                      {renderText(m)}
                    </div>
                    {m.role === "assistant" && !stillStreaming && (
                      <div className="w-full max-w-[85%]">
                        <DepartmentCard text={fullText} lang={lang} />
                      </div>
                    )}
                  </div>
                );
              })
            )}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-start">
                <div className="bg-secondary text-muted-foreground rounded-2xl rounded-bl-sm px-4 py-3 text-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> {t.thinking}
                </div>
              </div>
            )}
            {error && (
              <div className="text-sm text-destructive text-center py-2">{error.message}</div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-border p-3 bg-background/50">
            <form
              onSubmit={(e) => { e.preventDefault(); submit(); }}
              className="flex items-end gap-2"
            >
              <button
                type="button"
                onClick={toggleVoice}
                aria-label={t.voice}
                className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                  listening ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
                }}
                rows={1}
                placeholder={listening ? t.listening : t.placeholder}
                className="flex-1 resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring max-h-32"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label={t.send}
                className="shrink-0 w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>
            <p className="text-[11px] text-muted-foreground text-center mt-2">{t.disclaimer}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
