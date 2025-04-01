import { useParams } from "decky-frontend-lib"
import PlayBarSection from "./PlayBarSection"

const AppID = () => {
  const { appid } = useParams<{ appid: string }>()

  return <PlayBarSection label="App ID" detail={appid} />
}

export default AppID
