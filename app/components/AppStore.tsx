import Image from "next/image";

const AppStore = () => {
  return (
    <>
      <div className="container py-10 sm:min-h-[400px] sm:grid sm:place-items-center">
        <div className="space-y-6 max-w-xl mx-auto">
          <h1
            data-aos="fade-up"
            className="text-2xl text-center sm:text-4xl font-semibold "
          >
            Get Started with our app
          </h1>
          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-center sm:px-20"
          >
            Ready to revolutionize your client acquisition process? It's time to take the first step towards unlocking unparalleled success with LeadsMultiplier.
          </p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <a href="#" data-aos="fade-up" data-aos-delay="500">
                <Image
                    src="/assets/website/app_store.png"
                    width={547}
                    height={185}
                    alt=""
                    className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
                />
            </a>
            <a href="#" data-aos="fade-up" data-aos-delay="700">
                <Image
                    src="/assets/website/play_store.png"
                    width={547}
                    height={185}
                    alt=""
                    className="max-w-[150px] sm:max-w-[120px] md:max-w-[200px]"
                />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppStore;
