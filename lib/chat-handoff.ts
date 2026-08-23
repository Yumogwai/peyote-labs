export const CHAT_HANDOFF_STORAGE_KEY = 'peyote_chat_handoff'

export type ChatHandoffPayload = {
  need: string
  summary: string
}

export function saveChatHandoff(payload: ChatHandoffPayload) {
  sessionStorage.setItem(CHAT_HANDOFF_STORAGE_KEY, JSON.stringify(payload))
}

export function readChatHandoff(): ChatHandoffPayload | null {
  const raw = sessionStorage.getItem(CHAT_HANDOFF_STORAGE_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as ChatHandoffPayload
    if (!parsed || typeof parsed.need !== 'string' || typeof parsed.summary !== 'string') {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

export function clearChatHandoff() {
  sessionStorage.removeItem(CHAT_HANDOFF_STORAGE_KEY)
}
