import React, { useState } from "react";
import { SliderData } from "./SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Home = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className="backgroundImage">
      <div className="carousel">
        <div className="welcome">
          <h1>Welcome To Fan Haven!</h1>
          <h3>Top Tier Jerseys For A Bargain!</h3>
          <h5>To begin shopping, click the waffle above </h5>
          <section className="slider">
            <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
            <FaArrowAltCircleRight
              className="right-arrow"
              onClick={nextSlide}
            />
            {SliderData.map((slide, index) => {
              return (
                <div
                  className={index === current ? "slide active" : "slide"}
                  key={index}
                >
                  {index === current && (
                    <a href="/products">
                      {" "}
                      <img
                        src={slide.image}
                        alt="travel image"
                        className="image"
                      />
                    </a>
                  )}
                </div>
              );
            })}
          </section>{" "}
        </div>
      </div>
    </div>
  );
};

export default Home;

// const [current, setCurrent] = useState[0];
// const { jerseys, fetchJerseys } = props;
// console.log("hi", jerseys);
// const slideshow = jerseys.length;
// // console.log(slideshow, "hi");
// // console.log(jerseys);
// useEffect(() => {
//   fetchJerseys();
// }, [slideshow]);
// function changeImg() {
//   document.images.slide.src = jerseys[1];

//   if (i < jerseys.length - 1) {
//     i++;
//   } else {
//     i = 0;
//   }
//   setTimeout(changeImg, 1000);
// }
// window.onload = changeImg;
{
  /* <div
className="backgroundImage"
//  backgroundImage: `url("https://i.pinimg.com/originals/d5/54/10/d55410b8dab0eef77c1967dee8d5768c.jpg")`,
>
<div className="carousel">
  <div className="carousel-inner">
    <div className="welcome">
      <h1>Welcome To Fan Haven!</h1>
      <h3>Top Tier Jerseys For A Bargain!</h3>
      <h5>To begin, click the waffle above to begin shopping </h5>
    </div>
  </div>
</div>
</div> */
}
