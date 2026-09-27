import paes from "@/assets/fotos/cesta-paes-perto.webp"
import { CONFIG } from "@/config"

const FACTS = [
  [String(CONFIG.fornadas.length), "fornadas por dia"],
  ["100%", "feito na casa"],
  ["7 dias", "de portas abertas"],
]

export function House() {
  return (
    <section id="casa" className="border-t py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <img
          src={paes}
          alt="Fatias de pão de forma e pão integral com o miolo à mostra"
          loading="lazy"
          width={1400}
          height={1190}
          className="aspect-[4/3] w-full rounded-sm object-cover lg:aspect-square"
        />
        <div className="grid max-w-[34em] gap-4 text-[1.06rem] leading-relaxed">
          <h2 className="mb-2 text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1] font-bold">
            Casa dos pães é onde o bairro começa o dia.
          </h2>
          <p>
            A Bella Madalena nasceu da vontade de ter uma padaria de verdade por perto: massa sovada com calma, forno aceso
            desde a madrugada e gente que sabe o seu pedido de cor.
          </p>
          <p>
            O pão francês sai várias vezes ao dia para você nunca levar pão de ontem. Os doces e bolos seguem receitas de
            família, feitos em pequenas quantidades.
          </p>
          <dl className="mt-2 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
            {FACTS.map(([v, l]) => (
              <div key={l} className="flex flex-col-reverse border-t pt-2.5">
                <dt className="text-sm text-muted-foreground">{l}</dt>
                <dd className="m-0 font-heading text-2xl font-bold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
