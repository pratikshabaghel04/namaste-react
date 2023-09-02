// import React from "react";
import ReactDOM  from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer"
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Grocery from "./components/Grocery";
import { lazy, Suspense, useEffect, useState } from "react";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import cartStore from "../pages/cartStore";
import Cart from "./components/Cart";

// lazy loading

// const Grocery = lazy(() => import("./components/Grocery"));
// const About = lazy(() => import("./components/About"));

const AppLayout = () => {
    const [userName, setUserName] = useState();

    // User login authentication
    useEffect(() => {
        // make an API call amd send username and password
        const data ={
            name: "Pratiksha Baghel",
        };
        setUserName(data.name);
    },[]);

    return (
        <Provider store={cartStore}>
        <UserContext.Provider value={({loggedInUser: userName, setUserName})}>
    <div className="app">
        <Header />
        <Outlet />
        <Footer />
    </div>
    </UserContext.Provider>
    </Provider>
    );
};


const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />
            },
            {
                path: "/about",
                element: (<Suspense fallback={<h1>Loading......</h1>}> 
                <About /> </Suspense>),
            },
            {
                path: "/contact",
                element: <Contact />
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading......</h1>}> 
                <Grocery /> </Suspense>
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />
            },
            {
                path: "/cart",
                element: <Cart />
            },
        ],
        errorElement: <Error />,
    },
    
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);