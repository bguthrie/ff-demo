import { FC, useEffect, useMemo, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import {
  withLDProvider,
  useLDClient,
  useFlags,
  LDProvider,
} from "launchdarkly-react-client-sdk"

type User = { id: string; email: string; name: string }

const UserList: User[] = [
  {
    id: "guybrush",
    name: "Guybrush Threepwood",
    email: "g.marley-threepwood@example.com",
  },
  {
    id: "elaine",
    name: "Elaine Marley",
    email: "e.marley-threepwood@example.com",
  },
  {
    id: "lechuck",
    name: "The Ghost Pirate LeChuck",
    email: "lechuck+ghost@example.com",
  },
] as const

const classNames = (...classes: (string | null | undefined)[]): string =>
  classes.filter((s) => s != null && s.length > 0).join(" ")

const _Page: FC = () => {
  const params = useSearchParams()
  const userId = params.get("user")
  const user = useMemo<User | undefined>(
    () => UserList.find((u) => u.id === userId?.toString()),
    [userId],
  )

  const ld = useLDClient()

  useEffect(() => {
    console.log("identifying", user)
    ld?.identify({
      kind: "user",
      email: user?.email,
      key: user?.id,
      name: user?.name,
    })
  }, [userId])

  const { protagonistMode, monkeyPlus } = useFlags()

  return (
    <main
      className={classNames(
        "flex flex-col items-center justify-between min-h-screen p-24",
        monkeyPlus ? "bg-blue-700 text-white animate-bounce" : "",
      )}
    >
      <div>I am {user?.name}</div>
      <div>I am {protagonistMode ? "a protagonist" : "an antagonist"}</div>
      <div className="">
        <p className="">Monkey Plus mode is {monkeyPlus ? "on" : "off"}</p>
      </div>
    </main>
  )
}

export default _Page
