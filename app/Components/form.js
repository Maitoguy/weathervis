"use client";

import { useState } from "react";
import { fetchWeatherApi } from 'openmeteo';

export default function Form({setLoading , setWeatherData}) {
    // Making and Initialising States
    const [formData, setFormData] = useState({
        latitude: "",
        longitude: "",
        startDate: "",
        endDate: "",
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    // To take and asign value to variable
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Reset Form
    const resetForm = () => {
        setFormData({
            latitude: "",
            longitude: "",
            startDate: "",
            endDate: "",
        });
    };

    // Show Error to user
    const showError = (message) => {
        setError(true);
        setErrorMessage(message);

        
        setTimeout(() => {
            setError(false);
            setErrorMessage("");
        }, 5000);

        resetForm();
    };

    // Get and Make API Call also add errors
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.latitude > 90 || formData.latitude < -90) {
            showError("Please Enter Latitude value between -90 to 90");
            return;
        }

        if (formData.longitude > 180 || formData.longitude < -180) {
            showError("Please Enter Longitude value between -180 to 180");
            return;
        }

        if(formData.startDate == "" || formData.endDate == ""){
            showError("Please Enter the Both Date");
            return;
        }


        let start = Date.parse(formData.startDate);
        let end = Date.parse(formData.endDate);

        if(start < new Date("1940-01-01")){
            showError("Please Enter Date After 1940-01-01");
            return;
        }

        if(end > new Date()){
            showError("Please Enter Date Before Current Date");
            return;
        }

        if ((end - start) < 0) {
            showError("Please make sure End Date comes after Start Date");
            return;
        }

        resetForm();

        const params = {
            latitude: Number(formData.latitude),
            longitude: Number(formData.longitude),
            start_date: formData.startDate,
            end_date: formData.endDate,
            hourly: "temperature_2m",
            daily: [
              "temperature_2m_max",
              "temperature_2m_min",
              "temperature_2m_mean",
              "apparent_temperature_max",
              "apparent_temperature_min",
              "apparent_temperature_mean",
            ],
          };

          setLoading(true);
          
          const url = "https://archive-api.open-meteo.com/v1/archive";
          const responses = await fetchWeatherApi(url, params);

          
          // Helper function to form time ranges
          const range = (start, stop, step) =>
            Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
          
          // Process first location. Add a for-loop for multiple locations or weather models
          const response = responses[0];
          
          // Attributes for timezone and location
          const utcOffsetSeconds = response.utcOffsetSeconds();
          const timezone = response.timezone();
          const timezoneAbbreviation = response.timezoneAbbreviation();
          const latitude = response.latitude();
          const longitude = response.longitude();
          
          const hourly = response.hourly();
          const daily = response.daily();
          
          // Note: The order of weather variables in the URL query and the indices below need to match!
          const weatherData = {
            hourly: {
              time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
              ),
              temperature2m: hourly.variables(0).valuesArray(),
            },
            daily: {
              time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
              ),
              temperature2mMax: daily.variables(0).valuesArray(),
              temperature2mMin: daily.variables(1).valuesArray(),
              temperature2mMean: daily.variables(2).valuesArray(),
              apparentTemperatureMax: daily.variables(3).valuesArray(),
              apparentTemperatureMin: daily.variables(4).valuesArray(),
              apparentTemperatureMean: daily.variables(5).valuesArray(),
            },
          };
          
          // `weatherData` now contains a simple structure with arrays for datetime and weather data
          for (let i = 0; i < weatherData.hourly.time.length; i++) {
              weatherData.hourly.time[i].toISOString(),
              weatherData.hourly.temperature2m[i]
          }

          setWeatherData(weatherData.daily);

          setLoading(false);
          
    };

    // Form Component
    return (
        <form onSubmit={handleSubmit} className="">
            <fieldset className="flex flex-col md:flex-row flex-wrap">
                <legend className="text-xs mb-2 font-bold">Enter Input to get Data</legend>

                <div className="mb-2 w-4/5 md:w-2/12 md:mr-3 md:ml-2 ml-4">
                    <input
                        type="number"
                        name="latitude"
                        placeholder="Enter Latitude"
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-purple-500 transition-all duration-300 ease-in-out"
                        value={formData.latitude}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-2 w-4/5 md:w-2/12 md:mr-3 md:ml-2 ml-4">
                    <input
                        type="number"
                        name="longitude"
                        placeholder="Enter Longitude"
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-purple-500 transition-all duration-300 ease-in-out"
                        value={formData.longitude}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-2 w-4/5 md:w-3/12 md:mr-3 md:ml-2 ml-4 flex flex-col md:flex-row">
                    <label htmlFor="startDate" className="font-bold mr-2">
                        Start Date:
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        id="startDate"
                        className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-purple-500 transition-all duration-300 ease-in-out"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-2 w-4/5 md:w-3/12 md:mr-3 md:ml-2 ml-4 flex flex-col md:flex-row">
                    <label htmlFor="endDate" className="font-bold mr-2">
                        End Date:
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        id="endDate"
                        className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-purple-500 transition-all duration-300 ease-in-out"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && (
                    <p className="w-full text-center text-red-500 font-bold mb-1 animate-bounce">
                        {errorMessage}
                    </p>
                )}

                <div className="w-full flex justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-purple-500 text-white font-bold py-1 px-4 rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
                    >
                        Get Data
                    </button>
                </div>
            </fieldset>
        </form>
    );
}
