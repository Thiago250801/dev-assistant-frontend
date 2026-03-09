export type Role = "user" | "assistant"

export interface Message {
  role: Role
  content: string
}

export type ChatMode = 
  | "explain"
  | "debug"
  | "commit"
  | "refactor"