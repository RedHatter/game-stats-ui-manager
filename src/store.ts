import { StoreApi, create } from 'zustand'
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
  '#appid',
] as const

export type StoreEntry = {
  id: ArrayElement<typeof validIDs>
  hidden: boolean
}

export type Store = {
  playButtonSize: 'normal' | 'small' | 'smallest' | 'iconOnly'

  entries: Array<StoreEntry>

  set: StoreApi<Store>['setState']

  toggle: (id: string) => void

  reset: () => void
}

const initialState = {
  playButtonSize: 'normal',

  entries: validIDs.map((id) => ({ id, hidden: false })),
} as const

export const useStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,

      set,

      toggle: (id) =>
        set(({ entries }) => ({
          entries: entries.map((data) => (data.id === id ? { ...data, hidden: !data.hidden } : data)),
        })),

      reset: () => set(initialState),
    }),
    { name: 'game-stats-ui-manager' },
  ),
)
