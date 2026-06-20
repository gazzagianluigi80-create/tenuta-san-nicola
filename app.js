// ==================== MENU (caricato dal server) ====================
let menu = { ristorante: {}, bar: {} };

// ==================== LINGUA ====================
let currentLang = 'it';

const LANG = {
  it: {
    aperto: '\u25CF Aperto',
    chiuso: '\u25CF Chiuso',
    cerca: '\uD83D\uDD0D Cerca nel menu...',
    carrello_vuoto: 'Carrello vuoto',
    invia_ordine: '\uD83D\uDCE9 INVIA ORDINE',
    totale: 'Totale:',
    ordine_inviato: '\u2705 Ordine inviato!',
    seleziona_stanza: 'Seleziona una stanza',
    carrello: '\uD83D\uDED2 Carrello',
    storico: '\uD83D\uDCC3 Storico',
    nessun_ordine_attivo: 'Nessun ordine attivo',
    nessun_ordine_precedente: 'Nessun ordine precedente',
    nessun_ordine_pagare: 'Nessun ordine da pagare',
    nessun_ordine_pagato: 'Nessun ordine pagato',
    nessun_ordine_completato: 'Nessun ordine completato',
    aggiunto_carrello: 'aggiunto al carrello',
    ordine_non_trovato: 'Ordine non trovato',
    ristorante_chiuso: 'Il ristorante è chiuso all\'orario selezionato',
    bar_chiuso: 'Il bar è chiuso in questo momento',
    bar_chiuso_orario: 'Il bar è chiuso all\'orario selezionato',
    // Categorie
    Antipasti: 'Antipasti',
    Primi: 'Primi',
    Secondi: 'Secondi',
    Contorni: 'Contorni',
    Dolci: 'Dolci',
    Caffetteria: 'Caffetteria',
    'Th\u00E8 e Infusi': 'Th\u00E8 e Infusi',
    'Spritz e Aperitivi': 'Spritz e Aperitivi',
    Analcoliche: 'Analcoliche',
    Birre: 'Birre',
    'Vini (bottiglia)': 'Vini (bottiglia)',
    'Vini (calice)': 'Vini (calice)',
    Distillati: 'Distillati',
    'Orario libero': 'Orario libero',
    'Orario desiderato:': 'Orario desiderato:',
    'Pranzo': 'Pranzo',
    'Cena': 'Cena'
  },
  en: {
    aperto: '\u25CF Open',
    chiuso: '\u25CF Closed',
    cerca: '\uD83D\uDD0D Search menu...',
    carrello_vuoto: 'Empty cart',
    invia_ordine: '\uD83D\uDCE9 SEND ORDER',
    totale: 'Total:',
    ordine_inviato: '\u2705 Order sent!',
    seleziona_stanza: 'Select a room',
    carrello: '\uD83D\uDED2 Cart',
    storico: '\uD83D\uDCC3 History',
    nessun_ordine_attivo: 'No active orders',
    nessun_ordine_precedente: 'No previous orders',
    nessun_ordine_pagare: 'No orders to pay',
    nessun_ordine_pagato: 'No paid orders',
    nessun_ordine_completato: 'No completed orders',
    aggiunto_carrello: 'added to cart',
    ordine_non_trovato: 'Order not found',
    ristorante_chiuso: 'The restaurant is closed at the selected time',
    bar_chiuso: 'The bar is currently closed',
    bar_chiuso_orario: 'The bar is closed at the selected time',
    Antipasti: 'Starters',
    Primi: 'First Courses',
    Secondi: 'Main Courses',
    Contorni: 'Sides',
    Dolci: 'Desserts',
    Caffetteria: 'Coffee',
    'Th\u00E8 e Infusi': 'Tea & Herbal Teas',
    'Spritz e Aperitivi': 'Spritz & Aperitifs',
    Analcoliche: 'Soft Drinks',
    Birre: 'Beers',
    'Vini (bottiglia)': 'Wines (bottle)',
    'Vini (calice)': 'Wines (glass)',
    Distillati: 'Spirits',
    'Orario libero': 'Anytime',
    'Orario desiderato:': 'Desired time:',
    'Pranzo': 'Lunch',
    'Cena': 'Dinner'
  },
  fr: {
    aperto: '\u25CF Ouvert',
    chiuso: '\u25CF Ferm\u00E9',
    cerca: '\uD83D\uDD0D Rechercher...',
    carrello_vuoto: 'Panier vide',
    invia_ordine: '\uD83D\uDCE9 ENVOYER',
    totale: 'Total:',
    ordine_inviato: '\u2705 Commande envoy\u00E9e!',
    seleziona_stanza: 'S\u00E9lectionnez une chambre',
    carrello: '\uD83D\uDED2 Panier',
    storico: '\uD83D\uDCC3 Historique',
    nessun_ordine_attivo: 'Aucune commande active',
    nessun_ordine_precedente: 'Aucune commande pr\u00E9c\u00E9dente',
    nessun_ordine_pagare: 'Aucune commande \u00E0 payer',
    nessun_ordine_pagato: 'Aucune commande pay\u00E9e',
    nessun_ordine_completato: 'Aucune commande termin\u00E9e',
    aggiunto_carrello: 'ajout\u00E9 au panier',
    ordine_non_trovato: 'Commande non trouv\u00E9e',
    ristorante_chiuso: 'Le restaurant est ferm\u00E9 \u00E0 l\'horaire s\u00E9lectionn\u00E9',
    bar_chiuso: 'Le bar est actuellement ferm\u00E9',
    bar_chiuso_orario: 'Le bar est ferm\u00E9 \u00E0 l\'horaire s\u00E9lectionn\u00E9',
    Antipasti: 'Entr\u00E9es',
    Primi: 'Premiers plats',
    Secondi: 'Plats principaux',
    Contorni: 'Accompagnements',
    Dolci: 'Desserts',
    Caffetteria: 'Caf\u00E9',
    'Th\u00E8 e Infusi': 'Th\u00E9s & Infusions',
    'Spritz e Aperitivi': 'Spritz & Ap\u00E9ritifs',
    Analcoliche: 'Boissons sans alcool',
    Birre: 'Bi\u00E8res',
    'Vini (bottiglia)': 'Vins (bouteille)',
    'Vini (calice)': 'Vins (verre)',
    Distillati: 'Digestifs',
    'Orario libero': 'Heure libre',
    'Orario desiderato:': 'Horaire souhait\u00E9:',
    'Pranzo': 'D\u00E9jeuner',
    'Cena': 'D\u00EEner'
  },
es: {
  aperto: '\u25CF Abierto',
  chiuso: '\u25CF Cerrado',
  cerca: '\uD83D\uDD0D Buscar en el men\u00FA...',
  carrello_vuoto: 'Carrito vac\u00EDo',
  invia_ordine: '\uD83D\uDCE9 ENVIAR PEDIDO',
  totale: 'Total:',
  ordine_inviato: '\u2705 \u00A1Pedido enviado!',
  seleziona_stanza: 'Seleccione una habitaci\u00F3n',
  carrello: '\uD83D\uDED2 Carrito',
  storico: '\uD83D\uDCC3 Historial',
  nessun_ordine_attivo: 'No hay pedidos activos',
  nessun_ordine_precedente: 'No hay pedidos anteriores',
  nessun_ordine_pagare: 'No hay pedidos por pagar',
  nessun_ordine_pagato: 'No hay pedidos pagados',
  nessun_ordine_completato: 'No hay pedidos completados',
  aggiunto_carrello: 'a\u00F1adido al carrito',
  ordine_non_trovato: 'Pedido no encontrado',
  ristorante_chiuso: 'El restaurante est\u00E1 cerrado en el horario seleccionado',
  bar_chiuso: 'El bar est\u00E1 cerrado en este momento',
  bar_chiuso_orario: 'El bar est\u00E1 cerrado en el horario seleccionado',
  Antipasti: 'Entrantes',
  Primi: 'Primeros platos',
  Secondi: 'Segundos platos',
  Contorni: 'Acompa\u00F1amientos',
  Dolci: 'Postres',
  Caffetteria: 'Cafeter\u00EDa',
  'Th\u00E8 e Infusi': 'T\u00E9s e Infusiones',
  'Spritz e Aperitivi': 'Spritz y Aperitivos',
  Analcoliche: 'Sin alcohol',
  Birre: 'Cervezas',
  'Vini (bottiglia)': 'Vinos (botella)',
  'Vini (calice)': 'Vinos (copa)',
  Distillati: 'Destilados',
  'Orario libero': 'Horario libre',
  'Orario desiderato:': 'Horario deseado:',
  'Pranzo': 'Almuerzo',
  'Cena': 'Cena'
}
  };

