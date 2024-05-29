import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import PublicRoute from "./routes/PublicRoutes";
import DashboardPage from "./pages/DashboardPage";
import PrivateRoute from "./routes/PrivateRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { clearUser } from "./redux/slices/userSlice";
import IntroPage from "./pages/IntroPage";
import HomePage from "./pages/HomePage";
const App: React.FC = () => {
  // store.dispatch(clearUser())
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        {
          path: "",
          element: <IntroPage />
        },
        {
          path: "/auth",
          element: <AuthPage />
        },
        {
          path: "*",
          element: <PublicRoute />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
      children: [
        {
          path: "*",
          element: <PrivateRoute />,
        },
      ],
    },
  ]);
  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </div>
  );
};

export default App;
