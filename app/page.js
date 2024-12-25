import Form from './Components/form';
import Table from './Components/table';
import Graph from './Components/graph.js';
import Navbar from './Components/Navbar';

export default function Home() {
  return (
   <>

      <div className='grid grid-cols-1'>

          <div>
            <Navbar />
          </div>

          <div>
            <Form />
          </div>

          <div>
            <button>Toggle</button>
          </div>

          <div>
            <Table />
          </div>

          <div>
            <Graph />
          </div>
      </div>

   </>
  );
}
