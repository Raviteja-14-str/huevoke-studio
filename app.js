const asset = name => `assets/catalog/${name.includes('/') ? name : `frames/${name}`}.webp`;
const studioAsset = name => asset(`studio/${name}`);
const products = [
  { id:'contour', name:'Contour Flow / Clay', collection:'Form', code:'HV-F01 CL', sizes:'24 × 36 / 36 × 48 in', thickness:'40 mm', finish:'Ultra-matte smooth', meta:'MDF · Matte · two sizes', price:14500, description:'Organic contours in soft clay tones create a sense of grounding, warmth and effortless balance.', asset:studioAsset('contour-clay'), className:'product-one' },
  { id:'erosion', name:'Erosion / Sand', collection:'Form', code:'HV-F06 E', sizes:'24 × 48 in', thickness:'40 mm', finish:'Ultra-matte smooth', meta:'MDF · Matte · one size', price:16900, description:'Smooth contours and layered forms echo the quiet strength of wind and water.', asset:studioAsset('erosion-sand'), className:'product-two' },
  { id:'fluid-motion', name:'Fluid Motion / Sage', collection:'Form', code:'HV-F09 FM', sizes:'24 × 36 / 30 × 48 in', thickness:'25–40 mm', finish:'Ultra-matte smooth', meta:'MDF · Matte · two sizes', price:17800, description:'Soft curves and flowing layers create movement, calm and rhythm in the room.', asset:studioAsset('fluid-motion-sage'), className:'product-three' },
  { id:'balance', name:'Balance / Orbit', collection:'Form', code:'HV-F11 BL', sizes:'18 × 18 / 24 × 24 in', thickness:'30 mm', finish:'Ultra-matte smooth', meta:'MDF · Matte · two sizes', price:15400, description:'A study in harmony, where soft curves and contrasting tones unite in balance.', asset:studioAsset('balance-orbit'), className:'product-one' },
  { id:'tidal-landscape', name:'Tidal Landscape', collection:'Form', code:'HV-F14 TL', sizes:'36 × 24 in', thickness:'Varies by design', finish:'Matte', meta:'Layered MDF · 36 × 24 in', price:19200, description:'Inspired by tides and terrain, layered contours create serene landscapes.', asset:asset('tidal-landscape'), className:'product-two' },
  { id:'lotus', name:'Lotus Bloom', collection:'Elements', code:'HV-E01 LB', sizes:'30 × 30 in', thickness:'Varies by design', finish:'Matte', meta:'Layered MDF · 30 × 30 in', price:18500, description:'Inspired by nature. Crafted in layers. A study in purity, growth and inner peace.', asset:asset('lotus-bloom'), className:'product-three' },
  { id:'eclipse', name:'Eclipse', collection:'Elements', code:'HV-E02 EC', sizes:'30 × 30 in', thickness:'Varies by design', finish:'Matte / mixed', meta:'MDF + mixed material · 30 × 30 in', price:18200, description:'Inspired by alignment, with circular forms that hold movement, depth and harmony.', asset:asset('eclipse'), className:'product-one' },
  { id:'moon', name:'Moon Phases', collection:'Elements', code:'HV-E03 MP', sizes:'18 × 48 in', thickness:'Varies by design', finish:'Matte', meta:'Layered MDF · 18 × 48 in', price:21400, description:'A quiet rhythm of time and change, built in soft tones and layered forms.', asset:asset('moon-phases'), className:'product-two' },
  { id:'mountain-mist', name:'Mountain & Mist', collection:'Elements', code:'HV-E04 MM', sizes:'48 × 24 in', thickness:'Varies by design', finish:'Matte', meta:'Layered MDF · 48 × 24 in', price:22600, description:'Layered landscapes and soft horizons for a room that likes to breathe.', asset:asset('mountain-mist'), className:'product-three' },
  { id:'sun-horizon', name:'Sun / Horizon', collection:'Elements', code:'HV-E05 SH', sizes:'30 × 30 in', thickness:'Varies by design', finish:'Matte', meta:'Layered MDF · 30 × 30 in', price:17600, description:'Layered curves and earthy tones bring balance, light and a soothing rhythm.', asset:asset('sun-horizon'), className:'product-one' },
  { id:'ganesha', name:'Ganesha', collection:'Indian Minimal', code:'HV-I01 GN', sizes:'24 × 36 in', thickness:'Varies by design', finish:'Matte', meta:'Layered MDF · 24 × 36 in', price:19800, description:'Soft curves, earthy tones and a sense of prosperity for a positive room.', asset:asset('ganesha'), className:'product-two' },
  { id:'shiva', name:'Shiva', collection:'Indian Minimal', code:'HV-I02 SV', sizes:'24 × 36 in', thickness:'Varies by design', finish:'Matte', meta:'Layered MDF · 24 × 36 in', price:20500, description:'Stillness, boundless spirit and timeless calm in a minimal design language.', asset:asset('shiva'), className:'product-three' },
  { id:'krishna', name:'Krishna', collection:'Indian Minimal', code:'HV-I03 KR', sizes:'18 × 30 in', thickness:'Varies by design', finish:'Matte', meta:'Layered MDF · 18 × 30 in', price:18900, description:'Melody, movement and divine play captured through flowing forms and layered silhouettes.', asset:asset('krishna'), className:'product-one' },
  { id:'nataraja', name:'Nataraja', collection:'Indian Minimal', code:'HV-I04 NT', sizes:'24 × 36 in', thickness:'Varies by design', finish:'Matte', meta:'Layered MDF · 24 × 36 in', price:21800, description:'Cosmic rhythm, balance and movement held in layered form.', asset:asset('nataraja'), className:'product-two' }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const money = value => `₹${value.toLocaleString('en-IN')}`;

function productCardMarkup(product, index) { return `
  <article class="product-card" data-product-id="${product.id}" tabindex="0" aria-label="View ${product.name}">
    <div class="product-visual ${product.className}" data-collection="${product.collection}"><img src="${product.asset}" alt="${product.name} layered wall art" loading="lazy" /><span class="product-index">${String(index + 1).padStart(2,'0')} / ${product.collection}</span><span class="custom-badge">Customizable</span></div>
    <div class="product-info"><div><p class="eyebrow">${product.collection} · ${product.code}</p><h3>${product.name}</h3><p>${product.meta}</p></div><span class="product-price">${money(product.price)}</span></div>
    <span class="product-view">View piece ↗</span>
  </article>`; }

const featuredGrid = $('#featured-grid');
featuredGrid.innerHTML = products.slice(0, 3).map(productCardMarkup).join('');
const catalogGrid = $('#catalog-grid');
function renderCatalog(filter = 'all') {
  const visible = filter === 'all' ? products : products.filter(product => product.collection === filter);
  catalogGrid.innerHTML = visible.map((product, index) => productCardMarkup(product, products.indexOf(product))).join('');
  $('#catalog-count').textContent = `${String(visible.length).padStart(2,'0')} pieces / India only`;
}
renderCatalog();
$$('[data-filter]').forEach(button => button.addEventListener('click', () => { $$('[data-filter]').forEach(item => item.classList.remove('is-active')); button.classList.add('is-active'); renderCatalog(button.dataset.filter); }));

const modal = $('#product-modal');
let activeProduct = products[0];
function openProduct(product) {
  activeProduct = product;
  $('#modal-collection').textContent = `${product.collection.toUpperCase()} / ${String(products.indexOf(product) + 1).padStart(2, '0')}`;
  $('#modal-title').textContent = product.name;
  $('#modal-description').textContent = product.description;
  $('#modal-code').textContent = product.code;
  $('#modal-size').textContent = product.sizes;
  $('#modal-thickness').textContent = product.thickness;
  $('#modal-finish').textContent = product.finish;
  $('#modal-price').textContent = money(product.price);
  $('#modal-image').src = product.asset;
  $('#modal-image').alt = `${product.name} layered wall art`;
  modal.classList.add('is-open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('is-locked');
}
function closeProduct() { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('is-locked'); }
document.addEventListener('click', event => {
  const card = event.target.closest('.product-card');
  if (card) openProduct(products.find(product => product.id === card.dataset.productId));
});
document.addEventListener('keydown', event => { if (event.key === 'Enter' && event.target.closest('.product-card')) event.target.closest('.product-card').click(); });
$$('[data-close-product]').forEach(button => button.addEventListener('click', closeProduct));

let bag = [];
function updateBag() {
  $('#bag-count').textContent = bag.length;
  $('#bag-total').textContent = money(bag.reduce((sum, item) => sum + item.price, 0));
  const items = $('#bag-items');
  if (!bag.length) { items.innerHTML = '<div class="empty-bag"><span>◌</span><p>Your next piece is still<br />on the wall.</p><a class="text-link" href="#shop" data-close-bag>Explore the edit <span>↗</span></a></div>'; return; }
  items.innerHTML = bag.map((item, index) => `<div class="bag-item"><div class="bag-item-art ${item.className}"><img src="${item.asset || studioAsset('contour-clay')}" alt="" /></div><div><h4>${item.name}</h4><p>${item.collection} · made to order</p></div><strong>${money(item.price)}</strong><button class="remove-item text-link" data-remove-index="${index}" style="grid-column:2/-1;border:0;background:none;margin:0;padding:0;justify-self:start">Remove ×</button></div>`).join('');
}
function addToBag(item) { bag.push(item); updateBag(); closeProduct(); openBag(); showToast(`${item.name} added to your bag`); }
function openBag() { $('#bag-drawer').classList.add('is-open'); $('#bag-drawer').setAttribute('aria-hidden','false'); }
function closeBag() { $('#bag-drawer').classList.remove('is-open'); $('#bag-drawer').setAttribute('aria-hidden','true'); }
function showToast(message) { const toast = $('#toast'); toast.firstChild.textContent = message + ' '; toast.classList.add('is-visible'); window.clearTimeout(showToast.timeout); showToast.timeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2800); }
updateBag();
$('[data-open-bag]').addEventListener('click', openBag); $('[data-close-bag]').addEventListener('click', closeBag);
document.addEventListener('click', e => { const remove = e.target.closest('[data-remove-index]'); if (remove) { bag.splice(Number(remove.dataset.removeIndex),1); updateBag(); } });
$('[data-add-modal]').addEventListener('click', () => addToBag(activeProduct));
document.addEventListener('click', e => { if (e.target.matches('[data-close-bag]')) closeBag(); });

function toggleOverlay(id) { const panel = $(`#${id}`); panel.classList.toggle('is-open'); panel.setAttribute('aria-hidden', String(!panel.classList.contains('is-open'))); document.body.classList.toggle('is-locked', panel.classList.contains('is-open')); }
$('[data-open-search]').addEventListener('click', () => toggleOverlay('search-panel'));
$('[data-open-menu]').addEventListener('click', () => toggleOverlay('menu-panel'));
$$('[data-close-overlay]').forEach(button => button.addEventListener('click', () => { button.closest('.overlay').classList.remove('is-open'); document.body.classList.remove('is-locked'); }));

const worldCopy = { Form:'Form — contour, rhythm, movement', Elements:'Elements — orbit, light, gravity', 'Indian Minimal':'Indian Minimal — ritual, line, stillness' };
$$('.world-card').forEach(card => card.addEventListener('click', () => { $$('.world-card').forEach(item => item.classList.remove('is-active')); card.classList.add('is-active'); $('#world-status-text').textContent = worldCopy[card.dataset.collection]; }));
const worldTrack = $('.world-track'); let isDown = false; let startX; let scrollLeft;
worldTrack.addEventListener('pointerdown', e => { isDown = true; startX = e.pageX - worldTrack.offsetLeft; scrollLeft = worldTrack.scrollLeft; worldTrack.setPointerCapture(e.pointerId); });
worldTrack.addEventListener('pointerup', () => isDown = false); worldTrack.addEventListener('pointercancel', () => isDown = false); worldTrack.addEventListener('pointermove', e => { if (!isDown) return; e.preventDefault(); const x = e.pageX - worldTrack.offsetLeft; worldTrack.scrollLeft = scrollLeft - (x - startX) * 1.2; });

const roomPreview = $('#room-preview');
$('#room-file').addEventListener('change', event => { const file = event.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = e => { $('#room-upload').src = e.target.result; roomPreview.classList.add('has-upload'); $('#upload-title').textContent = file.name; const art = $('#placed-art'); art.style.left = '50%'; art.style.top = '43%'; art.classList.remove('is-left','is-right'); $('[data-pos="center"]').classList.add('is-active'); $('#position-value').textContent = 'Auto-placed'; showToast('Artwork auto-placed — drag to fine-tune'); }; reader.readAsDataURL(file); });
const artChoices = [products[0], products[1], products[2]];
$('#visual-choice').innerHTML = artChoices.map((product, index) => `<button class="mini-choice ${index === 0 ? 'is-active' : ''}" data-visual-id="${product.id}" aria-label="Choose ${product.name}"><img src="${product.asset}" alt="" /></button>`).join('');
$$('.mini-choice').forEach(choice => choice.addEventListener('click', () => { $$('.mini-choice').forEach(item => item.classList.remove('is-active')); choice.classList.add('is-active'); const selected = products.find(product => product.id === choice.dataset.visualId); $('.placed-art span').textContent = selected.name; $('#placed-art-image').src = selected.asset; $('#placed-art-image').alt = `${selected.name} preview`; }));
let fineScale = 1;
let wallCalibration = 1;
function updateArtworkScale() { $('.placed-art').style.setProperty('--art-scale', fineScale * wallCalibration); }
$('#scale-range').addEventListener('input', e => { const value = Number(e.target.value); fineScale = value / 100; $('#scale-value').textContent = `${value}%`; updateArtworkScale(); });
$('#wall-width-range').addEventListener('input', e => { const value = Number(e.target.value); wallCalibration = Math.max(.72, Math.min(1.35, 10 / value)); $('#wall-width-value').textContent = `${value} ft`; updateArtworkScale(); });
$$('[data-pos]').forEach(button => button.addEventListener('click', () => { $$('[data-pos]').forEach(item => item.classList.remove('is-active')); button.classList.add('is-active'); const pos = button.dataset.pos; const art = $('.placed-art'); art.classList.remove('is-left','is-right'); art.style.left = pos === 'left' ? '37%' : pos === 'right' ? '63%' : '50%'; art.style.top = '43%'; if (pos !== 'center') art.classList.add(`is-${pos}`); $('#position-value').textContent = pos === 'center' ? 'Centred' : pos[0].toUpperCase() + pos.slice(1); }));
$('[data-save-visual]').addEventListener('click', () => showToast('View saved to your HUEVOKE board'));

const placedArt = $('#placed-art');
let draggingArt = false;
placedArt.addEventListener('pointerdown', event => { draggingArt = true; placedArt.classList.add('is-dragging'); placedArt.setPointerCapture(event.pointerId); });
placedArt.addEventListener('pointermove', event => {
  if (!draggingArt) return;
  const bounds = roomPreview.getBoundingClientRect();
  const left = Math.max(12, Math.min(88, ((event.clientX - bounds.left) / bounds.width) * 100));
  const top = Math.max(15, Math.min(78, ((event.clientY - bounds.top) / bounds.height) * 100));
  placedArt.style.left = `${left}%`;
  placedArt.style.top = `${top}%`;
  placedArt.classList.remove('is-left','is-right');
  $$('[data-pos]').forEach(item => item.classList.remove('is-active'));
  $('#position-value').textContent = 'Fine-tuned';
});
placedArt.addEventListener('pointerup', () => { draggingArt = false; placedArt.classList.remove('is-dragging'); });
placedArt.addEventListener('pointercancel', () => { draggingArt = false; placedArt.classList.remove('is-dragging'); });

const customName = $('#custom-name');
customName.addEventListener('input', e => { $('#custom-name-preview').textContent = e.target.value.trim().toUpperCase() || 'UNTITLED FORM'; });
const paletteNames = { sand:'SAND / CHARCOAL', terracotta:'TERRACOTTA / BONE', olive:'OLIVE / SAND', ink:'INK / IVORY' };
$$('[data-palette]').forEach(swatch => swatch.addEventListener('click', () => { $$('[data-palette]').forEach(item => item.classList.remove('is-active')); swatch.classList.add('is-active'); const palette = swatch.dataset.palette; $('#custom-palette-preview').textContent = paletteNames[palette]; const poster = $('.custom-poster'); poster.style.background = palette === 'terracotta' ? '#e1c0ae' : palette === 'olive' ? '#d4d5c7' : palette === 'ink' ? '#d6d5ce' : '#eee8dc'; poster.dataset.palette = palette; }));
$$('[data-frame]').forEach(button => button.addEventListener('click', () => { $$('[data-frame]').forEach(item => item.classList.remove('is-active')); button.classList.add('is-active'); }));
let customArtwork = 'studio/contour-clay';
let customSize = '24 × 36 in';
$$('[data-custom-art]').forEach(button => button.addEventListener('click', () => { $$('[data-custom-art]').forEach(item => item.classList.remove('is-active')); button.classList.add('is-active'); customArtwork = button.dataset.customArt; $('.poster-artwork').src = asset(customArtwork); $('.poster-artwork').alt = `${button.textContent.trim()} custom artwork preview`; }));
$$('[data-custom-size]').forEach(button => button.addEventListener('click', () => { $$('[data-custom-size]').forEach(item => item.classList.remove('is-active')); button.classList.add('is-active'); customSize = button.dataset.customSize; }));
$('[data-add-custom]').addEventListener('click', () => { bag.push({ id:'custom', name:customName.value.trim() || 'Untitled Form', collection:`Custom studio · ${customSize}`, price:18500, className:'product-one', asset:asset(customArtwork) }); updateBag(); showToast('Your custom piece is in the bag'); });

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }), { threshold:.12 });
$$('.reveal').forEach(item => observer.observe(item));
const searchInput = $('.big-search');
function updateSearch(query = '') {
  const normalized = query.trim().toLowerCase();
  const results = products.filter(product => `${product.name} ${product.collection} ${product.description}`.toLowerCase().includes(normalized)).slice(0, 5);
  $('.search-suggestions').innerHTML = results.length
    ? results.map(product => `<button type="button" data-search-product="${product.id}">${product.name} <span>${product.collection}</span></button>`).join('')
    : '<small>No pieces found. Try “Form”, “Ganesha” or “Moon”.</small>';
}
searchInput.addEventListener('input', event => updateSearch(event.target.value));
document.addEventListener('click', event => { const result = event.target.closest('[data-search-product]'); if (!result) return; toggleOverlay('search-panel'); openProduct(products.find(product => product.id === result.dataset.searchProduct)); });
updateSearch();

window.addEventListener('scroll', () => { document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`); $('.site-header').classList.toggle('is-scrolled', window.scrollY > 40); });
window.addEventListener('mousemove', e => { const orb = $('.cursor-orb'); orb.style.opacity = '1'; orb.style.left = `${e.clientX}px`; orb.style.top = `${e.clientY}px`; });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeProduct(); closeBag(); $$('.overlay').forEach(panel => panel.classList.remove('is-open')); document.body.classList.remove('is-locked'); } });
