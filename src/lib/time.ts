import { CONFIG } from "@/config"

export const toMin = (hm: string) => {
  const [h, m] = hm.split(":").map(Number)
  return h * 60 + m
}

/** "6:30" -> "6h30", "10:00" -> "10h" */
export const fmtHour = (hm: string) => {
  const [h, m] = hm.split(":")
  return m === "00" ? `${+h}h` : `${+h}h${m}`
}

export const fmtDuration = (d: number) => {
  const h = Math.floor(d / 60)
  const m = d % 60
  if (!h) return `${m}min`
  return m ? `${h}h ${m}min` : `${h}h`
}

export function openStatus(now: Date) {
  const mins = now.getHours() * 60 + now.getMinutes()
  const [open, close] = CONFIG.hours[now.getDay()]
  const isOpen = mins >= toMin(open) && mins < toMin(close)
  if (isOpen) return { isOpen, label: `Aberto agora, fecha às ${fmtHour(close)}` }
  if (mins < toMin(open)) return { isOpen, label: `Fechado agora, abre às ${fmtHour(open)}` }
  const [tomorrowOpen] = CONFIG.hours[(now.getDay() + 1) % 7]
  return { isOpen, label: `Fechado agora, abre amanhã às ${fmtHour(tomorrowOpen)}` }
}
