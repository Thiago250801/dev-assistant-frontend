import { motion } from "framer-motion";
import { Bug, BookOpen, GitCommit, Wrench, Bot } from "lucide-react";
import { useChatStore } from "../store/chatStore";
import type { ChatMode } from "../types/chat";
import type { JSX } from "react";

const modes: { id: ChatMode; label: string; icon: JSX.Element }[] = [
  { id: "explain", label: "Explainer", icon: <BookOpen size={18} /> },
  { id: "debug", label: "Debug", icon: <Bug size={18} /> },
  { id: "commit", label: "Commit", icon: <GitCommit size={18} /> },
  { id: "refactor", label: "Refactor", icon: <Wrench size={18} /> }
];

export default function Sidebar() {
  const { mode, setMode } = useChatStore();

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 bg-zinc-900 border-r border-zinc-800 p-5 flex flex-col"
    >
      <div className="flex items-center gap-2 mb-8">
        <Bot className="text-indigo-500" />
        <h1 className="text-lg font-semibold">Dev Assistant AI</h1>
      </div>

      <div className="space-y-2">
        {modes.map(m => (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition
              ${
                mode === m.id
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-zinc-800 text-zinc-300"
              }
            `}
          >
            {m.icon}
            {m.label}
          </motion.button>
        ))}
      </div>

      <div className="mt-auto text-xs text-zinc-500">
        IA local • Streaming real-time
      </div>
    </motion.aside>
  );
}