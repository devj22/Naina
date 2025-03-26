import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { insertContactSubmissionSchema, insertPropertySchema, insertBlogPostSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes - all prefixed with /api
  
  // Property routes
  app.get("/api/properties", async (req: Request, res: Response) => {
    try {
      const properties = await storage.getAllProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties", error: String(error) });
    }
  });

  app.get("/api/properties/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }

      const property = await storage.getPropertyById(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }

      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property", error: String(error) });
    }
  });

  app.get("/api/properties/type/:type", async (req: Request, res: Response) => {
    try {
      const type = req.params.type;
      const validTypes = ["residential", "commercial", "land", "industrial"];
      
      if (!validTypes.includes(type)) {
        return res.status(400).json({ message: "Invalid property type" });
      }

      const properties = await storage.getPropertiesByType(type);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties by type", error: String(error) });
    }
  });

  app.get("/api/properties/featured/:limit?", async (req: Request, res: Response) => {
    try {
      const limitStr = req.params.limit;
      const limit = limitStr ? parseInt(limitStr) : undefined;
      
      if (limitStr && isNaN(limit!)) {
        return res.status(400).json({ message: "Invalid limit value" });
      }

      const properties = await storage.getFeaturedProperties(limit);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured properties", error: String(error) });
    }
  });

  app.post("/api/properties", async (req: Request, res: Response) => {
    try {
      const propertyData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(propertyData);
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: "Validation error", errors: validationError.details });
      }
      res.status(500).json({ message: "Failed to create property", error: String(error) });
    }
  });

  app.put("/api/properties/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }

      const propertyData = insertPropertySchema.partial().parse(req.body);
      const updatedProperty = await storage.updateProperty(id, propertyData);
      
      if (!updatedProperty) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(updatedProperty);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: "Validation error", errors: validationError.details });
      }
      res.status(500).json({ message: "Failed to update property", error: String(error) });
    }
  });

  app.delete("/api/properties/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }

      const success = await storage.deleteProperty(id);
      if (!success) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete property", error: String(error) });
    }
  });

  // Blog routes
  app.get("/api/blog-posts", async (req: Request, res: Response) => {
    try {
      const blogPosts = await storage.getAllBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts", error: String(error) });
    }
  });

  app.get("/api/blog-posts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }

      const blogPost = await storage.getBlogPostById(id);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post", error: String(error) });
    }
  });

  app.get("/api/blog-posts/category/:category", async (req: Request, res: Response) => {
    try {
      const category = req.params.category;
      const blogPosts = await storage.getBlogPostsByCategory(category);
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts by category", error: String(error) });
    }
  });

  app.get("/api/blog-posts/featured/:limit?", async (req: Request, res: Response) => {
    try {
      const limitStr = req.params.limit;
      const limit = limitStr ? parseInt(limitStr) : undefined;
      
      if (limitStr && isNaN(limit!)) {
        return res.status(400).json({ message: "Invalid limit value" });
      }

      const blogPosts = await storage.getFeaturedBlogPosts(limit);
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured blog posts", error: String(error) });
    }
  });

  app.post("/api/blog-posts", async (req: Request, res: Response) => {
    try {
      const blogPostData = insertBlogPostSchema.parse(req.body);
      const blogPost = await storage.createBlogPost(blogPostData);
      res.status(201).json(blogPost);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: "Validation error", errors: validationError.details });
      }
      res.status(500).json({ message: "Failed to create blog post", error: String(error) });
    }
  });

  app.put("/api/blog-posts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }

      const blogPostData = insertBlogPostSchema.partial().parse(req.body);
      const updatedBlogPost = await storage.updateBlogPost(id, blogPostData);
      
      if (!updatedBlogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.json(updatedBlogPost);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: "Validation error", errors: validationError.details });
      }
      res.status(500).json({ message: "Failed to update blog post", error: String(error) });
    }
  });

  app.delete("/api/blog-posts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid blog post ID" });
      }

      const success = await storage.deleteBlogPost(id);
      if (!success) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post", error: String(error) });
    }
  });

  // Contact form submission route
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const submissionData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(submissionData);
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: "Validation error", errors: validationError.details });
      }
      res.status(500).json({ message: "Failed to process contact submission", error: String(error) });
    }
  });

  app.get("/api/contact", async (req: Request, res: Response) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submissions", error: String(error) });
    }
  });

  app.get("/api/contact/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid submission ID" });
      }

      const submission = await storage.getContactSubmissionById(id);
      if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
      }

      res.json(submission);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact submission", error: String(error) });
    }
  });

  app.patch("/api/contact/:id/read", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid submission ID" });
      }

      const updatedSubmission = await storage.markContactSubmissionAsRead(id);
      if (!updatedSubmission) {
        return res.status(404).json({ message: "Submission not found" });
      }
      
      res.json(updatedSubmission);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark submission as read", error: String(error) });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
