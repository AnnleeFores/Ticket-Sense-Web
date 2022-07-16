import React from "react";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Analytics from './components/Analytics';
import Newsletter from "./components/Newsletter";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Login />
      <Analytics />
      <Newsletter />
      <Cards />
      <Footer />
    </div>
  );
}

export default App;
