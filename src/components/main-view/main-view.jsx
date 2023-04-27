import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("User"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null); // State
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  //This loads data from API
  useEffect(() => {
    fetch("https://movieflix2023.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id, 
            title: movie.Title,
            image: movie.ImagePath,
            description: movie.Description,
            genre: movie.Genre,
            director: movie.Director
          };
        });
  
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movie data: ", error);
      });
  }, [token]);
 
  return (
    <>
      <BrowserRouter>
        <NavigationBar user={user} onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }} />
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/login"
              element={
                <>
                  {!user ? (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                          localStorage.setItem("user", JSON.stringify(user));
                          localStorage.setItem("token", token);
                        }}
                      />
                    </Col>
                  ) : (
                    <Navigate to="/" replace />
                  )}
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  {!user ? (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  ) : (
                    <Navigate to="/" replace />
                  )}
                </>
              }
            />
            <Route
              path="/movies/:MovieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView movies={movies} user={user} token={token} updateUser={(user) => {
                        setUser(user);
                        localStorage.setItem('user', JSON.stringify(user));
                      }}/>
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/users/:username"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : 
                    <Col md={8}>
                      <ProfileView  user={user} token={token} movies={movies} onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}

                      updateUser={(user) => {
                        setUser(user);
                        localStorage.setItem('user', JSON.stringify(user));
                      }}/> {/* here the user token movies etc are PROPS */}
                    </Col>
                  }
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </BrowserRouter>
    </>
  );
};
