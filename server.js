const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || process.argv[2] || 3000;
const dir = __dirname;

let orders = [];
const ORDERS_FILE = path.join(dir, 'orders.json');

function loadOrdersFromDisk() {
    try {
        if (fs.existsSync(ORDERS_FILE)) {
            orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
        }
    } catch (e) {
        orders = [];
    }
}

function saveOrdersToDisk() {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf8');
}

loadOrdersFromDisk();

function cleanupOldOrders() {
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    const before = orders.length;
    orders = orders.filter(o => !o.paid || (now - new Date(o.timestamp).getTime() < sevenDays));
    if (orders.length !== before) {
        saveOrdersToDisk();
        console.log(`Pulizia: rimossi ${before - orders.length} ordini pagati datati`);
    }
}

cleanupOldOrders();
setInterval(cleanupOldOrders, 3600000); // ogni ora

// ==================== MENU ====================
const MENU_FILE = path.join(dir, 'menu.json');
const ADMIN_PASSWORD = 'admin';
const ADMIN_TOKENS = new Set();

function loadMenuFromDisk() {
    try {
        if (fs.existsSync(MENU_FILE)) {
            return JSON.parse(fs.readFileSync(MENU_FILE, 'utf8'));
        }
    } catch (e) {}
    return null;
}

function saveMenuToDisk(menuData) {
    fs.writeFileSync(MENU_FILE, JSON.stringify(menuData, null, 2), 'utf8');
}

function cleanExpiredTokens() {
    const now = Date.now();
    for (const token of ADMIN_TOKENS) {
        try {
            const ts = parseInt(token.split(':')[1]);
            if (now - ts > 86400000) ADMIN_TOKENS.delete(token);
        } catch {}
    }
}

const mime = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

function parseBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try { resolve(JSON.parse(body)); }
            catch { resolve({}); }
        });
    });
}

function sendJSON(res, data, status = 200) {
    res.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

http.createServer(async (req, res) => {
    const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = urlObj.pathname;
    const method = req.method;

    // CORS preflight
    if (method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end();
        return;
    }

    // API: GET /api/orders
    if (pathname === '/api/orders' && method === 'GET') {
        sendJSON(res, orders);
        return;
    }

    // API: POST /api/orders
    if (pathname === '/api/orders' && method === 'POST') {
        const data = await parseBody(req);
        orders.push(data);
        saveOrdersToDisk();
        sendJSON(res, { success: true, order: data }, 201);
        return;
    }

    // API: PUT /api/orders/:id
    const putMatch = pathname.match(/^\/api\/orders\/(.+)$/);
    if (putMatch && method === 'PUT') {
        const orderId = putMatch[1];
        const updates = await parseBody(req);
        const idx = orders.findIndex(o => o.id === orderId);
        if (idx !== -1) {
            orders[idx] = { ...orders[idx], ...updates };
            saveOrdersToDisk();
            sendJSON(res, { success: true, order: orders[idx] });
        } else {
            sendJSON(res, { error: 'Ordine non trovato' }, 404);
        }
        return;
    }

    // API: DELETE /api/orders (reset)
    if (pathname === '/api/orders' && method === 'DELETE') {
        orders = [];
        saveOrdersToDisk();
        sendJSON(res, { success: true });
        return;
    }

    // API: GET /api/status
    if (pathname === '/api/status' && method === 'GET') {
        sendJSON(res, { online: true, ordersCount: orders.length });
        return;
    }

    // ==================== MENU API ====================

    // API: GET /api/menu
    if (pathname === '/api/menu' && method === 'GET') {
        const menu = loadMenuFromDisk();
        if (menu) sendJSON(res, menu);
        else sendJSON(res, { error: 'Menu non trovato' }, 500);
        return;
    }

    // API: POST /api/menu/login
    if (pathname === '/api/menu/login' && method === 'POST') {
        const data = await parseBody(req);
        if (data.password === ADMIN_PASSWORD) {
            const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
            ADMIN_TOKENS.add(token);
            cleanExpiredTokens();
            sendJSON(res, { success: true, token });
        } else {
            sendJSON(res, { error: 'Password errata' }, 401);
        }
        return;
    }

    // API: PUT /api/menu
    if (pathname === '/api/menu' && method === 'PUT') {
        const authHeader = req.headers['authorization'] || '';
        const token = authHeader.replace('Bearer ', '');
        if (!ADMIN_TOKENS.has(token)) {
            sendJSON(res, { error: 'Non autorizzato' }, 401);
            return;
        }
        const data = await parseBody(req);
        if (data && data.menu) {
            saveMenuToDisk(data.menu);
            sendJSON(res, { success: true });
        } else {
            sendJSON(res, { error: 'Dati menu mancanti' }, 400);
        }
        return;
    }

    // Servi file statici
    let servePath = pathname === '/' ? '/index.html' : pathname;
    const fullPath = path.join(dir, servePath);
    const ext = path.extname(fullPath);

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            if (pathname.startsWith('/api/')) {
                sendJSON(res, { error: 'Not found' }, 404);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>404 - File non trovato</h1>');
            }
            return;
        }
        res.writeHead(200, {
            'Content-Type': mime[ext] || 'application/octet-stream',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(data);
    });
}).listen(port, '0.0.0.0', () => {
    console.log(`Server avviato sulla porta ${port}`);
});
