const Home = (props) => {
  // console.log(props)
  return <div>Welcome</div>;
};
export default Home;
// import React from "react";

// import React, { useEffect } from "react";

// const Home = (props) => {
//   // const [current, setCurrent] = useState[0];
//   const { jerseys, fetchJerseys } = props;
//   console.log("hi", jerseys);
//   const slideshow = jerseys.length;
//   // console.log(slideshow, "hi");
//   console.log(jerseys);
//   useEffect(() => {
//     fetchJerseys();
//   }, [slideshow]);
//   // function changeImg() {
//   //   document.slide.src = jerseys[1];

//   //   if (i < jerseys.length - 1) {
//   //     i++;
//   //   } else {
//   //     i = 0;
//   //   }
//   //   setTimeout("changeImg()", time);
//   // }
//   // window.onload = changeImg;
//   return (
//     <>
//       <div className="carousel">
//         <div className="carousel-inner">
//           {jerseys.map((jersey, index) => {
//             return <img src={jersey.image} alt="" />;
//           })}
//         </div>
//       </div>
//     </>
//   );
// };
// export default Home;
