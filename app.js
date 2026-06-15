// ==================== MENU (caricato dal server) ====================
let menu = { ristorante: {}, bar: {} };

// ==================== VARIABILI GLOBALI ====================
const ROOMS = [
  { id: 1, name: 'Messapi' },
  { id: 2, name: 'Greci' },
  { id: 3, name: 'Bizantini' },
  { id: 4, name: 'Camera delle rose' },
  { id: 5, name: 'Romani' },
  { id: 6, name: 'Borboni' },
  { id: 7, name: 'Camera padronale' },
  { id: 8, name: 'Pesco' },
  { id: 9, name: 'Mimosa' },
  { id: 10, name: 'Ulivo' },
  { id: 11, name: 'Melograno' },
  { id: 12, name: "Fico d'india" }
];

function getRoomName(id) {
  const room = ROOMS.find(r => r.id === id);
  return room ? room.name : `Stanza ${id}`;
}

function renderRoomButtons() {
  const container = document.getElementById('roomGrid');
  if (!container) return;
  let html = '';
  ROOMS.forEach(r => {
    html += `<button class="room-demo-btn" onclick="setRoom(${r.id})">${r.name}</button>`;
  });
  container.innerHTML = html;
}

let currentRole = null;
let currentRoom = null;
let currentMenuType = "ristorante";
let cart = [];
let pendingStaffRole = null;

// ==================== UTILITY ====================
function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function saveData() {
    if (currentRoom) {
        localStorage.setItem(`cart_${currentRoom}`, JSON.stringify(cart));
    }
}

function loadCart() {
    if (currentRoom) {
        const saved = localStorage.getItem(`cart_${currentRoom}`);
        if (saved) cart = JSON.parse(saved);
        else cart = [];
    }
    updateCartIcon();
}

function updateCartIcon() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartIcon = document.getElementById('cartIcon');
    const cartCountElem = document.getElementById('cartCount');
    if (cartIcon) cartIcon.style.display = count > 0 ? 'inline-block' : 'none';
    if (cartCountElem) cartCountElem.textContent = count;
}

// ==================== GESTIONE RUOLI E SCHERMATE ====================
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.add('active');
}

function setRole(role) {
    currentRole = role;
    document.getElementById('cartIcon').style.display = 'none';
    if (role === 'guest') {
        showScreen('guestScreen');
        renderMenu();
    }
}

function setRoom(num) {
    currentRoom = num;
    document.getElementById('roomBadge').textContent = `${getRoomName(num)}`;
    document.querySelector('.room-number').textContent = `${getRoomName(num)}`;
    loadCart();
    setRole('guest');
}

function showPasswordModal(role) {
    pendingStaffRole = role;
    document.getElementById('passwordModal').style.display = 'flex';
    document.getElementById('staffPassword').value = '';
    document.getElementById('staffPassword').focus();
}

function closePasswordModal() {
    document.getElementById('passwordModal').style.display = 'none';
    pendingStaffRole = null;
}

function checkPassword() {
    const pw = document.getElementById('staffPassword').value;
    if (pendingStaffRole === 'bar' && pw === 'bar') {
        closePasswordModal();
        currentRole = 'bar';
        showScreen('barScreen');
        renderBarDashboard();
        startPolling();
    } else if (pendingStaffRole === 'kitchen' && pw === 'cucina') {
        closePasswordModal();
        currentRole = 'kitchen';
        showScreen('kitchenScreen');
        renderKitchenDashboard();
        startPolling();
    } else if (pendingStaffRole === 'reception' && pw === 'reception') {
        closePasswordModal();
        currentRole = 'reception';
        showScreen('receptionScreen');
        renderReceptionDashboard();
        startPolling();
    } else {
        showToast('Password errata');
    }
}

function logout() {
    currentRole = null;
    stopPolling();
    showScreen('roleScreen');
}

