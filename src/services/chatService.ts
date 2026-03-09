import type { ChatMode } from "../types/chat";

interface StreamParams {
  prompt: string;
  mode: ChatMode;
  onToken: (token: string) => void;
}

export async function streamChat({ prompt, mode, onToken }: StreamParams) {
  const response = await fetch("http://localhost:3001/api/chat-stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, mode }),
  });

  if (!response.body) return;

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");

    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data:")) {
        const token = line.slice(5);

    
        if (token && token.trim() !== "END") {
          const cleanToken = token.startsWith(" ") ? token.slice(1) : token;

          onToken(cleanToken);
        }
      }
    }
  }
}
