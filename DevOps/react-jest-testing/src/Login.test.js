import { fireEvent, render, screen } from "@testing-library/react";
import Login from "./Login";
import axiosMock from "./__mocks__/axios";

describe("Login Component Tests", () => {
  const mockUsers = [
    { id: 1, username: "Kayumba", password: "Kayumba123", name: "New User" },
  ];

  beforeEach(() => {
    axiosMock.get.mockResolvedValue({ data: mockUsers });
  });

  test("Renders the login form", () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByText("Login");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("Logs in successfully with valid credentials", async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "Kayumba" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Kayumba123" },
    });
    fireEvent.click(screen.getByText("Login"));
    const welcomeMessage = await screen.findByText(/Welcome, Kayumba!/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test("Displays an error for invalid credentials", async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "InvalidUser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "WrongPassword" },
    });
    fireEvent.click(screen.getByText("Login"));
    const errorMessage = await screen.findByText(/Invalid username or password/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test("Shows loading while waiting for API response", async () => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "Kayumba" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "Kayumba123" },
    });
    fireEvent.click(screen.getByText("Login"));
    const loadingMessage = screen.getByText(/Loading.../i);
    expect(loadingMessage).toBeInTheDocument();
    const welcomeMessage = await screen.findByText(/Welcome, Kayumba!/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
