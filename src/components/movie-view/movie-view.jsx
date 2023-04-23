import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
        <img src={movie.image} style={{ width: "100%" }} />
        </div>
        <div>
          <span>Movie Title: </span>
          <span>{movie.title}</span>
        </div>
        <br/>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
        <br/>
        <div>
          <span>Genre: </span>
          <span>{movie.genre.Name}</span>
        </div>
        <br/>
        <div>
          <span>Genre Description: </span>
          <span>{movie.genre.Description}</span>
        </div>
        <br/>
        <div>
          <span>Director: </span>
          <span>{movie.director.Name}</span>
        </div>
        <br/>
        <div>
          <span>Bio: </span>
          <span>{movie.director.Bio}</span>
        </div>
        <br/>
        <div>
          <span>Birth: </span>
          <span>{movie.director.Birth}</span>
        </div>
        <br/>
        <Button onClick={onBackClick}>Back</Button>
      </div>
    );
  };
  