import { FC, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useLDClient, useFlags } from "launchdarkly-react-client-sdk"
import { useFeatureFlagEnabled, usePostHog } from "posthog-js/react"

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

  const [provider, setProvider] = useState<"posthog" | "launchdarkly">(
    "posthog",
  )

  const ld = useLDClient()
  const ph = usePostHog()

  useEffect(() => {
    if (user != null) {
      ld?.identify({
        kind: "user",
        email: user.email,
        key: user.id,
        name: user.name,
      })
      ph.identify(user?.id, { email: user.email, name: user.name })
    }
  }, [userId])

  const { protagonistMode: ldProtagonistMode, monkeyPlus: ldMonkeyPlus } =
    useFlags()

  const phProtagonistMode = useFeatureFlagEnabled("protagonist-mode")
  const phMonkeyPlus = useFeatureFlagEnabled("monkey-plus")

  const protagonistMode =
    provider === "posthog" ? phProtagonistMode : ldProtagonistMode
  const monkeyPlus = provider === "posthog" ? phMonkeyPlus : ldMonkeyPlus

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
