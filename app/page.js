"use client" 

// Importing component and states
import { useState } from 'react';
import Form from './Components/form';
import Table from './Components/table';
import Graph from './Components/graph.js';
import Navbar from './Components/Navbar';
import Loading from './Components/loading';

export default function Home() {
  // Making up states and initializing it
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false); 

  // Changing toggle values
  const handleToggle = () => {
    setToggle(prevState => !prevState); 
  };

  // Return component here
  return (
    <>
      <div className='grid grid-cols-1'>
        <div>
          <Navbar />
        </div>

        <div>
          <Form setLoading={setLoading} setWeatherData={setWeatherData} />
        </div>

        {loading ? (<div> <Loading /> </div>) : (<div> </div>)}

        <div className="ml-4 mt-2 p-2 text-white bg-purple-700 h-auto w-28">
          <button 
            onClick={handleToggle} 
            className="">
            {toggle ? "Show Table" : "Show Graph"}
          </button>
        </div>

        {toggle ? (
          <div className="mt-4">
            <Graph weatherData={weatherData} />
          </div>
        ) : (
          <div className="mt-4">
            <Table weatherData={weatherData} />
          </div>
        )}
      </div>
    </>
  );
}
