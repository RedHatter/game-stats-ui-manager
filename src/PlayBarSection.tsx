import { findClassByName } from "@decky/ui"
import type { FC } from "react"

type PlayBarSectionProps = {
  label: string
  detail: string
}

const PlayBarSection: FC<PlayBarSectionProps> = ({ label, detail }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div className={findClassByName("PlayBarLabel") ?? ""}>{label}</div>
    <div className={findClassByName("PlayBarDetailLabel") ?? ""}>{detail}</div>
  </div>
)

export default PlayBarSection
