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
    // beforeEach(() => {
    //   user.click(screen.getByTestId("play"));
    // });
    test("what happens after play button is clicked", async () => {
      user.click(screen.getByTestId("play"));
      expect(screen.getByTestId("pause")).toBeInTheDocument();
      // expect(screen.getByTestId("bodyPart0")).toHaveStyle(`top: 310px`);
      await waitFor(
        () => expect(screen.getByTestId("bodyPart0")).toHaveStyle(`top: 312px`),
        { timeout: 200 }
      );
      // await waitFor(
      //   () => expect(screen.getByTestId("bodyPart0")).toHaveStyle(`top: 314px`),
      //   { timeout: 120 }
      // );
    });

    // test("that right arrow changes snake direction to the right", async () => {
    //   expect(screen.getByTestId("bodyPart0")).toHaveStyle("left: 505px");
    //   await waitFor(
    //     () => expect(screen.getByTestId("bodyPart0")).toHaveStyle("top: 311px"),
    //     { timeout: 240 }
    //   );
    //   expect(screen.getByTestId("arrowRight")).toBeInTheDocument();
    //   user.click(screen.getByTestId("arrowRight"));
    //   // expect(screen.getByTestId("bodyPart0")).toHaveStyle("left: 506px");
    //   // await waitFor(
    //   //   () =>
    //   //     expect(screen.getByTestId("bodyPart0")).toHaveStyle("left: 506px"),
    //   //   { timeout: 300 }
    //   // );
    //   // screen.getByRole("");
    // });
  });
});
