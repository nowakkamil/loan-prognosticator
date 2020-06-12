import React from 'react';
import './App.css';
import Start from './Start';
import NavBar from './navBar'

function App() {
  return (
    <div>
      <NavBar />
      <div className="start">
        <Start />
      </div>
    </div>
  );
}

export default App;
