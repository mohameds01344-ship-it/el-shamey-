const $=s=>document.querySelector(s);
const load=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
let cats=load("shamy_categories",DEFAULT_CATEGORIES),prods=load("shamy_products",DEFAULT_PRODUCTS);
const save=()=>{localStorage.setItem("shamy_categories",JSON.stringify(cats));localStorage.setItem("shamy_products",JSON.stringify(prods));};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function render(){
 $("#productCount").textContent=prods.length;$("#categoryCount").textContent=cats.length;
 $("#productCategory").innerHTML=cats.map(c=>`<option value="${esc(c.id)}">${esc(c.name)}</option>`).join("");
 $("#productTable").innerHTML=prods.map(p=>`<tr><td>${esc(p.name)}</td><td>${esc(cats.find(c=>c.id===p.category)?.name||"—")}</td><td>${p.price} ج.م</td><td>${p.stock??"—"}</td><td class="row-actions"><button class="edit" data-edit="${esc(p.id)}">تعديل</button><button class="delete" data-delete="${esc(p.id)}">حذف</button></td></tr>`).join("");
 $("#categoryChips").innerHTML=cats.map(c=>`<span class="chip">${c.icon||"🛍️"} ${esc(c.name)} <button data-catdel="${esc(c.id)}">×</button></span>`).join("");
 document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>edit(b.dataset.edit));
 document.querySelectorAll("[data-delete]").forEach(b=>b.onclick=()=>{if(confirm("متأكد من حذف المنتج؟")){prods=prods.filter(p=>p.id!==b.dataset.delete);save();render();}});
 document.querySelectorAll("[data-catdel]").forEach(b=>b.onclick=()=>{const id=b.dataset.catdel;if(prods.some(p=>p.category===id)){alert("انقل منتجات القسم لقسم آخر أو احذفها أولاً.");return;}if(confirm("حذف القسم؟")){cats=cats.filter(c=>c.id!==id);save();render();}});
}
function resetForm(){$("#productForm").reset();$("#productId").value="";$("#productForm").classList.add("hidden");}
function edit(id){const p=prods.find(x=>x.id===id);if(!p)return;$("#productId").value=p.id;$("#productName").value=p.name;$("#productCategory").value=p.category;$("#productPrice").value=p.price;$("#productStock").value=p.stock??0;$("#productDescription").value=p.description||"";$("#productImage").value=p.image||"";$("#productFeatured").checked=!!p.featured;$("#productForm").classList.remove("hidden");window.scrollTo({top:0,behavior:"smooth"});}
$("#newProduct").onclick=()=>{$("#productForm").classList.remove("hidden");$("#productForm").reset();$("#productId").value="";};
$("#cancelEdit").onclick=resetForm;
$("#productForm").onsubmit=e=>{e.preventDefault();const id=$("#productId").value||"p"+Date.now();const item={id,name:$("#productName").value.trim(),category:$("#productCategory").value,price:Number($("#productPrice").value),stock:Number($("#productStock").value),description:$("#productDescription").value.trim(),image:$("#productImage").value.trim(),emoji:"🛍️",featured:$("#productFeatured").checked};const i=prods.findIndex(p=>p.id===id);if(i>=0)prods[i]=item;else prods.unshift(item);save();resetForm();render();alert("تم حفظ المنتج في هذا المتصفح.");};
$("#categoryForm").onsubmit=e=>{e.preventDefault();const name=$("#categoryName").value.trim();if(!name)return;cats.push({id:"cat"+Date.now(),name,icon:$("#categoryIcon").value.trim()||"🛍️"});save();e.target.reset();render();};
$("#exportData").onclick=()=>{const blob=new Blob([JSON.stringify({categories:cats,products:prods},null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="el-shamy-market-backup.json";a.click();URL.revokeObjectURL(a.href);};
$("#resetData").onclick=()=>{if(confirm("سيتم استعادة بيانات البداية وحذف التعديلات المحلية. متأكد؟")){localStorage.removeItem("shamy_categories");localStorage.removeItem("shamy_products");cats=DEFAULT_CATEGORIES;prods=DEFAULT_PRODUCTS;render();}};
render();
