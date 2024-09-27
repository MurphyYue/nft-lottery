
import React, { useState, useEffect } from'react';
import { Loader } from "@lidofinance/lido-ui";

function ImageWithLoading({ src, alt }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => setIsLoading(false); // Set to false on error as well
  }, [src]);

  return (
    <div className="absolute inset-0 w-full h-full">
      {isLoading? (
        <Loader />
      ) : (
        <img src={src} alt={alt} className=" w-full h-full object-cover" />
      )}
    </div>
  );
}

export default ImageWithLoading;