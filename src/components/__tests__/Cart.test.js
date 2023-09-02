import { fireEvent, render, screen } from "@testing-library/react"
import {act} from "react-dom/test-utils"
import RestaurantMenu from "../RestaurantMenu"
import Header from "../Header"
import Cart from "../Cart"
import { BrowserRouter } from "react-router-dom"
import MOCK_DATA_MENU from "../mocks/mockResMenu.json"
import { Provider } from "react-redux";
import cartStore from "../pages/cartStore"
import "@testing-library/jest-dom"

global.fetch = jest.fn(() => 
Promise.resolve ({
    json: () => Promise.resolve(MOCK_DATA_MENU),
})
);

it("Should Load Restaurant Menu Component", async () => {
    await act(async () => render (
        <BrowserRouter>
        <Provider store={cartStore}>
        <Header />
        <RestaurantMenu />
         </Provider>
         </BrowserRouter>
    ))

    const accordionHeader = screen.getByText("Recommended (18)");
    fireEvent.click(accordionHeader);
    expect(screen.getAllByTestId("foodItems").length).toBe(18);
    expect(screen.getByText("Cart - (0 items)")).toBeInTheDocument();


    const addItems = screen.getAllByRole("button", { name: "Add"});
    fireEvent.click(addItems[0]);
    expect(screen.getByText("Cart - (1 items)")).toBeInTheDocument();


});

it("Should Add Items in to the cart", async () => {
    await act(async () => render (
        <BrowserRouter>
        <Provider store={cartStore}>
        <Header />
        <RestaurantMenu />
        <Cart />
         </Provider>
         </BrowserRouter>
    ))

    const addItems = screen.getAllByRole("button", { name: "Add"});
    fireEvent.click(addItems[0]);
    expect(screen.getByText("Cart - (1 items)")).toBeInTheDocument();

    fireEvent.click(addItems[1]);
    expect(screen.getByText("Cart - (2 items)")).toBeInTheDocument();

    expect(screen.getAllByTestId("foodItems").length.tobe(20))

    fireEvent.click(screen.getByRole("button", { name: "Clear Cart"}))
    expect(screen.getAllByTestId("foodItems").length).tobe(18);

    expect(screen.getByText("Cart is empty, Add Items to the cart")).toBeInTheDocument();
});

