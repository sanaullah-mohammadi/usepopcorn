import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    // also the iniatial value
    // this function only run on the inial render
    // and simply ignor the subrerender
    const storageValue = localStorage.getItem(key);
    // the data is in stringy py to convert that it will work
    return storageValue ? JSON.parse(storageValue) : initialState;
  }); //use state hook also accept callback instead of just single value
  // just to be a pure function
  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },

    [value, key]
  );
  return [value, setValue];
}
