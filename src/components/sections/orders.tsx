import cafe from "@/assets/fotos/cafe.webp"
import torta from "@/assets/fotos/torta-limao.webp"
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid"
import { WhatsAppButton } from "@/components/whatsapp"

const secondary = "h-10 px-5 text-[0.95rem]"
const when = "text-sm text-muted-foreground"

export function Orders() {
  return (
    <section id="encomendas" className="border-t py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 grid max-w-[40em] gap-3">
          <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.1] font-bold">Encomendas para os seus momentos</h2>
          <p className="text-lg text-muted-foreground">
            Do café da manhã de aniversário ao coffee break da empresa. Você escolhe, a gente prepara e deixa pronto na
            hora combinada.
          </p>
        </div>

        <BentoGrid>
          <BentoCard
            name="Cesta de café da manhã"
            description="Um presente que chega cheirando a forno. Montamos a cesta com o que há de melhor na casa."
            className="md:col-span-2 md:row-span-2 [&_h3]:text-[clamp(1.5rem,2.6vw,2rem)]"
            image={{ src: cafe, alt: "Xícara de cappuccino com desenho de coração na espuma", className: "md:aspect-[2/1]" }}
            footer={
              <>
                <WhatsAppButton msg="Olá! Quero encomendar uma cesta de café da manhã.">Montar minha cesta</WhatsAppButton>
                <span className={when}>Peça até as 18h do dia anterior.</span>
              </>
            }
          >
            <ul className="mt-3 grid list-disc gap-1 pl-5 sm:grid-cols-2 sm:gap-x-8">
              <li>Pães artesanais e pão de queijo</li>
              <li>Bolo caseiro em fatias</li>
              <li>Frios, geleia, manteiga e requeijão</li>
              <li>Suco natural e café</li>
              <li>Cartão com a sua mensagem</li>
            </ul>
          </BentoCard>

          <BentoCard
            name="Bolos e tortas de festa"
            description="Massas e recheios clássicos e tortas como a de limão com merengue, para 10 a 60 pessoas."
            image={{ src: torta, alt: "Torta de limão com merengue maçaricado e raspas de limão" }}
            footer={
              <>
                <WhatsAppButton icon={false} variant="outline" className={secondary} msg="Olá! Quero encomendar um bolo ou uma torta de festa.">
                  Encomendar
                </WhatsAppButton>
                <span className={when}>48 horas de antecedência.</span>
              </>
            }
          />
          <BentoCard
            name="Salgados para festa"
            description="Coxinha, kibe, bolinha de queijo e empada, fritos ou congelados, pelo cento."
            footer={
              <>
                <WhatsAppButton icon={false} variant="outline" className={secondary} msg="Olá! Quero encomendar salgados para festa.">
                  Pedir o cento
                </WhatsAppButton>
                <span className={when}>24 horas de antecedência.</span>
              </>
            }
          />
          <BentoCard
            name="Coffee break"
            description="Mesa completa para reuniões e eventos da sua empresa, com entrega no local."
            footer={
              <WhatsAppButton icon={false} variant="outline" className={secondary} msg="Olá! Gostaria de um orçamento de coffee break.">
                Pedir orçamento
              </WhatsAppButton>
            }
          />
          <BentoCard
            name="Pão para o seu negócio"
            description="Fornecimento diário de pães para restaurantes, lanchonetes e condomínios, com condições para pedidos recorrentes."
            className="md:col-span-2"
            footer={
              <WhatsAppButton icon={false} variant="outline" className={secondary} msg="Olá! Tenho interesse em fornecimento diário de pães.">
                Falar sobre fornecimento
              </WhatsAppButton>
            }
          />
        </BentoGrid>
      </div>
    </section>
  )
}
