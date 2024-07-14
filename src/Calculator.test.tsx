import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Calculator from "./Calculator";

describe("Calculator", () => {
  it("renders correctly", () => {
    const { getByText } = render(<Calculator />);
    expect(getByText("0")).toBeInTheDocument();
  });

  it("performs addition correctly", () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("+"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("="));
    expect(getByText("2")).toBeInTheDocument();
  });

  it("performs subtraction with percentage correctly", () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("0"));
    fireEvent.click(getByText("0"));
    fireEvent.click(getByText("-"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("0"));
    fireEvent.click(getByText("%"));
    fireEvent.click(getByText("="));
    expect(getByText("1260")).toBeInTheDocument();
  });

  it("clears the display when 'C' is pressed", () => {
    const { getByText } = render(<Calculator />);
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("C"));
    expect(getByText("0")).toBeInTheDocument();
  });
});
