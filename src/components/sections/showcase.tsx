import { useState } from "react"
import { Qty } from "@/components/qty"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CATEGORIES, type Product } from "@/config"
import { useBag } from "@/hooks/use-bag"

const CAT_KEY = "bm-cat"

function initialCat() {
  try {
    const c = localStorage.getItem(CAT_KEY)
    if (c && CATEGORIES.some((x) => x.id === c)) return c
  } catch {
    /* sem armazenamento: começa em Pães */
  }
  return CATEGORIES[0].id
}

function ProductRow({ p }: { p: Product }) {
  const { bag, change } = useBag()
  const qty = bag[p.id] ?? 0

  return (
    <li className="flex items-start justify-between gap-6 border-b py-5">
      <div className="grid gap-1">
        <h3 className="text-lg leading-snug font-bold">
          {p.name}
          {p.popular && <span className="ml-2 align-middle font-sans text-xs font-medium text-muted-foreground">Mais pedido</span>}
        </h3>
        <p className="text-[0.95rem] text-muted-foreground">{p.desc}</p>
        <p className="mt-1 tabular-nums">
          <b className="font-semibold">R$ {p.price}</b> <span className="text-sm text-muted-foreground">{p.unit}</span>
        </p>
      </div>
      <div className="shrink-0 pt-1">
        {qty === 0 ? (
          <Button variant="outline" className="h-9 px-3.5 font-semibold" onClick={() => change(p.id, 1)} aria-label={`Pôr ${p.name} na sacola`}>
            Adicionar
          </Button>
        ) : (
          <Qty name={p.name} qty={qty} onChange={(d) => change(p.id, d)} />
        )}
      </div>
    </li>
  )
}

export function Showcase() {
  const [cat, setCat] = useState(initialCat)

  const select = (c: string) => {
    setCat(c)
    try {
      localStorage.setItem(CAT_KEY, c)
    } catch {
      /* ignora */
    }
  }

  return (
    <section id="vitrine" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 grid max-w-[40em] gap-3">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1] font-bold">Da vitrine para a sua mesa</h2>
          <p className="text-lg text-muted-foreground">
            Monte a sua sacola e mande tudo de uma vez pelo WhatsApp. A gente separa e deixa no balcão.
          </p>
        </div>

        <Tabs value={cat} onValueChange={select}>
          <TabsList variant="line" className="h-auto! w-full justify-start gap-6 overflow-x-auto border-b p-0">
            {CATEGORIES.map((c) => (
              <TabsTrigger
                key={c.id}
                value={c.id}
                className="h-11 flex-none rounded-none px-0 text-base font-semibold text-muted-foreground group-data-horizontal/tabs:after:bottom-[-1px] after:bg-wine data-active:text-foreground"
              >
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {CATEGORIES.map((c) => (
            <TabsContent key={c.id} value={c.id} className="text-base">
              <ul className="m-0 grid list-none gap-x-12 p-0 md:grid-cols-2">
                {c.products.map((p) => (
                  <ProductRow key={p.id} p={p} />
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
        <p className="mt-5 text-sm text-muted-foreground">
          Valores de referência. Confirmamos preço e disponibilidade pelo WhatsApp antes de separar.
        </p>
      </div>
    </section>
  )
}
