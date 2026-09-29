import { BadgeCheck, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    user: "Sarah M.",
    rating: 5,
    message:
      "I'm blown away by the quality and style of the clothes I received from Shop.co.",
  },
  {
    id: 2,
    user: "Alex K.",
    rating: 4,
    message:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co.",
  },
  {
    id: 3,
    user: "James L.",
    rating: 3,
    message:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co.",
  },
  {
    id: 4,
    user: "Samuel L.",
    rating: 3,
    message:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co.",
  },
  {
    id: 5,
    user: "John Snow",
    rating: 3,
    message:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co.",
  },
  {
    id: 6,
    user: "Snow J.",
    rating: 3,
    message:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co.",
  },
  {
    id: 7,
    user: "Mike T.",
    rating: 3,
    message:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonial-section page-shell" aria-labelledby="reviews-heading">
      <div className="testimonial-head">
        <h2 className="section-heading" id="reviews-heading">What our customers say</h2>
      </div>
      <div className="testimonial-row">
        {testimonials.slice(0, 3).map((testimonial) => (
          <article className="testimonial-card" key={testimonial.id}>
            <div className="testimonial-stars" aria-label={`${testimonial.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill={index < testimonial.rating ? "currentColor" : "none"} />)}
            </div>
            <div className="testimonial-name">{testimonial.user}<BadgeCheck className="verified" size={15} aria-label="Verified buyer" /></div>
            <p>“{testimonial.message}”</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
