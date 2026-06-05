document.addEventListener('DOMContentLoaded', () => {

  // Cart / Shopping Checklist state
  let cart = [];

  // DOM Elements
  const cartDrawer = document.getElementById('cart-drawer-panel');
  const drawerOverlay = document.getElementById('drawer-overlay-bg');
  const cartTrigger = document.getElementById('cart-drawer-trigger');
  const cartClose = document.getElementById('cart-drawer-close');
  const cartCountBadge = document.getElementById('cart-count');
  
  const productGrid = document.getElementById('product-grid');
  const productCards = document.querySelectorAll('.product-card');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const searchInput = document.getElementById('grocery-search-input');
  
  const cartItemsList = document.getElementById('cart-list-items');
  const emptyNotice = document.getElementById('empty-list-notice');
  const drawerFooter = document.getElementById('cart-drawer-footer');
  const orderNotes = document.getElementById('order-notes');

  const btnWhatsapp = document.getElementById('btn-whatsapp-checkout');
  const btnCopyList = document.getElementById('btn-copy-list');

  // 1. Sliding Drawer Navigation
  const openDrawer = () => {
    cartDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    cartDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  };

  if (cartTrigger) cartTrigger.addEventListener('click', openDrawer);
  if (cartClose) cartClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // 2. Category Tab Filtering
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-category');
      
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => { card.style.opacity = '1'; }, 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => { card.style.display = 'none'; }, 200);
        }
      });
    });
  });

  // 3. Bi-lingual Search Bar (Searches both English and Tamil names)
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();

      productCards.forEach(card => {
        const titleText = card.querySelector('h3').textContent.toLowerCase();
        const descText = card.querySelector('.product-desc').textContent.toLowerCase();
        
        // Search matches title or description
        if (titleText.includes(query) || descText.includes(query)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  }

  // 4. Cart List Builder Core Logic
  const updateCartBadge = () => {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCountBadge.textContent = totalItems;
  };

  const saveCartLocal = () => {
    try {
      localStorage.setItem('maligai_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn("localStorage setItem is disabled:", e);
    }
  };

  const loadCartLocal = () => {
    try {
      const saved = localStorage.getItem('maligai_cart');
      if (saved) {
        cart = JSON.parse(saved);
        updateCartBadge();
        renderCartItems();
      }
    } catch (e) {
      console.warn("localStorage getItem is disabled:", e);
    }
  };

  // Detect default unit for item
  const getDefaultUnit = (name) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('oil')) return 'Litre';
    if (nameLower.includes('mustard') || nameLower.includes('turmeric')) return '250g';
    return 'Kg';
  };

  const renderCartItems = () => {
    if (cart.length === 0) {
      emptyNotice.classList.remove('hidden');
      drawerFooter.classList.add('hidden');
      cartItemsList.innerHTML = '';
      return;
    }

    emptyNotice.classList.add('hidden');
    drawerFooter.classList.remove('hidden');
    cartItemsList.innerHTML = '';

    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      
      const availableUnits = ['Kg', '250g', '500g', 'Litre', 'Packet'];
      const selectOptions = availableUnits.map(u => 
        `<option value="${u}" ${item.unit === u ? 'selected' : ''}>${u}</option>`
      ).join('');

      li.innerHTML = `
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <button class="remove-item-btn" data-id="${item.id}">Remove</button>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn btn-minus" data-id="${item.id}">-</button>
          <span class="item-qty">${item.qty}</span>
          <button class="qty-btn btn-plus" data-id="${item.id}">+</button>
          <select class="unit-selector" data-id="${item.id}">
            ${selectOptions}
          </select>
        </div>
      `;
      
      cartItemsList.appendChild(li);
    });

    // Attach listener for buttons inside list
    attachCartRowListeners();
  };

  const attachCartRowListeners = () => {
    // Quantity Plus
    cartItemsList.querySelectorAll('.btn-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = cart.find(i => i.id === id);
        if (item) {
          item.qty++;
          updateCartBadge();
          saveCartLocal();
          renderCartItems();
        }
      });
    });

    // Quantity Minus
    cartItemsList.querySelectorAll('.btn-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const itemIndex = cart.findIndex(i => i.id === id);
        if (itemIndex > -1) {
          cart[itemIndex].qty--;
          if (cart[itemIndex].qty <= 0) {
            cart.splice(itemIndex, 1);
          }
          updateCartBadge();
          saveCartLocal();
          renderCartItems();
        }
      });
    });

    // Unit Change dropdown
    cartItemsList.querySelectorAll('.unit-selector').forEach(select => {
      select.addEventListener('change', () => {
        const id = select.getAttribute('data-id');
        const item = cart.find(i => i.id === id);
        if (item) {
          item.unit = select.value;
          saveCartLocal();
        }
      });
    });

    // Remove item button
    cartItemsList.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const itemIndex = cart.findIndex(i => i.id === id);
        if (itemIndex > -1) {
          cart.splice(itemIndex, 1);
          updateCartBadge();
          saveCartLocal();
          renderCartItems();
        }
      });
    });
  };

  // Listen to product grid card additions
  const addToCartTriggers = document.querySelectorAll('.add-to-list-btn');
  addToCartTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const name = btn.getAttribute('data-name');

      const existingItem = cart.find(i => i.id === id);
      if (existingItem) {
        existingItem.qty++;
      } else {
        cart.push({
          id: id,
          name: name,
          qty: 1,
          unit: getDefaultUnit(name)
        });
      }

      updateCartBadge();
      saveCartLocal();
      renderCartItems();
      openDrawer();
    });
  });

  // 5. WhatsApp Order List Formatter
  const formatListText = () => {
    let text = `*ஸ்ரீ சரவணா மளிகைக் கடை - மளிகைப் பட்டியல்*\n`;
    text += `*Sri Saravana Maligai - Grocery Checklist*\n`;
    text += `===============================\n\n`;
    
    cart.forEach((item, idx) => {
      text += `${idx + 1}. *${item.name}* - ${item.qty} ${item.unit}\n`;
    });

    text += `\n===============================\n`;
    
    const notes = orderNotes.value.trim();
    if (notes) {
      text += `*குறிப்புகள் / Delivery Details:*\n${notes}\n`;
    }
    
    text += `\n_List compiled online. Please confirm packing & delivery schedule._`;
    return text;
  };

  if (btnWhatsapp) {
    btnWhatsapp.addEventListener('click', () => {
      const text = formatListText();
      // WhatsApp launch URL
      const phoneNum = '919876543210';
      const encodedText = encodeURIComponent(text);
      const url = `https://api.whatsapp.com/send?phone=${phoneNum}&text=${encodedText}`;
      
      window.open(url, '_blank');
    });
  }

  // 6. Copy List to Clipboard
  if (btnCopyList) {
    btnCopyList.addEventListener('click', () => {
      const text = formatListText();
      navigator.clipboard.writeText(text).then(() => {
        alert("Grocery checklist copied to clipboard! You can paste it into WhatsApp or notes.");
      }).catch(err => {
        console.error("Clipboard copy failed: ", err);
      });
    });
  }

  // Boot Local Storage Check
  loadCartLocal();

});
