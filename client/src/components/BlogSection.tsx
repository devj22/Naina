import { Button } from '@/components/ui/button';
import BlogCard from './BlogCard';
import { BlogPost } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

const BlogSection = () => {
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  // Limit to only 3 blog posts on the home page
  const displayBlogPosts = blogPosts?.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-neutral-900">Real Estate Insights</h2>
          <div className="w-20 h-1 bg-[#4CAF50] mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-neutral-700">
            Stay updated with the latest market trends, investment strategies, and real estate news.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
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
            ))
          ) : (
            displayBlogPosts?.map(post => (
              <BlogCard key={post.id} post={post} />
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/blog">
            <Button 
              variant="outline" 
              className="inline-flex items-center px-6 py-3 border-2 border-[#4CAF50] text-[#4CAF50] hover:bg-[#4CAF50] hover:text-white font-medium rounded-md transition-colors"
            >
              View All Articles
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
