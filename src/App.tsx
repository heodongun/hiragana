import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { allHiragana } from './data/hiraganaData';
import { UserProgressProvider } from './context/UserProgressContext';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import FlashcardPage from './pages/FlashcardPage';
import QuizPage from './pages/QuizPage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <UserProgressProvider initialCharacters={allHiragana}>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/flashcards" element={<FlashcardPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </AppLayout>
    </UserProgressProvider>
  );
}

export default App;