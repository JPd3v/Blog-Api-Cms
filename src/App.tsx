import './App.css';
import { lazy, Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';
import LoadingPage from './utils/LoadingPage';
import PageLayout from './utils/PageLayout';
import PageNotFound from './utils/PageNotFound';

const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
