import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import user from "@testing-library/user-event";

describe("What happens in <App />", () => {
  beforeEach(() => {
    render(<App />);
  });
  describe("initial state of the app", () => {
    test("app initial state", async () => {
      expect(screen.getByTestId("bodyPart0")).toHaveStyle(`top: 310px`);
      expect(screen.getByTestId("play")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /score: 0/i })
      ).toBeInTheDocument();
    });
  });

  describe("changes when play button is clicked", () => {
    beforeEach(() => {
      user.click(screen.getByTestId("play"));
    });
    test("that snake moves", async () => {
      expect(screen.getByTestId("pause")).toBeInTheDocument();
      await waitFor(
        () =>
          expect(screen.getByTestId("bodyPart0")).not.toHaveStyle(`top: 310px`),
        { timeout: 40, interval: 30 }
      );
    });
  });
});
