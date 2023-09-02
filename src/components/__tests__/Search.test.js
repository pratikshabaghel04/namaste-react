import { render, fireEvent, screen } from "@testing-library/react"; 
import Body from "../Body";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import MOCK_DATA  from "../mocks/mockResListData.json";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        },
    });
});

  it("Should render the body component with Search", async () => {
     await act(async () => {
         render (
            <BrowserRouter>
                 <Body />
             </BrowserRouter>
         );
     });
   
     const searchBtn = screen.getByRole("button", { name: "Search"});

     expect(searchBtn).toBeInTheDocument();
 }); 

it("Should search ResList for pizaa Hut text Input", async () => {
    await act(async () => {
        render (
            <BrowserRouter>
                <Body />
            </BrowserRouter>
        );
    });

    const cardsBeforeSearch = screen.getAllByTestId("resCard")
    expect(cardsBeforeSearch.length).toBe(20)

    const searchBtn = screen.getByRole("button", { name: "Search"})

    const searchInput = screen.getByTestId("searchInput");

    fireEvent.change(searchInput, {target: {value: "pizza Hut"}})
    fireEvent.click(searchBtn)

    const cardsAfterSearch = screen.getAllByTestId("resCard")
    expect(cardsAfterSearch.length).toBe(4)
}); 

  it("Should filter Top Rated Reataurants", async () => {
    await act(async () => {
        render (
           <BrowserRouter>
                <Body />
            </BrowserRouter>
        );
    });
  
    const cardsBeforeFilter = screen.getAllByTestId("resCard");
    expect(cardsBeforeFilter.length).toBe(20);

    const topRatedBtn = screen.getByRole("button", { name: "Top Rated Restaurants"});
    fireEvent.click(topRatedBtn);

    const cardsAfterFilter = screen.getAllByTestId("resCard");
    expect(cardsAfterFilter.length).toBe(13)
}); 