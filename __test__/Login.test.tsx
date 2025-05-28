import LoginForm from "@/app/auth/login/components/LoginForm"
import { render, screen } from "@testing-library/react"

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

describe('LoginForm Component', () => {
  it('should render the login form', () => {
    render(<LoginForm />) //Arrange

    const loginForm = screen.getByTestId("login-form") //Act

    expect(loginForm).toBeDefined() //Assert
  })

  it('should render the email input', () => {
    render(<LoginForm />) //Arrange

    const emailInput = screen.getByPlaceholderText("Email") //Act

    expect(emailInput).toBeDefined() //Assert
  })

  it('should render the password input', () => {
    render(<LoginForm />) //Arrange

    const passwordInput = screen.getByPlaceholderText("Password") //Act

    expect(passwordInput).toBeDefined() //Assert
  })

  it('should render the submit button', () => {
    render(<LoginForm />) //Arrange

    const submitButton = screen.getByRole("button", { name: "Login" }) //Act

    expect(submitButton).toBeDefined() //Assert
  })

  it('it should has a login label', () => {
      render(<LoginForm />) //Arrange
  
      const loginLabel = screen.getAllByText("Login")[1] //Act
  
      expect(loginLabel).toBeDefined() //Assert
  })
})
