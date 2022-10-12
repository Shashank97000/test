import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import SeachComponent from "./SearchComponent";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { mocks } from "../../graphql/queries/topic";
import { createMockRouter } from "../../utils/test-utils/createMockRouter";

describe("SearchComponent", () => {
  it("should render the component", async () => {
    const router = createMockRouter({
      query: {
        id: "react",
      },
    });
    render(
      <RouterContext.Provider value={router}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SeachComponent />
        </MockedProvider>
      </RouterContext.Provider>
    );
    expect(
      await screen.findByPlaceholderText("Search Topic…")
    ).toBeInTheDocument();
  });

  it("Should display react option after search react", async () => {
    const router = createMockRouter({
      query: {
        id: "angular",
      },
    });
    render(
      <RouterContext.Provider value={router}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SeachComponent />
        </MockedProvider>
      </RouterContext.Provider>
    );

    const input = await screen.findByPlaceholderText("Search Topic…");

    act(() => {
      /* fire events that update state */
      jest.useFakeTimers();
      fireEvent.change(input, { target: { value: "react" } });
      jest.advanceTimersByTime(2000);
    });

    expect(input.value).toBe("react");
    expect(
      await (
        await screen.findByRole("button")
      ).firstChild
    ).toBeInTheDocument();
  });

  it("should redirect to searched topic", async () => {
    const router = createMockRouter({
      query: {
        id: "angular",
      },
    });
    render(
      <RouterContext.Provider value={router}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <SeachComponent />
        </MockedProvider>
      </RouterContext.Provider>
    );

    const input = await screen.findByPlaceholderText("Search Topic…");

    act(() => {
      /* fire events that update state */
      jest.useFakeTimers();
      fireEvent.change(input, { target: { value: "react" } });
      jest.advanceTimersByTime(2000);
    });

    fireEvent.click(await screen.findByRole("button"));
    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith("react");
  });
});
