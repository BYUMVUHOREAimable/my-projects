import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('Testing my APP', () => { 
  test("Test if the initial UI components are visible", () => {
    // Arrange
    render(<App/>);
    // Act
    const h1 = screen.getByText(/Hello JMV/i);
    const h2 = screen.getByText(/Kayumba/i);
    const b1 = screen.getByText(/Change name/i);
    // Assert
    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(b1).toBeInTheDocument();
  })

  test('Test if the "change name" button will change to Leticia', () => { 
    // Arrange
    render(<App/>);
    // Act
    const b1  = screen.getByText(/Change name/i);
    fireEvent.click(b1);
    const h2 = screen.getByText(/leticia/i);
    // Assert
    expect(h2).toBeInTheDocument();
   })

   test('Test if the "reset" button changes to kayumba', () => { 
    // Arrange
    render(<App/>);
    // Act
    const b2  = screen.getByText(/reset/i);
    fireEvent.click(b2);
    const h2 = screen.getByText(/kayumba/i);
    // Assert
    expect(h2).toBeInTheDocument();
    })
})
