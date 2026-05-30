import { create } from 'zustand'

interface LandingState {
  isNavScrolled: boolean
  setNavScrolled: (v: boolean) => void
}

export const useLandingStore = create<LandingState>((set) => ({
  isNavScrolled: false,
  setNavScrolled: (v) => set({ isNavScrolled: v }),
}))