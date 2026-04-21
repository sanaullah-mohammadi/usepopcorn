// name export for custom hooks
// for better not should be
// default export for component
//
//not accept proof but acces but accept argument

import { useState, useEffect } from "react";
const KEY = "8e70be8d";
// custom hook are use for atleast one hook should be contain
// other wise it is just a regular function

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      //   callback?.();

      const controller = new AbortController(); // create a new AbortController to cancel the fetch request if the component unmounts ,that is the browser api // like the
      //   returning an object that it destruncturing

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
      // handleCloseMovie(); // close the movie details when the query changes
      setTimeout(() => {
        fetchMovies();
      }, 500);

      return function () {
        controller.abort(); // this function is called when the component unmounts, it cancels the fetch request if it is still pending
      };
    },
    [query]
  ); // we pass the query as a dependency to the useEffect hook so that it runs when the query changes
  // empty dependency array means this effect runs once when the component mounts

  //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
  //     .then((res) => res.json())
  //     .then((data) => setMovies(data.Search)); //so it is infinit loop beacue of  we use the usetate in event handler

  return { movies, isloading, error };
}