// ==================== MENU ====================
function showMenu(type, btn) {
    currentMenuType = type;
    document.querySelectorAll('.menu-type-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderMenu();
}

function renderMenu() {
    const container = document.getElementById('menuContainer');
    if (!container) return;

    const menuData = menu[currentMenuType];
    if (!menuData) return;

    const isOpen = isOpenNow(currentMenuType);
    const openStatus = isOpen
        ? '<span style="display:inline-block;background:#4CAF50;color:white;padding:4px 14px;border-radius:20px;font-size:0.8rem;font-weight:bold;margin-bottom:12px;">\u25CF Aperto</span>'
        : '<span style="display:inline-block;background:#D95A2B;color:white;padding:4px 14px;border-radius:20px;font-size:0.8rem;font-weight:bold;margin-bottom:12px;">\u25CF Chiuso</span>';

    let html = openStatus;
    html += '<input type="text" id="searchMenu" class="search-input" placeholder="\uD83D\uDD0D Cerca nel menu...">';

    for (const [category, items] of Object.entries(menuData)) {
        html += `<div class="category"><h3>${category}</h3>`;
        items.forEach(item => {
            const safeDesc = item.desc ? item.desc.replace(/'/g, "\\'") : '';
            html += `
                <div class="product-card" data-name="${item.name.toLowerCase()}">
                    <div class="product-info">
                        <h4>${item.img} ${item.name}</h4>
                        <p>${item.desc || ''}</p>
                        <span class="product-price">\u20AC${item.price}</span>
                    </div>
                    <button class="add-btn" onclick="addToCart('${item.name.replace(/'/g, "\\'")}')">+</button>
                </div>
            `;
        });
        html += `</div>`;
    }
    container.innerHTML = html;

    const searchInput = document.getElementById('searchMenu');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.product-card').forEach(card => {
                const name = card.dataset.name;
                card.style.display = name.includes(term) ? 'flex' : 'none';
            });
        });
    }
}

function findMenuItem(name) {
    for (const menuType of ['ristorante', 'bar']) {
        for (const category of Object.values(menu[menuType])) {
            const found = category.find(item => item.name === name);
            if (found) return found;
        }
    }
    return null;
}

function addToCart(name) {
    const item = findMenuItem(name);
    if (!item) return;

    const existing = cart.find(i => i.name === item.name);
    if (existing) existing.qty++;
    else cart.push({ ...item, qty: 1 });
    saveData();
    updateCartIcon();
    showToast(`\u2795 ${item.name} aggiunto al carrello`);
    if (navigator.vibrate) navigator.vibrate(50);
}

// ==================== CARRELLO ====================
function showCart() {
    showScreen('cartScreen');
    renderCart();
}

function backToMenu() {
    showScreen('guestScreen');
}

function renderCart() {
    const container = document.getElementById('cartItems');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;margin-top:40px;">Carrello vuoto</p>';
        document.getElementById('cartTotal').textContent = '0';
        document.getElementById('orderTimeSelector').style.display = 'none';
        return;
    }

    let total = 0;
    let html = '';
    cart.forEach((item, idx) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <strong>${item.img} ${item.name}</strong><br>
                    <small>\u20AC${item.price} x ${item.qty} = \u20AC${itemTotal.toFixed(2)}</small>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${idx}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${idx}, 1)">+</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    document.getElementById('cartTotal').textContent = total.toFixed(2);

    const hasFood = cart.some(i => i.type === 'cibo');
    const timeSelect = document.getElementById('orderTimeSelector');
    const select = document.getElementById('orderTime');

    if (timeSelect && select) {
        timeSelect.style.display = 'block';
        if (hasFood) {
            select.innerHTML = `
                <option value="12:30">Pranzo 12:30</option>
                <option value="13:00">Pranzo 13:00</option>
                <option value="13:30">Pranzo 13:30</option>
                <option value="14:00">Pranzo 14:00</option>
                <option value="19:30">Cena 19:30</option>
                <option value="20:00">Cena 20:00</option>
                <option value="20:30">Cena 20:30</option>
                <option value="21:00">Cena 21:00</option>
                <option value="21:30">Cena 21:30</option>
            `;
        } else {
            select.innerHTML = `<option value="Orario libero">Orario libero (bar)</option>`;
        }
    }
}

