import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Topic from "./Topic";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { mocks } from "../../graphql/queries/topic";
import { createMockRouter } from "../../utils/test-utils/createMockRouter";

describe("Topic", () => {
  it("should render the component", async () => {
    const router = createMockRouter({
      query: {
        id: "react",
      },
    });
    render(
      <RouterContext.Provider value={router}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Topic />
        </MockedProvider>
      </RouterContext.Provider>
    );
    expect(await screen.findByText("REACT")).toBeInTheDocument();
  });

  it("should render angular data", async () => {
    const router = createMockRouter({
      query: {
        id: "angular",
      },
    });
    render(
      <RouterContext.Provider value={router}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Topic />
        </MockedProvider>
      </RouterContext.Provider>
    );
    expect(await screen.findByText("ANGULAR")).toBeInTheDocument();
  });

  it("should redirect to the selected related topic", async () => {
    const router = createMockRouter({
      query: {
        id: "react",
      },
    });
    const component = render(
      <RouterContext.Provider value={router}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Topic />
        </MockedProvider>
      </RouterContext.Provider>
    );

    const angularButton = await component.findByText("angular");
    fireEvent.click(angularButton);

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toBeCalledWith("angular");
  });
});
