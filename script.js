/* تغيير الثيم */

function setTheme(theme){

document.body.classList.remove(
"white-theme",
"black-theme",
"rgb-theme"
);

if(theme === "white"){

document.body.classList.add(
"white-theme"
);

}

if(theme === "black"){

document.body.classList.add(
"black-theme"
);

}

if(theme === "rgb"){

document.body.classList.add(
"rgb-theme"
);

}

}

/* تشغيل المنتجات تلقائياً عند فتح الموقع */

document.addEventListener("DOMContentLoaded", function(){

displayProducts(products);

});
