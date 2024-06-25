import Link from "next/link"
import { Inter } from "next/font/google"
import { FC } from "react"

const inter = Inter({ subsets: ["latin"] })

const is = <T extends {}>(o: T | null | undefined): o is T => o != null

const classNames = (...classes: (string | null | undefined)[]): string =>
  classes.filter(is).join(" ")

const Card: FC<{ href: string; title: string; description: string }> = ({
  href,
  title,
  description,
}) => (
  <Link href={href}>
    <div className="p-4 rounded-lg border-4 border-gray-400 hover:border-gray-500 h-64 flex flex-col">
      <h3 className="text-lg h-16">{title}</h3>
      <p className="text-gray-500 flex-1">{description}</p>
      <p className="text-xl text-right">→</p>
    </div>
  </Link>
)

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="grid grid-cols-3 gap-8">
        <Card
          href="/app?user=guybrush"
          title="Guybrush Threepwood"
          description="A mighty pirate."
        />
        <Card
          href="/app?user=elaine"
          title="Elaine&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Marley"
          description="The governor of Melee Island."
        />
        <Card
          href="/app?user=lechuck"
          title="The Fearsome Pirate LeChuck"
          description="Noted ghost/demon/zombie antagonist."
        />
      </div>
    </main>
  )
}