function t(key) {
  return LANG[currentLang]?.[key] ?? LANG['it'][key] ?? key;
}

function menuName(item) {
  if (currentLang === 'en') return item.nameEn || item.name;
  if (currentLang === 'fr') return item.nameFr || item.nameEn || item.name;
  if (currentLang === 'es') return item.nameEs || item.nameEn || item.name;

  return item.name;
}

function menuDesc(item) {
  const fallback = item.desc !== undefined ? item.desc : '';
  if (currentLang === 'en') return item.descEn !== undefined ? item.descEn : fallback;
  if (currentLang === 'fr') return item.descFr !== undefined ? item.descFr : (item.descEn !== undefined ? item.descEn : fallback);
  if (currentLang === 'es') return item.descEs !== undefined ? item.descEs : (item.descEn !== undefined ? item.descEn : fallback);

  return fallback;
}

function updateLangButtons() {
  document.querySelectorAll('.lang-btn, .lang-btn-sm').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });
}

function setLang(lang) {
  currentLang = lang;
  if (currentRoom) {
    localStorage.setItem(`tsn_lang_${currentRoom}`, lang);
  }
  updateLangButtons();
  const guestScreen = document.getElementById('guestScreen');
  if (guestScreen && guestScreen.classList.contains('active')) {
    renderMenu();
  }
  if (document.getElementById('cartScreen') && document.getElementById('cartScreen').classList.contains('active')) {
    renderCart();
  }
}

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
  { id: 12, name: "Fico d'india" },
  { id: 13, name: 'Ombrellone 1' },
  { id: 14, name: 'Ombrellone 2' },
  { id: 15, name: 'Ombrellone 3' },
  { id: 16, name: 'Ombrellone 4' },
  { id: 17, name: 'Ombrellone 5' },
  { id: 18, name: 'Ombrellone 6' },
  { id: 19, name: 'Ombrellone 7' },
  { id: 20, name: 'Ombrellone 8' },
  { id: 21, name: 'Gazebo 1' },
  { id: 22, name: 'Gazebo 2' },
  { id: 23, name: 'Gazebo 3' }
];

