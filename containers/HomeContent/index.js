import SaleTime from "@components/SaleTime";
import HomeBg1 from "@images/home_bg_1.jpg";
import HomeBg2 from "@images/home_bg_2.jpg";
import Footer from '@components/Footer';

const Home = () => {

  return (
    <div className="min-h-screen px-16">
      <main>
        <SaleTime />
        <div>
          <div className="rounded-3xl w-full mb-10 aspect-video overflow-hidden relative">
            <div className="text-center w-full text-zinc-950 text-5xl z-10">Become Stronger Bigger</div>
            <img src={HomeBg1.src} className="w-full object-cover absolute left-0 top-0 z-[-1]" />
          </div>
          <div className="rounded-3xl w-full mb-10 aspect-video overflow-hidden relative">
            <div className="text-zinc-950 text-5xl z-10 ml-3">
              <p>Eat well</p>
              <p>Healthy Diet</p>
            </div>
            <img src={HomeBg2.src} className="w-full object-cover absolute left-0 top-0 z-[-1]" />
          </div>
          <div className="rounded-3xl w-full mb-10 aspect-video overflow-hidden relative">
            <div className="text-zinc-950 text-5xl z-10 ml-3">
              <p>Civilized walk</p>
              <p>a dog</p>
            </div>
            <img src={HomeBg2.src} className="w-full object-cover absolute left-0 top-0 z-[-1]" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;


