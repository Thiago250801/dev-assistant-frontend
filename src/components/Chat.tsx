import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { streamChat } from "../services/chatService";
import type { Message } from "../types/chat";
import ReactMarkdown from "react-markdown";

export default function Chat() {
  const { messages, addMessage, mode , updateLastMessage} = useChatStore();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    addMessage(userMsg);
    setInput("");
    setLoading(true);

    let assistantText = "";
    addMessage({ role: "assistant", content: "" });

    await streamChat({
      prompt: input,
      mode,
      onToken: token => {
        assistantText += token;
        updateLastMessage(assistantText);
      }
    });

    setLoading(false);
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`max-w-2xl px-5 py-4 rounded-xl leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white self-end ml-auto"
                  : "bg-zinc-800 text-zinc-200"
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-zinc-500 text-sm"
          >
            digitando...
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-zinc-800 p-5">
        <div className="flex items-center gap-3 bg-zinc-900 rounded-xl border border-zinc-800 px-4 py-3">
          <textarea
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none resize-none"
            placeholder="Cole seu código, erro ou dúvida..."
          />

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={send}
            className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-lg"
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}