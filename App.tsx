import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster, toast } from 'react-hot-toast'
import { 
  ShoppingCart, Home, User, Search, Heart, Phone, 
  MapPin, Clock, Star, Truck, Leaf, ChefHat, 
  Package, CreditCard, MessageCircle, Bell, 
  Settings, LogOut, Menu, X, ChevronLeft, 
  Plus, Minus, Trash2, Filter, Calendar,
  Tag, BarChart3, Users, FileText
} from 'lucide-react'

// Types
interface Product {
  id: number
  name: string
  category: string
  price: number
  unit: string
  image: string
  seller: string
  sellerType: 'farmer' | 'housewife'
  rating: number
  reviews: number
  isOrganic: boolean
  distance: number
  available: number
  harvestDate?: string
  cookingTime?: string
  ingredients?: string[]
  allergens?: string[]
}

interface CartItem extends Product {
  quantity: number
}

interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'on_way' | 'delivered' | 'cancelled'
  tracking: {
    riderName?: string
    riderLocation?: { lat: number, lng: number }
    estimatedTime?: string
    timeline: { status: string; time: string }[]
  }
  deliveryAddress: string
  paymentMethod: string
  createdAt: string
}

interface User {
  id: string
  name: string
  phone: string
  email: string
  role: 'customer' | 'farmer' | 'housewife' | 'rider' | 'admin'
  avatar?: string
  walletBalance: number
  loyaltyPoints: number
  addresses: Address[]
}

interface Address {
  id: string
  label: string
  full: string
  lat: number
  lng: number
  isDefault: boolean
}

// Mock Data
const mockProducts: Product[] = [
  { id: 1, name: 'Fresh Tomato', category: 'vegetables', price: 40, unit: 'kg', image: '🍅', seller: 'Rahim Farm', sellerType: 'farmer', rating: 4.8, reviews: 120, isOrganic: true, distance: 2.5, available: 50, harvestDate: '2024-01-15' },
  { id: 2, name: 'Organic Spinach', category: 'vegetables', price: 25, unit: 'bunch', image: '🥬', seller: 'Green Valley', sellerType: 'farmer', rating: 4.9, reviews: 85, isOrganic: true, distance: 1.8, available: 30, harvestDate: '2024-01-15' },
  { id: 3, name: 'Fresh Mango', category: 'fruits', price: 120, unit: 'kg', image: '🥭', seller: 'Mango Paradise', sellerType: 'farmer', rating: 4.7, reviews: 200, isOrganic: false, distance: 5.2, available: 100 },
  { id: 4, name: 'Farm Fresh Eggs', category: 'eggs', price: 180, unit: 'dozen', image: '🥚', seller: 'Happy Chickens', sellerType: 'farmer', rating: 4.6, reviews: 150, isOrganic: true, distance: 3.0, available: 40 },
  { id: 5, name: 'Pure Honey', category: 'honey', price: 350, unit: '500g', image: '🍯', seller: 'Bee Sweet', sellerType: 'farmer', rating: 4.9, reviews: 95, isOrganic: true, distance: 4.5, available: 25 },
  { id: 6, name: 'Fresh Fish', category: 'fish', price: 280, unit: 'kg', image: '🐟', seller: 'River Fresh', sellerType: 'farmer', rating: 4.5, reviews: 180, isOrganic: false, distance: 6.0, available: 20 },
  { id: 7, name: 'Homemade Biryani', category: 'homemade', price: 150, unit: 'plate', image: '🍛', seller: 'Rina Kitchen', sellerType: 'housewife', rating: 4.8, reviews: 320, isOrganic: false, distance: 1.2, available: 15, cookingTime: '30 min', ingredients: ['Rice', 'Chicken', 'Spices'], allergens: ['None'] },
  { id: 8, name: 'Traditional Pitha', category: 'homemade', price: 80, unit: 'piece', image: '🥞', seller: 'Mama\'s Kitchen', sellerType: 'housewife', rating: 4.9, reviews: 250, isOrganic: true, distance: 0.8, available: 30, cookingTime: '45 min', ingredients: ['Rice flour', 'Jaggery', 'Coconut'], allergens: ['Gluten'] },
  { id: 9, name: 'Fresh Milk', category: 'dairy', price: 70, unit: 'liter', image: '🥛', seller: 'Dairy Farm', sellerType: 'farmer', rating: 4.7, reviews: 110, isOrganic: true, distance: 2.0, available: 60 },
  { id: 10, name: 'Organic Rice', category: 'grains', price: 90, unit: 'kg', image: '🌾', seller: 'Golden Fields', sellerType: 'farmer', rating: 4.6, reviews: 140, isOrganic: true, distance: 3.5, available: 200 },
  { id: 11, name: 'Chicken Curry', category: 'homemade', price: 180, unit: 'plate', image: '🍲', seller: 'Sneha\'s Kitchen', sellerType: 'housewife', rating: 4.8, reviews: 280, isOrganic: false, distance: 1.5, available: 20, cookingTime: '40 min', ingredients: ['Chicken', 'Potato', 'Spices'], allergens: ['None'] },
  { id: 12, name: 'Fresh Meat', category: 'meat', price: 450, unit: 'kg', image: '🥩', seller: 'Quality Meat', sellerType: 'farmer', rating: 4.5, reviews: 160, isOrganic: false, distance: 4.0, available: 35 },
]

