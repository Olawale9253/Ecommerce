const images = [
  { id: 1, path: "/versace-logo.svg", alt: "Versace" },
  { id: 2, path: "/zara-logo.svg", alt: "Zara" },
  { id: 3, path: "/gucci-logo.svg", alt: "Gucci" },
  { id: 4, path: "/prada-logo.svg", alt: "Prada" },
  { id: 5, path: "/calvin-klein-logo.svg", alt: "Calvin Klein" },
];

const Brands = () => {
  return (
    <section className="brand-strip" id="brands" aria-label="Featured brands">
      <div className="page-shell brand-strip-inner">
        {images.map((image) => (
          <img key={image.id} src={image.path} alt={image.alt} />
        ))}
      </div>
    </section>
  );
};

export default Brands;
