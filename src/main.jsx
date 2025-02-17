import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import ReactDOM from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Body from "./layouts/Body";
import Home from "./layouts/Home";
import Header from "./components/Header/Header";
import ContactUs from "./layouts/ContactUs";
import Error from "./components/Error/Error";
import ResturantMenu from "./layouts/ResturantMenu";
import "./index.css";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Cart from "./layouts/Cart";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";

const About = lazy(() => import("./layouts/About"));
const Grocery = lazy(() => import("./layouts/Grocery"));

const AppLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h2>Loading.......</h2>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h2>Loading....</h2>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/home/resturant/:resId",
        element: <ResturantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: (
      <div>
        <Header />
        <Error />
      </div>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appStore}>
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </ErrorBoundary>
  </Provider>
);
