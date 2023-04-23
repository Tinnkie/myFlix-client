import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  //This loads data from API
  useEffect(() => {
    fetch("https://movieflix2023.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie.id,
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre,
            director: movie.Director
          };
        });
  
        setMovies(moviesFromApi);
      });
  }, [token]);
  
  return (
    <>
      <Row className="justify-content-md-center">
        {!user ? (
            <Col md={5}>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            or
            <SignupView />
            </Col>
        ) : selectedMovie ? (
          <Col md={8} style={{ border: "1px solid black" }}>
          <MovieView
            style={{ border: "1px solid green" }}
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
          </Col>
        ) : movies.length === 0 ? (
          <div>The list is empty!</div>
        ) : (
          <>
            {movies.map((movie) => (
              <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard
                id={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
              </Col>
            ))}
          </>
        )}
      </Row>
      {user ? (
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        >
          Logout
        </button>
      ) : null}
    </>
  );
};
