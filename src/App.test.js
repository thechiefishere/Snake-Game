import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("What happens in <App />", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("app initial state", async () => {
    expect(screen.getByTestId("bodyPart0")).toHaveStyle(`top: 310px`);
    expect(screen.getByTestId("play")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /score: 0/i })
    ).toBeInTheDocument();
  });

  test("what happens after play button is clicked", async () => {
    userEvent.click(screen.getByTestId("play"));
    expect(screen.getByTestId("pause")).toBeInTheDocument();
    await waitFor(
      () => expect(screen.getByTestId("bodyPart0")).toHaveStyle(`top: 311px`),
      { timeout: 30 }
    );
  });
});
