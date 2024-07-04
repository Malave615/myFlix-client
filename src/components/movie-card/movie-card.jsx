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
  movie: PropTypes.object.isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
