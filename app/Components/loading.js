

export default function Loading(){

    // Component for the loading
    return(
            <div className="mx-2 grid grid-cols-5 grid-rows-3 gap-2 mt-11 bg-purple-50">

                {
                    [...Array(60)].map((_ , index) => (
                        <div key={index}
                        className="h-6 bg-gray-300 rounded animate animate-pulse border border-black"
                        > 

                        </div>
                    ))
                }

            </div>
        
    )

}