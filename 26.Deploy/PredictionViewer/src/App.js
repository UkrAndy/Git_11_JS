import React from 'react';
import './App.css';
import PredictionViewer from './components/PredictionViewer'

function App() {
  return (
    <div className="App">
      <PredictionViewer predictions={['Love','money','party','car']}/>
    </div>
  );
}

export default App;
