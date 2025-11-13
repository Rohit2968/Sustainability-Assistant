import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ChatPage from './components/ChatPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      {currentPage === 'home' && (
        <HomePage onStartChat={() => setCurrentPage('chat')} />
      )}
      {currentPage === 'chat' && (
        <ChatPage onBackToHome={() => setCurrentPage('home')} />
      )}
    </div>
  
    
  );
}

export default App;