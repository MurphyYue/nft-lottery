import React, { useState, useEffect, useRef } from "react";
import ImageWithLoading from "./ImageWithLoading";
import Layout from "Layout";
import Footer from "@components/Footer";

const ImageGrid = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const totalImages = 72; // Total number of images
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const loadImages = (page) => {
    // Simulate fetching images from an API
    const step = 12;
    const newImages = Array.from({ length: step }, (_, i) => ({
      id: (page - 1) * step + i,
      url: `https://violet-cheerful-starfish-646.mypinata.cloud/ipfs/QmcdAvynf5Sb8CUDDwL1ufc4W7dU32eEWozc94qrFwTNra/${
        (page - 1) * step + i + 1
      }.png`,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    setLoading(false); // Set loading to false after images are loaded
  };

  useEffect(() => {
    if (images.length < totalImages) {
      setLoading(true); // Set loading to true before loading new images
      loadImages(page);
    }
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      console.log("scroll");
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          // Adjust the threshold as needed
          if (images.length < totalImages) {
            setPage((prevPage) => prevPage + 1);
          }
        }
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [images]);

  return (
    <Layout>
      <div
        ref={containerRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 overflow-auto h-screen"
        style={{height: 'calc(100vh - 142px)'}}
      >
        {images.map((image) => (
          <div key={image.id} className="relative w-full h-0 pb-[100%]">
            {loading ? (
              <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse"></div>
            ) : (
              <ImageWithLoading src={image.url} alt={`Image ${image.id}`} />
            )}
          </div>
        ))}
        {images.length >= totalImages && (
          <div className="col-span-full text-center text-gray-500 mb-4">
            More exciting, stay tuned!
          </div>
        )}
      </div>
      <div className="fixed bottom-0 w-full left-0">
        <Footer />
      </div>
    </Layout>
  );
};

export default ImageGrid;
