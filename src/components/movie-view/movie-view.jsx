export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <span>Movie Title: </span>
          <span>{movie.movieTitle}</span>
        </div>
        <br/>
        <div>
          <span>Description: </span>
          <span>{movie.movieDescription}</span>
        </div>
        <br/>
        <div>
          <span>Genre: </span>
          <span>{movie.genreName}</span>
        </div>
        <br/>
        <div>
          <span>Genre Description: </span>
          <span>{movie.genreDescription}</span>
        </div>
        <br/>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.directorName}</span>
        </div>
        <br/>
        <div>
          <span>Bio: </span>
          <span>{movie.directorBio}</span>
        </div>
        <br/>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };
  