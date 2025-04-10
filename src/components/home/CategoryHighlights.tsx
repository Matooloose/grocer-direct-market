
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    description: 'Farm-fresh vegetables harvested at peak freshness',
    image: '/placeholder.svg',
    color: 'bg-green-100',
  },
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'Seasonal fruits bursting with flavor',
    image: '/placeholder.svg',
    color: 'bg-red-100',
  },
  {
    id: 'dairy',
    name: 'Dairy',
    description: 'Artisanal cheese, milk, and eggs from pasture-raised animals',
    image: '/placeholder.svg',
    color: 'bg-blue-100',
  },
  {
    id: 'meat',
    name: 'Meat',
    description: 'Ethically raised, high-quality meats',
    image: '/placeholder.svg',
    color: 'bg-orange-100',
  },
];

const CategoryHighlights = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="market-container">
        <h2 className="text-2xl md:text-3xl font-bold text-market-dark text-center mb-4">Shop by Category</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Discover high-quality products across our most popular categories
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={`/products?category=${category.id}`} key={category.id}>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    <img src={category.image} alt={category.name} className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-center text-sm">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
