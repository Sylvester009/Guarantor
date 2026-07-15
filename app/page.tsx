import Cards from "@/component/cards";
import Header from "@/component/header";
import Tables from "@/component/tables";

export default function Dashboard() {
  return (
    <main className="bg-background">
      <Header />
      <Cards />
      <Tables />
    </main>
  );
}
