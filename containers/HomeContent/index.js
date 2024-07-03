import SaleTime from "@components/SaleTime";
import HomeBg1 from "@images/ether_1.jpg";
import HomeBg2 from "@images/ether_2.jpg";
import HomeBg3 from "@images/ether_3.jpg";
import Footer from "@components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-16">
      <main>
        <SaleTime />
        <div>
          {/* <div className="rounded-3xl w-full mb-10 overflow-hidden relative bg-regal-blue p-4 sm:p-8">
            <div className="text-2xl sm:text-4xl lg:text-5xl sm:top-8 leading-normal text-white text-center">
              <p>Become Stronger Bigger</p>
            </div>
            <div className="w-full flex justify-center items-center my-4 sm:my-2 lg:my-10">
              <img src={HomeBg1.src} className="w-full sm:w-8/12 lg:w-7/12 object-cover z-[1]" />
            </div>
          </div> */}
          <div className="rounded-3xl w-full mb-4 sm:mb-10 overflow-hidden relative">
            <img src={HomeBg1.src} className="w-full object-cover z-[1]" />
          </div>
          <div className="rounded-3xl w-full mb-4 sm:mb-10 overflow-hidden relative">
            <img src={HomeBg2.src} className="w-full object-cover z-[1]" />
          </div>
          <div className="rounded-3xl w-full mb-4 sm:mb-10 overflow-hidden relative">
            <img src={HomeBg3.src} className="w-full object-cover z-[1]" />
          </div>

          {/* <div className="rounded-3xl w-full mb-10 overflow-hidden relative bg-regal-purple1">
            <div className="text-2xl sm:text-4xl lg:text-5xl z-10 absolute left-4 top-4 sm:left-8 sm:top-8 leading-normal text-white">
              <p>Civilized walk</p>
              <p>a dog</p>
            </div>
            <div className="w-full flex justify-end items-center mt-4 sm:mt-2 lg:mt-10">
              <img src={HomeBg3.src} className="w-full object-cover z-[1]" />
            </div>
          </div> */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
