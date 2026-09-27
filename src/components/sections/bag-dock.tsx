import { ShoppingBagIcon } from "lucide-react"
import { Qty } from "@/components/qty"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { WhatsAppButton } from "@/components/whatsapp"
import { bagMessage, useBag } from "@/hooks/use-bag"
import { cn } from "@/lib/utils"

/**
 * Barra branca fixa no rodapé da tela, separada do conteúdo por uma linha, para
 * não se misturar com a faixa vermelha. Vazia, vira o atalho do WhatsApp no celular;
 * com itens, aparece em todas as telas e manda o pedido montado de uma vez.
 */
export function BagDock() {
  const { lines, count, change, clear } = useBag()
  const empty = count === 0

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-crust/15 bg-background px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))] sm:px-6",
        empty && "lg:hidden",
      )}
    >
      <div className="mx-auto max-w-md">
        {empty ? (
          <WhatsAppButton className="w-full">Encomendar pelo WhatsApp</WhatsAppButton>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button className="h-12 w-full justify-between gap-2 px-5 text-base font-semibold">
                <span className="flex items-center gap-2">
                  <ShoppingBagIcon className="size-5" />
                  Sua sacola
                </span>
                <span className="tabular-nums">
                  {count} {count === 1 ? "item" : "itens"}
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="mx-auto max-h-[85dvh] max-w-md">
              <SheetHeader className="px-5 pt-6">
                <SheetTitle className="font-heading text-2xl font-bold">Sua sacola</SheetTitle>
                <SheetDescription>
                  Mandamos a lista pelo WhatsApp. Lá confirmamos o valor e o horário de retirada.
                </SheetDescription>
              </SheetHeader>
              <ul className="m-0 grid list-none overflow-y-auto border-t px-5">
                {lines.map(({ product, qty }) => (
                  <li key={product.id} className="flex items-center justify-between gap-3 border-b py-2.5">
                    <span className="font-medium">{product.name}</span>
                    <Qty name={product.name} qty={qty} onChange={(d) => change(product.id, d)} />
                  </li>
                ))}
              </ul>
              <SheetFooter className="px-5 pb-6">
                <WhatsAppButton className="w-full" msg={bagMessage(lines)}>
                  Enviar pedido pelo WhatsApp
                </WhatsAppButton>
                <Button variant="ghost" className="h-10" onClick={clear}>
                  Esvaziar sacola
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </div>
  )
}
