// Cấu hình URL backend của bạn
export const API_BASE_URL = 'http://localhost:4000/api';

// --- CẤU HÌNH CHẾ ĐỘ MOCK ---
// Đặt bằng true để dùng dữ liệu giả, false để gọi Backend thật
const USE_MOCK_DATA = true; 

// --- MOCK DATA (Dữ liệu giả) ---
const MOCK_USER = {
  id: 1,
  username: "admin",
  email: "admin@example.com",
  role: "ADMIN",
  avatar: "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
};

const MOCK_PRODUCTS = [
  { id: 1, name: "Echo Dot (4th Gen)", category: "Electronics", importPrice: 35.00, price: 59.99, stock: 145, rating: 4.5, sku: "ED-001", description: "Smart speaker with Alexa." },
  { id: 2, name: "Kindle Paperwhite", category: "Tablets", importPrice: 90.00, price: 139.99, stock: 42, rating: 5.0, sku: "KP-002", description: "Waterproof e-reader." },
  { id: 3, name: "Men's Cotton T-Shirt", category: "Apparel", importPrice: 8.50, price: 19.99, stock: 0, rating: 4.0, sku: "TS-003", description: "100% Cotton, breathable." },
  { id: 4, name: "Chef Knife Set", category: "Home & Kitchen", importPrice: 45.00, price: 89.50, stock: 12, rating: 4.8, sku: "KN-004", description: "Professional grade knives." },
  { id: 5, name: "Gaming Monitor 27\"", category: "Computers", importPrice: 180.00, price: 249.00, stock: 8, rating: 4.2, sku: "GM-005", description: "144Hz Refresh Rate." },
];

const MOCK_CUSTOMERS = [
  { id: 1, name: "Alice Johnson", email: "alice.j@example.com", phone: "+1 555-0101", location: "New York, USA", spent: 1240.50, orders_count: 24, customer_code: "CUS-001" },
  { id: 2, name: "Michael Smith", email: "m.smith@test.co", phone: "+1 555-0102", location: "London, UK", spent: 125.00, orders_count: 5, customer_code: "CUS-002" },
  { id: 3, name: "Tran Van A", email: "vana.tran@vn.com", phone: "+84 909-123-456", location: "Hanoi, Vietnam", spent: 3450.00, orders_count: 52, customer_code: "CUS-003" },
];

const MOCK_ORDERS = [
  { id: 1, order_code: "ORD-7782", customer_name: "Alice Johnson", date: "2023-10-24", total: 125.00, payment_status: "Paid", order_status: "Delivered", product_summary: "Echo Dot (x2), HDMI Cable" },
  { id: 2, order_code: "ORD-7783", customer_name: "Michael Smith", date: "2023-10-24", total: 340.50, payment_status: "Pending", order_status: "Processing", product_summary: "Gaming Monitor 27\"" },
  { id: 3, order_code: "ORD-7784", customer_name: "Tran Van A", date: "2023-10-23", total: 59.99, payment_status: "Failed", order_status: "Cancelled", product_summary: "Echo Dot (4th Gen)" },
];


// --- HÀM GỌI API CHÍNH ---
export const apiFetch = async (endpoint, options = {}) => {
  
  // 1. NẾU BẬT CHẾ ĐỘ MOCK -> Trả về dữ liệu giả ngay lập tức
  if (USE_MOCK_DATA) {
    console.log(`[MOCK API] Calling: ${endpoint}`, options);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (endpoint === '/auth/login' && options.method === 'POST') {
            const body = JSON.parse(options.body);
            // Bypass login check in mock mode or simulate simple check
            if(body.username && body.password) {
                 resolve({
                    token: "mock-jwt-token-123456",
                    user: { ...MOCK_USER, username: body.username }
                  });
            } else {
                 reject(new Error("Mock Login Failed: Missing credentials"));
            }
            return;
        }
        if (endpoint === '/products') {
            if(options.method === 'POST') {
                const newProduct = JSON.parse(options.body);
                MOCK_PRODUCTS.push({...newProduct, id: Date.now()});
                resolve(newProduct);
            } else if (options.method === 'PUT') {
                resolve(JSON.parse(options.body));
            } else {
                resolve(MOCK_PRODUCTS);
            }
            return;
        }
        if (endpoint === '/customers') { resolve(MOCK_CUSTOMERS); return; }
        if (endpoint === '/orders') { resolve(MOCK_ORDERS); return; }
        
        // Mặc định trả về lỗi nếu endpoint không khớp trong Mock
        reject(new Error(`Mock API: Endpoint ${endpoint} not configured`));
      }, 500); // Giả lập delay 0.5s
    });
  }

  // 2. NẾU TẮT MOCK -> Gọi Backend thật (Code cũ của bạn)
  const token = localStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || data.detail || 'Lỗi kết nối API');
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};