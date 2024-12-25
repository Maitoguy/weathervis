export default function Form() {
    return (
        <form action="POST" className="">
            <fieldset className="flex flex-col md:flex-row flex-wrap">
                <legend className="text-xs mb-2 font-bold">Enter Input to get Data</legend>

                <div className="mb-2 w-4/5 md:w-2/12 md:mr-3 md:ml-2 ml-4">
                    <input
                        type="number"
                        name="latitude"
                        placeholder="Enter Latitude"
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-purple-500 transition-all duration-300 ease-in-out"
                        required
                    />
                </div>

                <div className="mb-2 w-4/5 md:w-2/12 md:mr-3 md:ml-2 ml-4">
                    <input
                        type="number"
                        name="longitude"
                        placeholder="Longitude"
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-purple-500 transition-all duration-300 ease-in-out"
                        required
                    />
                </div>

                <div className="mb-2 w-4/5 md:w-3/12 md:mr-3 md:ml-2 ml-4 flex flex-col md:flex-row">
                    <label htmlFor="start" className="font-bold mr-2">
                        Start Date:
                    </label>
                    <input
                        type="date"
                        name="start"
                        id="start"
                        className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-purple-500 transition-all duration-300 ease-in-out"
                        required
                    />
                </div>

                <div className="mb-2 w-4/5 md:w-3/12 md:mr-3 md:ml-2 ml-4 flex flex-col md:flex-row">
                    <label htmlFor="end" className="font-bold mr-2">
                        End Date:
                    </label>
                    <input
                        type="date"
                        name="end"
                        id="end"
                        className="w-full h-10 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-800 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none focus:border-purple-500 transition-all duration-300 ease-in-out"
                        required
                    />
                </div>
                {/* <small className="flex justify-center animate-bounce text-red-500">{errorMessage=null}</small> */}
                <div className="w-full flex justify-center mt-4">
                    <button className="bg-purple-500 text-white font-bold py-1 px-4 rounded-lg shadow-md hover:bg-purple-600 transition duration-300">
                        Get Data
                    </button>
                </div>
            </fieldset>
        </form>
    );
}
