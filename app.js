const $ = s => document.querySelector(s);
const money = n => `${Number(n).toFixed(2).replace(/\.00$/,"")} ${STORE_CONFIG.currency}`;
const read = (key, fallback) => { try { const v=localStorage.getItem(key); return v?JSON.parse(v):fallback; } catch { return fallback; } };
let categories = read("shamy_categories", DEFAULT_CATEGORIES);
let products = read("shamy_products", DEFAULT_PRODUCTS);
let cart = read("shamy_cart", []);
let activeCategory = "all";
let searchTerm = "";

function saveCart(){localStorage.setItem("shamy_cart",JSON.stringify(cart));}
function categoryName(id){return categories.find(c=>c.id===id)?.name || "متنوع";}
function renderCategories(){
  const list=$("#categoryList");
  list.innerHTML=`<button class="category-card ${activeCategory==="all"?"active":""}" data-category="all"><span class="category-icon">✨</span><b>كل المنتجات</b></button>`+
  categories.map(c=>`<button class="category-card ${activeCategory===c.id?"active":""}" data-category="${c.id}"><span class="category-icon">${c.icon||"🛍️"}</span><b>${escapeHTML(c.name)}</b></button>`).join("");
  list.querySelectorAll("[data-category]").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.category;renderCategories();renderProducts();}));
}
function renderProducts(){
  const shown=products.filter(p=>(activeCategory==="all"||p.category===activeCategory)&&(`${p.name} ${p.description||""}`).toLowerCase().includes(searchTerm.toLowerCase()));
  $("#productsTitle").innerHTML=activeCategory==="all"?"منتجات <em>مميزة</em>":`${escapeHTML(categoryName(activeCategory))}`;
  const list=$("#productGrid");
  list.innerHTML=shown.map(p=>`<article class="product-card"><div class="product-image">${p.image?`<img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.name)}" onerror="this.remove()">`:p.emoji||"🛍️"}</div><div class="product-info"><span class="product-category">${escapeHTML(categoryName(p.category))}</span><h3>${escapeHTML(p.name)}</h3><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-btn" data-add="${escapeAttr(p.id)}" aria-label="أضف للسلة">+</button></div></div></article>`).join("");
  $("#emptyState").classList.toggle("hidden",shown.length>0);
  list.querySelectorAll("[data-add]").forEach(b=>b.addEventListener("click",()=>addToCart(b.dataset.add)));
}
function addToCart(id){const p=products.find(x=>x.id===id);if(!p)return;const row=cart.find(x=>x.id===id);if(row)row.qty++;else cart.push({id,qty:1});saveCart();renderCart();openCart();}
function changeQty(id,delta){const row=cart.find(x=>x.id===id);if(!row)return;row.qty+=delta;if(row.qty<=0)cart=cart.filter(x=>x.id!==id);saveCart();renderCart();}
function selectedDeliveryFee(){
  const select=$("#deliveryArea");
  return select && select.selectedOptions[0] ? Number(select.selectedOptions[0].dataset.fee || 0) : 0;
}
function renderCart(){
  $("#cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
  const rows=cart.map(row=>{const p=products.find(x=>x.id===row.id);if(!p)return "";return `<div class="cart-row"><div><h4>${escapeHTML(p.name)}</h4><small>${money(p.price)} × ${row.qty}</small></div><div class="qty-controls"><button data-qty="${p.id}" data-delta="-1">−</button><b>${row.qty}</b><button data-qty="${p.id}" data-delta="1">+</button></div></div>`}).join("");
  $("#cartItems").innerHTML=rows||'<p class="empty-state">السلة لسه فاضية. اختار المنتجات اللي محتاجها.</p>';
  const subtotal=cart.reduce((s,row)=>s+(products.find(p=>p.id===row.id)?.price||0)*row.qty,0);
  $("#subtotal").textContent=money(subtotal);const fee=selectedDeliveryFee();
  $("#deliveryFee").textContent=cart.length?(($("#deliveryArea")?.value)?money(fee):"اختار المنطقة"):"—";
  $("#grandTotal").textContent=money(subtotal+(cart.length?fee:0));
  $("#cartItems").querySelectorAll("[data-qty]").forEach(b=>b.addEventListener("click",()=>changeQty(b.dataset.qty,Number(b.dataset.delta))));
}
function openCart(){$("#cartDrawer").classList.add("open");$("#overlay").classList.add("show");}
function closeCart(){$("#cartDrawer").classList.remove("open");$("#overlay").classList.remove("show");}
function escapeHTML(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function escapeAttr(v){return escapeHTML(v);}
$("#openCart").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#overlay").addEventListener("click",closeCart);
$("#searchInput").addEventListener("input",e=>{searchTerm=e.target.value.trim();activeCategory="all";renderCategories();renderProducts();});
$("#searchBtn").addEventListener("click",()=>$("#products").scrollIntoView({behavior:"smooth"}));
$("#showAll").addEventListener("click",()=>{activeCategory="all";searchTerm="";$("#searchInput").value="";renderCategories();renderProducts();});
$("#checkoutForm").addEventListener("submit",e=>{
  e.preventDefault();
  if(!cart.length){alert("السلة فاضية. أضف منتجات الأول.");return;}
  if(!STORE_CONFIG.whatsapp||STORE_CONFIG.whatsapp==="201000000000"){alert("قبل استقبال الطلبات، أضف رقم واتساب المتجر في ملف config.js.");return;}
  const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  const area=data.deliveryArea;
  if(!area){alert("من فضلك اختار منطقة التوصيل.");$("#deliveryArea").focus();return;}
  const lines=cart.map(row=>{const p=products.find(x=>x.id===row.id);return p?`• ${p.name} — ${row.qty} × ${money(p.price)} = ${money(p.price*row.qty)}`:"";}).filter(Boolean);
  const subtotal=cart.reduce((s,row)=>s+(products.find(p=>p.id===row.id)?.price||0)*row.qty,0);
  const deliveryFee=selectedDeliveryFee();
  const total=subtotal+deliveryFee;
  const message=`طلب جديد من ${STORE_CONFIG.name}%0A%0Aبيانات العميل:%0Aالاسم: ${encodeURIComponent(data.customerName)}%0Aرقم الهاتف: ${encodeURIComponent(data.customerPhone)}%0Aمنطقة التوصيل: ${encodeURIComponent(area)}%0Aالعنوان بالتفصيل: ${encodeURIComponent(data.customerAddress)}%0A%0Aتفاصيل الطلب:%0A${encodeURIComponent(lines.join("\n"))}%0A%0Aإجمالي المنتجات: ${encodeURIComponent(money(subtotal))}%0Aمصاريف التوصيل (${encodeURIComponent(area)}): ${encodeURIComponent(money(deliveryFee))}%0Aالإجمالي النهائي: ${encodeURIComponent(money(total))}%0Aطريقة الدفع: كاش عند الاستلام%0Aملاحظات العميل: ${encodeURIComponent(data.orderNote||"لا يوجد")}`;
  window.open(`https://wa.me/${STORE_CONFIG.whatsapp}?text=${message}`,"_blank");
});
$("#deliveryArea")?.addEventListener("change",renderCart);
$("#year").textContent=new Date().getFullYear();
renderCategories();renderProducts();renderCart();