function updateQty(idx, delta) {
    const newQty = cart[idx].qty + delta;
    if (newQty <= 0) cart.splice(idx, 1);
    else cart[idx].qty = newQty;
    saveData();
    updateCartIcon();
    renderCart();
}

// ==================== API ====================
async function apiGet(url) {
    const res = await fetch(url);
    return res.json();
}

async function apiPost(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

async function apiPut(url, data) {
    const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

// ==================== ORDINI ====================
let orders = [];

async function refreshOrders() {
    try {
        const data = await apiGet('/api/orders');
        if (Array.isArray(data)) orders = data;
    } catch (e) {
        console.error('Errore caricamento ordini:', e);
    }
}

function isTimeInRange(timeStr, startStr, endStr) {
    const now = timeStr.split(':').map(Number);
    const start = startStr.split(':').map(Number);
    const end = endStr.split(':').map(Number);
    const nowMin = now[0] * 60 + now[1];
    const startMin = start[0] * 60 + start[1];
    const endMin = end[0] * 60 + end[1];
    return nowMin >= startMin && nowMin <= endMin;
}

function isOpenNow(type) {
    if (!menu.config || !menu.config.openingHours || !menu.config.openingHours[type]) return true;
    const slots = menu.config.openingHours[type];
    if (!slots || slots.length === 0) return true;
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    return slots.some(slot => isTimeInRange(timeStr, slot.start, slot.end));
}

async function submitOrder() {
    if (cart.length === 0) {
        showToast('Carrello vuoto');
        return;
    }
    if (!currentRoom) {
        showToast('Seleziona una stanza');
        return;
    }

    const hasFood = cart.some(i => i.type === 'cibo');
    const hasDrinks = cart.some(i => i.type === 'bevanda');

    if (hasFood && !isOpenNow('ristorante')) {
        showToast('Il ristorante è chiuso in questo momento');
        return;
    }
    if (hasDrinks && !isOpenNow('bar')) {
        showToast('Il bar è chiuso in questo momento');
        return;
    }

    const orderTime = document.getElementById('orderTime').value || 'Orario libero';

    const order = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 3),
        room: currentRoom,
        items: JSON.parse(JSON.stringify(cart)),
        time: orderTime,
        status: {
            cibo: hasFood ? 'pending' : null,
            bevanda: hasDrinks ? 'pending' : null
        },
        timestamp: new Date().toISOString(),
        delivered: false,
        paid: false
    };

    await apiPost('/api/orders', order);
    orders.push(order);
    cart = [];
    saveData();
    updateCartIcon();
    showScreen('guestScreen');
    renderMenu();
    showToast(`\u2705 Ordine #${order.id.toUpperCase()} inviato!`);

    if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
}

// ==================== STORICO OSPITE ====================
function showHistory() {
    showScreen('historyScreen');
    const container = document.getElementById('historyList');
    if (!container) return;

    const roomOrders = orders.filter(o => o.room === currentRoom && o.delivered);
    if (roomOrders.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;margin-top:40px;">Nessun ordine precedente</p>';
        return;
    }

    let html = '';
    roomOrders.reverse().forEach(order => {
        const itemsList = order.items.map(i => `${i.img} ${i.name} x${i.qty}`).join(', ');
        const date = new Date(order.timestamp);
        html += `
            <div class="history-item">
                <strong>#${order.id.toUpperCase()}</strong> - ${getRoomName(order.room)}<br>
                <small>${date.toLocaleDateString('it-IT')} ${date.toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'})}</small><br>
                ${itemsList}<br>
                <small>Totale: \u20AC${order.items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}</small>
            </div>
        `;
    });
    container.innerHTML = html;
}

function backToGuest() {
    showScreen('guestScreen');
}

function backToRoles() {
    cart = [];
    currentRoom = null;
    currentRole = null;
    localStorage.removeItem('currentRoom');
    document.getElementById('cartIcon').style.display = 'none';
    showScreen('roleScreen');
}

// ==================== STAFF DASHBOARD ====================
function renderBarDashboard() {
    const container = document.getElementById('barOrdersList');
    if (!container) return;

    const activeOrders = orders.filter(o => !o.delivered && o.status.bevanda !== null && o.status.bevanda !== 'delivered');
    renderStaffOrders(container, activeOrders, 'bar');
}

