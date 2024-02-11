import { useState } from "react";
import { MediaApiResponse } from "../entities/media.entity";
import noImage from "../assets/noImage.png";

interface Props {
  media: MediaApiResponse;
}
export default function MediaCard({ media }: Props) {
  //handle broken link use cases
  const [imageError, setImageError] = useState<boolean>(false);
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <article
      style={{
        marginTop: "1rem",
        display: "flex",
        padding: "1rem",
        columnGap: "16px",
        boxShadow: "2px 2px 6px",
      }}
    >
      {!imageError ? (
        <img
          src={media.Poster}
          alt={media.Title}
          width={100}
          onError={handleImageError}
        />
      ) : (
        <img
          src={noImage}
          alt={`no image for ${media.Title}`}
          title={`no image for ${media.Title}`}
          width={100}
        />
      )}
      <div>
        <h3>{media.Title}</h3>
        <p>{media.Type}</p>
        <p>{media.Year}</p>
      </div>
    </article>
  );
}
