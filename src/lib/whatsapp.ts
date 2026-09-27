import { CONFIG } from "@/config"

export const DEFAULT_MSG = "Olá! Gostaria de fazer um pedido."

export function waLink(msg: string = DEFAULT_MSG) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`
}

export const mapLink = () =>
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Bella Madalena " + CONFIG.address)
