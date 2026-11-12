// بيانات المتجر: عدّل القيم دي قبل نشر الموقع
window.STORE_CONFIG = {
  name: "الشامي ماركت",
  whatsapp: "201023713311", // اكتب رقم واتساب بكود الدولة بدون + أو مسافات، مثال مصر: 2010XXXXXXXX
  deliveryFee: 0, // يتم تحديدها تلقائيًا حسب المنطقة المختارة          // رسوم التوصيل بالجنيه
  currency: "ج.م"
};

// يبدأ المتجر ببيانات تجريبية. غيّرها أو أضف منتجاتك من لوحة الإدارة.
window.DEFAULT_CATEGORIES = [
  {id:"grocery", name:"بقالة", icon:"🛒"},
  {id:"dairy", name:"ألبان وجبن", icon:"🥛"},
  {id:"drinks", name:"مشروبات", icon:"🥤"},
  {id:"snacks", name:"سناكس وحلويات", icon:"🍫"},
  {id:"cleaning", name:"منظفات", icon:"🧴"},
  {id:"personal", name:"عناية شخصية", icon:"🧼"},
  {id:"frozen", name:"مجمدات", icon:"🧊"},
  {id:"produce", name:"خضروات وفاكهة", icon:"🥬"},
  {id:"bakery", name:"مخبوزات", icon:"🥐"}
];
window.DEFAULT_PRODUCTS = [
  {id:"p1",name:"أرز أبيض 1 كجم",category:"grocery",price:35,description:"أرز أبيض — عبوة 1 كجم",image:"https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=85",emoji:"🍚",featured:true,stock:20},
  {id:"p2",name:"زيت طعام 1 لتر",category:"grocery",price:75,description:"زيت للطهي — 1 لتر",image:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85",emoji:"🫒",featured:true,stock:15},
  {id:"p3",name:"لبن كامل الدسم",category:"dairy",price:32,description:"عبوة لبن كامل الدسم",image:"https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=85",emoji:"🥛",featured:true,stock:25},
  {id:"p4",name:"جبنة",category:"dairy",price:48,description:"منتج ألبان",image:"https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=700&q=85",emoji:"🧀",featured:false,stock:12},
  {id:"p5",name:"عصير فواكه",category:"drinks",price:25,description:"مشروب بطعم الفواكه",image:"https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=85",emoji:"🧃",featured:true,stock:18},
  {id:"p6",name:"شوكولاتة",category:"snacks",price:20,description:"شوكولاتة",image:"https://images.unsplash.com/photo-1548907040-4d42c2a2f4c5?auto=format&fit=crop&w=700&q=85",emoji:"🍫",featured:false,stock:30},
  {id:"p7",name:"منظف منزلي",category:"cleaning",price:95,description:"منظف للاستخدام المنزلي",image:"https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=700&q=85",emoji:"🧺",featured:false,stock:10},
  {id:"p8",name:"عناية شخصية",category:"personal",price:65,description:"منتج للعناية الشخصية",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85",emoji:"🧴",featured:false,stock:14},
  {id:"p9",name:"خضروات طازجة",category:"produce",price:30,description:"خضروات طازجة حسب المتاح",image:"https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=85",emoji:"🥬",featured:true,stock:25},
  {id:"p10",name:"خبز ومخبوزات",category:"bakery",price:20,description:"مخبوزات طازجة",image:"https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=85",emoji:"🥐",featured:false,stock:20},
  {id:"p11",name:"فواكه طازجة",category:"produce",price:40,description:"تشكيلة فواكه",image:"https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=85",emoji:"🍊",featured:true,stock:18},
  {id:"p12",name:"منتجات مجمدة",category:"frozen",price:55,description:"منتجات مجمدة متنوعة",image:"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=85",emoji:"🧊",featured:false,stock:10}
];
