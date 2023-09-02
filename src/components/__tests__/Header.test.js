import { render, fireEvent } from "@testing-library/react"
import { screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import Header from "../Header"
import cartStore from "../../../pages/cartStore"
import "@testing-library/jest-dom"

it("Should load Header Component With login button", () => {
    render (
        <BrowserRouter>
        <Provider store={cartStore}>
        <Header />
        </Provider>
        </BrowserRouter>
    );

     const loginButton = screen.getByRole("button");   

    //const loginButton = screen.getByText("Login");

    expect(loginButton).toBeInTheDocument();
});

it("Should load Header Component With a Cart item  ", () => {
    render (
        <BrowserRouter>
        <Provider store={cartStore}>
        <Header />
        </Provider>
        </BrowserRouter>
    );

      const cartItems = screen.getByText(/Cart/);  
      //const cartItems = screen.getByText("Cart - (0 items)");   

    expect(cartItems).toBeInTheDocument();
});

it("Should Change Login Button to Logout on click", () => {
    render (
        <BrowserRouter>
        <Provider store={cartStore}>
        <Header />
        </Provider>
        </BrowserRouter>
    );

     const loginButton = screen.getByRole("button", {name: "Login"});   
     fireEvent.click(loginButton);

     const logoutButton = screen.getByRole("button", {name: "Logout"});   

    //const loginButton = screen.getByText("Login");

    expect(logoutButton).toBeInTheDocument();
});