import { render, screen } from "@testing-library/react"
import RestaurantCard, { withPromotedLable } from "../RestaurantCard"
import MOCK_DATA from "../mocks/resCardMock.json"
import "@testing-library/jest-dom"


it("Should Render RestaurentCard component with prpos Data", () => {
    render (<RestaurantCard resData={MOCK_DATA} />);

    const name = screen.getByText("Pizza Hut")

    expect(name).toBeInTheDocument();

});

