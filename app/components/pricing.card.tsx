import { GrowPlan, freePlan, scalePlan } from "@/app/configs/constants";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/utils/icons";
import { useRouter } from "next/navigation";

const PricingCard = ({ active }: { active: string }) => {
  const history = useRouter();

  return (
    <>
        {/* free plan */}
        <div className="text-center group space-y-3 sm:space-y-6 p-4 sm:py-10 bg-black hover:bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_#007cfff0] text-white hover:text-black rounded-lg duration-300">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="33"
                fill="string"
                className="mb-4"
            >
                <path
                    fill="#fff"
                    stroke="#3843D0"
                    strokeWidth="3"
                    d="M33.398 13.25a6.512 6.512 0 0 1 0 6.5l-4.887 8.487a6.512 6.512 0 0 1-5.643 3.263h-9.736a6.512 6.512 0 0 1-5.643-3.263L2.602 19.75a6.512 6.512 0 0 1 0-6.498l4.887-8.488A6.512 6.512 0 0 1 13.132 1.5h9.736a6.512 6.512 0 0 1 5.643 3.263l4.887 8.488Z"
                ></path>
            </svg>
            <h5 className="font-clashDisplay uppercase text-cyber-ink text-2xl pb-4 border-b">
                Launch
            </h5>
            <br />
            <div className="border-b pb-4">
                <h5 className="font-clashDisplay uppercase text-cyber-ink text-2xl">
                    $0
                </h5>
                <p className="text-lg">No commitment</p>
            </div>
            <div className="pt-5">
                <p className="text-xl">What&apos;s included...</p>
            </div>

            {freePlan.map((i: PlanType, index: number) => (
                <div key={index} className="flex w-full items-center py-4">
                    <span className="text-xl">{ICONS.right}</span>
                    <p className="pl-2 text-lg">{i.title}</p>
                </div>
            ))}
            <br />
            <Button color="primary" className="w-full text-xl !py-6">
                Get Started
            </Button>
            <p className="pt-1 opacity-[.7] text-center">
                30-day free trial of Scale features, then free forever
            </p>
        </div>

        {/* grow plan */}
        <div className="text-center group space-y-3 sm:space-y-6 p-4 sm:py-10 bg-black hover:bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_#007cfff0] text-white hover:text-black rounded-lg duration-300">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="33"
            fill="string"
            className="mb-4"
            >
                <path
                    fill="#fff"
                    stroke="#3843D0"
                    strokeWidth="3"
                    d="M33.398 13.25a6.512 6.512 0 0 1 0 6.5l-4.887 8.487a6.512 6.512 0 0 1-5.643 3.263h-9.736a6.512 6.512 0 0 1-5.643-3.263L2.602 19.75a6.512 6.512 0 0 1 0-6.498l4.887-8.488A6.512 6.512 0 0 1 13.132 1.5h9.736a6.512 6.512 0 0 1 5.643 3.263l4.887 8.488Z"
                ></path>
            </svg>
            <h5 className="font-clashDisplay uppercase text-cyber-ink text-2xl pb-4 border-b">
                GROW
            </h5>
            <br />
            <div className="border-b pb-4">
                <h5 className="font-clashDisplay uppercase text-cyber-ink text-2xl">
                    ${active === "Monthly" ? "49" : "42"} /month
                </h5>
                <p className="text-lg">Billed {active}</p>
            </div>
            <div className="pt-5">
                <p className="text-xl">Everything in Launch, plus...</p>
            </div>

            {GrowPlan.map((i: PlanType, index: number) => (
                <div key={index} className="flex w-full items-center py-4">
                    <span className="text-xl">{ICONS.right}</span>
                    <p className="pl-2 text-lg">{i.title}</p>
                </div>
            ))}
            <br />
            <Button color="primary" className="w-full text-xl !py-6">
                Get Started
            </Button>
            <p className="pt-1 opacity-[.7] text-center">
                30-day free trial of Scale features, then $
                {active === "Monthly" ? "42" : "49"}/mo
            </p>
        </div>

        {/* scale plan */}
        <div className="text-center group space-y-3 sm:space-y-6 p-4 sm:py-10 bg-black hover:bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_#007cfff0] text-white hover:text-black rounded-lg duration-300">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="33"
            fill="string"
            className="mb-4"
            >
                <path
                    fill="#fff"
                    stroke="#3843D0"
                    strokeWidth="3"
                    d="M33.398 13.25a6.512 6.512 0 0 1 0 6.5l-4.887 8.487a6.512 6.512 0 0 1-5.643 3.263h-9.736a6.512 6.512 0 0 1-5.643-3.263L2.602 19.75a6.512 6.512 0 0 1 0-6.498l4.887-8.488A6.512 6.512 0 0 1 13.132 1.5h9.736a6.512 6.512 0 0 1 5.643 3.263l4.887 8.488Z"
                ></path>
            </svg>
            <h5 className="font-clashDisplay uppercase text-cyber-ink text-2xl pb-4 border-b">
                SCALE
            </h5>
            <br />
            <div className="border-b pb-4">
                <h5 className="font-clashDisplay uppercase text-cyber-ink text-2xl">
                    ${active === "Monthly" ? "99" : "84"} /month
                </h5>
                <p className="text-lg">Billed {active}</p>
            </div>
            <div className="pt-5">
                <p className="text-xl">Everything in Grow, plus...</p>
            </div>

            {scalePlan.map((i: PlanType, index: number) => (
                <div key={index} className="flex w-full items-center py-4">
                    <span className="text-xl">{ICONS.right}</span>
                    <p className="pl-2 text-lg">{i.title}</p>
                </div>
            ))}
            <br />
            <Button color="primary" className="w-full text-xl !py-6">
                Get Started
            </Button>
            <p className="pt-1 opacity-[.7] text-center">
                30-day free trial of Scale features, then $
                {active === "Monthly" ? "99" : "84"}/mo
            </p>
        </div>
    </>
    
  );
};

export default PricingCard;