function renderKitchenDashboard() {
    const container = document.getElementById('kitchenOrdersList');
    if (!container) return;

    const activeOrders = orders.filter(o => !o.delivered && o.status.cibo !== null && o.status.cibo !== 'delivered');
    renderStaffOrders(container, activeOrders, 'kitchen');
}

function renderStaffOrders(container, activeOrders, staffRole) {
    if (activeOrders.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;margin-top:40px;">Nessun ordine attivo</p>';
        return;
    }

    let html = '';
    activeOrders.reverse().forEach(order => {
        const date = new Date(order.timestamp);
        const isKitchen = staffRole === 'kitchen';

        const relevantItems = order.items.filter(i => isKitchen ? i.type === 'cibo' : i.type === 'bevanda');
        const otherItems = order.items.filter(i => isKitchen ? i.type === 'bevanda' : i.type === 'cibo');

        const statusKey = isKitchen ? 'cibo' : 'bevanda';
        const currentStatus = order.status[statusKey];
        const isReady = currentStatus === 'ready';

        let statusHtml = '';
        if (currentStatus === 'pending') {
            statusHtml = `<span class="status-badge status-${statusKey}-pending">In attesa</span>`;
        } else if (currentStatus === 'ready') {
            statusHtml = `<span class="status-badge status-${statusKey}-ready">Pronto</span>`;
        }

        let actionBtn = '';
        if (currentStatus === 'pending') {
            actionBtn = `<button class="staff-btn btn-ready" onclick="markReady('${order.id}', '${statusKey}')">\u2705 Pronto</button>`;
        }

        let deliverBtn = '';
        if (isReady) {
            const allDone = isKitchen
                ? (order.status.bevanda === 'ready' || order.status.bevanda === null || order.status.bevanda === 'delivered')
                : (order.status.cibo === 'ready' || order.status.cibo === null || order.status.cibo === 'delivered');
            if (allDone) {
                deliverBtn = `<button class="staff-btn btn-deliver" onclick="markDelivered('${order.id}')">\uD83D\uDEE5\uFE0F Consegnato</button>`;
            } else {
                deliverBtn = `<button class="staff-btn btn-disabled">Attendi altro reparto</button>`;
            }
        }

        html += `
            <div class="order-card ${isKitchen && isReady ? 'kitchen-ready' : ''}">
                <h4>#${order.id.toUpperCase()} - ${getRoomName(order.room)}</h4>
                <div class="order-meta" style="font-size:0.8rem;color:#666;margin-bottom:8px;">
                    ${date.toLocaleDateString('it-IT')} ${date.toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'})}
                    ${order.time ? `- Orario: ${order.time}` : ''}
                </div>
                <div class="order-items">
                    <strong>${isKitchen ? '\uD83C\uDF7D\uFE0F Cibo' : '\uD83C\uDF7A Bevande'}:</strong><br>
                    ${relevantItems.map(i => `${i.img} ${i.name} x${i.qty} - \u20AC${(i.price * i.qty).toFixed(2)}`).join('<br>')}
                    ${otherItems.length > 0 ? `<br><small style="color:#999;">Altro reparto: ${otherItems.map(i => `${i.name} x${i.qty}`).join(', ')}</small>` : ''}
                </div>
                <div class="order-status">${statusHtml}</div>
                <div>${actionBtn} ${deliverBtn}</div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function markReady(orderId, statusKey) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status[statusKey] = 'ready';
        apiPut(`/api/orders/${orderId}`, { status: order.status });
        if (currentRole === 'bar') renderBarDashboard();
        if (currentRole === 'kitchen') renderKitchenDashboard();
        showToast(`\u2705 Ordine #${orderId.toUpperCase()} pronto`);
    }
}

function markDelivered(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.delivered = true;
        order.status.cibo = order.status.cibo === 'ready' ? 'delivered' : order.status.cibo;
        order.status.bevanda = order.status.bevanda === 'ready' ? 'delivered' : order.status.bevanda;
        apiPut(`/api/orders/${orderId}`, { delivered: true, status: order.status });
        if (currentRole === 'bar') renderBarDashboard();
        if (currentRole === 'kitchen') renderKitchenDashboard();
        showToast(`\uD83D\uDEE5\uFE0F Ordine #${orderId.toUpperCase()} consegnato`);
    }
}

