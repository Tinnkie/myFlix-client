import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <img src={movie.image} />
      <div>{movie.title}</div>
    </div>
  );
};
  
// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    image: PropTypes.string,
    genre: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
      director: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
        birth: PropTypes.string
      }).isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };