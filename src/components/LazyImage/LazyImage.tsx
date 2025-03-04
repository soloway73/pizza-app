import { useState } from "react";

export interface ILazyImage {
  src: string;
  placeholder: string;
  alt: string;
}
const LazyImage = ({ src, placeholder, alt }: ILazyImage) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Обработчик ошибки загрузки изображения
  const handleLoaded = () => {
    setIsLoaded(true);
  };

  // Обработчик ошибки загрузки изображения
  const handleError = () => {
    setIsLoaded(false);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "auto" }}>
      <img
        src={isLoaded ? src : placeholder}
        alt={alt}
        loading="lazy"
        onLoad={handleLoaded}
        onError={handleError}
      />
    </div>
  );
};

export default LazyImage;
