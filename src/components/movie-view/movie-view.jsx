import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => (
  <div>
    <div>
      <img src={movie.image} alt="movie-cover" />
    </div>
    <div>
      <span>Title: </span>
      <span>{movie.title}</span>
    </div>
    <div>
      <span>Description: </span>
      <span>{movie.description}</span>
    </div>
    <div>
      <span>Genre: </span>
      <span>{movie.genre.name}</span>
      <span>{movie.genre.description}</span>
    </div>
    <div>
      <span>Director: </span>
      <span>{movie.director.name}</span>
      <span>{movie.director.bio}</span>
      <span>{movie.director.birth}</span>
    </div>
    <div>
      <span>Featured: </span>
      <span>{movie.featured ? 'Yes' : 'No'}</span>
    </div>
    <div>
      <span>Actors: </span>
      <span>
        {Array.isArray(movie.actors) ? movie.actors.join(', ') : 'N/A'}
      </span>
    </div>
    <button type="button" onClick={onBackClick}>
      Back
    </button>
  </div>
);

MovieView.propTypes = {
  movie: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired, // Add this line
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
  onBackClick: PropTypes.func.isRequired,
};
