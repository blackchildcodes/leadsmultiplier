"use client"

import Hero from "./components/Hero";
import Quotes from "./components/Quotes";
import { useState } from "react";
import PopupPlayer from "./components/PopupPlayer";
import Banner from "./components/Banner";
import Banner2 from "./components/Banner2";
import Features from "./components/Features";
import AppStore from "./components/AppStore";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";

export default function Home() {
  const [isPlay, setIsPlay] = useState(false);

  const togglePlay = () => {
    setIsPlay(!isPlay);
  };

  return (
    <>
      <Hero togglePlay={togglePlay} />
      <Quotes />
      <Banner togglePlay={togglePlay} />
      <Banner2 togglePlay={togglePlay} />
      <Features />
      <AppStore />
      <Pricing />
      <Footer />

      {/* Video Player */}
      <PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />
    </>
  );
}
