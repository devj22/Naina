import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { MapPin, Mail, Phone } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { insertContactSubmissionSchema } from '@shared/schema';

// Extend the schema with validation rules
const contactFormSchema = insertContactSubmissionSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: "Residential Property",
      message: ""
    }
  });
  
  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out. We'll get back to you shortly!",
        variant: "default"
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4 text-neutral-900">Get in Touch</h2>
            <div className="w-20 h-1 bg-[#4CAF50] mb-6"></div>
            <p className="text-neutral-700 mb-8">
              Interested in investing or have questions about our properties? Contact our expert team for personalized assistance.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-[#4CAF50]/20 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-[#4CAF50]" />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-neutral-900">Visit Our Office</h4>
                  <p className="text-neutral-700">123 Business Park, Andheri East, Mumbai - 400069, Maharashtra, India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#4CAF50]/20 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-[#4CAF50]" />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-neutral-900">Email Us</h4>
                  <p className="text-neutral-700">info@nainalanddeals.com</p>
                  <p className="text-neutral-700">support@nainalanddeals.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-[#4CAF50]/20 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-[#4CAF50]" />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-neutral-900">Call Us</h4>
                  <p className="text-neutral-700">+91 99999 88888</p>
                  <p className="text-neutral-700">+91 22 4567 8900</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-lg text-neutral-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'linkedin', 'instagram'].map(social => (
                  <a 
                    key={social}
                    href={`#${social}`} 
                    className="bg-gray-100 hover:bg-[#4CAF50] hover:text-white text-neutral-700 p-3 rounded-full transition-colors"
                    aria-label={`Follow us on ${social}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-100 p-8 rounded-lg shadow-md">
              <h3 className="font-heading font-bold text-2xl mb-6 text-neutral-900">Send Us a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Full Name *</Label>
                          <FormControl>
                            <Input 
                              {...field} 
                              id="name" 
                              placeholder="John Doe" 
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email Address *</Label>
                          <FormControl>
                            <Input 
                              {...field} 
                              id="email" 
                              type="email" 
                              placeholder="john@example.com" 
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone Number *</Label>
                          <FormControl>
                            <Input 
                              {...field} 
                              id="phone" 
                              type="tel" 
                              placeholder="+91 98765 43210" 
                              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="interest"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="interest" className="block text-sm font-medium text-neutral-700 mb-1">Interested In</Label>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger id="interest" className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50]">
                                <SelectValue placeholder="Select your interest" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Residential Property">Residential Property</SelectItem>
                              <SelectItem value="Commercial Property">Commercial Property</SelectItem>
                              <SelectItem value="Land/Plot">Land/Plot</SelectItem>
                              <SelectItem value="Investment Advisory">Investment Advisory</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Your Message *</Label>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            id="message" 
                            rows={5} 
                            placeholder="Tell us about your requirements..." 
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-medium py-3 rounded-md transition-colors"
                    disabled={contactMutation.isPending}
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
