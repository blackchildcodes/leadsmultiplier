"use client"

import { useState } from "react";
import Hero from "./Hero";
import Quotes from "./Quotes";
import Banner from "./Banner";
import Banner2 from "./Banner2";
import PopupPlayer from "./PopupPlayer";

function HomeClient() {
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

        {/* Video Player */}
        <PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />
    </>
  )
}

export default HomeClient