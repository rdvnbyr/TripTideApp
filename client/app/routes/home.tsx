import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TripTide" },
    { name: "description", content: "TripTide Aplication" },
  ];
}

export default function Home() {
  return <div>Home</div>;
}
