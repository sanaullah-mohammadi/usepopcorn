import { Children, use, useEffect, useState } from "react";
import StarRating from "./StarRating";
import StarRatingM from "./StarRatingM";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = "f84fc31d";

export default function App() {
  // const [query, setQuery] = useState("inception");
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
 
  const [watched ,setWatched]=useState([])
  // function should to be fo fo cacal storage 
  const storeValue=localStorage.getItem('watched')
  // for to run

  function handleDeletedWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null); // this function is used to close the movie details when the user clicks on the close button
  }

  
  function handleAddWatched(movie) {
    // 1 store in to the local storage  each time the movie is added
    // added the new movie in to the watch list
    // added the newwatch list in to the local storage
    // do it by effect
    setWatched((watched) => [...watched, movie]); // this function is}

    // update version is worked an async way
    // watched is the old version the reasone of the async way not the new way
    // so the watched is the old not added the new movie  before the new movie is added
    // localStorage.setItem('watched',watched)

    //  we can only store on key value  pairs the value key is string

    // localStorage.setItem("watched", ([...watched, movie])); for to convert to string beacue in the browser we store in string way
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    // instead of   the handlefunction
    // we can store inside the effect  beacue we want to store the data to local storage to reusable
  // }
  // new function for to add data in to the local storage to run the  effect  each time to watched movie is updated
// in local storage we only store key value pairs 

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );



  //  2 second part we want to read this data back tin to the application 
   

  // we want this data back in to the application 
    


  // this component render when the component was first mount 
  useEffect(
    function () {
      const controller = new AbortController(); // create a new AbortController to cancel the fetch request if the component unmounts ,that is the browser api // like the

      async function fetchMovies() {
        try {
          //we use the useEffect hook to ragister an effect that runs after the component mounts
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal } // we can use the query state to search for movies
          );
          if (!res.ok) {
            throw new Error("something went wrong with fetching movies ");
          }
          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movies not found!"); // if the response is false we throw an error
          }
          setMovies(data.Search);
          // setIsLoading(false);
          // console.log(data.Search);
          // .then((res) => res.json())
          // .then((data) => setMovies(data.Search));
        } catch (err) {
          // console.error(err.message);
          if (err.name !== "AbortError") {
            console.log(err.message);

            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError(""); // if the query is less than 3 characters we set the movies to an empty array
        return; // we return early to avoid fetching movies
      }
      handleCloseMovie(); // close the movie details when the query changes
      fetchMovies();
      return function () {
        controller.abort(); // this function is called when the component unmounts, it cancels the fetch request if it is still pending
      };
    },
    [query]
  );
  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isloading && <Loader />}
          {!isloading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}{" "}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WhachedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeletedWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🥱</span> {message}
    </p>
  );
}
function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
function Numresults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      {/* we use the handleSelectMovie function to select a movie when it is clicked */}
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId); // check if the movie is already in the watched list
  const watchedUserrating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating; // get the

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  // /*eslint-disable */ for to disble eslint to not detect the error

  // if (userRating > 8) {
  //   [isTop, setIsTop] = useState(true);
  // }

  // if(imdbRating>8) return <p> Greatest ever</p>

  // if(imdbRating>8) [isTop,setIsTop]=useState(true); but the first render it is not defaine
  // console.log(isTop);

  // const [isTop,setIsTop]=useState(imdbRating>8);//undefine
  // console.log(isTop);

  //for to prevent this problem
  // but instead of the useEffect shoule easy way derived state
  /* const [isTop,setIsTop]=useState(imdbRating>8);
console.log(isTop);
useEffect (function(){
  setIsTop(imdbRating>0);
},[imdbRating]); */

  // const isTop = imdbRating > 8;
  // console.log(isTop);
  // const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating, // default user rating
    };

    onAddWatched(newWatchedMovie); // call the function passed from App component to add the movie to watched list
    onCloseMovie(); // close the movie details after adding it to watched list

    // setAvgRating(Number(imdbRating));
    // setAvgRating((avgRating) => (avgRating + userRating) / 2); //  that calculate the previous value
    // setAvgRating((avgRating + userRating) / 2);// but that derectly calculate not the previous value
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseMovie(); // this function is used to close the movie details when the user presses the Escape key
          // close the movie details when the user presses the Escape key
          // console.log("CLOSING");
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback); // clean up the event listener when the component unmounts
      };
    },

    [onCloseMovie]
  );
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        // in order to connect the abort function to the fetch request, we need to pass the signal property of the controller to the fetch request
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        //
        const data = await res.json();
        setMovie(data);

        setIsLoading(false);

        // console.log(data);
      }
      // if the selected movie is already in the watched list, we don't need to fetch it again
      getMovieDetails();
    },
    [selectedId]
  );
  useEffect(
    function () {
      if (!title) return; // if title is not available, we don't need to set the document title
      document.title = `Movie | ${title}`;
      // console.log(`clean up effect for movie ${title}`);
    },
    [title]
  );
  return (
    <div className="details">
      {isloading ? (
        <Loader />
      ) : (
        <>
          <header>
            {" "}
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released}&bull;{runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>
                  <span>⭐️</span>
                  {imdbRating}
                  IMDb rating
                </span>
              </p>
            </div>
          </header>
          {/* <p>{avgRating}</p> */}
          <section>
            <div className="rating">
              {" "}
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie : {watchedUserrating} <span>⭐</span>{" "}
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director}</p>
          </section>
          {/* {selectedId} */}{" "}
        </>
      )}
    </div>
  );
}
function WhachedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  function handleDelete() {
    onDeleteWatched(movie.imdbID); // call the function passed from WatchedMoviesList to delete the movie from watched list
  }
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
          <button className="btn-delete" onClick={handleDelete}>
            x
          </button>
        </p>
      </div>
    </li>
  );
}
