
const testimonials = [
  {
    id: 1,
    content: "The quality of produce from GrocerDirect is exceptional. Everything tastes so much better than what I used to get at the supermarket.",
    author: "Sarah Johnson",
    role: "Regular Customer",
    avatar: "/placeholder.svg",
  },
  {
    id: 2,
    content: "As a chef, I rely on fresh ingredients. GrocerDirect connects me directly with local farmers, ensuring I get the best quality for my restaurant.",
    author: "Michael Chen",
    role: "Restaurant Owner",
    avatar: "/placeholder.svg",
  },
  {
    id: 3,
    content: "Joining GrocerDirect as a farmer has transformed my business. I now have direct access to customers who value my organic farming practices.",
    author: "Emma Rodriguez",
    role: "Organic Farmer",
    avatar: "/placeholder.svg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16">
      <div className="market-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-market-dark mb-4">What People Say</h2>
          <p className="text-gray-600">
            Hear from our satisfied customers and farmers who are part of the GrocerDirect community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
            >
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFB800" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
