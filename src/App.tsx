import React, { useState } from 'react';
import './App.css';
import { Quiz } from './views/quiz/quiz.view';
import { Feedback } from './views/feedback/feedback.view';
import { FAQ } from './views/faqs/faqs.view';
import { Home } from './views/home/home.view';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { General } from './views/general/general.view';
import { HowTo } from './views/howto/howto.view';

function App() {
  const [showFlyoutMenu, setShowFlyoutMenu] = useState(false);

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
      </div>
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
          zIndex: 1,
        }}
      >
        <a
          href="/"
          className="btn-transparent"
          onClick={() => {
            setShowFlyoutMenu(false);
          }}
        >
          Home
        </a>
        <a
          href="/general"
          className="btn-transparent"
          onClick={() => {
            setShowFlyoutMenu(false);
          }}
        >
          But What is Incentive Spirometry?
        </a>
        <a
          href="/how-to"
          className="btn-transparent"
          onClick={() => {
            setShowFlyoutMenu(false);
          }}
        >
          How to video
        </a>
        <a
          href="/faqs"
          className="btn-transparent"
          onClick={() => {
            setShowFlyoutMenu(false);
          }}
        >
          FAQ
        </a>
        <a
          href="/quiz"
          className="btn-transparent"
          onClick={() => {
            setShowFlyoutMenu(false);
          }}
        >
          Take Quiz
        </a>
        <a
          href="/feedback"
          className="btn-transparent"
          onClick={() => {
            setShowFlyoutMenu(false);
          }}
        >
          Feedback Survey
        </a>
      </div>
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </div>
  );
}

const Content = () => {
  return (
    <div className="content-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/general" element={<General />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/how-to" element={<HowTo />} />
      </Routes>
    </div>
  );
};

export default App;
