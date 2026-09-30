/* ===================================================================
   MediNest Pharmacy — storefront behaviour
   - renders product grids from data
   - category filter (sidebar)
   - add to cart: flying clone animation into the cart chip
   - live cart count / total
=================================================================== */

// ---------- Product data ----------

const PRODUCTS = {
  hotDeals: [
    { id: 'h1', name: 'LYSI 240ML Syrup', cat: 'Children\'s Cod Liver Oil', catKey: 'otc', price: 350, mrp: null, img: 'img/images.jpg'},
    { id: 'h2', name: 'Herbal liver tonic 200ml', cat: 'Herbal Tonic', catKey: 'herbal', price: 490, mrp: null, img: 'img/200ml-herbal-liver-tonic.jpg' },
    { id: 'h3', name: 'Ashwagandha Root Capsules', cat: 'Unani · Ashwagandha', catKey: 'herbal', price: 760, mrp: 950, img: 'img/Ashwagandha.jpg' },
    { id: 'h4', name: 'Omron Blood Pressure Monitor HME-7121', cat: 'Surgical Device', catKey: 'surgical', price: 4291, mrp: 4768, img: 'img/Omron.jpg' },
    { id: 'h5', name: 'Rossmax Air Mattress AM30', cat: 'Surgical Device', catKey: 'surgical', price: 6028, mrp: 6698, img: 'img/Rossmax.jpg'},
    { id: 'h6', name: 'Omron Nebulizer NE-C101', cat: 'Surgical Device', catKey: 'surgical', price: 3737, mrp: 4153, img: 'img/Omron2.jpg' },
  ],
  prescription: [
    { id: 'p1', name: 'NapaDol 325mg/37.5mg Tab', cat: 'Paracetamol + Tramadol', catKey: 'prescription', price: 7.2, mrp: 8, img: 'img/NapaDol.jpg' },
    { id: 'p2', name: 'Neurocare Tab', cat: 'Vitamin B1, B6, B12', catKey: 'prescription', price: 270, mrp: 300, img: 'img/Neurocare.jpg' },
    { id: 'p3', name: 'Ispergul 120mg Powder', cat: 'Acid Tannic 33%', catKey: 'prescription', price: 450, mrp: null, img: 'img/Ispergul.jpg' },
    { id: 'p4', name: 'Ravu 100mg Cap', cat: 'Ravuconazole', catKey: 'prescription', price: 270, mrp: 300, img: 'img/Rav100mg.jpg' },
    { id: 'p5', name: 'Gintex 500mg Cap', cat: 'Progesterone', catKey: 'prescription', price: 10.8, mrp: 12, img: 'img/Ginax.jpg' },
    { id: 'p6', name: 'Coralcal D 500mg/200IU Tab', cat: 'Calcium', catKey: 'prescription', price: 11.7, mrp: 13, img: 'img/Coralcal.jpg' },
  ],
  supplements: [
    { id: 's1', name: 'Centrum Multivitamin 30s', cat: 'Multivitamin', catKey: 'supplements', price: 890, mrp: 990, img: 'img/Centru.png' },
    { id: 's2', name: 'Omega-3 Fish Oil 60 Caps', cat: 'Fatty Acids', catKey: 'supplements', price: 640, mrp: 720, img: 'img/Omegas.jpg' },
    { id: 's3', name: 'Vitamin D3 1000IU', cat: 'Bone Health', catKey: 'supplements', price: 320, mrp: null, img: 'img/Vitamin.jpg' },
    { id: 's4', name: 'Zinc + Vitamin C Tab', cat: 'Immunity', catKey: 'supplements', price: 210, mrp: 250, img: 'img/Zinc.jpg' },
    { id: 's5', name: 'Collagen Peptide Sachets', cat: "Women's Care", catKey: 'supplements,women', price: 1450, mrp: 1600, img: 'img/Collagens.jpg' }, 
    { id: 's6', name: 'Baby Gripe Water 100ml', cat: 'Baby Care', catKey: 'supplements,baby', price: 130, mrp: null, img: 'img/BabyGripeWater100ml.jpg' },
  ],
  skincare: [
    // এখানে সবগুলোর catKey-তে 'women' যোগ করা হয়েছে
    { id: 'sc1', name: 'Cetaphil Gentle Skin Cleanser 125ml', cat: 'Face Wash', catKey: 'skincare,women', price: 950, mrp: 1050, img: 'img/cetaphil.jpg' },
    { id: 'sc2', name: 'Elovera Moisturizing Cream 50gm', cat: 'Moisturizer', catKey: 'skincare,women', price: 350, mrp: 380, img: 'img/elovera.jpg' },
    { id: 'sc3', name: 'Sun-X Sunscreen Gel SPF 50', cat: 'Sun Protection', catKey: 'skincare,women', price: 450, mrp: 500, img: 'img/sun.jpg' },
    { id: 'sc4', name: 'Caladryl Skin Soothing Lotion 100ml', cat: 'Soothing Lotion', catKey: 'skincare,women', price: 120, mrp: null, img: 'img/Caladryll.jpg' },
    { id: 'sc5', name: 'Clinac Anti-Acne Gel 10gm', cat: 'Acne Treatment', catKey: 'skincare,women', price: 110, mrp: null, img: 'img/clinac.jpg' },
    { id: 'sc6', name: 'Fungidal Cream 15gm', cat: 'Anti-Fungal', catKey: 'skincare,women', price: 65, mrp: 75, img: 'img/Fungidal HC Image.jpg' },
    { id: 'sc7', name: 'Betnovate-N Cream 30gm', cat: 'Topical Steroid', catKey: 'skincare,women', price: 80, mrp: 90, img: 'img/betnovate-n-cream-25gm-65b3d6b04ba1e-2025-07-05-6868cba2921ec.png' },
    { id: 'sc8', name: 'CeraVe Moisturizing Cream 50ml', cat: 'Moisturizer', catKey: 'skincare,women', price: 1250, mrp: 1400, img: 'img/793957fff87f2469caca22ad4e707e8c.jpg' }, 
    { id: 'sc9', name: 'Acnemix Gel 15gm', cat: 'Acne Treatment', catKey: 'skincare,women', price: 180, mrp: 200, img: 'img/images (1).jpg' },
    { id: 'sc10', name: 'E-Cap 400 IU (Skin & Hair)', cat: 'Vitamin', catKey: 'skincare,women', price: 150, mrp: null, img: 'img/eyJid.jpg' }, 
    { id: 'sc11', name: 'Ketocon 2% Cream 15gm', cat: 'Anti-Fungal', catKey: 'skincare,women', price: 90, mrp: 100, img: 'img/IMG-20231211-WA0132.jpg' },
    { id: 'sc12', name: 'Sudocrem Healing Cream 60gm', cat: 'Healing Cream', catKey: 'skincare,women,baby', price: 550, mrp: 600, img: 'img/images (2).jpg' } 
  ],
};

