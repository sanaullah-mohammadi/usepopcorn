import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import StarRatingM from "./StarRatingM";
// import "./index.css";
// import App from "./App";

function Test1({ Default = 3 }) {
  const [rating, setRating] = useState(Default);
  const [movieRating, setMovieRating] = useState(rating);
  return (
    <div>
      <StarRatingM
        maxRating={6}
        onSetRating={setMovieRating}
        setRating={setRating}
        rating={rating}
        message={["Terrible", "Bad", "Okay", "Good", "Amazing", "Awesome"]}
      />
      <p>This movie was rated {movieRating} stars</p>{" "}
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}

    {/* <StarRating maxRating={5} />
    <StarRating maxRating={6} size={30} color="red" /> */}
    {/* <StarRating maxRating={6} size={30} color="red" className="test " /> */}
    {/* <StarRating
      maxRating={6}
      size={30}
      color="red"
      message={["Terrible", "Bad", "Okay", "Good", "Amazing", "Awesome"]}
      defaultRating={3}
    /> */}
    {/* <Test /> */}

    <Test1 />
  </React.StrictMode>
);
