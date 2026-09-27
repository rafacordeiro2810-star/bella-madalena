import { CONFIG } from "@/config"
import { useNow } from "@/hooks/use-now"
import { fmtDuration, fmtHour, toMin } from "@/lib/time"
import { cn } from "@/lib/utils"

/** Relógio das fornadas: mostra quanto falta para o próximo pão sair do forno. */
export function OvenClock({ className }: { className?: string }) {
  const now = useNow()
  const mins = now.getHours() * 60 + now.getMinutes()
  const [open, close] = CONFIG.hours[now.getDay()].map(toMin)
  // Só as fornadas que caem dentro do horário de hoje (domingo fecha mais cedo)
  const batches = CONFIG.fornadas.map((hm) => ({ hm, t: toMin(hm) })).filter((b) => b.t < close)
  const next = batches.find((b) => b.t > mins)
  const justOut = batches.filter((b) => b.t <= mins && mins - b.t < 30).pop()

  // Linha do dia: do horário de abertura ao de fechamento
  const start = Math.min(open, batches[0].t - 30)
  const end = Math.max(close, batches[batches.length - 1].t + 30)
  const pos = (t: number) => `${((t - start) / (end - start)) * 100}%`
  const nowInside = mins >= start && mins <= end

  return (
    <div aria-live="polite" className={cn("w-full", className)}>
      <p className="flex items-center gap-2 text-sm font-medium opacity-80">
        {justOut && <span className="size-2 shrink-0 rounded-full bg-current" />}
        {justOut ? `Acabou de sair a fornada das ${fmtHour(justOut.hm)}` : "Fornadas de pão francês hoje"}
      </p>
      <p className="mt-1.5 font-heading text-[clamp(1.5rem,3vw,1.9rem)] leading-tight font-bold tabular-nums">
        {!next
          ? `Amanhã a partir das ${fmtHour(batches[0].hm)}`
          : next === batches[0] && next.t - mins > 120
            ? `Primeira fornada às ${fmtHour(next.hm)}`
            : `Próxima em ${fmtDuration(next.t - mins)}`}
      </p>

      <div className="relative mt-6 mb-1 h-10">
        <div className="absolute inset-x-0 top-[5px] h-0.5 bg-current opacity-15" />
        {nowInside && <div className="absolute top-[5px] left-0 h-0.5 bg-current opacity-40" style={{ width: pos(mins) }} />}
        <ol className="m-0 list-none p-0">
          {batches.map((b) => {
            const past = b.t <= mins
            const isNext = b === next
            return (
              <li
                key={b.hm}
                className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1.5"
                style={{ left: pos(b.t) }}
              >
                <span
                  className={cn(
                    // Tudo em currentColor: funciona sobre qualquer fundo
                    "size-3 rounded-full border-2 border-current",
                    isNext ? "size-3.5 bg-current" : past ? "bg-current opacity-45" : "bg-transparent opacity-70",
                  )}
                />
                <span
                  className={cn(
                    "text-sm tabular-nums",
                    isNext ? "font-bold" : past ? "line-through opacity-60" : "opacity-80",
                  )}
                >
                  {fmtHour(b.hm)}
                  {past && <span className="sr-only"> (já saiu)</span>}
                  {isNext && <span className="sr-only"> (próxima)</span>}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
