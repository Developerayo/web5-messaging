import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  test("renders the application without errors", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /@Web5JS\/Messaging/i })
    ).toBeInTheDocument();
  });

  test("displays the form component", () => {
    render(<App />);
    expect(
      screen.getByRole("textbox", { name: /first name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /last name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /message/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  test("submits a new message and displays it in the list", async () => {
    render(<App />);
    userEvent.type(
      screen.getByRole("textbox", { name: /first name/i }),
      "John"
    );
    userEvent.type(screen.getByRole("textbox", { name: /last name/i }), "Doe");
    userEvent.type(
      screen.getByRole("textbox", { name: /message/i }),
      "Hello, world!"
    );
    userEvent.click(screen.getByRole("button", { name: /send/i }));
    await waitFor(() => {
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(/hello, world!/i)).toBeInTheDocument();
    });
  });

  test("deletes a message from the list", async () => {
    render(<App />);
    const messageItem = screen.getByText(/hello, world!/i).closest("li");
    userEvent.click(messageItem.querySelector("button"));
    await waitFor(() => {
      expect(screen.queryByText(/hello, world!/i)).not.toBeInTheDocument();
    });
  });

  test("updates a message in the list", async () => {
    render(<App />);
    const messageItem = screen.getByText(/hello, world!/i).closest("li");
    userEvent.click(messageItem.querySelector("button.edit"));
    userEvent.clear(screen.getByRole("textbox", { name: /message/i }));
    userEvent.type(
      screen.getByRole("textbox", { name: /message/i }),
      "Updated message"
    );
    userEvent.click(screen.getByRole("button", { name: /save/i }));
    await waitFor(() => {
      expect(screen.getByText(/updated message/i)).toBeInTheDocument();
    });
  });
});
