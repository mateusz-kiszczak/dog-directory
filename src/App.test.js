import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import mockFetch from './mocks/mockFetch';
import App from './App';
import Dogs from './components/Dogs';
import NotFound from './components/NotFound';


// Test Fetch
beforeEach(() => {
  jest.spyOn(window, 'fetch').mockImplementation(mockFetch);
})

afterEach(() => {
  jest.restoreAllMocks()
});


// Test Components 
// Test APP
test('Renders Home landing page', () => {
  render(<App />);

  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(/Dog Directory/);
  expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(/Find the dogs you love/);
  expect(screen.getByRole('heading', {level: 3})).toHaveTextContent(/random pictures/);
  expect(screen.getByRole('combobox')).toHaveDisplayValue('Select a dog\'s breed');
  expect(screen.getByRole('button', { name: 'Search' })).toBeDisabled();
  expect(screen.getByTestId('imgs-container')).toBeInTheDocument();
});

test('Renders select\'s options in Home', async () => {
  render(<App />);

  expect(await screen.findByRole('option', { name: 'husky'})).toBeInTheDocument();
});

test('Should be able to search and display dog image results', async () => {
  render(<App />);

  // Simulate selecting an option and veryfying its value.
  const select = screen.getByRole("combobox");
   expect(await screen.findByRole("option", { name: "cattledog"})).toBeInTheDocument();
   userEvent.selectOptions(select, "cattledog");
   expect(select).toHaveValue("cattledog");
});


// Test DOGS
test('Renders Dogs landing page', () => {
  render(<Dogs />, { wrapper: BrowserRouter });

  expect(screen.getByRole('button', { name: 'back to search'})).toBeEnabled();
});


// Test NOTFOUND
test('Renders Not Found landing page', () => {
  render(<NotFound />, { wrapper: BrowserRouter });

  expect(screen.getByRole('img')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'back to search'})).toBeEnabled();
});
