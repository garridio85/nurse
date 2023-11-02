import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Quiz } from './views/quiz/quiz.view';

function App() {
  const [routes, setRoute] = useState('');

  return (
    <div className="App">
      <div
        style={{
          height: '50px',
          width: '100%',
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          background: '#64a7e3',
          borderBottom: 'solid 1px white',
        }}
      ></div>
      <div>
        {routes === 'quiz' ? (
          <Quiz />
        ) : (
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <button onClick={() => setRoute('quiz')}>Start Quiz</button>
          </header>
        )}
      </div>
    </div>
  );
}

export default App;