const categories = [
  { id: 'vegetables', name: 'শাকসবজি', icon: '🥬', color: 'bg-green-100' },
  { id: 'fruits', name: 'ফল', icon: '🍎', color: 'bg-red-100' },
  { id: 'fish', name: 'মাছ', icon: '🐟', color: 'bg-blue-100' },
  { id: 'meat', name: 'মাংস', icon: '🥩', color: 'bg-red-200' },
  { id: 'eggs', name: 'ডিম', icon: '🥚', color: 'bg-yellow-100' },
  { id: 'dairy', name: 'দুধ', icon: '🥛', color: 'bg-blue-50' },
  { id: 'honey', name: 'মধু', icon: '🍯', color: 'bg-amber-100' },
  { id: 'grains', name: 'চাল-ডাল', icon: '🌾', color: 'bg-orange-100' },
  { id: 'homemade', name: 'ঘরোয়া খাবার', icon: '🍛', color: 'bg-purple-100' },
  { id: 'bakery', name: 'বেকरी', icon: '🧁', color: 'bg-pink-100' },
]

// Components
function Header({ cartCount, onCartClick, onMenuClick }: { cartCount: number; onCartClick: () => void; onMenuClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={onMenuClick} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">ক্ষেত থেকে</h1>
              <p className="text-xs text-gray-500">সরাসরি আপনার ঘরে</p>
            </div>
          </div>
          
          <button onClick={onCartClick} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

function BottomNav({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
  const tabs = [
    { id: 'home', icon: Home, label: 'হোম' },
    { id: 'search', icon: Search, label: 'খুঁজুন' },
    { id: 'orders', icon: Package, label: 'অর্ডার' },
    { id: 'profile', icon: User, label: 'প্রোফাইল' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                  isActive ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

function HeroBanner() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative h-64 bg-gradient-to-r from-green-500 to-green-700 rounded-2xl overflow-hidden mx-4 mt-16 mb-6"
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 p-6 text-white h-full flex flex-col justify-center">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-2"
        >
          তাজা সবজি ও ফল
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg mb-4"
        >
          কৃষকদের সরাসরি তাজা পণ্য
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold self-start"
        >
          এখনই কিনুন
        </motion.button>
      </div>
      <Leaf className="absolute -bottom-4 -right-4 w-32 h-32 text-white/20" />
    </motion.div>
  )
}

function CategoryGrid({ selectedCategory, onSelectCategory }: { selectedCategory: string; onSelectCategory: (id: string) => void }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 px-4 mb-3">ক্যাটাগরি</h3>
      <div className="flex overflow-x-auto px-4 space-x-3 pb-2 scrollbar-hide">
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex-shrink-0 px-4 py-3 rounded-xl text-center transition-all ${
            selectedCategory === 'all' 
              ? 'bg-green-600 text-white shadow-lg scale-105' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div className="text-2xl mb-1">🛒</div>
          <div className="text-xs font-medium">সব</div>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex-shrink-0 px-4 py-3 rounded-xl text-center transition-all ${
              selectedCategory === cat.id 
                ? 'bg-green-600 text-white shadow-lg scale-105' 
                : `${cat.color} text-gray-700 hover:opacity-80`
            }`}
          >
            <div className="text-2xl mb-1">{cat.icon}</div>
            <div className="text-xs font-medium">{cat.name}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function ProductCard({ product, onAddToCart, onToggleWishlist }: { product: Product; onAddToCart: (product: Product) => void; onToggleWishlist: (product: Product) => void }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    onToggleWishlist(product)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="relative">
        <div className="h-40 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-6xl">
          {product.image}
        </div>
        {product.isOrganic && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            অর্গানিক
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); handleWishlist(); }}
          className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {product.distance} km
        </div>
      </div>
      
      <div className="p-4">
        <h4 className="font-bold text-gray-800 mb-1 line-clamp-1">{product.name}</h4>
        <div className="flex items-center mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium ml-1">{product.rating}</span>
          <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-green-600">৳{product.price}</span>
            <span className="text-sm text-gray-500 ml-1">/ {product.unit}</span>
          </div>
          {product.sellerType === 'farmer' ? (
            <Leaf className="w-4 h-4 text-green-500" />
          ) : (
            <ChefHat className="w-4 h-4 text-purple-500" />
          )}
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <User className="w-3 h-3 mr-1" />
          <span className="truncate">{product.seller}</span>
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-1" />
          কার্টে যোগ করুন
        </button>
      </div>
    </motion.div>
  )
}

function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }: { 
  isOpen: boolean; 
  onClose: () => void; 
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-bold">আপনার কার্ট</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingCart className="w-16 h-16 mb-4 opacity-30" />
                  <p>কার্ট খালি</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex items-center space-x-4 bg-gray-50 p-3 rounded-xl"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center text-3xl">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-green-600 font-bold">৳{item.price} / {item.unit}</p>
                        <div className="flex items-center space-x-3 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center hover:border-green-500"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="border-t p-4 space-y-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>মোট</span>
                  <span className="text-green-600">৳{total}</span>
                </div>
                <button
                  onClick={onCheckout}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
                >
                  চেকআউট করুন
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function CheckoutModal({ isOpen, onClose, total, onConfirm }: { isOpen: boolean; onClose: () => void; total: number; onConfirm: () => void }) {
  const [selectedAddress, setSelectedAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [deliveryTime, setDeliveryTime] = useState('asap')

  const addresses = [
    { id: '1', label: 'বাড়ি', full: '123, মিরপুর, ঢাকা' },
    { id: '2', label: 'অফিস', full: '456, গুলশান, ঢাকা' },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">চেকআউট</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div>
                <h3 className="font-bold mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  ডেলিভারি এড্রেস
                </h3>
                <div className="space-y-2">
                  {addresses.map((addr) => (
                    <button
                      key={addr.id}
                      onClick={() => setSelectedAddress(addr.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        selectedAddress === addr.id 
                          ? 'border-green-600 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-semibold">{addr.label}</div>
                      <div className="text-sm text-gray-600">{addr.full}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-green-600" />
                  ডেলিভারি সময়
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDeliveryTime('asap')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      deliveryTime === 'asap' 
                        ? 'border-green-600 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="font-semibold">সম্ভাব্য দ্রুত</div>
                    <div className="text-sm text-gray-600">৩০-৪৫ মিনিট</div>
                  </button>
                  <button
                    onClick={() => setDeliveryTime('scheduled')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      deliveryTime === 'scheduled' 
                        ? 'border-green-600 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="font-semibold">নির্দিষ্ট সময়</div>
                    <div className="text-sm text-gray-600">স্লট বেছে নিন</div>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                  পেমেন্ট পদ্ধতি
                </h3>
                <div className="space-y-2">
                  {[
                    { id: 'cod', name: 'ক্যাশ অন ডেলিভারি', icon: '💵' },
                    { id: 'bkash', name: 'bKash', icon: '💳' },
                    { id: 'nagad', name: 'Nagad', icon: '🟢' },
                    { id: 'card', name: 'কার্ড পেমেন্ট', icon: '💳' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center ${
                        paymentMethod === method.id 
                          ? 'border-green-600 bg-green-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      <span className="text-2xl mr-3">{method.icon}</span>
                      <span className="font-semibold">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>মোট</span>
                  <span className="text-green-600">৳{total}</span>
                </div>
                <button
                  onClick={onConfirm}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors"
                >
                  অর্ডার কনফার্ম করুন
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function OrderTracking({ order, onClose }: { order: Order; onClose: () => void }) {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500',
      confirmed: 'bg-blue-500',
      preparing: 'bg-purple-500',
      on_way: 'bg-green-500',
      delivered: 'bg-green-700',
      cancelled: 'bg-red-500',
    }
    return colors[status] || 'bg-gray-500'
  }

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: 'অর্ডার পেডিং',
      confirmed: 'কনফার্ম হয়েছে',
      preparing: 'প্রস্তুত হচ্ছে',
      on_way: 'রাস্তায় আছে',
      delivered: 'ডেলিভারি সম্পন্ন',
      cancelled: 'রদ করা হয়েছে',
    }
    return texts[status] || status
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden mb-4"
    >
      <div className="relative h-48 bg-gradient-to-r from-green-500 to-green-700">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
          <X className="w-5 h-5 text-white" />
        </button>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-6xl mb-2">🚚</div>
            <div className="text-2xl font-bold">অর্ডার ট্র্যাকিং</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-gray-500">অর্ডার আইডি</div>
            <div className="font-bold">#ORD-{order.id}</div>
          </div>
          <div className={`px-4 py-2 rounded-full text-white font-semibold ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="h-48 bg-gray-200 rounded-xl mb-6 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <MapPin className="w-12 h-12 mb-2" />
            <div>লাইভ ম্যাপ ট্র্যাকিং</div>
          </div>
          {order.status === 'on_way' && order.tracking.riderLocation && (
            <div className="absolute top-4 left-4 bg-white rounded-lg p-3 shadow-lg">
              <div className="text-sm font-semibold">{order.tracking.riderName}</div>
              <div className="text-xs text-gray-500">আগামী {order.tracking.estimatedTime} এ পৌঁছাবে</div>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          <h3 className="font-bold mb-4">অর্ডার আপডেট</h3>
          {order.tracking.timeline.map((event, index) => (
            <div key={index} className="flex items-start">
              <div className="relative">
                <div className="w-4 h-4 bg-green-600 rounded-full mt-1" />
                {index < order.tracking.timeline.length - 1 && (
                  <div className="absolute top-4 left-1.5 w-0.5 h-full bg-gray-300" />
                )}
              </div>
              <div className="ml-4 flex-1">
                <div className="font-semibold">{event.status}</div>
                <div className="text-sm text-gray-500">{event.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button className="p-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-colors flex items-center justify-center">
            <Phone className="w-5 h-5 mr-2" />
            কল করুন
          </button>
          <button className="p-3 bg-blue-50 text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            চ্যাট
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function HomePage({ 
  products, 
  onAddToCart,
  onProductClick 
}: { 
  products: Product[]; 
  onAddToCart: (p: Product) => void;
  onProductClick: (p: Product) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="pb-24">
      <HeroBanner />
      
      {/* Search Bar */}
      <div className="px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="পণ্য খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <CategoryGrid selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      {/* Featured Sections */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800">আজকের তাজা পিকস</h3>
          <button className="text-green-600 font-semibold text-sm">সব দেখুন</button>
        </div>
        <div className="flex overflow-x-auto space-x-4 pb-2 scrollbar-hide">
          {products.slice(0, 4).map((product) => (
            <motion.div
              key={product.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onProductClick(product)}
              className="flex-shrink-0 w-36 bg-white rounded-xl overflow-hidden shadow-md cursor-pointer"
            >
              <div className="h-24 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-4xl">
                {product.image}
              </div>
              <div className="p-3">
                <div className="font-semibold text-sm truncate">{product.name}</div>
                <div className="text-green-600 font-bold text-sm">৳{product.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800">জনপ্রিয় পণ্যসমূহ</h3>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button className="text-green-600 font-semibold text-sm">সব দেখুন</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SearchPage({ products, onAddToCart }: { products: Product[]; onAddToCart: (p: Product) => void }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="pt-20 pb-24 px-4">
      <h2 className="text-2xl font-bold mb-4">অন্বেষণ করুন</h2>
      
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="পণ্য, ক্যাটাগরি বা কৃষক খুঁজুন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Popular Searches */}
      <div className="mb-6">
        <h3 className="font-bold mb-3">জনপ্রিয় অনুসন্ধান</h3>
        <div className="flex flex-wrap gap-2">
          {['তাজা সবজি', 'অর্গানিক', 'ঘরোয়া খাবার', 'মাছ', 'ডিম', 'মধু'].map((term) => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-green-100 hover:text-green-700 transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl p-4 shadow-md flex items-center space-x-4"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center text-3xl">
              {product.image}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-800">{product.name}</h4>
              <p className="text-sm text-gray-500">{product.seller}</p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium ml-1">{product.rating}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">৳{product.price}</div>
              <button
                onClick={() => onAddToCart(product)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold text-sm"
              >
                যোগ করুন
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function OrdersPage({ orders, onTrackOrder }: { orders: Order[]; onTrackOrder: (order: Order) => void }) {
  const [activeTab, setActiveTab] = useState('active')

  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled')
  const pastOrders = orders.filter(o => o.status === 'delivered')

  return (
    <div className="pt-20 pb-24 px-4">
      <h2 className="text-2xl font-bold mb-4">আমার অর্ডারসমূহ</h2>

      <div className="flex space-x-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('active')}
          className={`pb-2 font-semibold transition-colors ${
            activeTab === 'active' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'
          }`}
        >
          সক্রিয় ({activeOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`pb-2 font-semibold transition-colors ${
            activeTab === 'past' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'
          }`}
        >
          পুরনো ({pastOrders.length})
        </button>
      </div>

      <div className="space-y-4">
        {(activeTab === 'active' ? activeOrders : pastOrders).map((order) => (
          <motion.div
            key={order.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTrackOrder(order)}
            className="bg-white rounded-xl p-4 shadow-md cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-bold">অর্ডার #{order.id}</div>
                <div className="text-sm text-gray-500">{order.createdAt}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">৳{order.total}</div>
                <div className="text-sm text-gray-500">{order.items.length} পণ্য</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                order.status === 'delivered' ? 'bg-green-600' :
                order.status === 'on_way' ? 'bg-blue-600' :
                order.status === 'cancelled' ? 'bg-red-600' :
                'bg-yellow-600'
              }`}>
                {order.status === 'delivered' ? 'সম্পন্ন' :
                 order.status === 'on_way' ? 'রাস্তায়' :
                 order.status === 'cancelled' ? 'রদ' :
                 'প্রক্রিয়াজাত'}
              </div>
              <Truck className="w-5 h-5 text-gray-400" />
            </div>
          </motion.div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Package className="w-16 h-16 mb-4 opacity-30" />
          <p>কোনো অর্ডার নেই</p>
        </div>
      )}
    </div>
  )
}

function ProfilePage({ user, onLogout }: { user: User; onLogout: () => void }) {
  return (
    <div className="pt-20 pb-24 px-4">
      <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl">
            👤
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-green-100">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-green-600">৳{user.walletBalance}</div>
          <div className="text-sm text-gray-500">ওয়ালেট</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-green-600">{user.loyaltyPoints}</div>
          <div className="text-sm text-gray-500">পয়েন্ট</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center shadow-md">
          <div className="text-2xl font-bold text-green-600">12</div>
          <div className="text-sm text-gray-500">অর্ডার</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {[
          { icon: User, label: 'আমার প্রোফাইল', color: 'text-blue-600' },
          { icon: MapPin, label: 'সেভ করা এড্রেস', color: 'text-green-600' },
          { icon: Heart, label: 'উইশলিস্ট', color: 'text-red-600' },
          { icon: CreditCard, label: 'পেমেন্ট মেথড', color: 'text-purple-600' },
          { icon: Tag, label: 'কুপন ও অফার', color: 'text-orange-600' },
          { icon: Bell, label: 'নোটিফিকেশন', color: 'text-yellow-600' },
          { icon: MessageCircle, label: 'সাপোর্ট', color: 'text-blue-600' },
          { icon: Settings, label: 'সেটিংস', color: 'text-gray-600' },
        ].map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={index}
              className="w-full bg-white rounded-xl p-4 shadow-md flex items-center hover:shadow-lg transition-shadow"
            >
              <Icon className={`w-5 h-5 ${item.color} mr-4`} />
              <span className="flex-1 text-left font-semibold">{item.label}</span>
              <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
            </button>
          )
        })}

        <button
          onClick={onLogout}
          className="w-full bg-white rounded-xl p-4 shadow-md flex items-center hover:shadow-lg transition-shadow"
        >
          <LogOut className="w-5 h-5 text-red-600 mr-4" />
          <span className="flex-1 text-left font-semibold text-red-600">লগআউট</span>
        </button>
      </div>
    </div>
  )
}

function FarmerDashboard() {
  return (
    <div className="pt-20 pb-24 px-4">
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-6 text-white mb-6">
        <h2 className="text-2xl font-bold mb-2">কৃষক ড্যাশবোর্ড</h2>
        <p className="text-green-100">আপনার খামার ব্যবস্থাপনা</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-green-600">৳12,500</div>
          <div className="text-sm text-gray-500">মোট আয়</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-green-600">45</div>
          <div className="text-sm text-gray-500">মোট অর্ডার</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-green-600">12</div>
          <div className="text-sm text-gray-500">সক্রিয় পণ্য</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-green-600">4.8</div>
          <div className="text-sm text-gray-500">রেটিং</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button className="bg-green-50 p-4 rounded-xl text-center hover:bg-green-100 transition-colors">
          <Plus className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-sm font-semibold">নতুন পণ্য</div>
        </button>
        <button className="bg-blue-50 p-4 rounded-xl text-center hover:bg-blue-100 transition-colors">
          <Package className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-sm font-semibold">অর্ডার</div>
        </button>
        <button className="bg-purple-50 p-4 rounded-xl text-center hover:bg-purple-100 transition-colors">
          <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-sm font-semibold">অ্যানালিটিক্স</div>
        </button>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <h3 className="font-bold mb-4">সাম্প্রতিক অর্ডারসমূহ</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold">অর্ডার #{1000 + i}</div>
                <div className="text-sm text-gray-500">৳{500 + i * 100}</div>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                প্রক্রিয়াজাত
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function HousewifeDashboard() {
  return (
    <div className="pt-20 pb-24 px-4">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 text-white mb-6">
        <h2 className="text-2xl font-bold mb-2">হোম শেফ ড্যাশবোর্ড</h2>
        <p className="text-purple-100">আপনার কিচেন ব্যবস্থাপনা</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-purple-600">৳8,500</div>
          <div className="text-sm text-gray-500">মোট আয়</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-purple-600">32</div>
          <div className="text-sm text-gray-500">মোট অর্ডার</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button className="bg-purple-50 p-4 rounded-xl text-center hover:bg-purple-100 transition-colors">
          <ChefHat className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-sm font-semibold">নতুন মেনু</div>
        </button>
        <button className="bg-blue-50 p-4 rounded-xl text-center hover:bg-blue-100 transition-colors">
          <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-sm font-semibold">সময়সূচী</div>
        </button>
        <button className="bg-green-50 p-4 rounded-xl text-center hover:bg-green-100 transition-colors">
          <Package className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-sm font-semibold">অর্ডার</div>
        </button>
      </div>

      {/* Today's Menu */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <h3 className="font-bold mb-4">আজকের মেনু</h3>
        <div className="space-y-3">
          {[
            { name: 'মুরগি বiryani', orders: 8, available: 15 },
            { name: 'মাছ ভর্তা', orders: 5, available: 10 },
            { name: 'শুন্টি পিঠা', orders: 12, available: 20 },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-500">{item.orders} অর্ডার • {item.available} উপলব্ধ</div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AdminDashboard() {
  return (
    <div className="pt-20 pb-24 px-4">
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl p-6 text-white mb-6">
        <h2 className="text-2xl font-bold mb-2">অ্যাডমিন ড্যাশবোর্ড</h2>
        <p className="text-gray-300">সম্পূর্ণ ব্যবস্থাপনা প্যানেল</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-blue-600">1,250</div>
          <div className="text-sm text-gray-500">মোট ইউজার</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-green-600">85</div>
          <div className="text-sm text-gray-500">কৃষক</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-purple-600">42</div>
          <div className="text-sm text-gray-500">হোম শেফ</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-orange-600">28</div>
          <div className="text-sm text-gray-500">রাইডার</div>
        </div>
      </div>

      {/* Revenue */}
      <div className="bg-white rounded-xl p-4 shadow-md mb-6">
        <h3 className="font-bold mb-4">আজকের রিভিনিউ</h3>
        <div className="text-4xl font-bold text-green-600">৳45,250</div>
        <div className="text-sm text-gray-500 mt-2">৳12,500 কমিশন • 156 অর্ডার</div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button className="bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-colors">
          <Users className="w-6 h-6 text-blue-600 mb-2" />
          <div className="font-semibold">ইউজার ম্যানেজমেন্ট</div>
        </button>
        <button className="bg-green-50 p-4 rounded-xl hover:bg-green-100 transition-colors">
          <Package className="w-6 h-6 text-green-600 mb-2" />
          <div className="font-semibold">অর্ডার ম্যানেজমেন্ট</div>
        </button>
        <button className="bg-purple-50 p-4 rounded-xl hover:bg-purple-100 transition-colors">
          <FileText className="w-6 h-6 text-purple-600 mb-2" />
          <div className="font-semibold">অনুমোদন</div>
        </button>
        <button className="bg-orange-50 p-4 rounded-xl hover:bg-orange-100 transition-colors">
          <BarChart3 className="w-6 h-6 text-orange-600 mb-2" />
          <div className="font-semibold">রিপোর্ট</div>
        </button>
      </div>

      {/* Pending Items */}
      <div className="bg-white rounded-xl p-4 shadow-md">
        <h3 className="font-bold mb-4">পেডিং অনুমোদন</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div>
              <div className="font-semibold">নতুন কৃষক রেজিস্ট্রেশন</div>
              <div className="text-sm text-gray-500">৩টি</div>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold">
              দেখুন
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <div className="font-semibold">নতুন পণ্য</div>
              <div className="text-sm text-gray-500">৮টি</div>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold">
              দেখুন
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function RiderDashboard() {
  return (
    <div className="pt-20 pb-24 px-4">
      <div className="bg-gradient-to-r from-orange-500 to-orange-700 rounded-2xl p-6 text-white mb-6">
        <h2 className="text-2xl font-bold mb-2">ডেলিভারি রাইডার ড্যাশবোর্ড</h2>
        <p className="text-orange-100">আপনার ডেলিভারি ও আয়ের সারসংক্ষেপ</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-orange-600">12</div>
          <div className="text-sm text-gray-500">আজকের ডেলিভারি</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-green-600">৳1,850</div>
          <div className="text-sm text-gray-500">আজকের আয়</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-blue-600">4</div>
          <div className="text-sm text-gray-500">চলমান অর্ডার</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-md">
          <div className="text-3xl font-bold text-yellow-500">4.9</div>
          <div className="text-sm text-gray-500">রেটিং</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <button className="bg-orange-50 p-4 rounded-xl text-center hover:bg-orange-100 transition-colors">
          <Truck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <div className="text-sm font-semibold">ডেলিভারি</div>
        </button>
        <button className="bg-blue-50 p-4 rounded-xl text-center hover:bg-blue-100 transition-colors">
          <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-sm font-semibold">লাইভ লোকেশন</div>
        </button>
        <button className="bg-green-50 p-4 rounded-xl text-center hover:bg-green-100 transition-colors">
          <CreditCard className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-sm font-semibold">উত্তোলন</div>
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-md">
        <h3 className="font-bold mb-4">উপলব্ধ ডেলিভারি রিকোয়েস্ট</h3>
        <div className="space-y-3">
          {[
            { id: '#R-1201', pickup: 'রহিম ফার্ম', drop: 'মিরপুর DOHS', amount: 120 },
            { id: '#R-1202', pickup: 'রিনা কিচেন', drop: 'ধানমন্ডি 27', amount: 90 },
            { id: '#R-1203', pickup: 'গোল্ডেন ফিল্ডস', drop: 'উত্তরা সেক্টর 7', amount: 160 },
          ].map((delivery) => (
            <div key={delivery.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{delivery.id}</span>
                <span className="text-orange-600 font-bold">৳{delivery.amount}</span>
              </div>
              <div className="text-sm text-gray-600">পিকআপ: {delivery.pickup}</div>
              <div className="text-sm text-gray-600 mb-3">ড্রপ: {delivery.drop}</div>
              <button className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                ডেলিভারি গ্রহণ করুন
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MainContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [activeTab, setActiveTab] = useState('home')
  const [userRole, setUserRole] = useState<'customer' | 'farmer' | 'housewife' | 'rider' | 'admin'>('customer')

  const user: User = {
    id: '1',
    name: 'রাহিম আহমেদ',
    phone: '01712345678',
    email: 'rahim@example.com',
    role: userRole,
    walletBalance: 500,
    loyaltyPoints: 250,
    addresses: [],
  }

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) }
      }
      return item
    }).filter(item => item.quantity > 0))
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const handleCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  const confirmOrder = () => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cartItems],
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'pending',
      tracking: {
        timeline: [
          { status: 'অর্ডার কনফার্ম হয়েছে', time: '10:30 AM' }
        ]
      },
      deliveryAddress: '123, মিরপুর, ঢাকা',
      paymentMethod: 'COD',
      createdAt: new Date().toLocaleDateString(),
    }
    setOrders([newOrder, ...orders])
    setCartItems([])
    setIsCheckoutOpen(false)
    setActiveTab('orders')
  }

  const handleLogout = () => {
    console.log('Logging out...')
  }

  const handleRoleChange = (role: 'customer' | 'farmer' | 'housewife' | 'rider' | 'admin') => {
    setUserRole(role)
    setActiveTab('home')
    setIsCartOpen(false)
    setIsCheckoutOpen(false)
    setSelectedOrder(null)
    toast.success(`এখন আপনি ${role === 'customer' ? 'কাস্টমার' : role === 'farmer' ? 'কৃষক' : role === 'housewife' ? 'হোম শেফ' : role === 'rider' ? 'রাইডার' : 'অ্যাডমিন'} ভিউতে আছেন`)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage 
            products={mockProducts} 
            onAddToCart={addToCart}
            onProductClick={(p) => console.log('Product clicked:', p)}
          />
        )
      case 'search':
        return (
          <SearchPage 
            products={mockProducts}
            onAddToCart={addToCart}
          />
        )
      case 'orders':
        return (
          <OrdersPage 
            orders={orders}
            onTrackOrder={setSelectedOrder}
          />
        )
      case 'profile':
        return (
          <ProfilePage 
            user={user}
            onLogout={handleLogout}
          />
        )
      default:
        return null
    }
  }

  const renderRoleDashboard = () => {
    switch (userRole) {
      case 'farmer':
        return <FarmerDashboard />
      case 'housewife':
        return <HousewifeDashboard />
      case 'rider':
        return <RiderDashboard />
      case 'admin':
        return <AdminDashboard />
      default:
        return null
    }
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => {}}
      />

      {/* Role Switcher (for demo) */}
      <div className="px-4 py-2 bg-green-100 overflow-x-auto">
        <div className="flex justify-start sm:justify-center gap-2 min-w-max">
          {(['customer', 'farmer', 'housewife', 'rider', 'admin'] as const).map((role) => (
            <button
              key={role}
              onClick={() => handleRoleChange(role)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                userRole === role 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {role === 'customer' ? 'কাস্টমার' :
               role === 'farmer' ? 'কৃষক' :
               role === 'housewife' ? 'হোম শেফ' :
               role === 'rider' ? 'রাইডার' : 'অ্যাডমিন'}
            </button>
          ))}
        </div>
      </div>

      {userRole === 'customer' ? (
        <>
          <MainContentWrapper content={renderContent()} />
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
          <CartDrawer
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
          <CheckoutModal
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
            total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            onConfirm={confirmOrder}
          />
          {selectedOrder && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <OrderTracking order={selectedOrder} onClose={() => setSelectedOrder(null)} />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="pt-16">
          {renderRoleDashboard()}
        </div>
      )}

      <Toaster position="top-center" />
    </div>
  )
}

function MainContentWrapper({ content }: { content: React.ReactNode }) {
  return <>{content}</>
}

export default function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  )
}

// Add global styles
const style = document.createElement('style')
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .pb-safe {
    padding-bottom: env(safe-area-inset-bottom);
  }
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`
document.head.appendChild(style)
