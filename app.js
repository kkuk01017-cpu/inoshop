// ==========================================
// iNO Shop - ระบบจัดการข้อมูล
// ==========================================

// ข้อมูลแอดมิน
const ADMIN_CREDENTIALS = {
    username: 'iNOSHOP',
    password: 'Piano08102556'
};

// ข้อมูลเริ่มต้น
let products = JSON.parse(localStorage.getItem('ino_products')) || [
    { id: 1, name: 'สินค้าตัวอย่าง 1', category: 'gaming', priceMin: 29, priceMax: 199, image: '🔥', sales: 128, status: 'active', desc: 'รองรับทุกระบบ พร้อมส่งทันที' },
    { id: 2, name: 'สินค้าตัวอย่าง 2', category: 'account', priceMin: 50, priceMax: 499, image: '💎', sales: 0, status: 'active', desc: 'คุณภาพสูง ปลอดภัย' },
    { id: 3, name: 'สินค้าตัวอย่าง 3', category: 'item', priceMin: 35, priceMax: 250, image: '⚡', sales: 89, status: 'active', desc: 'ใช้งานง่าย รองรับตลอดอายุการใช้งาน' },
    { id: 4, name: 'สินค้าตัวอย่าง 4', category: 'gaming', priceMin: 10, priceMax: 150, image: '🏆', sales: 0, status: 'hot', desc: 'สินค้าคุณภาพ การันตี' }
];

let categories = JSON.parse(localStorage.getItem('ino_categories')) || [
    { id: 'all', name: 'ทั้งหมด', icon: '📦', count: products.length },
    { id: 'gaming', name: 'สินค้าเกม', icon: '🎮', count: products.filter(p => p.category === 'gaming').length },
    { id: 'account', name: 'บัญชี', icon: '👤', count: products.filter(p => p.category === 'account').length },
    { id: 'item', name: 'ไอเทม', icon: '🎁', count: products.filter(p => p.category === 'item').length }
];

// บันทึกข้อมูล
function saveData() {
    localStorage.setItem('ino_products', JSON.stringify(products));
    localStorage.setItem('ino_categories', JSON.stringify(categories));
}

// ตรวจสอบการเข้าสู่ระบบ
function isLoggedIn() {
    return localStorage.getItem('ino_admin_logged_in') === 'true';
}

// เข้าสู่ระบบ
function login(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('ino_admin_logged_in', 'true');
        return true;
    }
    return false;
}

// ออกจากระบบ
function logout() {
    localStorage.removeItem('ino_admin_logged_in');
}

// เพิ่มสินค้า
function addProduct(product) {
    product.id = Date.now();
    product.sales = 0;
    products.unshift(product);
    updateCategoryCounts();
    saveData();
}

// แก้ไขสินค้า
function updateProduct(id, updated) {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updated };
        saveData();
    }
}

// ลบสินค้า
function deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    updateCategoryCounts();
    saveData();
}

// อัพเดทจำนวนในหมวดหมู่
function updateCategoryCounts() {
    categories = categories.map(cat => ({
        ...cat,
        count: cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length
    }));
}
