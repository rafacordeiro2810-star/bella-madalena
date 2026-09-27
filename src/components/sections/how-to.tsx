const STEPS = [
  { t: "Mande sua mensagem", d: "Diga o que deseja, a quantidade e o dia. Ficou em dúvida? O padeiro sugere." },
  { t: "Confirme o pedido", d: "Enviamos o valor e o horário de retirada ou entrega. Para encomendas, pedimos um sinal por Pix." },
  { t: "Retire quentinho", d: "Seu pedido fica separado no balcão, pronto na hora marcada. Ou chega até você." },
]

export function HowTo() {
  return (
    <section id="como" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 grid max-w-[40em] gap-3">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1] font-bold">Como encomendar</h2>
          <p className="text-lg text-muted-foreground">Sem cadastro e sem aplicativo. Tudo pelo WhatsApp.</p>
        </div>
        <ol className="m-0 grid list-none gap-8 p-0 md:grid-cols-3 md:gap-10">
          {STEPS.map((s, i) => (
            <li key={s.t} className="grid content-start gap-2">
              <span aria-hidden="true" className="font-heading text-2xl leading-none font-bold text-muted-foreground">
                {i + 1}
              </span>
              <h3 className="text-xl font-bold">{s.t}</h3>
              <p className="text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