function getRoomName(id) {
  const room = ROOMS.find(r => r.id === id);
  return room ? room.name : `Stanza ${id}`;
}

function renderRoomButtons() {
  const container = document.getElementById('roomGrid');
  if (!container) return;

  const groups = {
    Stanze: ROOMS.filter(r => r.id <= 12),
    Ombrelloni: ROOMS.filter(r => r.id >= 13 && r.id <= 20),
    Gazebo: ROOMS.filter(r => r.id >= 21)
  };

  let html = '';
  Object.entries(groups).forEach(([label, items]) => {
    html += `<div style="grid-column:1/-1;font-size:0.75rem;font-weight:bold;color:#C9A87C;margin-top:6px;text-align:left;">${label}</div>`;
    items.forEach(r => {
      html += `<button class="room-demo-btn" onclick="setRoom(${r.id})">${r.name}</button>`;
    });
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
        ? `<span style="display:inline-block;background:#4CAF50;color:white;padding:4px 14px;border-radius:20px;font-size:0.8rem;font-weight:bold;margin-bottom:12px;">${t('aperto')}</span>`
        : `<span style="display:inline-block;background:#D95A2B;color:white;padding:4px 14px;border-radius:20px;font-size:0.8rem;font-weight:bold;margin-bottom:12px;">${t('chiuso')}</span>`;

    let html = openStatus;
    html += `<input type="text" id="searchMenu" class="search-input" placeholder="${t('cerca')}">`;

    for (const [category, items] of Object.entries(menuData)) {
        const catName = menuName({ name: category, nameEn: t(category), nameFr: t(category) });
        html += `<div class="category"><h3>${catName}</h3>`;
        items.forEach(item => {
            const displayName = menuName(item);
            const displayDesc = menuDesc(item);
            html += `
                <div class="product-card" data-name="${item.name.toLowerCase()}">
                    <div class="product-info">
                        <h4>${item.img} ${displayName}</h4>
                        <p>${displayDesc}</p>
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
    showToast(`\u2795 ${menuName(item)} ${t('aggiunto_carrello')}`);
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
        container.innerHTML = `<p style="text-align:center;color:#999;margin-top:40px;">${t('carrello_vuoto')}</p>`;
        document.getElementById('cartTotal').textContent = '0';
        document.getElementById('orderTimeSelector').style.display = 'none';
        return;
    }

    let total = 0;
    let html = '';
    cart.forEach((item, idx) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        const displayName = menuName(item);
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <strong>${item.img} ${displayName}</strong><br>
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
                <option value="12:30">${t('Pranzo')} 12:30</option>
                <option value="13:00">${t('Pranzo')} 13:00</option>
                <option value="13:30">${t('Pranzo')} 13:30</option>
                <option value="14:00">${t('Pranzo')} 14:00</option>
                <option value="19:30">${t('Cena')} 19:30</option>
                <option value="20:00">${t('Cena')} 20:00</option>
                <option value="20:30">${t('Cena')} 20:30</option>
                <option value="21:00">${t('Cena')} 21:00</option>
                <option value="21:30">${t('Cena')} 21:30</option>
            `;
        } else {
            select.innerHTML = `<option value="Orario libero">${t('Orario libero')} (bar)</option>`;
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
    if (endMin >= startMin) {
        return nowMin >= startMin && nowMin <= endMin;
    } else {
        return nowMin >= startMin || nowMin <= endMin;
    }
}

function isOpenNow(type) {
    if (!menu.config || !menu.config.openingHours || !menu.config.openingHours[type]) return true;
    const slots = menu.config.openingHours[type];
    if (!slots || slots.length === 0) return true;
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0');
    return slots.some(slot => isTimeInRange(timeStr, slot.start, slot.end));
}

function isTimeOpen(type, timeStr) {
    if (!menu.config || !menu.config.openingHours || !menu.config.openingHours[type]) return true;
    const slots = menu.config.openingHours[type];
    if (!slots || slots.length === 0) return true;
    return slots.some(slot => isTimeInRange(timeStr, slot.start, slot.end));
}

async function submitOrder() {
    if (cart.length === 0) {
        showToast(t('carrello_vuoto'));
        return;
    }
    if (!currentRoom) {
        showToast(t('seleziona_stanza'));
        return;
    }

    const hasFood = cart.some(i => i.type === 'cibo');
    const hasDrinks = cart.some(i => i.type === 'bevanda');

    const orderTime = document.getElementById('orderTime').value || 'Orario libero';

    if (hasFood && !isTimeOpen('ristorante', orderTime)) {
        showToast(t('ristorante_chiuso'));
        return;
    }
    if (hasDrinks) {
        if (orderTime === 'Orario libero') {
            if (!isOpenNow('bar')) {
                showToast(t('bar_chiuso'));
                return;
            }
        } else if (!isTimeOpen('bar', orderTime)) {
            showToast(t('bar_chiuso_orario'));
            return;
        }
    }

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
    showToast(`\u2705 #${order.id.toUpperCase()} ${t('ordine_inviato')}`);

    if (navigator.vibrate) navigator.vibrate([50, 100, 50]);
}

// ==================== STORICO OSPITE ====================
function showHistory() {
    showScreen('historyScreen');
    const container = document.getElementById('historyList');
    if (!container) return;

    const roomOrders = orders.filter(o => o.room === currentRoom && o.delivered);
    if (roomOrders.length === 0) {
        container.innerHTML = `<p style="text-align:center;color:#999;margin-top:40px;">${t('nessun_ordine_precedente')}</p>`;
        return;
    }

    let html = '';
    roomOrders.reverse().forEach(order => {
        const itemsList = order.items.map(i => `${i.img} ${menuName(i)} x${i.qty}`).join(', ');
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

    const activeOrders = orders.filter(o => !o.delivered && (
        (o.status.bevanda !== null && o.status.bevanda !== 'delivered') ||
        (o.status.cibo !== null && o.status.cibo !== 'delivered')
    ));
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
        container.innerHTML = `<p style="text-align:center;color:#999;margin-top:40px;">${t('nessun_ordine_attivo')}</p>`;
        return;
    }

    let html = '';
    activeOrders.reverse().forEach(order => {
        const date = new Date(order.timestamp);
        const isKitchen = staffRole === 'kitchen';

        const foodItems = order.items.filter(i => i.type === 'cibo');
        const drinkItems = order.items.filter(i => i.type === 'bevanda');

        if (isKitchen) {
            const foodStatus = order.status.cibo;
            let statusHtml = foodStatus === 'pending'
                ? `<span class="status-badge status-food-pending">In preparazione</span>`
                : `<span class="status-badge status-food-ready">Pronto</span>`;

            let actionHtml = foodStatus === 'pending'
                ? `<button class="staff-btn btn-ready" onclick="markReady('${order.id}', 'cibo')">✅ Pronto</button>`
                : '';

            html += `
                <div class="order-card ${foodStatus === 'ready' ? 'kitchen-ready' : ''}">
                    <h4>#${order.id.toUpperCase()} - ${getRoomName(order.room)}</h4>
                    <div class="order-meta" style="font-size:0.8rem;color:#666;margin-bottom:8px;">
                        ${date.toLocaleDateString('it-IT')} ${date.toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'})}
                        ${order.time ? `- Orario: ${order.time}` : ''}
                    </div>
                    <div class="order-items">
                        <strong>🍽️ Cibo:</strong><br>
                        ${foodItems.map(i => `${i.img} ${i.name} x${i.qty} - €${(i.price * i.qty).toFixed(2)}`).join('<br>')}
                        ${drinkItems.length > 0 ? `<br><small style="color:#999;">Il bar prepara: ${drinkItems.map(i => `${i.name} x${i.qty}`).join(', ')}</small>` : ''}
                    </div>
                    <div class="order-status">${statusHtml}</div>
                    <div>${actionHtml}</div>
                </div>
            `;
        } else {
            const drinkStatus = order.status.bevanda;
            const foodStatus = order.status.cibo;

            let statusHtml = '';
            let actionHtml = '';

            if (drinkStatus === 'pending') {
                statusHtml += `<span class="status-badge status-drinks-pending">Bevande in attesa</span>`;
                actionHtml += `<button class="staff-btn btn-ready" onclick="markReady('${order.id}', 'bevanda')">✅ Bevande pronte</button>`;
            } else if (drinkStatus === 'ready') {
                statusHtml += `<span class="status-badge status-drinks-ready">Bevande pronte</span>`;
            }

            if (foodStatus === 'pending') {
                statusHtml += `<span class="status-badge status-food-pending">Cibo in preparazione</span>`;
            } else if (foodStatus === 'ready') {
                statusHtml += `<span class="status-badge status-food-ready">Cibo pronto</span>`;
            }

            const foodReady = foodStatus === 'ready' || foodStatus === null || foodStatus === 'delivered';
            const drinksReady = drinkStatus === 'ready' || drinkStatus === null || drinkStatus === 'delivered';

            if (foodReady && drinksReady) {
                actionHtml += `<button class="staff-btn btn-deliver" onclick="markDelivered('${order.id}')">🚚 Consegnato</button>`;
            }

            html += `
                <div class="order-card">
                    <h4>#${order.id.toUpperCase()} - ${getRoomName(order.room)}</h4>
                    <div class="order-meta" style="font-size:0.8rem;color:#666;margin-bottom:8px;">
                        ${date.toLocaleDateString('it-IT')} ${date.toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'})}
                        ${order.time ? `- Orario: ${order.time}` : ''}
                    </div>
                    <div class="order-items">
                        <strong>🍺 Bevande:</strong><br>
                        ${drinkItems.map(i => `${i.img} ${i.name} x${i.qty} - €${(i.price * i.qty).toFixed(2)}`).join('<br>')}
                        ${foodItems.length > 0 ? `<br><strong style="color:#D95A2B;">🍽️ Cibo da prendere in cucina:</strong><br>${foodItems.map(i => `${i.img} ${i.name} x${i.qty}`).join('<br>')}` : ''}
                    </div>
                    <div class="order-status">${statusHtml}</div>
                    <div>${actionHtml}</div>
                </div>
            `;
        }
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
        renderBarDashboard();
        renderKitchenDashboard();
        if (currentRole === 'reception') renderReceptionDashboard();
        showToast(`\uD83D\uDEE5\uFE0F Ordine #${orderId.toUpperCase()} consegnato`);
    }
}

// ==================== RECEPTION ====================
function renderReceptionDashboard() {
    const container = document.getElementById('receptionOrdersList');
    if (!container) return;

    const unpaidOrders = orders.filter(o => o.delivered && !o.paid);
    if (unpaidOrders.length === 0) {
        container.innerHTML = `<p style="text-align:center;color:#999;margin-top:40px;">${t('nessun_ordine_pagare')}</p>`;
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

    if (unpaidOrders.length > 0) {
        const pdfBtn = document.createElement('button');
        pdfBtn.className = 'submit-order-btn';
        pdfBtn.style.cssText = 'background:#C9A87C;margin-top:15px;font-size:0.9rem;padding:10px;';
        pdfBtn.innerHTML = '\uD83D\uDCC4 Scarica PDF comande';
        pdfBtn.onclick = printOrdersPDF;
        container.appendChild(pdfBtn);
    }
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
        container.innerHTML = `<p style="text-align:center;color:#999;margin-top:40px;">${t('nessun_ordine_pagato')}</p>`;
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
        container.innerHTML = `<p style="text-align:center;color:#999;margin-top:40px;">${t('nessun_ordine_completato')}</p>`;
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

    const langParam = getUrlParam('lang');
    const roomParam = getUrlParam('room');
    if (langParam && ['it', 'en', 'es', 'fr'].includes(langParam)) {
        currentLang = langParam;
        if (roomParam) {
            localStorage.setItem(`tsn_lang_${roomParam}`, langParam);
        }
    }
    updateLangButtons();

    const menuLoaded = await loadMenuFromServer();
    if (!menuLoaded) {
        showToast('Errore caricamento menu');
    }

    await refreshOrders();

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

function printOrdersPDF() {
    const unpaid = orders.filter(o => o.delivered && !o.paid);
    const paid = orders.filter(o => o.paid);
    const all = [...unpaid, ...paid];

    if (all.length === 0) {
        showToast('Nessun ordine da stampare');
        return;
    }

    const roomGroups = {};
    all.forEach(order => {
        if (!roomGroups[order.room]) roomGroups[order.room] = [];
        roomGroups[order.room].push(order);
    });

    let html = `
        <!DOCTYPE html>
        <html><head><meta charset="UTF-8"><title>Comande TENUTA SAN NICOLA</title>
        <style>
            body { font-family: monospace; font-size: 12px; padding: 20px; color: #333; }
            h1 { text-align: center; font-size: 18px; color: #2E5A3B; margin-bottom: 5px; }
            h2 { font-size: 14px; color: #2E5A3B; margin-top: 20px; border-bottom: 2px solid #C9A87C; padding-bottom: 4px; }
            .data { text-align: center; font-size: 11px; color: #666; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
            th, td { padding: 4px 6px; text-align: left; border-bottom: 1px solid #eee; font-size: 11px; }
            th { background: #F5F2E8; font-weight: bold; }
            .totale { text-align: right; font-weight: bold; font-size: 13px; margin-top: 5px; padding-top: 5px; border-top: 2px solid #333; }
            .stato { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 10px; margin-left: 5px; }
            .da-pagare { background: #FFCDD2; }
            .pagato { background: #C8E6C9; }
            .footer { text-align: center; font-size: 10px; color: #999; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 10px; }
            @media print { body { padding: 10px; } }
        </style></head><body>
        <h1>&#127795; TENUTA SAN NICOLA</h1>
        <div class="data">Report comande - ${new Date().toLocaleDateString('it-IT')} ${new Date().toLocaleTimeString('it-IT', {hour:'2-digit',minute:'2-digit'})}</div>
    `;

    Object.keys(roomGroups).sort((a, b) => a - b).forEach(room => {
        const roomOrders = roomGroups[room];
        let roomTotal = 0;
        html += `<h2>&#127968; ${getRoomName(parseInt(room))}</h2><table><tr><th>#</th><th>Articolo</th><th>Q.tà</th><th>Prezzo</th><th>Totale</th><th>Stato</th></tr>`;

        roomOrders.forEach(order => {
            const orderTotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
            roomTotal += orderTotal;
            const stato = order.paid ? '<span class="stato pagato">Pagato</span>' : '<span class="stato da-pagare">Da pagare</span>';

            order.items.forEach((item, idx) => {
                const itemTotal = item.price * item.qty;
                html += `<tr>
                    <td>${idx === 0 ? '#' + order.id.toUpperCase() : ''}</td>
                    <td>${item.img} ${item.name}</td>
                    <td>${item.qty}</td>
                    <td>€${item.price.toFixed(2)}</td>
                    <td>€${itemTotal.toFixed(2)}</td>
                    <td>${idx === 0 ? stato : ''}</td>
                </tr>`;
            });

            const date = new Date(order.timestamp);
            html += `<tr style="background:#F9F7F2;"><td colspan="6" style="font-size:10px;color:#999;text-align:right;">
                ${date.toLocaleDateString('it-IT')} ${date.toLocaleTimeString('it-IT', {hour:'2-digit',minute:'2-digit'})}
                ${order.time ? ' - Orario: ' + order.time : ''}
            </td></tr>`;
        });

        html += `</table><div class="totale">Totale stanza: €${roomTotal.toFixed(2)}</div>`;
    });

    const grandTotal = all.reduce((s, o) => s + o.items.reduce((s2, i) => s2 + i.price * i.qty, 0), 0);
    html += `<div class="totale" style="font-size:16px;margin-top:20px;">TOTALE GENERALE: €${grandTotal.toFixed(2)}</div>`;
    html += `<div class="footer">Documento generato il ${new Date().toLocaleString('it-IT')}</div></body></html>`;

    const win = window.open('', '_blank');
    win.document.write(html);
    win.document.close();
    win.print();
}

const origSetRoom = setRoom;
setRoom = function(num) {
    currentRoom = num;
    localStorage.setItem('currentRoom', num);
    document.getElementById('roomBadge').textContent = `${getRoomName(num)}`;
    document.querySelector('.room-number').textContent = `${getRoomName(num)}`;
    const savedLang = localStorage.getItem(`tsn_lang_${num}`);
    currentLang = (savedLang && ['it', 'en', 'es', 'fr'].includes(savedLang)) ? savedLang : 'it';
    updateLangButtons();
    loadCart();
    setRole('guest');
};

initApp();