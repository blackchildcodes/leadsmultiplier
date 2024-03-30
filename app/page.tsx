import Features from "./components/Features";
import AppStore from "./components/AppStore";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import HomeClient from "./components/HomeClient";

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }

  return (
    <>
      <HomeClient />
      <Features />
      <AppStore />
      <Pricing />
      <Footer />
    </>
  );
}
