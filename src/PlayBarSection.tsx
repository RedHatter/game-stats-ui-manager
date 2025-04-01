import { findClass } from "@decky/ui"
import type { FC } from "react"

type PlayBarSectionProps = {
  label: string
  detail: string
}

const PlayBarSection: FC<PlayBarSectionProps> = ({ label, detail }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div className={findClass("PlayBarLabel") ?? ""}>{label}</div>
    <div className={findClass("PlayBarDetailLabel") ?? ""}>{detail}</div>
  </div>
)

export default PlayBarSection
