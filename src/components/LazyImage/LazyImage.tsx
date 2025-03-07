import { useState } from "react";

export interface ILazyImage {
  src: string;
  placeholder: string;
  alt: string;
  className: string;
}
const LazyImage = ({ src, placeholder, alt, ...props }: ILazyImage) => {
  const [imageSrc, setImageSrc] = useState(placeholder); // Начинаем с заглушки

  // Обработчик успешной загрузки изображения
  const handleLoad = () => {
    setImageSrc(src); // Заменяем заглушку на основное изображение
  };

  return (
    <img
      src={imageSrc} // Динамический src
      alt={alt}
      loading="lazy"
      onLoad={handleLoad}
      style={{
        objectFit: "cover", // Для сохранения пропорций изображения
        filter: imageSrc === placeholder ? "blur(5px)" : "none", // Размытие для заглушки
      }}
      {...props}
    />
  );
};

export default LazyImage;
