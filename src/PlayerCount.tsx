import { findClass, useParams } from 'decky-frontend-lib'
import { FC, useEffect, useState } from 'react'
import PlayBarSection from './PlayBarSection'

const cache = new Map<string, { data: Promise<number>; at: number }>()

const getPlayerCount = (appid: string) => {
  let value = cache.get(appid)

  if (!value || Date.now() - value.at > 300000 /* 5 minutes */) {
    value = {
      data: fetch(
        'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?key=2ED50E886A67EA111EA92184F3560D35&appid=' +
          appid,
      )
        .then((res) => res.json())
        .then((json) => json.response.player_count)
        .catch(() => {
          cache.delete(appid)
        }),
      at: Date.now(),
    }
    cache.set(appid, value)
  }

  return value.data
}

const PlayerCount: FC = () => {
  const { appid } = useParams<{ appid: string }>()

  const [value, setValue] = useState<undefined | number>()

  useEffect(() => {
    if (!(window as any).collectionStore.deckDesktopApps.apps.get(appid)) {
      getPlayerCount(appid).then(setValue)
    }
  }, [appid])

  return value === undefined ? null : <PlayBarSection label="In game" detail={value.toLocaleString()} />
}

export default PlayerCount
