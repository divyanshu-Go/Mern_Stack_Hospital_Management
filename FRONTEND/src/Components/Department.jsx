import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Department = () => {

    const departmentsArray = [
        {
          name: "Pediatrics",
          imageUrl: "/departments/pedia.jpg",
        },
        {
          name: "Orthopedics",
          imageUrl: "/departments/ortho.jpg",
        },
        {
          name: "Cardiology",
          imageUrl: "/departments/cardio.jpg",
        },
        {
          name: "Neurology",
          imageUrl: "/departments/neuro.jpg",
        },
        {
          name: "Oncology",
          imageUrl: "/departments/onco.jpg",
        },
        {
          name: "Radiology",
          imageUrl: "/departments/radio.jpg",
        },
        {
          name: "Physical Therapy",
          imageUrl: "/departments/therapy.jpg",
        },
        {
          name: "Dermatology",
          imageUrl: "/departments/derma.jpg",
        },
        {
          name: "ENT",
          imageUrl: "/departments/ent.jpg",
        },
      ];

  const responsive = {
    LargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 1500 },
      items: 5,
      slidesToSlide:1,
    },
    desktop: {
      breakpoint: { max: 1500, min: 1024 },
      items: 3,
      slidesToSlide:1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 600 },
      items: 2,
      slidesToSlide:1,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide:1,
    },
  };

  return (
    <div className="container department">
      <h2>Departments</h2>
      <Carousel responsive={responsive} removeArrowOnDeviceType={["mobile", "tablet"]}>
        {departmentsArray.map((depart, index)=> 
        (
            <div className="card" key={index}>
                <div className="depart-name">{depart.name}</div>
                <img src={depart.imageUrl} alt={depart.name} className="" />
            </div>
        ))}
      </Carousel>
      
    </div>
  );
};

export default Department;
