import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      movieTitle: "Interstellar",
      movieDescription: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      genreName: "Sci-Fi",
      genreDescription: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, dinosaurs, mutants, interstellar travel, time travel, or other technologies.",
      image:"https://m.media-amazon.com/images/I/61pyUElLh7L._SY445_.jpg",
      directorName: "Christopher Nolan",
      directorBio: "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.",
      directorBirth: "1970"
    },
    {
      id: 2,
      movieTitle: "Pulp Fiction",
      movieDescription: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      genreName: "Crime",
      genreDescription: "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre. Films of this genre generally involve various aspects of crime and its detection.",
      image:"https://m.media-amazon.com/images/I/71mlgE7nUdL._AC_SY679_.jpg",
      directorName: "Quentin Tarantino",
      directorBio: "Quentin Jerome Tarantino was born in Knoxville, Tennessee. His father, Tony Tarantino, is an Italian-American actor and musician from New York, and his mother, Connie (McHugh), is a nurse from Tennessee.",
      directorBirth: "1963"
    },
    {
      id: 3,
      movieTitle: "Saving Private Ryan",
      movieDescription: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
      genreName: "Drama",
      genreDescription: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.",
      image:"https://m.media-amazon.com/images/I/51RtERdTUIL._AC_.jpg",
      directorName: "Steven Spielberg",
      directorBio: "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world.",
      directorBirth: "1946"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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
