// Adaptado de "Floating Header" (efferd) do 21st.dev.
// Mantém a estrutura (marca, links, ação e menu lateral no celular), mas sem o
// efeito flutuante: vira uma barra fixa simples, com fundo sólido e uma linha embaixo.
import { useState } from "react"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type HeaderLink = { label: string; href: string }

export function FloatingHeader({
  brand,
  links,
  cta,
  className,
}: {
  brand: React.ReactNode
  links: HeaderLink[]
  cta: React.ReactNode
  className?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background", className)}>
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {brand}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a key={link.href} className="text-[0.95rem] font-medium hover:underline hover:underline-offset-4" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {/* No celular a sacola fixa no rodapé já faz esse papel */}
          <div className="hidden sm:block">{cta}</div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon-lg" variant="ghost" className="lg:hidden" aria-label="Abrir menu">
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="gap-0 bg-background" side="right">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="grid overflow-y-auto px-6 pt-14 pb-5">
                {links.map((link) => (
                  <a
                    key={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b py-3.5 text-lg font-medium"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <SheetFooter className="px-6" onClick={() => setOpen(false)}>
                {cta}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
