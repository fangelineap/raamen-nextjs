import ConfirmationModal from "@/app/raamen/components/ConfirmationModal";
import { render, screen } from "@testing-library/react";

describe("Confirmation Modal Component", () => {
  const mockHandleClose = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockContent = "Are you sure you want to proceed?";
  const mockTitle = "Confirmation";

  it("should render the confirmation modal", () => {
    render(
      <ConfirmationModal
        open={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        title={mockTitle}
        content={mockContent}
      />
    );

    const modalTitle = screen.getByText(mockTitle);
    expect(modalTitle).toBeDefined();
  });

  it("should render the confirmation content", () => {
    render(
      <ConfirmationModal
        open={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        title={mockTitle}
        content={mockContent}
      />
    );

    const modalContent = screen.getByText(mockContent);

    expect(modalContent).toBeDefined();
  });

  it("should close the modal when Cancel button is clicked", () => {
    render(
      <ConfirmationModal
        open={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        title={mockTitle}
        content={mockContent}
      />
    );

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    cancelButton.click();

    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("should call handleSubmit when Confirm button is clicked", () => {
    render(
      <ConfirmationModal
        open={true}
        handleClose={mockHandleClose}
        handleSubmit={mockHandleSubmit}
        title={mockTitle}
        content={mockContent}
      />
    );

    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    confirmButton.click();

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});
