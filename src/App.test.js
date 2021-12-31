import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("What happens in <App />", () => {
  test("app initial state", async () => {
    render(<App />);

    expect(screen.getByTestId("bodyPart0").getBoundingClientRect().top).toBe(0);
    expect(screen.getByTestId("play")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /score: 0/i })
    ).toBeInTheDocument();
  });
});
