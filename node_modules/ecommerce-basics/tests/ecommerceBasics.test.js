/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const {
  calculateTotal, formatCurrency, addToCart, removeFromCart,
  removeProductFromCart, calculateTotalItemCount, clearCart, fetchProducts,
} = require('../src/ecommerceBasics');

test('calculateTotal calculates total price of items in the cart', () => {
  const cart = [
    {
      id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', price: 109.95, quantity: 2,
    },
    {
      id: 2, title: 'Mens Casual Premium Slim Fit T-Shirts ', price: 22.3, quantity: 1,
    },
  ];
  const expectedTotal = (109.95 * 2) + (22.3 * 1);
  expect(calculateTotal(cart)).toEqual(expectedTotal);
});

test('fomartCurrency formats number to currency string', () => {
  const amount = 242.202222222;
  const expectedAmount = '$242.20';
  expect(formatCurrency(amount)).toEqual(expectedAmount);
});

test('addToCart adds a product object to the cart', () => {
  const cart = [];
  const backpacks = {
    id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', price: 109.95, quantity: 2,
  };
  addToCart(cart, backpacks);
  expect(cart).toContain(backpacks);
});

test('addToCart increases a product quantity by 1 if the product already exist in the cart', () => {
  const cart = [];
  const backpack = {
    id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', price: 109.95, quantity: 1,
  };
  addToCart(cart, backpack);
  expect(cart[0].quantity).toEqual(1);
  addToCart(cart, backpack);
  expect(cart[0].quantity).toEqual(2);
  addToCart(cart, backpack);
  expect(cart[0].quantity).toEqual(3);
});

test('removeFromCart removes a product object from the cart', () => {
  const backpacks = {
    id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', price: 109.95, quantity: 2,
  };
  const tShirt = {
    id: 2, title: 'Mens Casual Premium Slim Fit T-Shirts ', price: 22.3, quantity: 1,
  };
  const cart = [backpacks, tShirt];
  removeFromCart(cart, tShirt);
  expect(cart).not.toContain(tShirt);
});

test('removeFromCart decreases a product quantity by 1 if the product exist in the cart', () => {
  const backpacks = {
    id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', price: 109.95, quantity: 2,
  };
  const tShirt = {
    id: 2, title: 'Mens Casual Premium Slim Fit T-Shirts ', price: 22.3, quantity: 1,
  };
  const cart = [backpacks, tShirt];
  removeFromCart(cart, backpacks);
  expect(cart[0].quantity).toBe(1);
  removeFromCart(cart, backpacks);
  expect(cart).not.toContain(backpacks);
});

test('removeProductFromCart fully removes a product from cart', () => {
  const cart = [];
  const fourBackpacks = {
    id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', price: 109.95, quantity: 4,
  };
  removeProductFromCart(cart, fourBackpacks);
  expect(cart).not.toContain(fourBackpacks);
});

test('calculateTotalItemCount calculates total count of items in the cart', () => {
  const cart = [
    {
      id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', price: 109.95, quantity: 2,
    },
    {
      id: 2, title: 'Mens Casual Premium Slim Fit T-Shirts ', price: 22.3, quantity: 1,
    },
  ];
  expect(calculateTotalItemCount(cart)).toEqual(3);
});

test('clearCart clears everything from the cart', () => {
  const cart = [
    {
      id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', price: 109.95, quantity: 2,
    },
    {
      id: 2, title: 'Mens Casual Premium Slim Fit T-Shirts ', price: 22.3, quantity: 1,
    },
  ];
  expect(clearCart(cart)).toHaveLength(0);
});

// https://dev.to/zsevic/spies-and-mocking-with-jest-21op
// Mocking fetch function for successful API response
const mockSuccessResponse = [{ id: 1, title: 'Product 1' }];

const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
  ok: true,
  json: () => mockJsonPromise,
});

jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

afterEach(() => {
  global.fetch.mockClear();
});

test('fetchProducts fetches products data from API', async () => {
  const apiUrl = 'https://example-api.com/products';
  const productsData = await fetchProducts(apiUrl);
  expect(productsData).toEqual(mockSuccessResponse);
});

test('fetchProducts handles API errors gracefully', async () => {
  // Mock fetch function for error response
  global.fetch.mockImplementationOnce(() => Promise.resolve({
    ok: false,
    status: 404,
    json: () => Promise.resolve({ error: 'Not found' }),
  }));

  const apiUrl = 'https://example-api.com/non-existing-endpoint';
  const productsData = await fetchProducts(apiUrl);
  expect(productsData).toBeNull();
});
