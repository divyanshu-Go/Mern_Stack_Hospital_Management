import React from "react";
import Hero from "./../Components/Hero.jsx";
import AppointmentForm from "./../Components/AppointmentForm.jsx";

const Appointment = () => {
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm/>
    </>
  );
};

export default Appointment;