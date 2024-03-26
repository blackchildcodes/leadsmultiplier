import React from "react";
import BannerPng from "../../assets/banner2.png";
import { BiPlayCircle } from "react-icons/bi";
import Image from "next/image";
import {
  RegisterLink
} from "@kinde-oss/kinde-auth-nextjs/components";

const Banner2 = ({ togglePlay } : { togglePlay : () => void }) => {
  return (
    <div className="py-12 sm:py-0 relative">
      <div className="container min-h-[620px] flex items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 place-items-center">
          {/* text content section */}
          <div className="order-2 sm:order-1  lg:pr-20 relative">
            <div className="relative z-10 space-y-5">
              <h1
                data-aos="fade-up"
                data-aos-delay="300"
                className="text-4xl font-semibold"
              >
                UNLOCK YOUR POTENTIAL{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  WHERE EVERY LEAD COUNTS
                </span>
              </h1>
              <p data-aos="fade-up" data-aos-delay="500">
              Say goodbye to chasing dead-end leads and hello to a stream of qualified clients who are ready to convert and grow your business exponentially.
              </p>
              <div className="flex gap-6">
                <RegisterLink>
                  <button
                    data-aos="fade-up"
                    data-aos-delay="700"
                    className="primary-btn"
                  >
                    Get Started
                  </button>
                </RegisterLink>
                <button
                  data-aos="fade-up"
                  data-aos-delay="900"
                  onClick={togglePlay}
                  className="flex items-center gap-2"
                >
                  {" "}
                  <BiPlayCircle className="text-3xl" />
                  See Demo
                </button>
              </div>
            </div>
            {/* backgrond color blob */}
            <div className="h-[300px] w-[300px] bg-gradient-to-r from-primary to-secondary rounded-full absolute bottom-[-200px] left-[300px] blur-3xl opacity-50 "></div>
          </div>

          {/* image section */}
          <div data-aos="fade-up" className="order-1 sm:order-2">
            <Image
                src="/assets/banner2.png"
                width={498}
                height={536}
                alt=""
                className="w-full max-w-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
