import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = import.meta.env.VITE_API_BASE_URL;
const fashionCategories = new Set([
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "tops",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
  "sunglasses",
]);

const normalizeProduct = (product) => ({
  id: String(product.id),
  name: product.title,
  image: product.thumbnail,
  price: product.price,
  oldPrice: product.discountPercentage
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : undefined,
  rating: product.rating,
  category: product.category,
  description: product.description,
});

export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products?limit=0",
      transformResponse: (response) => response.products.map(normalizeProduct),
    }),

    getFashionProducts: builder.query({
      async queryFn(_arg, _api, _extraOptions, fetchWithBQ) {
        const [cartsResult, productsResult] = await Promise.all([
          fetchWithBQ("/carts"),
          fetchWithBQ("/products?limit=0"),
        ]);

        if (cartsResult.error) return { error: cartsResult.error };
        if (productsResult.error) return { error: productsResult.error };

        const cartProductIds = new Set(
          cartsResult.data.carts.flatMap((cart) => cart.products.map((product) => product.id)),
        );

        return {
          data: productsResult.data.products
            .filter((product) => cartProductIds.has(product.id) && fashionCategories.has(product.category))
            .map(normalizeProduct),
        };
      },
    }),

    getProduct: builder.query({
      query: (id) => `/products/${id}`,
      transformResponse: normalizeProduct,
    }),
  }),
});

export const { useGetProductsQuery, useGetFashionProductsQuery, useGetProductQuery } = fakeStoreApi;
