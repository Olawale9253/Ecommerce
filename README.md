# Fake Store

A React e-commerce application built with **React**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**.

The project uses the [Fake Store API](https://fakestoreapi.com/) to retrieve product information.

## Technologies

* React
* Vite
* Redux Toolkit
* RTK Query
* Tailwind CSS
* JavaScript

## Features

* Fetch all products from the Fake Store API
* Fetch an individual product by ID
* Manage API requests with RTK Query
* Loading and API state management
* Responsive UI with Tailwind CSS

## API

This project uses the Fake Store API:

```text
https://fakestoreapi.com
```

### Get all products

```text
GET /products
```

### Get a single product

```text
GET /products/:id
```

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd <project-name>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available at the local URL provided by Vite.

## Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_APP_BASEURL=https://fakestoreapi.com
```

The application uses this value as the base URL for API requests.

## RTK Query

API requests are managed using Redux Toolkit Query.

For example:

```js
getProducts: builder.query({
  query: () => "/products",
}),

getProduct: builder.query({
  query: (id) => `/products/${id}`,
}),
```

The generated hooks can then be used inside React components:

```js
const { data, isLoading, error } = useGetProductsQuery();
```

For a single product:

```js
const { data, isLoading, error } = useGetProductQuery(id);
```

## Project Structure

```text
src/
├── api/
│   └── fakeStoreApi.js
├── components/
├── pages/
├── store/
├── App.jsx
└── main.jsx
```

## Purpose

This project is mainly for practicing:

* React
* Tailwind CSS
* Redux Toolkit
* RTK Query
* API integration
* Reusable components
* Working with external APIs
# Fake Store

A React e-commerce application built with **React**, **Redux Toolkit Query (RTK Query)**, and **Tailwind CSS**.

The project uses the [Fake Store API](https://fakestoreapi.com/) to retrieve product information.

## Technologies

* React
* Vite
* Redux Toolkit
* RTK Query
* Tailwind CSS
* JavaScript

## Features

* Fetch all products from the Fake Store API
* Fetch an individual product by ID
* Manage API requests with RTK Query
* Loading and API state management
* Responsive UI with Tailwind CSS

## API

This project uses the Fake Store API:

```text
https://fakestoreapi.com
```

### Get all products

```text
GET /products
```

### Get a single product

```text
GET /products/:id
```

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate into the project:

```bash
cd <project-name>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will then be available at the local URL provided by Vite.

## Environment Variables

Create a `.env` file in the root of the project:

```env
VITE_APP_BASEURL=https://fakestoreapi.com
```

The application uses this value as the base URL for API requests.

## RTK Query

API requests are managed using Redux Toolkit Query.

For example:

```js
getProducts: builder.query({
  query: () => "/products",
}),

getProduct: builder.query({
  query: (id) => `/products/${id}`,
}),
```

The generated hooks can then be used inside React components:

```js
const { data, isLoading, error } = useGetProductsQuery();
```

For a single product:

```js
const { data, isLoading, error } = useGetProductQuery(id);
```

## Project Structure

```text
src/
├── api/
│   └── fakeStoreApi.js
├── components/
├── pages/
├── store/
├── App.jsx
└── main.jsx
```

## Purpose

This project is mainly for practicing:

* React
* Tailwind CSS
* Redux Toolkit
* RTK Query
* API integration
* Reusable components
* Working with external APIs
