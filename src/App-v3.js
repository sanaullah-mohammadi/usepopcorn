import { Children, use, useEffect, useState, useRef } from "react";
import StarRating from "./StarRating";
import StarRatingM from "./StarRatingM";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
// const KEY = "8e70be8d";
// const KEY = "f84fc31d";
const KEY = "8e70be8d";
export default function App() {
  // const [query, setQuery] = useState("inception");
  const [query, setQuery] = useState("");

  // const [movies, setMovies] = useState([]);
  // const [isloading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  useMovies(query); //custom hook are not returning any thing
  // it will return an object
  const { movies, isloading, error } = useMovies(query);

  // const [watched, setWatched] = useState([]);
  // simple function and no argumnet passing simple arrow function is also correct
  // setcount (1000) the next state
  // some time we want to update state based on the current state setcount((c)=>c+1); calbac

  /*   const [watched, setWatched] = useState(function () {
    // also the iniatial value
    // this function only run on the inial render
    // and simply ignor the subrerender
    const storageValue = localStorage.getItem("watched");
    // the data is in stringy py to convert that it will work
    return storageValue ? JSON.parse(storageValue) : [];
  }); //use state hook also accept callback instead of just single value
  // just to be a pure function */
  const [watched, setWatched] = useLocalStorageState([], "watched");
  // and we should do not calling the function inside the usestate like that
  // const [watched, setWatched] = useState(JSON.parse(storageValue))

  // const query = "intersteellar"; // we can use the query state to search for movies
  // const tempQuery = "interstellar";
  /* 
  useEffect(function () {
    console.log("After initaial render ");
  }, []);
  useEffect(function () {
    console.log("After every render ");
  });
  console.log("During render");
  useEffect(
    function () {
      console.log("After every render when query changes");
    },
    [query]
  ); // this effect runs only when query changes */

  function handleDeletedWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null); // this function is used to close the movie details when the user clicks on the close button
  }

  // we can to store the data in to the local storage  in two defferent places
  // 1 store in to the local storage  each time the movie is added
  // 1 store in to the local storage  each time the movie is added
  // added the new movie in to the watch list
  // added the newwatch list in to the local storage
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]); // this function is}
    // 1 store in to the local storage  each time the movie is added
    // added the new movie in to the watch list
    // added the newwatch list in to the local storage
    // do it by effect

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
  }

  /*   useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  ); */

  //  2 second part we want to read this data back tin to the application

  // we want this data back in to the application

  // this component render when the component was first mount

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </NavBar>
      <Main>
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WhachedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          }
        /> */}
        {/* <Box>{isloading ? <Loader /> : <MovieList movies={movies} />}</Box> */}
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
  // in this way the selecting the  element over and over again it is not ideal

  // useEffect(function () {
  //   const el = document.querySelector(".search");
  //   console.log(el);
  //   el.focus();
  // }, [query]);

  // for to solving the problem more declarative use refs

  // using a ref with domelment in 3 steps
  //selecttiong the dom element by react way i
  //   // 1 creating the refs
  // when we usually work domelement we usually null
  const inputEl = useRef(null);
  //2 use effect hook after the domelment has been loaded
  // we can use inside the ref .current property

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  /* 
  useEffect(
    function () {
      // This is the function that will run every time a key is pressed
      function callback(e) {
        // If the input is already focused, do nothing

        // If the Enter key is pressed, focus the input and clear the query
        if (e.code === "Enter") {
          if (document.activeElement === inputEl.current) return;
          inputEl.current.focus();
          setQuery("");
        }
      }

      // Add a keydown listener when the component mounts or dependencies change
      document.addEventListener("keydown", callback);

      // Cleanup: remove the event listener when the component unmounts or re-renders
      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery] // Dependency array — effect runs when setQuery reference changes
  );
 */
  // Input field for searching movies
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query} // Controlled input value
      onChange={(e) => setQuery(e.target.value)} // Update query on typing
      ref={inputEl} // Reference for focusing programmatically
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

// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen((open) => !open)}
//       >
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen && (
//         <>
//           <WhachedSummary watched={watched} />
//           <WatchedMoviesList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
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
  //  you are not allowed to mutate the ref in render logic

  const countRef = useRef(0);

  useEffect(
    function () {
      // All ref-related logic is safely inside useEffect
      if (userRating) {
        countRef.current += 1;
      }
    },
    [userRating]
  );

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
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie); // call the function passed from App component to add the movie to watched list
    onCloseMovie(); // close the movie details after adding it to watched list
    // setAvgRating(Number(imdbRating));
    // setAvgRating((avgRating) => (avgRating + userRating) / 2); //  that calculate the previous value
    // setAvgRating((avgRating + userRating) / 2);// but that derectly calculate not the previous value
  }

  useKey("Escape", onCloseMovie);
  /* 

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
 */
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
  // const avgImdbRating = average(
  //   watched.map((movie) => movie.imdbRating)
  // ).tofixed(2);
  // const avgUserRating = average(
  //   watched.map((movie) => movie.userRating)
  // ).tofixed(2);
  // const avgRuntime = average(watched.map((movie) => movie.runtime)).tofixed(2);

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
