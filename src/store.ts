import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ArrayElement } from './helpers'

export const validIDs = [
  '#AppDetails_ClaimContent',
  '#AppDetails_SectionTitle_CloudStatus',
  '#AppDetails_SectionTitle_DiskSpaceRequired',
  '#AppDetails_SectionTitle_LastPlayed',
  '#AppDetails_SectionTitle_PlayTime',
  '#AppDetails_SectionTitle_PlayTimeLeft',
  '#AppDetails_SectionTitle_Achievements',
  '#AppDetails_SectionTitle_Controller',
  '#in_game',
] as const

export type StoreEntry = {
  id: ArrayElement<typeof validIDs>
  hidden: boolean
}

type Store = {
  entries: Array<StoreEntry>

  setEntries: (entries: Array<StoreEntry>) => void
  toggle: (id: string) => void
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      entries: validIDs.map((id) => ({ id, hidden: false })),

      setEntries: (entries) => set({ entries }),

      toggle: (id) =>
        set(({ entries }) => ({
          entries: entries.map((data) => (data.id === id ? { ...data, hidden: !data.hidden } : data)),
        })),
    }),
    { name: 'players-in-game' },
  ),
)
