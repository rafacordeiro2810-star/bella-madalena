import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { CATEGORIES, type Product } from "@/config"

type Bag = Record<string, number>
type BagCtx = {
  bag: Bag
  count: number
  lines: { product: Product; qty: number }[]
  change: (id: string, delta: number) => void
  clear: () => void
}

const ALL = CATEGORIES.flatMap((c) => c.products)
const KEY = "bm-sacola"
const Ctx = createContext<BagCtx | null>(null)

function load(): Bag {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function BagProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<Bag>(load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(bag))
    } catch {
      /* armazenamento indisponível: a sacola vale só para esta visita */
    }
  }, [bag])

  const value = useMemo<BagCtx>(() => {
    const lines = ALL.filter((p) => bag[p.id] > 0).map((product) => ({ product, qty: bag[product.id] }))
    return {
      bag,
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      change: (id, delta) =>
        setBag((b) => {
          const qty = Math.max(0, (b[id] ?? 0) + delta)
          const next = { ...b, [id]: qty }
          if (!qty) delete next[id]
          return next
        }),
      clear: () => setBag({}),
    }
  }, [bag])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useBag() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useBag precisa estar dentro de <BagProvider>")
  return ctx
}

export function bagMessage(lines: BagCtx["lines"]) {
  const items = lines.map((l) => `• ${l.qty}x ${l.product.name}`).join("\n")
  return `Olá! Gostaria de fazer este pedido:\n${items}\n\nPode confirmar o valor e o horário de retirada?`
}
