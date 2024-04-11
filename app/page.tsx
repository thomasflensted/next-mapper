import ExampleMaps from "./ui/frontpage/ExampleMaps"
import HeadingAndSignUp from "./ui/frontpage/HeadingAndSignUp"
import MapContainer from "./ui/map/MapContainer"
import TextBlockOne from "./ui/frontpage/TextBlockOne"
import TextBlockTwo from "./ui/frontpage/TextBlockTwo"
import UpcomingFeatures from "./ui/frontpage/UpcomingFeatures"

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full gap-20 my-16">
      <HeadingAndSignUp heading="Remember The Places That Matter" text="Create and explore your own maps." buttonText="Get Started For Free" />
      {/* <MapContainer /> */}
      <TextBlockOne />
      <ExampleMaps />
      <TextBlockTwo />
      <UpcomingFeatures />
      <HeadingAndSignUp heading="Get Started Right Away" buttonText="Sign Up" />
    </main>
  )
}