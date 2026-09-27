import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const FAQ = [
  ["Vocês fazem entrega?", "Sim, para encomendas e pedidos no bairro. A taxa depende da distância e é informada no WhatsApp antes de confirmar."],
  ["Com quanto tempo preciso encomendar?", "Cestas e salgados, 24 horas. Bolos de festa, 48 horas. Pães do dia podem ser separados para retirada no mesmo dia."],
  ["Quais formas de pagamento vocês aceitam?", "Pix, cartões de débito e crédito e dinheiro. Para encomendas, o sinal pode ser pago por Pix."],
  ["Têm opções sem lactose ou sem glúten?", "Temos algumas opções durante a semana. Pergunte pelo WhatsApp o que está disponível no dia."],
]

export function Faq() {
  return (
    <section id="duvidas" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-8 text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1] font-bold">Dúvidas frequentes</h2>
        <Accordion type="single" collapsible className="max-w-3xl border-t">
          {FAQ.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-b">
              <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-muted-foreground">
                {q}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-base text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
