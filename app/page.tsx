import ExampleMaps from "./ui/frontpage/ExampleMaps"
import HeadingAndSignUp from "./ui/frontpage/HeadingAndSignUp"
import TextBlockOne from "./ui/frontpage/TextBlockOne"
import TextBlockTwo from "./ui/frontpage/TextBlockTwo"
import UpcomingFeatures from "./ui/frontpage/UpcomingFeatures"
import ExampleMap from "./ui/example-components/ExampleMap"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Home() {

  const user = await auth();
  if (user) redirect('/maps')

  return (
    <main className="flex flex-col items-center w-full gap-10 my-8 md:my-16 md:gap-20">
      <HeadingAndSignUp heading="Remember The Places That Matter" text="Create and explore your own maps." buttonText="Get Started For Free" />
      <ExampleMap />
      <TextBlockOne />
      <ExampleMaps />
      <TextBlockTwo />
      <UpcomingFeatures />
      <HeadingAndSignUp heading="Get Started Right Away" buttonText="Sign In" />
    </main>
  )
}