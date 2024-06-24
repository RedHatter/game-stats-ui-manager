import { Button, PanelSection, ReorderableList } from 'decky-frontend-lib'
import { FaEyeSlash } from 'react-icons/fa6'
import { FC } from 'react'
import { localize } from './helpers'
import { StoreEntry, useStore } from './store'

const iconButtonStyles = {
  background: 'none',
  border: 'none',
  outline: 'none',
  color: '#8b929a',
  display: 'flex',
  position: 'absolute',
  right: '0',
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: '1.2em',
} as const

const QuickAccessContent: FC = () => {
  const { entries, setEntries, toggle } = useStore()

  return (
    <PanelSection title="Game Info Sections">
      <ReorderableList<StoreEntry>
        entries={entries.map((data, position) => ({
          data,
          position,
          label: data.id === '#in_game' ? '(Custom) In game' : localize(data.id),
        }))}
        onSave={(entries) => setEntries(entries.map((o) => o.data!))}
        interactables={({ entry }) => (
          <Button
            onClick={() => toggle(entry.data!.id)}
            onOKActionDescription={entry.data?.hidden ? 'Unhide' : 'Hide'}
            style={iconButtonStyles}
          >
            {entry.data?.hidden && <FaEyeSlash />}
          </Button>
        )}
        fieldProps={{ indentLevel: 0.4 }}
      />
    </PanelSection>
  )
}
export default QuickAccessContent
