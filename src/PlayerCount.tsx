import { useParams } from 'decky-frontend-lib'
import { FC, useEffect, useState } from 'react'

const labelStyle = {
  fontWeight: 'bold',
  fontSize: '12px',
  lineHeight: '22px',
  letterSpacing: '.5px',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,.7)',
} as const

const valueStyle = {
  lineHeight: '20px',
  color: '#fff',
  fontWeight: '500',
} as const

const cache = new Map<string, { data: Promise<number>; at: number }>()

const getPlayerCount = (appid: string) => {
  let value = cache.get(appid)

  if (!value || Date.now() - value.at > 300000 /* 5 minutes */) {
    value = {
      data: fetch('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=' + appid)
        .then((res) => res.json())
        .then((json) => json.response.player_count),
      at: Date.now(),
    }
    cache.set(appid, value)
  }

  return value.data
}

const PlayerCount: FC = () => {
  const { appid } = useParams<{ appid: string }>()

  const [value, setValue] = useState<null | number>(null)

  useEffect(() => {
    getPlayerCount(appid).then(setValue)
  }, [appid])

  return value === null ? null : (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={labelStyle}>In game</div>
        <div style={valueStyle}>{value.toLocaleString()}</div>
      </div>
    )
}

export default PlayerCount
