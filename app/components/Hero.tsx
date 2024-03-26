import Image from "next/image";
import { BiPlayCircle } from "react-icons/bi";
import {
    RegisterLink
} from "@kinde-oss/kinde-auth-nextjs/components";

function Hero({ togglePlay } : {togglePlay : () => void }) {
  return (
    <>
        <div className="py-12 sm:py-0 duration-300 overflow-hidden">
            <div className="container min-h-[700px] flex relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center relative z-10">
                    {/* hero text section */}
                    <div className="order-2 sm:order-1 space-y-5 lg:pr-20 relative z-30">
                        <h1 data-aos="fade-up" className="text-4xl font-semibold">
                            FIND NEW CLIENTS INSTANTLY{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                            AND CLOSE MORE DEALS
                            </span>
                        </h1>
                        <p data-aos="fade-up" data-aos-delay="300">
                        Harness the power of cutting-edge technology to uncover 100% qualified clients, guaranteed to convert. Say goodbye to wasted time and hello to exponential growth for your business.
                        </p>

                        <div className="flex gap-6">
                            <RegisterLink>
                                <button
                                data-aos="fade-up"
                                data-aos-delay="500"
                                className="primary-btn"
                                >
                                Get Started
                                </button>
                            </RegisterLink>
                            
                            <button
                            data-aos="fade-up"
                            data-aos-delay="700"
                            onClick={togglePlay}
                            className="flex items-center gap-2"
                            >
                            {" "}
                            <BiPlayCircle className="text-3xl" />
                            See Demo
                            </button>
                        </div>
                    </div>

                    {/* image section */}
                    <div
                        data-aos="fade-up"
                        data-aos-offset="0"
                        className="order-1 sm:order-2"
                    >
                        <Image
                            src="/assets/hero.png"
                            width={642}
                            height={642}
                            alt="Picture of the author"
                        />
                    </div>
                </div>

                {/* Animated Blob */}
                <div className="h-[300px] w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full absolute top-0 left-0 blur-3xl animated-wrapper"></div>
            </div>
        </div>
    </>
  )
}

export default Hero