"use client";

import Cards from "@/component/cards";
import Header from "@/component/header";
import Tables from "@/component/tables";
import { getUser } from "@/services/user";

export default function Dashboard() {
  const user = getUser();
  
  return (
    <main className="bg-background">
      <Header user={user} />
      <Cards user={user} />
      <Tables user={user} />
    </main>
  );
}
