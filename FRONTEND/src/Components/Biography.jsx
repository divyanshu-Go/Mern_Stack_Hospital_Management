import React from "react";

const Biogrphy = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="aboutusImg" className="" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          At Oxyble, we believe that accessing quality healthcare should be
          simple, quick, and stress-free. Our mission is to bridge the gap
          between patients and doctors, making healthcare accessible to
          everyone, anywhere.
        </p>
        <p>
          We’re dedicated to providing a platform that’s not only easy to use
          but also secure, ensuring your privacy and comfort at every step. With
          Oxyble, you can browse a wide network of qualified doctors, view their
          specialties, and choose the best fit for your health needs.
        </p>
        <p>
          We’re here to support your journey to wellness with a commitment to
          excellence and patient satisfaction. Your health matters to us, and
          we’re continuously evolving to offer the best healthcare experience
          possible.
        </p>
      </div>
    </div>
  );
};

export default Biogrphy;
