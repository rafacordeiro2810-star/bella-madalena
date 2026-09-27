import { useEffect, useRef, useState } from "react"
import { PauseIcon, PlayIcon } from "lucide-react"
import pao from "@/assets/fotos/pao.webp"
import poster from "@/assets/video/pao-cortado-poster.webp"
import videoMp4 from "@/assets/video/pao-cortado.mp4"
import videoWebm from "@/assets/video/pao-cortado.webm"
import { Button } from "@/components/ui/button"
import { WhatsAppButton } from "@/components/whatsapp"
import { useNow } from "@/hooks/use-now"
import { openStatus } from "@/lib/time"
import { cn } from "@/lib/utils"
import { OvenClock } from "./oven-clock"

/** Velocidade do vídeo de fundo (1 = normal). */
const SPEED = 0.6

/** Vídeo de fundo em loop, sem som. Respeita "reduzir movimento" e pode ser pausado. */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.defaultPlaybackRate = v.playbackRate = SPEED
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }, [])

  const toggle = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {})
    else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onLoadedMetadata={(e) => (e.currentTarget.playbackRate = SPEED)}
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
      >
        <source src={videoWebm} type="video/webm" />
        <source src={videoMp4} type="video/mp4" />
      </video>
      {/* Filtro escuro para o texto branco ficar legível */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/70" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pausar vídeo" : "Tocar vídeo"}
        className="absolute right-4 bottom-4 z-10 grid size-10 place-items-center text-white/80 hover:text-white sm:right-6"
      >
        {playing ? <PauseIcon className="size-5" /> : <PlayIcon className="size-5" />}
      </button>
    </>
  )
}

export function Hero() {
  const status = openStatus(useNow())

  return (
    <>
      <section id="inicio" className="relative isolate overflow-hidden bg-crust text-white">
        <HeroVideo />
        <div className="relative mx-auto flex min-h-[min(82svh,760px)] max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:py-24">
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-white/85">
            <span className={cn("size-2 rounded-full", status.isOpen ? "bg-[#5FD18A]" : "bg-white/70")} />
            {status.label}
          </p>
          <h1 className="max-w-[14em] text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.04] font-bold">
            Pão quentinho, várias vezes ao dia, na sua esquina.
          </h1>
          <p className="mt-5 max-w-[34em] text-[clamp(1.05rem,1.5vw,1.2rem)] leading-relaxed text-white/85">
            Pão francês crocante, pão de queijo, doces de vitrine e bolos por encomenda, feitos aqui mesmo. Peça pelo
            WhatsApp e retire sem fila.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton>Encomendar pelo WhatsApp</WhatsAppButton>
            <Button
              asChild
              variant="outline"
              className="h-12 border-white/70 bg-transparent px-6 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#vitrine">Ver a vitrine</a>
            </Button>
          </div>
          <p className="mt-5 text-sm text-white/75">
            Sem cadastro e sem aplicativo. Bolos e cestas com 24 horas de antecedência.
          </p>
        </div>
      </section>

      {/* A dobra do saquinho: faixa vermelha com borda serrilhada embaixo.
          O pão atravessa essa borda, meio no vermelho, meio no branco, sem ficar sobre o vídeo. */}
      <div className="relative pb-[18vw] lg:pb-0">
        <section aria-label="Fornadas de hoje" className="zig bg-wine text-on-wine">
          <div className="mx-auto max-w-6xl px-4 pt-10 pb-[30vw] sm:px-6 sm:pb-[24vw] lg:py-14">
            <OvenClock className="max-w-xl" />
          </div>
        </section>
        <img
          src={pao}
          alt=""
          aria-hidden="true"
          width={900}
          height={585}
          className="pointer-events-none absolute right-[5%] bottom-[18vw] z-10 w-[min(62vw,420px)] translate-y-1/2 -rotate-[8deg] [filter:drop-shadow(0_4px_4px_rgb(0_0_0/.22))_drop-shadow(0_26px_22px_rgb(0_0_0/.32))] select-none lg:right-[max(2rem,calc((100vw-72rem)/2+3rem))] lg:bottom-0"
        />
      </div>
    </>
  )
}
