import { useEffect, useState } from "react";
import Image from "next/image";

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
        if (!apiKey) {
          setError("OMDB API key is missing!");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `https://www.omdbapi.com/?s=star+wars&apikey=${apiKey}`
        );
        const data: { Search?: Movie[]; Error?: string } = await res.json();

        if (data.Error) {
          setError(data.Error);
          setMovies([]);
        } else if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error: {error}</p>;
  if (movies.length === 0) return <p>No movies found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
        >
          {movie.Poster && movie.Poster !== "N/A" ? (
            <div className="relative w-full h-64">
              <Image
                src={movie.Poster}
                alt={movie.Title}
                fill
                className="object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.png"; // fallback image in /public
                }}
              />
            </div>
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-200">
              <p>No Image</p>
            </div>
          )}
          <div className="p-2">
            <h2 className="font-bold">{movie.Title}</h2>
            <p>{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesPage;
