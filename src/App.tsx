import React, { useState } from 'react';
import './App.css';
import { Quiz } from './views/quiz/quiz.view';
import { Feedback } from './views/feedback/feedback.view';
import { FAQ } from './views/faqs/faqs.view';
import { Home } from './views/home/home.view';

function App() {
  const [routes, setRoute] = useState('');
  const [showFlyoutMenu, setShowFlyoutMenu] = useState(false);

  const router = () => {
    switch (routes) {
      case 'quiz':
        return <Quiz />;
      case 'feedback':
        return <Feedback goBack={() => setRoute('home')} />;
      case 'faq':
        return <FAQ />;
      default:
        return <Home />;
    }
  };

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
      >
        <button
          onClick={() => setShowFlyoutMenu(!showFlyoutMenu)}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            position: 'absolute',
            left: '10px',
            top: '10px',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="34"
            height="34"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="21" y1="10" x2="3" y2="10"></line>
            <line x1="21" y1="6" x2="3" y2="6"></line>
            <line x1="21" y1="14" x2="3" y2="14"></line>
            <line x1="21" y1="18" x2="3" y2="18"></line>
          </svg>
        </button>
        <div
          className={showFlyoutMenu ? 'active' : ''}
          style={{
            width: '300px',
            position: 'fixed',
            height: '100vh',
            background: 'white',
            top: '50px',
            transform: `translate(${showFlyoutMenu ? '0px' : '-400px'}, 0px)`,
            transition: '0.3s',
            padding: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            boxShadow: '#777777 0px 18px 22px 4px',
          }}
        >
          <button
            className="btn-transparent"
            onClick={() => {
              setRoute('home');
              setShowFlyoutMenu(false);
            }}
          >
            Home
          </button>
          <button
            className="btn-transparent"
            onClick={() => {
              setRoute('home');
              setShowFlyoutMenu(false);
            }}
          >
            How to video
          </button>
          <button
            className="btn-transparent"
            onClick={() => {
              setRoute('faq');
              setShowFlyoutMenu(false);
            }}
          >
            FAQ
          </button>
          <button
            className="btn-transparent"
            onClick={() => {
              setRoute('quiz');
              setShowFlyoutMenu(false);
            }}
          >
            Take Quiz
          </button>
          <button
            className="btn-transparent"
            onClick={() => {
              setRoute('feedback');
              setShowFlyoutMenu(false);
            }}
          >
            Feedback Survey
          </button>
        </div>
      </div>
      <div style={{ paddingTop: 50 }}>{router()}</div>
    </div>
  );
}

export default App;
