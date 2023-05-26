import React, { useCallback, useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Image, rem } from "@mantine/core";
import "../styles/horizontalStyle.css";

import pic01 from "../assets/pic01.webp";
import pic02 from "../assets/pic02.webp";
import pic03 from "../assets/pic03.webp";
import pic04 from "../assets/pic04.webp";
import pic05 from "../assets/pic05.webp";
import pic06 from "../assets/pic06.webp";
import pic07 from "../assets/pic07.webp";
import pic08 from "../assets/pic08.webp";
import pic09 from "../assets/pic09.webp";
import pic10 from "../assets/pic10.webp";

const images = [
  pic01,
  pic02,
  pic03,
  pic04,
  pic05,
  pic06,
  pic07,
  pic08,
  pic09,
  pic10,
];

const Horizontal = () => {
  //State
  const [slideCarousel, setSlideCarousel] = useState(null);
  //carousel
  const slides = images?.map((url) => (
    <Carousel.Slide key={url}>
      <div style={{ pointerEvents: "none" }}>
        <Image src={url} />
      </div>
    </Carousel.Slide>
  ));
  //ResizeObserver
  useEffect(() => {
    const handleResize = () => {
      if (slideCarousel) {
        slideCarousel.reInit();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [slideCarousel]);
  //Button
  const handlePrevSlide = useCallback(() => {
    if (slideCarousel) {
      slideCarousel.scrollPrev();
    }
  }, [slideCarousel]);

  const handleNextSlide = useCallback(() => {
    if (slideCarousel) {
      slideCarousel.scrollNext();
    }
  }, [slideCarousel]);
  //Mouse Wheel
  const handleWheel = useCallback(
    (event) => {
      if (event.deltaY < 0) {
        handlePrevSlide();
      } else {
        handleNextSlide();
      }
    },
    [handlePrevSlide, handleNextSlide]
  );
  useEffect(() => {
    const container = document.querySelector(".horizontal");
    container.addEventListener("wheel", handleWheel);
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  //WASD, 방향키 이벤트
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        handlePrevSlide();
      } else if (
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "D"
      ) {
        handleNextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrevSlide, handleNextSlide]);

  return (
    <div className="horizontal">
      <Carousel
        sx={{ maxWidth: 1380, margin: "0 auto" }}
        withIndicators
        slidesToScroll={5}
        controlSize={32}
        slideSize="252px"
        slideGap="30px"
        align="center"
        getEmblaApi={setSlideCarousel}
        breakpoints={[
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
        styles={{
          indicator: {
            width: rem(40),
            height: rem(10),
            zIndex: rem(1),
            transition: "width 250ms ease",
            "&[data-active]": {
              width: rem(60),
            },
            backgroundColor: "white",
            marginBottom: "250px",
          },
          control: {
            "&[data-inactive]": {
              opacity: 0,
              cursor: "default",
            },
            border: "none",
            color: "black",
          },
        }}
      >
        {slides}
      </Carousel>
      <div className="horizBtnBox">
        <button className="horizBtn" onClick={handlePrevSlide}>
          Prev
        </button>
        <button className="horizBtn" onClick={handleNextSlide}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Horizontal;
