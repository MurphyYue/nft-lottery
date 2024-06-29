import SaleTime from "@components/SaleTime";
import HomeBg1 from "@images/ether_diet.png";
import HomeBg2 from "@images/ether_spoter.png";
import Footer from "@components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-16">
      <main>
        <SaleTime />
        <div>
          <div className="rounded-3xl w-full mb-10 overflow-hidden relative bg-regal-blue p-4 sm:p-8">
            <div className="text-2xl sm:text-4xl lg:text-5xl sm:top-8 leading-normal text-white text-center">
              <p>Become Stronger Bigger</p>
            </div>
            <div className="w-full flex justify-center items-center my-4 sm:my-2 lg:my-10">
              <img src={HomeBg2.src} className="w-full sm:w-8/12 lg:w-7/12 object-cover z-[1]" />
            </div>
          </div>
          <div className="rounded-3xl w-full mb-10 overflow-hidden relative  p-4 sm:p-8 bg-regal-yellow">
            <div className="text-2xl sm:text-4xl lg:text-5xl z-10 absolute left-4 top-4 sm:left-8 sm:top-8 leading-normal text-regal-black">
              <p>Eat well</p>
              <p>Healthy Diet</p>
            </div>
            <div className="w-full flex justify-end items-center my-4 sm:my-2 lg:my-10">
              <img src={HomeBg1.src} className="w-full sm:w-8/12 object-cover z-[1]" />
            </div>
          </div>

          <div className="rounded-3xl w-full mb-10 overflow-hidden relative p-4 sm:p-8 bg-regal-pink">
            <div className="text-2xl sm:text-4xl lg:text-5xl z-10 absolute left-4 top-4 sm:left-8 sm:top-8 leading-normal text-white">
              <p>Civilized walk</p>
              <p>a dog</p>
            </div>
            <div className="w-full flex justify-center items-center my-4 sm:my-2 lg:my-10">
              <img src={HomeBg2.src} className="w-full sm:w-8/12 lg:w-7/12 object-cover z-[1]" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
