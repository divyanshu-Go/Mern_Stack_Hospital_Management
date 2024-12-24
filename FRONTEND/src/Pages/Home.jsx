import React from 'react'
import Hero from '../Components/Hero'
import Department from '../Components/Department'
import MessageForm from '../Components/MessageForm'
import Biography from '../Components/Biography'

const Home = () => {
  return (
    <>
      <Hero title={"Welcome to Oxyble – your trusted healthcare partner!"} imageUrl={"/hero.png"} />
      <Biography imageUrl={"/about.png"}/>
      <Department/>
      <MessageForm/>
    </>
  )
}

export default Home
