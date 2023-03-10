import CollectionCardComponent from "..";
import { render, screen } from "@testing-library/react";

describe("CollectionCardComponent", () => {
    it("should render correctly", () => {
         render(
            <CollectionCardComponent content={content}/>
        );
        expect(screen.findByText('loading')).toBeTruthy();
    });
});


