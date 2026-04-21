import { useEffect } from "react";
export function useKey(key, action) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code === key) {
          action(); // this function is used to close the movie details when the user presses the Escape key
          // close the movie details when the user presses the Escape key
          // console.log("CLOSING");
        }
      }
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback); // clean up the event listener when the component unmounts
      };
    },

    [action, key]
  );
}
