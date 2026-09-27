import logo from "@/assets/logo-bella.webp"
import { FloatingHeader } from "@/components/ui/floating-header"
import { Toaster } from "@/components/ui/sonner"
import { WhatsAppButton } from "@/components/whatsapp"
import { BagDock } from "@/components/sections/bag-dock"
import { Faq } from "@/components/sections/faq"
import { Hero } from "@/components/sections/hero"
import { House } from "@/components/sections/house"
import { HowTo } from "@/components/sections/how-to"
import { Orders } from "@/components/sections/orders"
import { Showcase } from "@/components/sections/showcase"
import { Visit } from "@/components/sections/visit"
import { BagProvider } from "@/hooks/use-bag"
import { cn } from "@/lib/utils"

const LINKS = [
  { label: "Vitrine", href: "#vitrine" },
  { label: "Encomendas", href: "#encomendas" },
  { label: "A casa", href: "#casa" },
  { label: "Visite", href: "#visite" },
]

function Logo({ className }: { className?: string }) {
  return (
    <a href="#inicio" className="shrink-0">
      <img
        src={logo}
        alt="Bella Madalena, Casa dos Pães"
        width={674}
        height={160}
        className={cn("h-10 w-auto", className)}
      />
    </a>
  )
}

export default function App() {
  return (
    <BagProvider>
      <FloatingHeader
        brand={<Logo />}
        links={LINKS}
        cta={<WhatsAppButton className="h-10 px-4 text-[0.95rem]">Pedir agora</WhatsAppButton>}
      />

      <main>
        <Hero />
        <Showcase />
        <Orders />
        <HowTo />
        <House />
        <Faq />
        <Visit />
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 pt-8 pb-28 sm:px-6">
          <Logo className="h-9" />
          <span className="text-muted-foreground">Feito com farinha, fermento e tempo.</span>
        </div>
      </footer>

      <BagDock />
      <Toaster position="top-center" theme="light" />
    </BagProvider>
  )
}