// ==================== RECEPTION ====================
function renderReceptionDashboard() {
    const container = document.getElementById('receptionOrdersList');
    if (!container) return;

    const unpaidOrders = orders.filter(o => o.delivered && !o.paid);
    if (unpaidOrders.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;margin-top:40px;">Nessun ordine da pagare</p>';
        document.getElementById('totalDaIncassare').textContent = '0.00';
        return;
    }

    const roomTotals = {};
    unpaidOrders.forEach(order => {
        if (!roomTotals[order.room]) roomTotals[order.room] = [];
        roomTotals[order.room].push(order);
    });

    let grandTotal = 0;
    let html = '';

    Object.keys(roomTotals).sort((a, b) => a - b).forEach(room => {
        const roomOrders = roomTotals[room];
        let roomTotal = 0;
        let roomHtml = '';

        roomOrders.forEach(order => {
            const orderTotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
            roomTotal += orderTotal;
            const date = new Date(order.timestamp);
            roomHtml += `
                <div style="padding:8px;margin:4px 0;background:#F9F7F2;border-radius:8px;font-size:0.85rem;">
                    <div style="display:flex;justify-content:space-between;">
                        <span><strong>#${order.id.toUpperCase()}</strong></span>
                        <span>${date.toLocaleTimeString('it-IT', {hour:'2-digit',minute:'2-digit'})}</span>
                    </div>
                    ${order.items.map(i => `<div style="display:flex;justify-content:space-between;padding:2px 0;">
                        <span>${i.img} ${i.name} x${i.qty}</span>
                        <span>\u20AC${(i.price * i.qty).toFixed(2)}</span>
                    </div>`).join('')}
                    <div style="text-align:right;font-weight:bold;border-top:1px solid #ddd;margin-top:4px;padding-top:4px;">
                        Ordine: \u20AC${orderTotal.toFixed(2)}
                    </div>
                </div>
            `;
        });

        grandTotal += roomTotal;
        html += `
            <div class="order-card" style="border-left-color:#2E5A3B;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <h4>&#127968; ${getRoomName(parseInt(room))}</h4>
                    <h3 style="color:#D95A2B;">\u20AC${roomTotal.toFixed(2)}</h3>
                </div>
                ${roomHtml}
                <button class="submit-order-btn" style="background:#D95A2B;margin-top:10px;font-size:0.9rem;padding:10px;" onclick="markRoomAsPaid(${room})">
                    &#128179; Segna come pagato (${getRoomName(room)})
                </button>
            </div>
        `;
    });

    container.innerHTML = html;
    document.getElementById('totalDaIncassare').textContent = grandTotal.toFixed(2);
}

function markRoomAsPaid(room) {
    const roomOrders = orders.filter(o => o.room === room && o.delivered && !o.paid);
    if (roomOrders.length === 0) return;

    roomOrders.forEach(order => {
        order.paid = true;
        apiPut(`/api/orders/${order.id}`, { paid: true });
    });

    renderReceptionDashboard();
    showToast(`\u2705 ${getRoomName(room)} pagata (\u20AC${roomOrders.reduce((s,o) => s + o.items.reduce((s2,i) => s2 + i.price * i.qty, 0), 0).toFixed(2)})`);
}

