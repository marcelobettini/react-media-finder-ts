import { MediaApiResponse } from "../entities/media.entity";
import MediaCard from "./MediaCard";

type Props = {
  media: MediaApiResponse[];
};
export default function MediaList({ media }: Props) {
  return (
    <>
      {!media ? (
        <p>No results</p>
      ) : (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat( auto-fill, minmax(300px, 1fr) )",
            gap: "1rem",
          }}
        >
          {media.map((ttl) => (
            <MediaCard key={ttl.imdbID} media={ttl} />
          ))}
        </section>
      )}
    </>
  );
}
