import { Store } from "@tanstack/react-store"

const storageKey = "game-stats-ui-manager-v2"

export type PlayButtonSizes = "normal" | "small" | "smallest" | "iconOnly"

export const validIDs = [
  "#AppDetails_ClaimContent",
  "#AppDetails_SectionTitle_CloudStatus",
  "#AppDetails_SectionTitle_DiskSpaceRequired",
  "#AppDetails_SectionTitle_LastPlayed",
  "#AppDetails_SectionTitle_PlayTime",
  "#AppDetails_SectionTitle_PlayTimeLeft",
  "#AppDetails_SectionTitle_Achievements",
  "#AppDetails_SectionTitle_Controller",
  "#in_game",
  "#appid",
] as const

const initialState = {
  playButtonSize: "normal" as PlayButtonSizes,
  entries: validIDs.map((id) => ({ id, hidden: false })),
} as const

const storedValue = localStorage.getItem(storageKey)

export const store = new Store(storedValue ? (JSON.parse(storedValue) as typeof initialState) : initialState)

export const toggleEntry = (id: string) =>
  store.setState((state) => ({
    ...state,
    entries: state.entries.map((data) => (data.id === id ? { ...data, hidden: !data.hidden } : data)),
  }))

export const set = (partialState: Partial<typeof initialState>) =>
  store.setState((state) => ({ ...state, ...partialState }))

export const reset = () => store.setState(() => initialState)

store.subscribe(({ currentVal }) => localStorage.setItem(storageKey, JSON.stringify(currentVal)))
