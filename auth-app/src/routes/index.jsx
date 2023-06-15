import { createBrowserRouter, redirect } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import Sidebar from "../components/Sidebar";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    loader: async () => {
      if (localStorage.getItem('access_token')) {
        throw redirect('/');
      }
      return null
    },
  },
  {
    path: "register",
    element: <RegisterPage />,
    loader: async () => {
      if (localStorage.getItem('access_token')) {
        throw redirect('/');
      }
      return null
    },
  },
  {
    path: '/',
    element: <Sidebar />,
    loader: async () => {
      if (!localStorage.getItem('access_token')) {
        throw redirect('/login');
      }
      return null
    },
    children: [
      {
        path: "",
        element: <HomePage />
      },
    ],
  }
])

export default router;