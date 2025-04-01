import { Button, DialogButton, Dropdown, type DropdownOption, PanelSection, ReorderableList } from "@decky/ui"
import type { FC } from "react"
import { FaEyeSlash } from "react-icons/fa6"
import { localize } from "./helpers"
import { type StoreEntry, useStore } from "./store"

const iconButtonStyles = {
  background: "none",
  border: "none",
  outline: "none",
  color: "#8b929a",
  display: "flex",
  position: "absolute",
  right: "0",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "1.2em",
} as const

const dropdownOptions: Array<DropdownOption> = [
  { label: "Normal", data: "normal" },
  { label: "Small", data: "small" },
  { label: "Smallest", data: "smallest" },
  { label: "Icon only", data: "iconOnly" },
]

const QuickAccessContent: FC = () => {
  const { entries, playButtonSize: actionButtonStyle, set, toggle, reset } = useStore()

  return (
    <>
      <PanelSection title="Play Button Size">
        <Dropdown
          menuLabel="Play Button Size"
          rgOptions={dropdownOptions}
          selectedOption={actionButtonStyle}
          onChange={(opt) => set({ playButtonSize: opt.data })}
        />
      </PanelSection>
      <PanelSection title="Game Info Sections">
        <ReorderableList<StoreEntry>
          entries={entries.map((data, position) => ({
            data,
            position,
            label:
              data.id === "#in_game"
                ? "(Custom) In game"
                : data.id === "#appid"
                  ? "(Custom) App ID"
                  : localize(data.id),
          }))}
          onSave={(entries) => set({ entries: entries.map((o) => o.data!) })}
          interactables={({ entry }) => (
            <Button
              onClick={() => toggle(entry.data!.id)}
              onOKActionDescription={entry.data?.hidden ? "Unhide" : "Hide"}
              style={iconButtonStyles}
            >
              {entry.data?.hidden && <FaEyeSlash />}
            </Button>
          )}
          fieldProps={{ indentLevel: 0.4 }}
        />
      </PanelSection>
      <PanelSection>
        <DialogButton onClick={reset}>Reset</DialogButton>
      </PanelSection>
    </>
  )
}
export default QuickAccessContent
