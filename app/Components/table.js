"use client";

import { useState } from "react";

export default function WeatherTable({ weatherData }) {

  // Setting up states and initialize it
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Setting up rows per page
  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  // Splitting up data and setting up total pages
  const totalPages = Math.ceil(weatherData?.time?.length / rowsPerPage || 1); 
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = weatherData
    ? {
        ...weatherData,
        time: weatherData.time.slice(startIndex, endIndex),
        temperature2mMax: weatherData.temperature2mMax.slice(startIndex, endIndex),
        temperature2mMin: weatherData.temperature2mMin.slice(startIndex, endIndex),
        temperature2mMean: weatherData.temperature2mMean.slice(startIndex, endIndex),
        apparentTemperatureMax: weatherData.apparentTemperatureMax.slice(startIndex, endIndex),
        apparentTemperatureMin: weatherData.apparentTemperatureMin.slice(startIndex, endIndex),
        apparentTemperatureMean: weatherData.apparentTemperatureMean.slice(startIndex, endIndex),
      }
  : null;
    
  // Table component
  return (
    <div>
      {weatherData && weatherData.time && weatherData.time.length > 0 ? (
        <>
          <div className="flex flex-col mt-5 items-center scrollBar">
            <div className="flex items-start w-4/5 md:w-1/5">
              {[10, 20, 50].map((num) => (
                <button
                  key={num}
                  className={`w-10 h-10 flex justify-center items-center mx-4 ${
                    rowsPerPage === num
                      ? 'bg-red-500 text-white'
                      : 'bg-purple-700 text-white hover:bg-purple-500'
                  }`}
                  onClick={() => handleRowsPerPageChange(num)}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="overflow-auto-x mt-5">
              <table className="w-full text-sm text-center bg-purple-100 text-gray-500 border border-gray-300">
                <thead>
                  <tr className="text-white uppercase bg-purple-700 text-m">
                    <th className="px-6 py-3 border">Sr No</th>
                    <th className="px-6 py-3 border">Date</th>
                    <th className="px-6 py-3 border">Maximum Temperature</th>
                    <th className="px-6 py-3 border">Minimum Temperature</th>
                    <th className="px-6 py-3 border">Mean Temperature</th>
                    <th className="px-6 py-3 border">Maximum Apparent Temperature</th>
                    <th className="px-6 py-3 border">Minimum Apparent Temperature</th>
                    <th className="px-6 py-3 border">Mean Apparent Temperature</th>
                  </tr>
                </thead>
                <tbody className="bg-purple-100">
                  {currentData?.time?.map((date, index) => (
                    <tr key={index}>
                      <td className="px-6 py-3 border">{startIndex + index + 1}</td> 
                      <td className="px-6 py-3 border">
                        {typeof date === "object" && date instanceof Date
                          ? new Date(date).toLocaleDateString('en-GB') 
                          : date || <span className="text-red-500">N/A</span>}
                      </td>
                      <td className="px-6 py-3 border">
                        {currentData.temperature2mMax[index] !== null
                          ? currentData.temperature2mMax[index].toFixed(2)
                          : <span className="text-red-500">N/A</span>}
                      </td>
                      <td className="px-6 py-3 border">
                        {currentData.temperature2mMin[index] !== null
                          ? currentData.temperature2mMin[index].toFixed(2)
                          : <span className="text-red-500">N/A</span>}
                      </td>
                      <td className="px-6 py-3 border">
                        {currentData.temperature2mMean[index] !== null
                          ? currentData.temperature2mMean[index].toFixed(2)
                          : <span className="text-red-500">N/A</span>}
                      </td>
                      <td className="px-6 py-3 border">
                        {currentData.apparentTemperatureMax[index] !== null
                          ? currentData.apparentTemperatureMax[index].toFixed(2)
                          : <span className="text-red-500">N/A</span>}
                      </td>
                      <td className="px-6 py-3 border">
                        {currentData.apparentTemperatureMin[index] !== null
                          ? currentData.apparentTemperatureMin[index].toFixed(2)
                          : <span className="text-red-500">N/A</span>}
                      </td>
                      <td className="px-6 py-3 border">
                        {currentData.apparentTemperatureMean[index] !== null
                          ? currentData.apparentTemperatureMean[index].toFixed(2)
                          : <span className="text-red-500">N/A</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-start overflow-auto w-11/12 m-4 bg-purple-200 scrollBar">
              {Array.from({ length: totalPages }, (_, i) => (
                
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 mx-2 ${
                    currentPage === i + 1
                      ? 'bg-red-500 text-white'
                      : 'bg-purple-700 text-white hover:bg-purple-500'
                  }`}
                >
                   
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600">No weather data available.</p>
      )}
    </div>
  );
}