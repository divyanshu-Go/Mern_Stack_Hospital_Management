import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1 className="">{title}</h1>
        <p className="">
          Book appointments with top doctors at your convenience. Browse through
          expert profiles, specializations, and availability. Effortlessly
          manage your healthcare needs from anywhere, anytime. Experience a
          seamless and secure way to connect with healthcare professionals. Join
          Oxyble and take the first step towards better health today!
        </p>
      </div>
        <div className="banner">
            <img src={imageUrl} alt="hero" className="animated-image" />
            <img src="Vector.png" alt="vector" className="" />
        </div>
    </div>
  );
};

export default Hero;
