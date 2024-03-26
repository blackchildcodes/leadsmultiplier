"use client";
import { useState } from "react";
import PricingCard from "./pricing.card";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const [active, setActive] = useState("Monthly");
  return (
    <>
        <div className="container py-14 sm:min-h-[600px]">
            <div>
                <div className="w-full md:flex justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold sm:text-4xl text-center lg:text-left uppercase">
                            Pricing
                        </h1>
                        <h3 className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Simple. Predictable. Built for you.</h3>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                        <Button
                            className={`${
                                active === "Monthly"
                                ? "theme-orange"
                                : "bg-white text-black"
                            } rounded-r-[0] !p-1 text-2xl !px-6 border border-[#000]`}
                            onClick={() => setActive("Monthly")}
                            >
                            Monthly
                        </Button>
                        <Button
                            className={`${
                                active === "Yearly"
                                ? "theme-orange"
                                : "bg-white text-black"
                            } rounded-l-[0] !p-1 text-2xl !px-6 border border-[#000]`}
                            onClick={() => setActive("Yearly")}
                            >
                            Yearly
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
                    <PricingCard active={active} />
                </div>

            </div>
        </div>
    </>
  );
};

export default Pricing;
