import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { BlogPost } from '@shared/schema';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft, ChevronRight, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const BlogDetail = () => {
  const { id } = useParams();
  
  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog-posts/${id}`],
  });

  if (isLoading) {
    return (
      <div className="font-body bg-gray-100 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-28">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-[400px] w-full mb-8 rounded-lg" />
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-6" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-6" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-full mb-4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="font-body bg-gray-100 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-28 text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-body bg-gray-100 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-28">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/#blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink>{post.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Featured Image */}
        <div className="relative mb-8 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-[400px] object-cover"
          />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <h1 className="font-heading font-bold text-3xl mb-4 text-neutral-900">{post.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6 text-neutral-700">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-[#4CAF50]" />
                <span>{formatDate(post.publishedDate)}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1 text-[#4CAF50]" />
                <span>{post.authorName}</span>
              </div>
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-1 text-[#4CAF50]" />
                <span>{post.category}</span>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none text-neutral-700 mb-8">
              <p className="font-medium text-lg mb-4">{post.summary}</p>
              
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-lg mb-4 flex items-center">
                <Share2 className="h-5 w-5 mr-2 text-[#4CAF50]" />
                Share This Article
              </h3>
              <div className="flex space-x-3">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#3b5998] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#1da1f2] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#0077b5] text-white p-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Link href="/#blog">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;
