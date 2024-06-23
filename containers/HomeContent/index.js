import SaleTime from "@components/SaleTime";

const Home = () => {
  

  return (
    <div className="min-h-screen px-16">
      <main>
        <SaleTime />
      </main>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">所有NFT图片</h3>
        <div className="grid grid-cols-5 gap-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="w-24 h-24 border-2 border-gray-300 flex items-center justify-center">
              <p>{i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;


