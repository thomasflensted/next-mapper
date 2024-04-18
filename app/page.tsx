import ExampleMaps from "./ui/frontpage/ExampleMaps"
import HeadingAndSignUp from "./ui/frontpage/HeadingAndSignUp"
import TextBlockOne from "./ui/frontpage/TextBlockOne"
import TextBlockTwo from "./ui/frontpage/TextBlockTwo"
import UpcomingFeatures from "./ui/frontpage/UpcomingFeatures"
import { seed } from "./lib/createTables"

export default async function Home() {

  return (
    <main className="flex flex-col items-center w-full gap-20 my-16">
      <HeadingAndSignUp heading="Remember The Places That Matter" text="Create and explore your own maps." buttonText="Get Started For Free" />
      <TextBlockOne />
      <ExampleMaps />
      <TextBlockTwo />
      <UpcomingFeatures />
      <HeadingAndSignUp heading="Get Started Right Away" buttonText="Sign Up" />
    </main>
  )
}