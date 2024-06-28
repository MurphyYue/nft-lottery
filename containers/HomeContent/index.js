import SaleTime from "@components/SaleTime";
import HomeBg1 from "@images/ether_diet.png";
import HomeBg2 from "@images/ether_spoter.png";
import Footer from '@components/Footer';

const Home = () => {

  return (
    <div className="min-h-screen px-16">
      <main>
        <SaleTime />
        <div>
          <div className="rounded-3xl w-full mb-10 overflow-hidden relative bg-indigo-300">
            <div className="text-5xl z-10 absolute left-10 top-10 z-1 leading-normal">
              <p className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 bg-clip-text text-transparent">
                Eat well
              </p>
              <p className="bg-gradient-to-r from-green-700 via-teal-700 to-cyan-700 bg-clip-text text-transparent">
                Healthy Diet
              </p>
            </div>
            <div className="w-full flex justify-center items-center my-10">
              <img src={HomeBg2.src} className="w-7/12 object-cover z-[1]" />
            </div>
          </div>
          <div className="rounded-3xl w-full mb-10 overflow-hidden relative bg-orange-500">
            <div className="text-4xl absolute left-10 top-10 z-1 leading-normal">
              <p className="bg-gradient-to-r from-pink-300 via-yellow-300 to-green-300 bg-clip-text text-transparent">
                Become Stronger Bigger
              </p>
            </div>
            <div className="w-full flex justify-end items-center my-10">
              <img src={HomeBg1.src} className="w-8/12 object-cover z-[1]" />
            </div>
          </div>
          <div className="rounded-3xl w-full mb-10 overflow-hidden relative bg-pink-400">
            <div className="text-5xl z-10 absolute left-10 top-10 z-1 leading-normal">
              <p className="bg-gradient-to-r from-gray-400 via-black to-lime-600 bg-clip-text text-transparent">
                Civilized walk
              </p>
              <p className="bg-gradient-to-r from-blue-400 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
                a dog
              </p>
            </div>
            <div className="w-full flex justify-center items-center my-10">
              <img src={HomeBg2.src} className="w-7/12 object-cover z-[1]" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;


