let Faq = `*[_type=="faq"]`;
let Articles = `*[_type=="articles"]`;



function dynamicFaqQueryFunc(query){
  let PROJECT_ID ='8ovfuzs4';
  let DATASET = 'production';
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function dynamicArticlesQueryFunc(query){
  let PROJECT_ID ='8ovfuzs4';
  let DATASET = 'production';
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function urlFor(source) {
  return builder.image(source)
}

let DataQueriesArticles = {
  articles: `*[_type=="articles"]{desc,title,slug,time,date,name,
  mainImage{asset->{url}}
  }`,
}
let DataQueriesFaq = {
  faq: `*[_type=="faq"]{question,answer,title,slug}
  `, 
};

async function getApiDataArticles(articlesQuery,cb) {
  let url = dynamicArticlesQueryFunc(articlesQuery);
  fetch(url).then((res) => res.json()).then((res) => cb(res.result))

}

async function getApiDataFaq(faqQuery,cb) {
  let url = dynamicFaqQueryFunc(faqQuery);
  fetch(url).then((res) => res.json()).then((res) => cb(res.result))

}
const ArticlesData = document.querySelector(".articles");
const renderArticlesData = (articles) =>{
  articles && articles.forEach(article => {
    ArticlesData.innerHTML += `
    <div class="col-xl-4 col-md-6 col-sm-12">
        <div class="categories">
          <div class="categories-img-box">
            <img src="${article.mainImage.asset.url}" alt="">
          </div>
          <div class="name">
            <h3>${article.name}</h3>
          </div>
          <div class="dates">
            <div class="date">
              <i class="ri-calendar-2-line"></i>
              <h3>${article.date}</h3>
            </div>
            <div class="time">
              <i class="ri-timer-2-line"></i>
              <h3>${article.time}</h3>
            </div>
          </div>
          <div class="categories-btn">
            <a href="#">Read more</a>
          </div>
        </div>
      </div>
    `
  })
}
getApiDataArticles(DataQueriesArticles.articles,(data)=>{
  renderArticlesData(data);
});


const ACCARDION_DATA = document.querySelector(".accardion-data");
const renderAccardionData = (data) => {
  data &&
    data.forEach((faq, index) => {
      ACCARDION_DATA.innerHTML += `
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-heading-${index}">
            <button class="accordion-button collapsed" type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#flush-collapse-${index}" 
              aria-expanded="false" 
              aria-controls="flush-collapse-${index}">
              ${faq.question}
            </button>
          </h2>
          <div id="flush-collapse-${index}" class="accordion-collapse collapse" 
            aria-labelledby="flush-heading-${index}" 
            data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
              ${faq.answer}
            </div>
          </div>
        </div>
      `;
    });
};

  getApiDataFaq(DataQueriesFaq.faq, (data) => {
    renderAccardionData(data);
  });

  var swiper = new Swiper(".testSwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


  


  
let cart = JSON.parse(localStorage.getItem("cart")) || [];
function addToCart() {
  
  const property = {
    id: document.getElementById("blog-name").innerText, 
    name: document.getElementById("blog-name").innerText,
    price: parseFloat(document.getElementById("blog-price").innerText.replace("$", "")) || 0,
    image: document.getElementById("blog-image").src,
    quantity: 1,
  };


  const existingItem = cart.find((item) => item.id === property.id);

  if (existingItem) {
    existingItem.quantity += 1; 
  } else {
    cart.push(property);
  }

  saveCartToLocalStorage(); 
  renderCartModal(); 
}

// Render Cart Modal Function
function renderCartModal() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; 

  let total = 0;

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <div class="img">
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
        </div>
        <div class="items">
        <h4>${item.name}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: $${itemTotal.toFixed(2)}</p></div>
        <div class="btn"><button onclick="removeFromCart('${item.id}')">Remove</button></div>
      </div>
    `;
  });

  document.getElementById("cart-total").innerText = total.toFixed(2);
  document.getElementById("cart-modal").style.display = "block";
}

function removeFromCart(id) {
  const item = cart.find((item) => item.id === id); 

  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      cart = cart.filter((item) => item.id !== id);
    }
  }

  saveCartToLocalStorage(); 
  renderCartModal(); 
}

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart)); 
}


function closeModal() {
  event.preventDefault();
  document.getElementById("cart-modal").style.display = "none";
}

// Close modal on clicking the backdrop
document.getElementById("cart-modal").addEventListener("click", (event) => {
  const modalContent = document.querySelector(".modal-content");
  if (!modalContent.contains(event.target)) {
    closeModal();
  }
});

// Show the cart modal when the Cart link is clicked
document.getElementById("cart-link").addEventListener("click", function(event) {
  event.preventDefault();
  renderCartModal(); 
  document.getElementById("cart-modal").style.display = "block"; 
});

// Close the cart modal
function closeModal() {
  document.getElementById("cart-modal").style.display = "none"; 
}

//existing renderCartModal function will be used to render the cart contents
function renderCartModal() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = ""; 

  let total = 0;
  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    cartItemsContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
        <h4>${item.name}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: $${itemTotal.toFixed(2)}</p>
        <button onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    `;
  });

  document.getElementById("cart-total").innerText = total.toFixed(2); 
}
  