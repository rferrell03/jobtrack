import './App.css';
import JobArea from './components/JobArea';
import AddJobScreen from './components/AddJobScreen';
import { sampleJobs } from './jobs';
import { useState, useEffect } from 'react';
import auth from "./firebaseSetup"

function App() {
  const [addJobOpen, setAddJobOpen] = useState(false)

  const handleJobAddClick = () => {
    setAddJobOpen(true)
  }

  const handleJobAddClose = () => {
    setAddJobOpen(false)
  }


  return (
    <>
      
      <div className="centerBox">
        <div className="header">
          <h1>JobTracker</h1>
          <button onClick={handleJobAddClick}>+</button>
        </div>

        <div className='jobs'>
          {sampleJobs.map((job) => {
            return <JobArea {...job} />
          })}
        </div>
      </div>
      {addJobOpen && <AddJobScreen closeAddJob={handleJobAddClose} />}

   </>
  );
}

export default App;
