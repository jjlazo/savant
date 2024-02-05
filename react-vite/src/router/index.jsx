import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import NotFound from '../components/NotFound';
import PoemDetail from '../components/Poems/PoemDetail.jsx';
import Bookmarks from '../components/Poems/Bookmarks.jsx';
import AuthorDetail from '../components/Authors/AuthorDetail.jsx';
import SplashPage from '../components/SplashPage/SplashPage';
import AllPoems from '../components/Poems/AllPoems';
import AllAuthors from '../components/Authors/AllAuthors.jsx';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/poems",
        element: <AllPoems />,
      },
      {
        path: "/poems/:poemId",
        element: <PoemDetail />,
      },
      {
        path: "/authors",
        element: <AllAuthors />,
      },
      {
        path: "/authors/:authorId",
        element: <AuthorDetail />,
      },
      {
        path: "/users/:userId/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/errors",
        element: <NotFound/>
      },
      {
        path: "*",
        element: <NotFound/>
      }
    ],
  },
]);
