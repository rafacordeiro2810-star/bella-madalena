// Adaptado de "Bento Grid" (manuarora700) do 21st.dev.
// Mudanças: a chamada para ação fica sempre visível (no original ela só aparecia
// no hover, o que some no celular), sem caixa, sombra ou brilho, e com foto
// opcional no topo de cada item.
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function BentoGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("grid w-full grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3", className)}>{children}</div>
}

export function BentoCard({
  name,
  description,
  className,
  image,
  children,
  footer,
}: {
  name: string
  description: string
  className?: string
  image?: { src: string; alt: string; className?: string }
  children?: ReactNode
  footer: ReactNode
}) {
  return (
    <article className={cn("flex flex-col gap-5", !image && "border-t pt-6", className)}>
      {image && (
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className={cn("aspect-[16/9] w-full rounded-sm object-cover", image.className)}
        />
      )}
      <div className="flex flex-1 flex-col justify-between gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="max-w-lg text-muted-foreground">{description}</p>
          {children}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">{footer}</div>
      </div>
    </article>
  )
}
