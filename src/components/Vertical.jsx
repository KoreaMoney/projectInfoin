import React, { useCallback, useEffect, useState } from "react";
import "../styles/verticalStyle.css";

import { Carousel } from "@mantine/carousel";
import { rem } from "@mantine/core";
import { Image } from "@mantine/core";

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

const VerticalSlide = () => {
  //[State관리]
  const [slideCarousel, setSlideCarousel] = useState(null);

  //[Slide이미지 정렬]
  const slides = images?.map((url) => (
    <Carousel.Slide key={url}>
      <div style={{ pointerEvents: "none" }}>
        <Image src={url} />
      </div>
    </Carousel.Slide>
  ));

  //[ResizeObserver 실행을 제어하기 위한 useEffect 추가]
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

  //[Button관리]
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

  //[Wheel]
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
    const container = document.querySelector(".vertical");
    container.addEventListener("wheel", handleWheel);
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // 방향키 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
        handlePrevSlide();
      } else if (
        event.key === "ArrowDown" ||
        event.key === "s" ||
        event.key === "S"
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
    <div className="vertical">
      <div className="verticalDiv">
          <Carousel
            orientation="vertical"
            draggable
            sx={{ margin: "0 auto", maxWidth: 170 }}
            withIndicators
            slidesToScroll={5}
            slideSize={130}
            getEmblaApi={setSlideCarousel}
            align="start"
            slideGap={30}
            styles={{
              indicator: {
                width: rem(6),
                height: rem(20),
                zIndex: rem(1),
                transition: "height 250ms ease",
                "&[data-active]": {
                  width: rem(6),
                  height: rem(30),
                },
                backgroundColor: "white",
              },
              control: {
                "&[data-inactive]": {
                  opacity: 0,
                  cursor: "default",
                },
                background: "transparent",
                color: "white",
                border: "none",
                width: "32px",
                height: "32px",
              },
            }}
          >
            {slides}
          </Carousel>
        <div className="vertiBtnBox">
          <button className="vertiBtn" onClick={handlePrevSlide}>
            Up
          </button>
          <button className="vertiBtn" onClick={handleNextSlide}>
            Down
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerticalSlide;
