import './App.css';
import { lazy, Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';
import LoadingPage from './utils/LoadingPage';
import PageLayout from './utils/PageLayout';
import PageNotFound from './utils/PageNotFound';

const Home = lazy(() => import('./pages/Home'));
const SignUp = lazy(() => import('./pages/SignUp'));
const LogIn = lazy(() => import('./pages/LogIn'));
const BlogArticle = lazy(() => import('./pages/BlogArticle'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/article/:id" element={<BlogArticle />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