// ---------- Cart state ----------

let cartCount = 0;
let cartTotal = 0;

const cartCountEl = document.getElementById('cartCount');
const cartTotalEl = document.getElementById('cartTotal');
const cartChipEl = document.getElementById('cartChip');
const flyLayer = document.getElementById('flyLayer');

function formatBDT(n) {
  const rounded = Number.isInteger(n) ? n : Math.round(n * 100) / 100;
  return '৳ ' + rounded.toLocaleString('en-US');
}

function updateCartUI() {
  cartCountEl.textContent = cartCount;
  cartTotalEl.textContent = formatBDT(cartTotal);
  cartChipEl.classList.remove('bump');
  // force reflow so the animation can retrigger
  void cartChipEl.offsetWidth;
  cartChipEl.classList.add('bump');
}

// ---------- Rendering ----------

function priceRowHTML(product) {
  if (product.mrp) {
    return `
      <span class="product-card__price">${formatBDT(product.price)}</span>
      <span class="product-card__price-strike">${formatBDT(product.mrp)}</span>
    `;
  }
  return `<span class="product-card__price">${formatBDT(product.price)}</span>`;
}

function badgeHTML(product) {
  if (!product.mrp) return '';
  const pct = Math.round((1 - product.price / product.mrp) * 100);
  if (pct <= 0) return '';
  return `<span class="product-card__badge">Save ${pct}%</span>`;
}

