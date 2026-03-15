import { create } from 'zustand'
import { CURRENT_USER, MOCK_MATCHES, MOCK_APPROACHES, MOCK_CHATS } from '@/lib/mockData'

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────
export const useAuthStore = create((set) => ({
  user:        CURRENT_USER,
  isLoggedIn:  false,
  login:       ()        => set({ isLoggedIn: true }),
  logout:      ()        => set({ isLoggedIn: false }),
  updateUser:  (updates) => set((s) => ({ user: { ...s.user, ...updates } })),
}))

// ─────────────────────────────────────────────
// MATCHES
// ─────────────────────────────────────────────
export const useMatchStore = create((set) => ({
  matches:       MOCK_MATCHES,
  approachedIds: [],
  addApproach:   (matchId) => set((s) => ({
    approachedIds: [...s.approachedIds, matchId],
  })),
}))

// ─────────────────────────────────────────────
// APPROACHES
// ─────────────────────────────────────────────
export const useApproachStore = create((set) => ({
  approaches: MOCK_APPROACHES,
  accept: (id) => set((s) => ({ approaches: s.approaches.filter((a) => a.id !== id) })),
  pass:   (id) => set((s) => ({ approaches: s.approaches.filter((a) => a.id !== id) })),
}))

// ─────────────────────────────────────────────
// CHATS
// ─────────────────────────────────────────────
export const useChatStore = create((set) => ({
  chats: MOCK_CHATS,

  sendMessage: (chatId, text) => set((s) => ({
    chats: s.chats.map((c) => c.id !== chatId ? c : {
      ...c,
      lastMessage: text,
      lastTime: 'now',
      messages: [...c.messages, {
        id:     `m${Date.now()}`,
        text,
        isMine: true,
        time: new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', hour12: true }),
      }],
    }),
  })),

  sendWink: (chatId, message) => set((s) => ({
    chats: s.chats.map((c) => c.id !== chatId ? c : { ...c, winkSent: true, winkMessage: message }),
  })),

  addChatFromApproach: (approach, firstMessage) => set((s) => {
    if (s.chats.find((c) => c.id === approach.chatId)) return s
    const newChat = {
      id:          approach.chatId,
      matchId:     approach.senderId,
      matchName:   approach.senderName,
      matchPhoto:  approach.senderPhoto,
      matchCity:   approach.senderCity,
      isOnline:    true,
      lastMessage: firstMessage,
      lastTime:    'now',
      unread:      0,
      winkSent:    false,
      mutualWink:  false,
      messages: [
        { id: 'm0', text: approach.message, isMine: false, time: approach.time },
        { id: 'm1', text: firstMessage,     isMine: true,  time: 'now' },
      ],
    }
    return { chats: [newChat, ...s.chats] }
  }),
}))
