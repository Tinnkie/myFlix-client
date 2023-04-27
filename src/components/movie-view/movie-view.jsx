import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const MovieView = ({ movies, user, updateUser, token }) => {
  const { MovieId } = useParams();

  const movie = movies.find((b) => b.id === MovieId);

  if (!movie) {
    return <div>Movie not found.</div>;
  }

  // Add movie to favorites
  const [isFavorite, setIsFavorite] = useState(user &&  user.FavoriteMovies.includes(movie.Id));

  useEffect(() => {
    setIsFavorite(user && user.FavoriteMovies && user.FavoriteMovies.includes(movie.id));
    window.scrollTo(0, 0);
  }, [user, movie.id]);

  const addFavorite = () => {
      fetch(`https://movieflix2023.herokuapp.com/users/${user.Username}/movies/${MovieId}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              alert("Failed");
              return false;
          }
      })
      .then(user => {
          if (user) {
              alert("Successfully added to favorites");
              setIsFavorite(true);
              updateUser((prevUser) => ({ ...prevUser, FavoriteMovies: user.FavoriteMovies }));
          }
      })
      .catch(e => {
          alert(e);
      });
  }

  const removeFavorite = () => {
      fetch(`https://movieflix2023.herokuapp.com/users/${user.Username}/movies/${MovieId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              alert("Failed");
              return false;
          }
      })
      .then(user => {
          if (user) {
              alert("Successfully deleted from favorites");
              setIsFavorite(false);
              updateUser((prevUser) => ({ ...prevUser, FavoriteMovies: user.FavoriteMovies }));
          }
      })
      .catch(e => {
          alert(e);
      });
  }

  return (
    <div>
      <div>
        <img src={movie.image} style={{ width: "100%" }} />
      </div>
      <div>
        <h2>{movie.title}</h2>
      </div>
      <br />
      <div>
        <span style={{ fontWeight: 'bold' }}>Description: </span>
        <span>{movie.description}</span>
      </div>
      <br />
      <div>
        <span style={{ fontWeight: 'bold' }}>Genre: </span>
        <span>{movie.genre.Name}</span>
      </div>
      <br />
      <div>
        <span style={{ fontWeight: 'bold' }}>Genre Description: </span>
        <span>{movie.genre.Description}</span>
      </div>
      <br />
      <div>
        <span style={{ fontWeight: 'bold' }}>Director: </span>
        <span>{movie.director.Name}</span>
      </div>
      <br />
      <div>
        <span style={{ fontWeight: 'bold' }}>Bio: </span>
        <span>{movie.director.Bio}</span>
      </div>
      <br />
      <div>
        <span style={{ fontWeight: 'bold' }}>Birth: </span>
        <span>{movie.director.Birth}</span>
      </div>
      <br />
      <Link to={`/`}>
        <Button className="back-button">Back</Button>
      </Link>
      {isFavorite ? 
        <Button variant="danger" className="ms-2" onClick={removeFavorite}>Remove from favorites</Button>
        : <Button variant="success" className="ms-2" onClick={addFavorite}>Add to favorites</Button>
      }
    </div>
  );
};
