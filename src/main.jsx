import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import ReactDOM from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";
import Notification from "./components/Notification/Notification";
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
      <Suspense
        fallback={
          <h2 style={{ textAlign: "center", margin: "2rem" }}>Loading...</h2>
        }
      >
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/grocery", element: <Grocery /> },
      { path: "/home/resturant/:resId", element: <ResturantMenu /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
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
    <ThemeProvider>
      <ErrorBoundary>
        <RouterProvider router={appRouter} />
        <Notification />
      </ErrorBoundary>
    </ThemeProvider>
  </Provider>
);