function cardHTML(product) {
  return `
    <article class="product-card" data-cat="${product.catKey}" data-id="${product.id}">
      ${badgeHTML(product)}
      <div class="product-card__img-wrap">
        <img src="${product.img}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${product.cat}</span>
        <h3 class="product-card__name">${product.name}</h3>
        <div class="product-card__price-row">${priceRowHTML(product)}</div>
        <button class="add-to-cart-btn" data-price="${product.price}" data-img="${product.img}">
          <svg viewBox="0 0 24 24" width="15" height="15"><path fill="currentColor" d="M7 22a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4zM7.2 14h9.9a1 1 0 00.98-.79L20 5.6H6.2M2 3h2l.6 3M6.2 3.6L4 3" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Add to Bag
        </button>
      </div>
    </article>
  `;
}

function renderGrid(containerId, products) {
  const el = document.getElementById(containerId);
  if(el) el.innerHTML = products.map(cardHTML).join('');
}

renderGrid('hotDealsGrid', PRODUCTS.hotDeals);
renderGrid('prescriptionGrid', PRODUCTS.prescription);
renderGrid('supplementsGrid', PRODUCTS.supplements);
renderGrid('skincareGrid', PRODUCTS.skincare);

// ---------- Add to cart: fly animation ----------

function flyToCart(imgEl) {
  const startRect = imgEl.getBoundingClientRect();
  const endRect = cartChipEl.getBoundingClientRect();

  const clone = imgEl.cloneNode(true);
  clone.classList.add('fly-item');
  clone.style.left = startRect.left + 'px';
  clone.style.top = startRect.top + 'px';
  clone.style.width = startRect.width + 'px';
  clone.style.height = startRect.height + 'px';
  clone.style.opacity = '1';
  flyLayer.appendChild(clone);

  const endX = endRect.left + endRect.width / 2 - 12;
  const endY = endRect.top + endRect.height / 2 - 12;
  const deltaX = endX - startRect.left;
  const deltaY = endY - startRect.top;

  requestAnimationFrame(() => {
    clone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.12)`;
    clone.style.opacity = '0.25';
  });

  setTimeout(() => clone.remove(), 700);
}

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-to-cart-btn');
  if (!btn) return;

  const card = btn.closest('.product-card');
  const imgEl = card.querySelector('.product-card__img-wrap img');
  const price = parseFloat(btn.dataset.price);

  flyToCart(imgEl);

  cartCount += 1;
  cartTotal += price;
  updateCartUI();

  btn.classList.add('added');
  const originalLabel = btn.innerHTML;
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" width="15" height="15"><path fill="currentColor" d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Added
  `;
  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = originalLabel;
  }, 1200);
});

// ---------- Sidebar category filter ----------

const categoryList = document.getElementById('categoryList');
const allCards = () => document.querySelectorAll('.product-card');
const allSections = () => document.querySelectorAll('.section');

categoryList.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;

  categoryList.querySelectorAll('li').forEach((item) => item.classList.remove('active'));
  li.classList.add('active');

  const cat = li.dataset.cat;

  if (cat === 'all') {
    allSections().forEach((s) => (s.style.display = ''));
    allCards().forEach((c) => (c.style.display = ''));
    return;
  }

  allSections().forEach((section) => {
    const cards = section.querySelectorAll('.product-card');
    let visibleCount = 0;
    cards.forEach((card) => {
      // এই লাইনটিতে পরিবর্তন করা হয়েছে যেন একাধিক ক্যাটাগরি সাপোর্ট করে
      const match = card.dataset.cat.split(',').includes(cat);
      card.style.display = match ? '' : 'none';
      if (match) visibleCount += 1;
    });
    section.style.display = visibleCount > 0 ? '' : 'none';
  });
});

// ---------- Search filter ----------

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  allSections().forEach((section) => {
    const cards = section.querySelectorAll('.product-card');
    let visibleCount = 0;
    cards.forEach((card) => {
      const name = card.querySelector('.product-card__name').textContent.toLowerCase();
      const match = query === '' || name.includes(query);
      card.style.display = match ? '' : 'none';
      if (match) visibleCount += 1;
    });
    section.style.display = visibleCount > 0 ? '' : 'none';
  });

  if (query !== '') {
    categoryList.querySelectorAll('li').forEach((item) => item.classList.remove('active'));
  }
});