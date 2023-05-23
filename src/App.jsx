import React, { useState } from "react";
import "../src/styles/app.css";
import Horizontal from "./components/Horizontal";
import Vertical from "./components/Vertical";

const App = () => {
  //State
  const [carouselType, setCarouselType] = useState("verticalSlide");
  //Button
  const handleToggleCarousel = () => {
    if (carouselType === "verticalSlide") {
      setCarouselType("horizontalSlide");
    } else {
      setCarouselType("verticalSlide");
    }
  };
  return (
    <div>
      <div>
        <button onClick={handleToggleCarousel}>
          {carouselType === "verticalSlide" ? "Horizontal" : "Vertical"}
        </button>
      </div>
      {carouselType === "verticalSlide" ? <Vertical /> : <Horizontal />}
    </div>
  );
};

export default App;
