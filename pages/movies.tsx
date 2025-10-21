// pages/movies.tsx
import { useState } from "react";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
}

interface Props {
  movies: Movie[];
}

export default function Movies({ movies }: Props) {
  const [searchResults, setSearchResults] = useState<Movie[]>(movies);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Movies</h1>
      {searchResults.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {searchResults.map((movie) => (
            <li key={movie.Title} style={{ marginBottom: "1rem" }}>
              <img src={movie.Poster} alt={movie.Title} width={100} />
              <p>{movie.Title} ({movie.Year})</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// This runs on the server for every request
export async function getServerSideProps() {
  const apiKey = process.env.OMDB_API_KEY; // Read from Vercel environment
  const res = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=batman`);
  const data = await res.json();

  return {
    props: {
      movies: data.Search || [],
    },
  };
}
