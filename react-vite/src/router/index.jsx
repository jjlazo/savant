import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import NotFound from '../components/NotFound';
import SplashPage from '../components/SplashPage/SplashPage';

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
        path: "/poems/:poemId",
        element: <PoemDetail />,
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
