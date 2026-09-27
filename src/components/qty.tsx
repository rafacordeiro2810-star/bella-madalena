import { MinusIcon, PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

/** Menos, quantidade e mais, lado a lado. */
export function Qty({ name, qty, onChange }: { name: string; qty: number; onChange: (delta: number) => void }) {
  return (
    <div className="flex items-center border" role="group" aria-label={`Quantidade de ${name}`}>
      <Button size="icon" variant="ghost" className="size-9 rounded-none" onClick={() => onChange(-1)} aria-label="Tirar um">
        <MinusIcon />
      </Button>
      <span className="min-w-7 text-center font-semibold tabular-nums" aria-live="polite">
        {qty}
      </span>
      <Button size="icon" variant="ghost" className="size-9 rounded-none" onClick={() => onChange(1)} aria-label="Pôr mais um">
        <PlusIcon />
      </Button>
    </div>
  )
}
