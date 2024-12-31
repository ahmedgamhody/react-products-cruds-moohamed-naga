interface IImageProps {
  imageURL: string;
  alt: string;
  style: string;
}
export default function Image({ imageURL, alt, style }: IImageProps) {
  return <img src={imageURL} alt={alt} className={style} />;
}
