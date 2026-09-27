/* ===== Ajuste aqui os dados da padaria ===== */
export const CONFIG = {
  whatsapp: "5511940256155", // DDI + DDD + número, só dígitos
  phoneLabel: "(11) 94025-6155",
  address: "Rua Heitor Penteado, 379, Vila Madalena, São Paulo, 05437-000",
  instagram: "bellamadalena",
  /** Horários das fornadas de pão francês (HH:MM). */
  fornadas: ["6:30", "10:00", "15:30", "17:30"],
  /** Horário de funcionamento por dia da semana (0 = domingo). */
  hours: {
    0: ["6:30", "13:00"],
    1: ["6:00", "20:00"],
    2: ["6:00", "20:00"],
    3: ["6:00", "20:00"],
    4: ["6:00", "20:00"],
    5: ["6:00", "20:00"],
    6: ["6:00", "19:00"],
  } as Record<number, [string, string]>,
}

export type Product = {
  id: string
  name: string
  desc: string
  price: string
  unit: string
  popular?: boolean
}

export type Category = { id: string; label: string; products: Product[] }

export const CATEGORIES: Category[] = [
  {
    id: "paes",
    label: "Pães",
    products: [
      { id: "frances", name: "Pão francês", desc: "Casca fina e crocante, miolo leve. O clássico de toda manhã.", price: "18,90", unit: "/kg", popular: true },
      { id: "queijo", name: "Pão de queijo", desc: "Feito com queijo meia cura, assado na hora.", price: "4,50", unit: "/un", popular: true },
      { id: "italiano", name: "Pão italiano", desc: "Fermentação longa, casca grossa e miolo aberto.", price: "16,00", unit: "/un" },
      { id: "forma", name: "Pão de forma caseiro", desc: "Macio, fatiado na hora, sem conservantes.", price: "14,00", unit: "/un" },
      { id: "doce-coco", name: "Pão doce com coco", desc: "Massa fofinha coberta com coco e calda.", price: "6,50", unit: "/un" },
      { id: "baguete", name: "Baguete", desc: "Perfeita para bruschetta e sanduíche.", price: "9,00", unit: "/un" },
    ],
  },
  {
    id: "salgados",
    label: "Salgados",
    products: [
      { id: "coxinha", name: "Coxinha de frango", desc: "Massa de batata e recheio cremoso com catupiry.", price: "8,00", unit: "/un", popular: true },
      { id: "esfiha", name: "Esfiha de carne", desc: "Aberta, com carne temperada e limão.", price: "7,00", unit: "/un" },
      { id: "enroladinho", name: "Enroladinho de salsicha", desc: "Massa folhada dourada no forno.", price: "6,50", unit: "/un" },
      { id: "empada", name: "Empada de palmito", desc: "Massa que desmancha e recheio generoso.", price: "8,50", unit: "/un" },
      { id: "misto", name: "Misto quente na chapa", desc: "Pão francês, presunto e queijo derretido.", price: "9,00", unit: "/un" },
    ],
  },
  {
    id: "doces",
    label: "Doces",
    products: [
      { id: "sonho", name: "Sonho de creme", desc: "Recheado na hora com creme de baunilha.", price: "7,50", unit: "/un", popular: true },
      { id: "bomba", name: "Bomba de chocolate", desc: "Massa choux com creme e cobertura de chocolate.", price: "8,00", unit: "/un" },
      { id: "madalena", name: "Madalena", desc: "O bolinho que dá nome à casa, amanteigado e com raspas de limão.", price: "4,00", unit: "/un", popular: true },
      { id: "pudim", name: "Pudim de leite", desc: "Fatia cremosa, sem furinhos.", price: "9,50", unit: "/fatia" },
      { id: "brigadeiro", name: "Brigadeiro gourmet", desc: "Chocolate belga, enrolado à mão.", price: "4,00", unit: "/un" },
    ],
  },
  {
    id: "bolos",
    label: "Bolos",
    products: [
      { id: "cenoura", name: "Bolo de cenoura", desc: "Com cobertura de chocolate que escorre.", price: "38,00", unit: "/inteiro" },
      { id: "fuba", name: "Bolo de fubá com goiabada", desc: "Receita de vó, para o café da tarde.", price: "34,00", unit: "/inteiro" },
      { id: "chocolate", name: "Bolo de chocolate recheado", desc: "Recheio de brigadeiro. Também por encomenda.", price: "89,00", unit: "/kg" },
      { id: "laranja", name: "Bolo de laranja", desc: "Úmido, com calda de laranja natural.", price: "34,00", unit: "/inteiro" },
    ],
  },
]
/* =========================================== */
