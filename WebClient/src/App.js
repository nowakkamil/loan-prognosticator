import React from 'react';
import './App.css';
import Start from './Start';
import NavBar from './navBar'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
        <Start />
      </header>
    </div>
  );
}

export default App;
