import {
  ButtonItem,
  definePlugin,
  DialogButton,
  Menu,
  MenuItem,
  Navigation,
  PanelSection,
  PanelSectionRow,
  ServerAPI,
  showContextMenu,
  staticClasses,
} from 'decky-frontend-lib'
import { FC, VFC } from 'react'
import { FaShip } from 'react-icons/fa'

import logo from '../assets/logo.png'

const Content: FC<{ serverAPI: ServerAPI }> = ({ serverAPI }) => {
  return (
    <PanelSection title="Panel Section">
      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={(e) =>
            showContextMenu(
              <Menu label="Menu" cancelText="CAAAANCEL" onCancel={() => {}}>
                <MenuItem onSelected={() => {}}>Item #1</MenuItem>
                <MenuItem onSelected={() => {}}>Item #2</MenuItem>
                <MenuItem onSelected={() => {}}>Item #3</MenuItem>
              </Menu>,
              e.currentTarget ?? window,
            )
          }
        >
          Server says yolo
        </ButtonItem>
      </PanelSectionRow>

      <PanelSectionRow>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src={logo} />
        </div>
      </PanelSectionRow>

      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => {
            Navigation.CloseSideMenus()
            Navigation.Navigate('/decky-plugin-test')
          }}
        >
          Router
        </ButtonItem>
      </PanelSectionRow>
    </PanelSection>
  )
}

const DeckyPluginRouterTest: VFC = () => {
  return (
    <div style={{ marginTop: '50px', color: 'white' }}>
      Hello World!
      <DialogButton onClick={() => Navigation.NavigateToLibraryTab()}>Go to Library</DialogButton>
    </div>
  )
}

export default definePlugin((serverApi: ServerAPI) => {
  serverApi.routerHook.addRoute('/decky-plugin-test', DeckyPluginRouterTest, {
    exact: true,
  })

  return {
    title: <div className={staticClasses.Title}>Example Plugin</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaShip />,
    onDismount() {
      serverApi.routerHook.removeRoute('/decky-plugin-test')
    },
  }
})
