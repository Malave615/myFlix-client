import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => (
  // component code here
  <div
    role="button"
    tabIndex={0}
    onClick={() => {
      onMovieClick(movie);
    }}
    onKeyDown={(event) => {
      if (event.key === 'Enter') {
        onMovieClick(movie);
      }
    }}
  >
    {movie.title}
  </div>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birth: PropTypes.string.isRequired,
    }).isRequired,
    featured: PropTypes.bool.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
