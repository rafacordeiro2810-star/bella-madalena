import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp"
import { CONFIG } from "@/config"
import { useNow } from "@/hooks/use-now"
import { fmtHour, openStatus } from "@/lib/time"
import { cn } from "@/lib/utils"
import { mapLink } from "@/lib/whatsapp"

const ROWS = [
  { label: "Segunda a sexta", days: [1, 2, 3, 4, 5] },
  { label: "Sábado", days: [6] },
  { label: "Domingo e feriados", days: [0] },
]

export function Visit() {
  const now = useNow()
  const today = now.getDay()
  const status = openStatus(now)

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.phoneLabel)
      toast.success("Número copiado")
    } catch {
      toast.error("Não deu para copiar. Selecione o número e copie manualmente.")
    }
  }

  return (
    <section id="visite" className="pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-8 text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1] font-bold">
          Venha tomar um café com a gente
        </h2>
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          <div className="grid content-start gap-4 border-t pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-xl font-bold">Horário</h3>
              <p className={cn("text-sm font-semibold", status.isOpen ? "text-ok" : "text-muted-foreground")}>{status.label}</p>
            </div>
            <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 tabular-nums">
              {ROWS.map((r) => {
                const [o, c] = CONFIG.hours[r.days[0]]
                const isToday = r.days.includes(today)
                return (
                  <div key={r.label} className={cn("contents", isToday && "font-semibold")}>
                    <dt className="font-medium">
                      {r.label}
                      {isToday && <span className="sr-only"> (hoje)</span>}
                    </dt>
                    <dd className={cn("m-0", !isToday && "text-muted-foreground")}>
                      {fmtHour(o)} às {fmtHour(c)}
                    </dd>
                  </div>
                )
              })}
            </dl>
            <h3 className="mt-3 text-xl font-bold">Endereço</h3>
            <p>{CONFIG.address}</p>
            <div>
              <Button asChild variant="outline" className="h-11 px-5 text-base font-semibold">
                <a href={mapLink()} target="_blank" rel="noopener">
                  Abrir no mapa
                </a>
              </Button>
            </div>
          </div>

          <div className="grid content-start gap-4 border-t pt-6">
            <h3 className="text-xl font-bold">WhatsApp</h3>
            <p className="text-muted-foreground">Pedidos, encomendas e orçamentos.</p>
            <div className="flex flex-wrap items-center gap-3">
              <code className="font-sans text-lg font-semibold select-all">{CONFIG.phoneLabel}</code>
              <Button variant="outline" className="h-9 px-4" onClick={copyPhone}>
                Copiar número
              </Button>
            </div>
            <div>
              <WhatsAppButton>Abrir conversa</WhatsAppButton>
            </div>
            <h3 className="mt-3 text-xl font-bold">Instagram</h3>
            <p>
              <a
                className="underline underline-offset-4 hover:text-foreground"
                href={`https://instagram.com/${CONFIG.instagram}`}
                target="_blank"
                rel="noopener"
              >
                @{CONFIG.instagram}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