function showReceptionHistory() {
    showScreen('receptionHistoryScreen');
    const container = document.getElementById('receptionHistoryList');
    if (!container) return;

    const paidOrders = orders.filter(o => o.paid);
    if (paidOrders.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;margin-top:40px;">Nessun ordine pagato</p>';
        return;
    }

    const roomGroups = {};
    paidOrders.forEach(order => {
        if (!roomGroups[order.room]) roomGroups[order.room] = [];
        roomGroups[order.room].push(order);
    });

    let grandTotal = 0;
    let html = '';

    Object.keys(roomGroups).sort((a, b) => a - b).forEach(room => {
        const roomOrders = roomGroups[room];
        let roomTotal = 0;

        roomOrders.forEach(order => {
            roomTotal += order.items.reduce((s, i) => s + i.price * i.qty, 0);
        });

        grandTotal += roomTotal;

        html += `
            <div class="history-item">
                <strong>&#127968; ${getRoomName(parseInt(room))}</strong>
                <span style="float:right;color:#2E5A3B;font-weight:bold;">\u20AC${roomTotal.toFixed(2)}</span>
                <br>
                <small style="color:#999;">
                    ${roomOrders.map(o => `#${o.id.toUpperCase()} (${o.items.length} art.)`).join(', ')}
                </small>
            </div>
        `;
    });

    if (grandTotal > 0) {
        html += `
            <div style="background:#2E5A3B;color:white;padding:12px;border-radius:10px;margin-top:15px;text-align:center;font-size:1.2rem;">
                Totale incassato: \u20AC${grandTotal.toFixed(2)}
            </div>
        `;
    }

    container.innerHTML = html;
}

function backToReception() {
    showScreen('receptionScreen');
    renderReceptionDashboard();
}

// ==================== STORICO STAFF ====================
let staffHistoryRole = null;

function showStaffHistory(role) {
    staffHistoryRole = role;
    showScreen('staffHistoryScreen');
    const container = document.getElementById('staffHistoryList');
    if (!container) return;

    const deliveredOrders = orders.filter(o => o.delivered);
    if (deliveredOrders.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;margin-top:40px;">Nessun ordine completato</p>';
        return;
    }

    let html = '';
    deliveredOrders.reverse().forEach(order => {
        const itemsList = order.items.map(i => `${i.img} ${i.name} x${i.qty}`).join(', ');
        const date = new Date(order.timestamp);
        html += `
            <div class="history-item">
                <strong>#${order.id.toUpperCase()}</strong> - ${getRoomName(order.room)}<br>
                <small>${date.toLocaleDateString('it-IT')} ${date.toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'})}</small><br>
                ${itemsList}<br>
                <small>Totale: \u20AC${order.items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}</small>
            </div>
        `;
    });
    container.innerHTML = html;
}

function backToStaff() {
    if (staffHistoryRole === 'bar') {
        showScreen('barScreen');
        renderBarDashboard();
    } else if (staffHistoryRole === 'kitchen') {
        showScreen('kitchenScreen');
        renderKitchenDashboard();
    }
}

// ==================== POLLING (aggiornamento automatico) ====================
let pollInterval = null;

async function pollOrders() {
    await refreshOrders();
    if (currentRole === 'bar') renderBarDashboard();
    if (currentRole === 'kitchen') renderKitchenDashboard();
    if (currentRole === 'reception') renderReceptionDashboard();
}

function startPolling() {
    stopPolling();
    pollInterval = setInterval(pollOrders, 2000);
}

function stopPolling() {
    if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
    }
}

// ==================== INIZIALIZZAZIONE ====================

async function loadMenuFromServer() {
    try {
        const data = await apiGet('/api/menu');
        if (data && data.ristorante) {
            menu = data;
            return true;
        }
    } catch (e) {}
    return false;
}

function getUrlParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

async function initApp() {
    renderRoomButtons();

    const menuLoaded = await loadMenuFromServer();
    if (!menuLoaded) {
        showToast('Errore caricamento menu');
    }

    await refreshOrders();

    const roomParam = getUrlParam('room');
    if (roomParam) {
        setRoom(parseInt(roomParam));
    } else {
        const savedRoom = localStorage.getItem('currentRoom');
        if (savedRoom) {
            currentRoom = parseInt(savedRoom);
            document.getElementById('roomBadge').textContent = `${getRoomName(currentRoom)}`;
        }
    }
}

const origSetRoom = setRoom;
setRoom = function(num) {
    currentRoom = num;
    localStorage.setItem('currentRoom', num);
    document.getElementById('roomBadge').textContent = `${getRoomName(num)}`;
    document.querySelector('.room-number').textContent = `${getRoomName(num)}`;
    loadCart();
    setRole('guest');
};

initApp();