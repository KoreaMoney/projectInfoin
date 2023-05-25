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
  //State
  const [slideCarousel, setSlideCarousel] = useState(null);

  //carousel
  /**여러가지 이미지를 map을 볼려 하나씩 순차적으로 슬라이드 진행 */
  const slides = images?.map((url) => (
    <Carousel.Slide key={url}>
      <div style={{ pointerEvents: "none" }}>
        <Image src={url} />
      </div>
    </Carousel.Slide>
  ));

  //ResizeObserver
  /**resize오류로 인해 해당 사이즈 크기에 대한 오류를 방지하고자 코드 진행 */
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

  /**이전과 다음 버튼을 생성
   * useCallback : 함수 재 사용을 위함
   * 컴포넌트가 다시 랜더링되더라도 함수의 참조값은 동일하게 유지 시킬 수 있다
   */
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

  //마우스 휠 동작 함수
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

  //이벤트 함수 : 방향키(소문자, 대문자도 대응할 수 있게 진행)
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
        {/* 캐러셀 라이브러리 */}
        <Carousel
          sx={{ margin: "0 auto", maxWidth: 170 }} //sx는 mantine만의 스타일 구성 요소 루트
          orientation="vertical" //캐러셀의 방향성 제공
          draggable //드래그 기능 true
          withIndicators //하단 버튼 막대기 생성
          slidesToScroll={5} //몇개의 스크롤 진행
          slideSize={130} // 가로의 슬라이드 크기
          getEmblaApi={setSlideCarousel} //Embla : mantine의 캐러셀 기능을 뜻함
          align="start" //캐러셀 시작 시점
          slideGap={30} //이미지간 간격
          height={800}
          styles={{
            indicator: {
              width: rem(10),
              height: rem(40),
              zIndex: rem(1),
              transition: "height 250ms ease",
              "&[data-active]": {
                height: rem(50),
              },
              backgroundColor: "white",
            },
            control: {
              "&[data-inactive]": {
                opacity: 0,
                cursor: "default",
              },
              color: "black",
              border: "none",
            },
          }}
        >
          {slides}
        </Carousel>
        {/* 버튼  */}
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
