![workflow](https://github.com/ParulK-bhardwaj/e-commerce-library/actions/workflows/node.js.yml/badge.svg)

[![npm version](https://img.shields.io/npm/v/ecommerce-basics.svg)](https://www.npmjs.com/package/ecommerce-basics)
[![npm downloads](https://img.shields.io/npm/dt/ecommerce-basics.svg)](https://www.npmjs.com/package/ecommerce-basics)

[ecommerce-basics NPM Library](https://www.npmjs.com/package/ecommerce-basics)

# Ecommerce Basics npm Library

Ecommerce Basics is a lightweight and easy-to-use npm library designed to simplify common e-commerce operations such as cart management, product calculations, and currency formatting. With a focus on simplicity and efficiency, this library provides essential functions to enhance the e-commerce experience in your applications.

## Installation

To start using ecommerce-basics in your JavaScript projects, you can install it via npm:

```shell
npm install ecommerce-basics
```

## Usage
Once you have installed ecommerce-basics, you can import the desired functions into your JavaScript code:

```javascript
const ecommerce = require('ecommerce-basics');
```

## Features
ecommerce-basics offers a wide range of features:

### formatCurrency(amount)
- Format a numerical value into a currency format.

```javascript
const amount = 252.333334506
const formattedAmount = ecommerce.formatCurrency(amount);
console.log('Formatted Currency:', formattedAmount); // Output: $252.33
```

### calculateTotal(cart)
- Calculate the total price of products in the cart.

```javascript
const cart = [{ id: 1, title: 'Product 1', price: 10, quantity: 2 }];
const total = ecommerce.calculateTotal(cart);
console.log('Total Price:', ecommerce.formatCurrency(total)); // Output: $20.00
```

### addToCart(cart, product)
- Add a product to the cart. If the product already exists, it updates the quantity.

```javascript
const cart = [];
const productOne = { id: 1, title: 'Product 1', price: 10, quantity: 2 }
ecommerce.addToCart(cart, productOne);
console.log(cart); // Output: [{ id: 1, title: 'Product 1', price: 10, quantity: 2 }];
const productTwo = { id: 2, title: 'Product 2', price: 100, quantity: 1 }
ecommerce.addToCart(cart, productTwo);
console.log(cart); 
/* Output:
    [
        { id: 1, title: 'Product 1', price: 10, quantity: 2 },
        { id: 2, title: 'Product 2', price: 100, quantity: 1 }
    ];
/*
```

### removeFromCart(cart, product)
- Remove a single quantity of a product from the cart. If quantity becomes zero, the product is removed from the cart.

```javascript
const productOne = { id: 1, title: 'Product 1', price: 10, quantity: 2 }
const productTwo = { id: 2, title: 'Product 2', price: 100, quantity: 1 }
const cart = [productOne, productTwo];
ecommerce.removeFromCart(cart, productOne);
console.log(cart[0]); // Output: [{ id: 1, title: 'Product 1', price: 10, quantity: 1 }];
console.log(cart[1]); // Output: [{ id: 2, title: 'Product 2', price: 100, quantity: 1 }];
ecommerce.removeFromCart(cart, productOne);
console.log(cart[0]); // Output: [{ id: 2, title: 'Product 2', price: 100, quantity: 1 }];
ecommerce.removeFromCart(cart, productTwo);
console.log(cart); // Output: []
```

### removeProductFromCart(cart, product)
- Remove a product completely from the cart.

```javascript
const productOne = { id: 1, title: 'Product 1', price: 10, quantity: 4 }
const productTwo = { id: 2, title: 'Product 2', price: 100, quantity: 1 }
const cart = [productOne, productTwo];
ecommerce.removeProductFromCart(cart, productOne);
console.log(cart); // Output: [{ id: 2, title: 'Product 2', price: 100, quantity: 1 }];
console.log(cart.length); // Output: 1
ecommerce.removeProductFromCart(cart, productTwo);
console.log(cart.length); // Output: 0
```

### calculateTotalItemCount(cart)
- Calculate the total number of items in the cart.

```javascript
const productOne = { id: 1, title: 'Product 1', price: 10, quantity: 4 }
const productTwo = { id: 2, title: 'Product 2', price: 100, quantity: 1 }
const cart = [productOne, productTwo];
const itemCount = ecommerce.calculateTotalItemCount(cart)
console.log(itemCount); // Output: 5
```

### clearCart(cart)
- Clear all items from the cart.

```javascript
const productOne = { id: 1, title: 'Product 1', price: 10, quantity: 4 }
const productTwo = { id: 2, title: 'Product 2', price: 100, quantity: 1 }
const cart = [productOne, productTwo];
const updatedCart = ecommerce.clearCart(cart)
console.log(updatedCart); // Output: []
```

### fetchProducts(apiUrl)
- Fetch products from an API endpoint. Returns an array of products or null if there's an error.
```javascript
const apiUrl = 'https://example-api.com/products';
ecommerce.fetchProducts(apiUrl)
    .then(products => {
        console.log('Fetched Products:', products);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## Contributing
I welcome contributions from the community to improve and expand the functionality of ecommerce-basics. If you have any suggestions, bug reports, or feature requests, please don't hesitate to open an issue or submit a pull request on the GitHub repository.

### 
- The package is intended to be used for educational purposes only.