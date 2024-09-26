import SaleTime from "@components/SaleTime";
import HomeBg1 from "@images/ether_1.jpg";
import HomeBg2 from "@images/ether_2.jpg";
import HomeBg3 from "@images/ether_3.jpg";
import HomeBg4 from "@images/ether_4.jpg";
import Footer from "@components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-16">
      <main>
        <SaleTime />
        <div>
          <div className="flex flex-col md:flex-row md:even:flex-row-reverse">
            <div className="w-full md:max-w-[30%]">
              <h3 className="text-2xl md:text-6xl font-semibold text-center md:text-left md:mt-12">
                Consensuss
              </h3>
              <p className="text-base md:text-4xl md:ml-8 md:mt-10 mb-2 leading-relaxed text-gray-700 text-center md:text-left">
                Biger!
              </p>
              <p className="text-base md:text-4xl md:ml-16 md:mt-10 mb-2 leading-relaxed text-gray-700 text-center md:text-left">
                Stronger!
              </p>
            </div>
            <div className="rounded-3xl w-full mb-4 sm:mb-10 overflow-hidden relative">
              <img src={HomeBg4.src} className="w-full object-cover z-[1]" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:even:flex-row-reverse">
            <div className="w-full md:max-w-[30%] ml-0 md:ml-4">
              <h3 className="text-2xl md:text-4xl font-semibold text-center md:text-left md:mt-12">
                win-win
              </h3>
              <p className="text-base md:text-2xl md:ml-8 md:mt-10 mb-2 leading-relaxed text-gray-700 text-left">
                ERC721-C: Each minter gets a 3% royalty on the transaction.
              </p>
              <p className="text-base md:text-2xl md:ml-8 md:mt-10 mb-2 leading-relaxed text-gray-700 text-left">
                Airdrop Meme tokens to creators, miners, traders.
              </p>
            </div>
            <div className="rounded-3xl w-full mb-4 sm:mb-10 overflow-hidden relative">
              <img src={HomeBg1.src} className="w-full object-cover z-[1]" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:even:flex-row-reverse">
            <div className="w-full md:max-w-[30%] ml-0 md:ml-4">
              <h3 className="text-2xl md:text-4xl font-semibold text-center md:text-left md:mt-12">
                Meme
              </h3>
              <p className="text-base md:text-2xl md:ml-8 md:mt-10 mb-2 leading-relaxed text-gray-700 text-left">
                Create the meme token with the strongest consensus and the largest market cap.
              </p>
            </div>
            <div className="rounded-3xl w-full mb-4 sm:mb-10 overflow-hidden relative">
              <img src={HomeBg2.src} className="w-full object-cover z-[1]" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:even:flex-row-reverse">
            <div className="w-full md:max-w-[30%] ml-0 md:ml-4">
              {/* <h3 className="text-2xl md:text-4xl font-semibold text-center md:text-left md:mt-12">
                Meme
              </h3> */}
              <p className="text-base md:text-2xl md:ml-8 md:mt-10 mb-2 leading-relaxed text-gray-700 text-left">
                Together for the construction of Ethereum ecological construction to do more...
              </p>
            </div>
            <div className="rounded-3xl w-full mb-4 sm:mb-10 overflow-hidden relative">
              <img src={HomeBg3.src} className="w-full object-cover z-[1]" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
