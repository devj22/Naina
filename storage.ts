import { 
  type User, 
  type InsertUser, 
  type Property, 
  type InsertProperty,
  type BlogPost,
  type InsertBlogPost,
  type ContactSubmission,
  type InsertContactSubmission
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property management
  getAllProperties(): Promise<Property[]>;
  getPropertyById(id: number): Promise<Property | undefined>;
  getPropertiesByType(type: string): Promise<Property[]>;
  getFeaturedProperties(limit?: number): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  // Blog management
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostsByCategory(category: string): Promise<BlogPost[]>;
  getFeaturedBlogPosts(limit?: number): Promise<BlogPost[]>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: number): Promise<boolean>;
  
  // Contact form submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmissionById(id: number): Promise<ContactSubmission | undefined>;
  markContactSubmissionAsRead(id: number): Promise<ContactSubmission | undefined>;
}

// In-memory implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private blogPosts: Map<number, BlogPost>;
  private contactSubmissions: Map<number, ContactSubmission>;
  
  private userCurrentId: number;
  private propertyCurrentId: number;
  private blogPostCurrentId: number;
  private contactSubmissionCurrentId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.blogPosts = new Map();
    this.contactSubmissions = new Map();
    
    this.userCurrentId = 1;
    this.propertyCurrentId = 1;
    this.blogPostCurrentId = 1;
    this.contactSubmissionCurrentId = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Property methods
  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }
  
  async getPropertyById(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }
  
  async getPropertiesByType(type: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.propertyType === type
    );
  }
  
  async getFeaturedProperties(limit: number = 6): Promise<Property[]> {
    return Array.from(this.properties.values())
      .filter(property => property.isFeatured)
      .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
      .slice(0, limit);
  }
  
  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.propertyCurrentId++;
    const createdAt = new Date();
    const property: Property = { ...insertProperty, id, createdAt };
    this.properties.set(id, property);
    return property;
  }
  
  async updateProperty(id: number, propertyUpdate: Partial<InsertProperty>): Promise<Property | undefined> {
    const property = this.properties.get(id);
    if (!property) return undefined;
    
    const updatedProperty = { ...property, ...propertyUpdate };
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }
  
  async deleteProperty(id: number): Promise<boolean> {
    return this.properties.delete(id);
  }
  
  // Blog post methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }
  
  async getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).filter(
      (post) => post.category === category
    );
  }
  
  async getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.isFeatured)
      .sort((a, b) => Number(b.publishedDate) - Number(a.publishedDate))
      .slice(0, limit);
  }
  
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostCurrentId++;
    const publishedDate = new Date();
    const blogPost: BlogPost = { ...insertBlogPost, id, publishedDate };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  
  async updateBlogPost(id: number, blogPostUpdate: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const blogPost = this.blogPosts.get(id);
    if (!blogPost) return undefined;
    
    const updatedBlogPost = { ...blogPost, ...blogPostUpdate };
    this.blogPosts.set(id, updatedBlogPost);
    return updatedBlogPost;
  }
  
  async deleteBlogPost(id: number): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
  
  // Contact submission methods
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactSubmissionCurrentId++;
    const submittedAt = new Date();
    const isRead = false;
    const submission: ContactSubmission = { ...insertSubmission, id, submittedAt, isRead };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }
  
  async getContactSubmissionById(id: number): Promise<ContactSubmission | undefined> {
    return this.contactSubmissions.get(id);
  }
  
  async markContactSubmissionAsRead(id: number): Promise<ContactSubmission | undefined> {
    const submission = this.contactSubmissions.get(id);
    if (!submission) return undefined;
    
    const updatedSubmission = { ...submission, isRead: true };
    this.contactSubmissions.set(id, updatedSubmission);
    return updatedSubmission;
  }
  
  // Initialize sample data for development
  private initializeSampleData() {
    // Sample properties - only land plots since we only sell land
    const properties: InsertProperty[] = [
      {
        title: "Premium Agricultural Land in Fertile Valley",
        description: "Fertile agricultural land with rich soil quality, ideal for organic farming. Located in a serene valley with year-round water supply from a nearby river. Excellent opportunity for agricultural entrepreneurs and farming enthusiasts. The land has been tested for soil quality and has a pH value ideal for multiple crop varieties.",
        price: 2500000,
        priceUnit: "₹",
        priceSuffix: "/acre",
        area: 5,
        areaUnit: "acres",
        bedrooms: null,
        bathrooms: null,
        location: "Nashik, Maharashtra",
        address: "Wagholi Village, Nashik",
        city: "Nashik",
        state: "Maharashtra",
        zipCode: "422003",
        latitude: "19.9975",
        longitude: "73.7898",
        propertyType: "land",
        listingStatus: "for_sale",
        featuredImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        isFeatured: true,
        amenities: ["Natural Water Source", "Rich Soil", "Road Access", "Electricity Connection", "Flat Terrain", "Clear Title"]
      },
      {
        title: "Commercial Plot Near Highway Junction",
        description: "Strategic commercial land plot located at a prime highway junction with excellent visibility and high traffic flow. Perfect for retail establishments, showrooms, or commercial complexes. The plot has all commercial zone approvals and permits in place. Excellent frontage and corner location makes this a prime investment opportunity.",
        price: 12000000,
        priceUnit: "₹",
        priceSuffix: "",
        area: 10000,
        areaUnit: "sq.ft",
        bedrooms: null,
        bathrooms: null,
        location: "Gurgaon, Haryana",
        address: "Sector 83, NH-8 Junction",
        city: "Gurgaon",
        state: "Haryana",
        zipCode: "122004",
        latitude: "28.4595",
        longitude: "77.0266",
        propertyType: "land",
        listingStatus: "for_sale",
        featuredImage: "https://images.unsplash.com/photo-1622015663084-307d19eabca2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        isFeatured: true,
        amenities: ["Highway Frontage", "Commercial Zoning", "All Utilities", "Corner Plot", "High Visibility", "Development Potential"]
      },
      {
        title: "Premium Residential Plot in Gated Community",
        description: "Ready-to-build plot in an upscale gated community with all amenities and excellent appreciation potential. The plot is located in a secure community with landscaped gardens, walking paths, and recreational facilities. All utilities are in place, and the plot is ready for immediate construction.",
        price: 48000,
        priceUnit: "₹",
        priceSuffix: "/sq.yd",
        area: 300,
        areaUnit: "sq.yd",
        bedrooms: null,
        bathrooms: null,
        location: "Greater Noida, Delhi NCR",
        address: "Sector 123, Greater Noida",
        city: "Greater Noida",
        state: "Uttar Pradesh",
        zipCode: "201310",
        latitude: "28.4744",
        longitude: "77.5040",
        propertyType: "land",
        listingStatus: "for_sale",
        featuredImage: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        isFeatured: true,
        amenities: ["Gated Community", "24/7 Security", "Parks", "Club House", "Water Supply", "Electricity"]
      },
      {
        title: "Large Agricultural Land with Water Reservoir",
        description: "Expansive agricultural land with private water reservoir, suitable for large-scale farming operations. This fertile land has been well-maintained and includes a large natural water reservoir ensuring year-round irrigation. Ideal for cash crops, horticulture, or setting up modern farming facilities.",
        price: 35000000,
        priceUnit: "₹",
        priceSuffix: "",
        area: 15,
        areaUnit: "acres",
        bedrooms: null,
        bathrooms: null,
        location: "Pune Rural, Maharashtra",
        address: "Khed Taluka, Pune District",
        city: "Pune",
        state: "Maharashtra",
        zipCode: "410501",
        latitude: "18.8266",
        longitude: "73.8777",
        propertyType: "land",
        listingStatus: "for_sale",
        featuredImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        isFeatured: false,
        amenities: ["Water Reservoir", "Farm Road Access", "Electricity Connection", "Fenced Boundary", "Irrigation System", "Farm Equipment Shed"]
      },
      {
        title: "Industrial Land Plot Near Port",
        description: "Industrial zoned land plot strategically located near the port with excellent logistics connectivity. Ideal for warehousing, manufacturing, or logistics operations. The land has all required industrial zone clearances and is ready for immediate development. Easy access to highways and railway freight terminals.",
        price: 55000000,
        priceUnit: "₹",
        priceSuffix: "",
        area: 2,
        areaUnit: "acres",
        bedrooms: null,
        bathrooms: null,
        location: "JNPT Area, Navi Mumbai",
        address: "MIDC Industrial Area, Uran",
        city: "Navi Mumbai",
        state: "Maharashtra",
        zipCode: "400702",
        latitude: "18.9633",
        longitude: "72.9615",
        propertyType: "land",
        listingStatus: "for_sale",
        featuredImage: "https://images.unsplash.com/photo-1574102289244-833681901db9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
        isFeatured: false,
        amenities: ["Industrial Zoning", "Port Proximity", "Highway Access", "Power Substation", "Water Connection", "Security Surveillance"]
      }
    ];
    
    // Sample blog posts
    const blogPosts: InsertBlogPost[] = [
      {
        title: "5 Real Estate Investment Trends to Watch in 2023",
        content: `<p>The real estate market is constantly evolving, and staying ahead of emerging trends is essential for investors looking to maximize returns. In this article, we explore five significant trends that are shaping the real estate landscape in 2023.</p>

        <h2>1. Sustainable and Green Buildings</h2>
        <p>Sustainability is no longer just a buzzword but a driving force in real estate investment. Properties with green certifications like LEED or GRIHA are commanding premium prices and experiencing faster appreciation. Investors are increasingly focusing on buildings with energy-efficient systems, renewable energy sources, and sustainable materials.</p>
        <p>Key considerations for green investments include:</p>
        <ul>
          <li>Solar panel installations</li>
          <li>Energy-efficient HVAC systems</li>
          <li>Water conservation features</li>
          <li>Sustainable building materials</li>
        </ul>
        
        <h2>2. Technology-Integrated Properties</h2>
        <p>Smart homes and buildings with integrated technology infrastructure are seeing unprecedented demand. Properties equipped with IoT devices, home automation, high-speed internet, and enhanced security systems are attracting premium buyers and tenants.</p>
        
        <h2>3. Suburban and Tier 2 City Growth</h2>
        <p>The work-from-home trend continues to influence housing preferences, with many buyers looking beyond metropolitan centers to suburbs and tier 2 cities. These areas offer larger homes at more affordable prices, better quality of life, and less congestion while maintaining connectivity to major cities.</p>
        
        <h2>4. Build-to-Rent Developments</h2>
        <p>Purpose-built rental communities are emerging as a significant investment opportunity. These developments are designed specifically for long-term renting with amenities and features tailored to the rental market. Institutional investors are increasingly entering this space to capitalize on steady rental income and growing demand.</p>
        
        <h2>5. Data-Driven Investment Strategies</h2>
        <p>Advanced analytics and AI-powered tools are transforming how investors identify opportunities and make decisions. Data-driven approaches allow for more precise valuation, better risk assessment, and identification of emerging market trends before they become mainstream.</p>
        
        <h2>Conclusion</h2>
        <p>Successful real estate investing in 2023 requires staying informed about these emerging trends and adapting strategies accordingly. By focusing on sustainability, technology integration, geographic diversification, rental developments, and data-driven approaches, investors can position themselves for strong returns in the evolving market landscape.</p>`,
        summary: "Discover the emerging trends shaping the real estate market and how investors can capitalize on these opportunities for maximum returns.",
        authorName: "Rajiv Sharma",
        category: "Investment",
        featuredImage: "https://images.unsplash.com/photo-1560520031-5deaa57a1f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
        isFeatured: true
      },
      {
        title: "Tax Benefits of Real Estate Investment in India",
        content: `<p>Real estate has long been recognized as one of the most tax-efficient investment options in India. This comprehensive guide outlines the various tax advantages available to property investors and how you can optimize your real estate investments for maximum tax efficiency.</p>

        <h2>Income Tax Deductions on Home Loans</h2>
        <p>One of the most significant tax benefits comes from home loan interest and principal repayment deductions:</p>
        <ul>
          <li><strong>Section 24:</strong> Interest paid on housing loans is deductible up to ₹2 lakh per year for self-occupied property. For rented properties, the entire interest amount is deductible.</li>
          <li><strong>Section 80C:</strong> Principal repayment on home loans qualifies for deduction under Section 80C, with an overall limit of ₹1.5 lakh per year (combined with other eligible investments).</li>
        </ul>
        
        <h2>Capital Gains Tax Benefits</h2>
        <p>When selling a property, you can avail of significant tax benefits on the capital gains:</p>
        <ul>
          <li><strong>Section 54:</strong> Long-term capital gains from the sale of a residential property can be exempt from tax if invested in another residential property within the specified time frame.</li>
          <li><strong>Section 54EC:</strong> Capital gains can be exempt up to ₹50 lakh if invested in specified bonds within six months of the property sale.</li>
          <li><strong>Section 54F:</strong> If you sell any asset other than a residential house and invest the proceeds in a residential property, you may claim exemption from long-term capital gains tax.</li>
        </ul>
        
        <h2>Rental Income Optimization</h2>
        <p>For properties generating rental income, several deductions can help minimize tax liability:</p>
        <ul>
          <li><strong>Standard Deduction:</strong> A standard deduction of 30% from the annual rental value is allowed for maintenance and repairs.</li>
          <li><strong>Municipal Taxes:</strong> Property taxes paid to local authorities are fully deductible from rental income.</li>
          <li><strong>Interest on Borrowed Capital:</strong> There is no upper limit on the deduction for interest paid on loans taken for rented properties.</li>
        </ul>
        
        <h2>Joint Ownership Benefits</h2>
        <p>Purchasing property jointly with family members can multiply tax benefits as each co-owner can claim deductions independently within the specified limits.</p>
        
        <h2>Conclusion</h2>
        <p>Real estate investment offers numerous tax advantages that can significantly enhance your overall returns. By strategically structuring your investments and leveraging the various tax provisions, you can build wealth while minimizing your tax burden. Always consult with a tax professional to ensure you're optimizing your specific situation within the current tax framework.</p>`,
        summary: "A comprehensive guide to understanding the tax advantages of investing in real estate properties and how to maximize your tax savings.",
        authorName: "Priya Iyer",
        category: "Finance",
        featuredImage: "https://images.unsplash.com/photo-1581650127213-e72e2271af3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
        isFeatured: true
      },
      {
        title: "Beginner's Guide to Commercial Real Estate Investment",
        content: `<p>Commercial real estate can offer attractive returns and portfolio diversification, but it requires a different approach than residential investments. This guide outlines the fundamentals for beginners looking to enter the commercial property market.</p>

        <h2>Understanding Commercial Real Estate Categories</h2>
        <p>Commercial real estate encompasses several distinct categories, each with unique characteristics:</p>
        <ul>
          <li><strong>Office Spaces:</strong> From single-tenant buildings to large office complexes</li>
          <li><strong>Retail Properties:</strong> Including shopping centers, standalone stores, and mixed-use developments</li>
          <li><strong>Industrial Properties:</strong> Warehouses, manufacturing facilities, and distribution centers</li>
          <li><strong>Hospitality:</strong> Hotels, resorts, and service apartments</li>
          <li><strong>Multi-family Residential:</strong> Apartment complexes with multiple rental units</li>
        </ul>
        
        <h2>Evaluating Commercial Properties</h2>
        <p>Commercial properties are typically valued differently than residential real estate. Key metrics include:</p>
        <ul>
          <li><strong>Capitalization Rate (Cap Rate):</strong> The ratio of net operating income to property value</li>
          <li><strong>Net Operating Income (NOI):</strong> Gross income minus operating expenses</li>
          <li><strong>Cash on Cash Return:</strong> Annual cash flow divided by the total cash invested</li>
          <li><strong>Internal Rate of Return (IRR):</strong> The annualized return on investment over the entire holding period</li>
        </ul>
        
        <h2>Financing Commercial Investments</h2>
        <p>Commercial property financing differs significantly from residential mortgages:</p>
        <ul>
          <li>Higher down payments (typically 25-35%)</li>
          <li>Shorter loan terms (5-20 years)</li>
          <li>Different qualification criteria focused on property performance</li>
          <li>Various lending options including traditional banks, private lenders, and SBA loans</li>
        </ul>
        
        <h2>Understanding Lease Structures</h2>
        <p>Commercial leases are more complex than residential leases and include various formats:</p>
        <ul>
          <li><strong>Triple Net (NNN) Lease:</strong> Tenant pays all expenses including taxes, insurance, and maintenance</li>
          <li><strong>Modified Gross Lease:</strong> Some expenses shared between landlord and tenant</li>
          <li><strong>Full-Service Lease:</strong> Landlord covers most operating expenses</li>
        </ul>
        
        <h2>Risk Assessment and Mitigation</h2>
        <p>Commercial investments carry different risks than residential properties:</p>
        <ul>
          <li>Longer vacancy periods between tenants</li>
          <li>Higher costs for renovations and maintenance</li>
          <li>Greater exposure to economic cycles</li>
          <li>More complex property management requirements</li>
        </ul>
        
        <h2>Starting Small: Entry Strategies</h2>
        <p>For beginners, consider these entry strategies:</p>
        <ul>
          <li>Small retail or office spaces in established areas</li>
          <li>Mixed-use properties with both residential and commercial components</li>
          <li>Real Estate Investment Trusts (REITs) for passive exposure</li>
          <li>Partnerships or syndications to pool resources with other investors</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Commercial real estate can provide significant returns and portfolio diversification, but requires careful research, financial analysis, and risk management. Start with smaller investments, build your knowledge base, and consider working with experienced professionals as you develop your commercial real estate portfolio.</p>`,
        summary: "Learn the fundamentals of commercial property investment, including risk assessment, financing options, and key factors to consider before investing.",
        authorName: "Vikram Mehta",
        category: "Commercial",
        featuredImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
        isFeatured: true
      }
    ];
    
    // Add sample data to storage
    properties.forEach(property => {
      this.createProperty(property);
    });
    
    blogPosts.forEach(post => {
      this.createBlogPost(post);
    });
  }
}

export const storage = new MemStorage();
