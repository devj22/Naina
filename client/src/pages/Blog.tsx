import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BlogPost } from '@shared/schema';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Search } from 'lucide-react';

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  // Get unique categories from blog posts
  const getUniqueCategories = () => {
    if (!blogPosts) return ['all'];
    
    const uniqueCategories = new Set<string>();
    
    blogPosts.forEach(post => {
      uniqueCategories.add(post.category.toLowerCase());
    });
    
    return ['all', ...Array.from(uniqueCategories)];
  };
  
  const categories = getUniqueCategories();

  // Filter blog posts by category
  const filterByCategory = (post: BlogPost) => {
    if (activeCategory === "all") return true;
    return post.category.toLowerCase() === activeCategory;
  };

  // Filter by search term
  const filterBySearch = (post: BlogPost) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    
    return post.title.toLowerCase().includes(term) ||
           post.summary.toLowerCase().includes(term) ||
           post.content.toLowerCase().includes(term) ||
           post.category.toLowerCase().includes(term);
  };
  
  // Apply all filters
  const filteredPosts = blogPosts?.filter(post => 
    filterByCategory(post) && filterBySearch(post)
  );

  return (
    <div className="font-body bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="pt-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4">Real Estate Insights</h1>
          <p className="text-gray-300 max-w-2xl">
            Stay updated with the latest market trends, investment strategies, and real estate news.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Search */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="max-w-md">
            <Label htmlFor="search" className="block text-sm font-medium mb-1">Search Articles</Label>
            <div className="relative">
              <Input 
                id="search"
                placeholder="Search by title, content, category..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Category tabs */}
        <div className="mb-8">
          <Tabs 
            defaultValue="all" 
            value={activeCategory} 
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="bg-white p-1 shadow-sm rounded-lg flex flex-wrap">
              {categories.map(category => (
                <TabsTrigger 
                  key={category}
                  value={category} 
                  className="capitalize data-[state=active]:bg-[#4CAF50] data-[state=active]:text-white"
                >
                  {category === 'all' ? 'All Categories' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Blog posts results */}
        <div className="mt-8">
          <div className="mb-4 text-neutral-600">
            Showing {filteredPosts?.length || 0} articles
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <Skeleton className="w-full h-48" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-1/2 mb-3" />
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts && filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;