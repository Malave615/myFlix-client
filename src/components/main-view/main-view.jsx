import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://tracys-movie-api-083e9c37dd14.herokuapp.com/movies')
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.docs.map((doc) => ({
          id: doc.key,
          image: doc.imageURL,
          title: doc.title,
          description: doc.description,
          genre: doc.genre_name,
          genre_description: doc.genre_description,
          director: doc.director_name,
          director_bio: doc.director_bio,
          director_birth: doc.director_birth,
          featured: doc.featured ? 'Yes' : 'No',
        }));

        setMovies(moviesFromApi);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
