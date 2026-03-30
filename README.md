# Field to Fork - Farmer to Consumer Marketplace

A modern, premium, mobile-first web application connecting farmers directly with consumers for fresh produce, homemade food, and farm products.

## 🌟 Features

### Customer Features
- **Multi-Authentication**: Phone, Email, Google, Facebook login
- **Product Discovery**: Browse by categories, search with filters
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout**: Multiple payment methods (COD, bKash, Nagad, Card)
- **Order Tracking**: Real-time tracking with live map
- **Address Management**: Save multiple delivery addresses
- **Wishlist**: Save favorite products
- **Reviews & Ratings**: Rate products and sellers
- **Wallet System**: Digital wallet with balance
- **Loyalty Points**: Earn points on purchases
- **Referral Program**: Share and earn

### Farmer Features
- **Farm Profile**: Showcase farm details, photos, location
- **Product Management**: Upload products with images, videos, pricing
- **Order Management**: Accept/reject orders, update status
- **Analytics Dashboard**: Sales, revenue, top products
- **Wallet & Withdrawals**: Manage earnings
- **Customer Communication**: Chat with customers
- **Inventory Management**: Track stock levels
- **Organic Certification**: Upload certificates

### Housewife/Home Chef Features
- **Kitchen Profile**: Show kitchen photos and details
- **Menu Management**: Daily/weekly menu uploads
- **Food Categories**: Lunch, dinner, snacks, bakery, etc.
- **Order Management**: Accept orders, update preparation status
- **Availability Schedule**: Set working hours
- **Earnings Dashboard**: Track income
- **Customer Reviews**: View and respond to feedback

### Delivery Rider Features
- **Live Location Sharing**: Real-time GPS tracking
- **Order Acceptance**: Choose delivery requests
- **Navigation**: Map integration for routes
- **OTP Verification**: Secure delivery confirmation
- **Earnings Tracking**: Daily/weekly income
- **Performance Rating**: Customer ratings

### Admin Features
- **User Management**: Approve farmers, housewives, riders
- **Order Oversight**: Monitor all orders
- **Product Approval**: Verify product listings
- **Banner Management**: Update promotional content
- **Coupon System**: Create and manage discounts
- **Analytics Dashboard**: Comprehensive business insights
- **Notification Broadcast**: Push, SMS, WhatsApp messages
- **Dispute Resolution**: Handle customer complaints
- **Fraud Detection**: Monitor suspicious activities

## 🎨 Design Philosophy

- **Color Palette**: Green + White + Soft Orange
- **UI Style**: Modern, Premium, Trustworthy, Clean
- **Layout**: Rounded cards, large product images
- **Navigation**: Sticky bottom navigation on mobile
- **Animations**: Smooth transitions with Framer Motion
- **Responsive**: Optimized for mobile and desktop

## 🚀 Technology Stack

### Frontend
- **React 18**: UI framework
- **React Router**: Client-side routing
- **Tailwind CSS v4**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **React Hot Toast**: Notification system

### Backend (Suggested)
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Supabase**: Database and authentication
- **PostgreSQL**: Relational database
- **Socket.io**: Real-time communication

### Maps & Location
- **Google Maps API**: Geolocation and mapping
- **OpenStreetMap**: Alternative mapping solution
- **Mapbox**: Advanced mapping features

### Payments
- **SSLCommerz**: Bangladesh payment gateway
- **Stripe**: International payments
- **bKash API**: Mobile financial service
- **Nagad API**: Mobile financial service

## 📱 User Interface

### Home Screen
- Hero banner with promotions
- Category grid (10+ categories)
- Featured products carousel
- Search with filters
- Product grid with images and details

### Product Card
- High-quality product image
- Name and description
- Price per unit
- Seller information
- Rating and reviews
- Distance from location
- Organic badge
- Add to cart button

### Cart Drawer
- Slide-in cart panel
- Item list with images
- Quantity controls
- Remove items
- Total calculation
- Checkout button

### Checkout Modal
- Address selection
- Delivery time options
- Payment method selection
- Order summary
- Confirmation button

### Order Tracking
- Live map view
- Rider location
- Estimated arrival time
- Order timeline
- Contact options

### Dashboards
- **Customer**: Profile, orders, wallet, loyalty
- **Farmer**: Sales, orders, inventory, analytics
- **Housewife**: Menu, orders, earnings
- **Admin**: Users, products, analytics, settings

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📂 Project Structure

```
src/
├── App.tsx              # Main application component
├── index.css            # Global styles
├── main.tsx            # Application entry point
└── utils/
    └── cn.ts           # Utility functions

public/
└── images/             # Static assets

dist/
└── index.html          # Production build
```

## 🎯 Key Components

1. **Header**: Fixed top navigation with cart icon
2. **BottomNav**: Mobile-friendly bottom navigation
3. **HeroBanner**: Promotional banner with animations
4. **CategoryGrid**: Horizontal scrolling category list
5. **ProductCard**: Product display with all details
6. **CartDrawer**: Slide-in cart management
7. **CheckoutModal**: Bottom sheet checkout flow
8. **OrderTracking**: Real-time order tracking interface
9. **FarmerDashboard**: Farmer management panel
10. **HousewifeDashboard**: Home chef management panel
11. **AdminDashboard**: Admin control panel

## 🔐 Authentication Flow

1. User selects role (Customer/Farmer/Housewife)
2. Login via phone/email/social media
3. Role-based dashboard access
4. Profile completion required for sellers

## 💳 Payment Flow

1. Select items in cart
2. Choose delivery address
3. Select delivery time
4. Choose payment method
5. Confirm order
6. Real-time order tracking
7. Payment confirmation
8. Delivery completion

## 📊 Analytics Features

### Farmer Analytics
- Total sales
- Monthly revenue
- Top selling products
- Customer demographics
- Order fulfillment rate

### Admin Analytics
- Platform revenue
- User growth
- Order volume
- Category performance
- Geographic distribution

## 🔔 Notification System

- **Push Notifications**: Order updates, promotions
- **SMS Notifications**: Critical updates
- **WhatsApp Notifications**: Order confirmations
- **Email Notifications**: Receipts, invoices

## 🌍 Multi-Language Support

- Bengali (Primary)
- English (Secondary)
- Language toggle in settings

## 🎨 Customization

### Color Scheme
- Primary: Green (#16a34a)
- Secondary: Orange (#f97316)
- Background: Gray (#f9fafb)
- Text: Dark Gray (#1f2937)

### Typography
- Font: Inter
- Sizes: Responsive scale
- Weights: 300-800

## 📈 Future Enhancements

- AI product recommendations
- Voice search
- AR product preview
- Blockchain traceability
- Smart contracts
- IoT integration
- Predictive analytics
- Automated inventory

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - feel free to use for personal and commercial projects.

## 📞 Support

For questions or issues, please contact support@fieldtofork.com

---

**Built with ❤️ for farmers and consumers**
