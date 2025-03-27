import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'wouter';
import { Calendar, ChevronRight } from 'lucide-react';
import { BlogPost } from '@shared/schema';
import { formatDate, truncateText } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { id, title, summary, featuredImage, category, publishedDate } = post;

  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-md h-full">
      <img 
        src={featuredImage} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center text-sm text-neutral-700 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(publishedDate)}</span>
          <span className="mx-2">•</span>
          <span>{category}</span>
        </div>
        <h3 className="font-heading font-bold text-xl mb-3 text-neutral-900">
          {title}
        </h3>
        <p className="text-neutral-700 mb-4 line-clamp-3">
          {summary}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/blog/${id}`}>
          <span className="inline-flex items-center text-[#4CAF50] hover:text-[#2E7D32] font-medium transition-colors cursor-pointer">
            Read More
            <ChevronRight className="h-4 w-4 ml-1" />
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
