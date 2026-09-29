import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProductCard from "../components/products/ProductCard";
import { useGetFashionProductsQuery } from "../api/fakeStoreApi";

const collections = {
  "/shop": {
    eyebrow: "The collection",
    title: "Shop all",
    description: "Everyday pieces, considered details, and easy-to-wear favorites.",
  },
  "/on-sale": {
    eyebrow: "A little less",
    title: "On sale",
    description: "Good finds, now at an even better price.",
  },
  "/new-arrivals": {
    eyebrow: "Just landed",
    title: "New arrivals",
    description: "Fresh additions to your everyday rotation.",
  },
};

const collectionLinks = [
  { label: "Shop all", href: "/shop" },
  { label: "On sale", href: "/on-sale" },
  { label: "New arrivals", href: "/new-arrivals" },
];

const CatalogPage = () => {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("featured");
  const { data: allProducts = [], isLoading, isError } = useGetFashionProductsQuery();
  const collection = collections[pathname] ?? collections["/shop"];
  const collectionProducts = pathname === "/on-sale"
    ? allProducts.filter((product) => product.oldPrice)
    : allProducts;
  const query = (searchParams.get("search") ?? "").trim().toLowerCase();
  const filteredProducts = collectionProducts.filter((product) => product.name.toLowerCase().includes(query));
  const visibleProducts = [...filteredProducts];

  if (sortBy === "price-low") visibleProducts.sort((first, second) => first.price - second.price);
  if (sortBy === "price-high") visibleProducts.sort((first, second) => second.price - first.price);
  if (sortBy === "rating") visibleProducts.sort((first, second) => second.rating - first.rating);

  return (
    <>
      <Banner />
      <Navbar />
      <main className="catalog-page">
        <div className="page-shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>{collection.title}</span>
          </nav>
          <header className="catalog-heading">
            <span className="eyebrow">{collection.eyebrow}</span>
            <h1 className="section-heading">{collection.title}</h1>
            <p>{collection.description}</p>
          </header>
          <nav className="collection-tabs" aria-label="Shop collections">
            {collectionLinks.map((item) => (
              <Link key={item.href} to={item.href} className={pathname === item.href ? "is-active" : ""} aria-current={pathname === item.href ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="catalog-toolbar">
            <p>{isLoading ? "Loading pieces..." : `${visibleProducts.length} ${visibleProducts.length === 1 ? "piece" : "pieces"}`}</p>
            <label className="catalog-sort">Sort by
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>
          <div className="catalog-grid product-grid">
            {isError ? <p className="empty-results">Fashion products could not be loaded. Please try again.</p> : null}
            {!isLoading && !isError && visibleProducts.length ? visibleProducts.map((product) => <ProductCard key={product.id} product={product} />) : null}
            {!isLoading && !isError && !visibleProducts.length ? (
              <p className="empty-results">No products match “{searchParams.get("search") ?? ""}”. Try another search.</p>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;