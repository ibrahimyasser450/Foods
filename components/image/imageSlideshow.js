import { useEffect, useState } from "react";
import Image from "next/image";
import classes from "./imageSlideshow.module.css";

// when the home page loaded, should fet all data from database and show the images in home page, show the first and after 3 seconds will show the next image.
export default function ImageSlideshow() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // get the data from database and store all images in state
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/foods");
      const data = await response.json();
      const foodImages = data.foods.map((food) => ({
        image: food.image,
        alt: food.title,
      }));
      setImages(foodImages); // Set the images in state
    }

    fetchData();
  }, []);

  // show the first and after 3 seconds will show the next image.
  useEffect(() => {
    // Image slideshow logic
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className={classes.slideshow}>
      {images.length > 0 ? (
        images.map((image, index) => (
          <Image
            key={index}
            src={image.image}
            // show the active image when the index is equal to the currentImageIndex
            className={index === currentImageIndex ? classes.active : ""}
            alt={image.alt}
            fill
          />
        ))
      ) : (
        // show loading when the images are not loaded.
        <p className={classes.loading}>Loading images...</p>
      )}
    </div>
  );
}
