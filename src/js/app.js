// // // import {createClient} from '@sanity/client'
// // const {createClient} = require("@sanity/client");
// // const client = createClient({
// //   projectId: '8ovfuzs4',
// //   dataset: 'production',
// //   useCdn: true, // set to `false` to bypass the edge cache
// //   apiVersion: '2023-05-03',
// //   token:"",
// // })


// let BlogQuery = `*[_type=="blogs"]`;
// let CategoriesQuery = `*[_type=="categories"]`;
// let StaffSlider = `*[_type=="staffslider"]`;
// // export async function getPosts() {
// //   const posts = await client.fetch('*[_type == "post"]')
// //   return posts
// // }
// function dynamicBlogQueryFunc(query){
//   let PROJECT_ID ='8ovfuzs4';
// let DATASET = 'production';
//   return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
// }
// function dynamicCategoriesQueryFunc(query){
//   let PROJECT_ID ='8ovfuzs4';
//   let DATASET = 'production';
//   return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
// }

// function dynamicStaffSliderQueryFunc(query){
//   let PROJECT_ID ='8ovfuzs4';
//   let DATASET = 'production';
//   return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
// }
// // fetch(PROJECT_URL).then((res) => res.json()).then((res) => {
// //   console.log(res);
// // });

// function urlFor(source) {
//   return builder.image(source)
// }

// let DataQueries = {
//   blogs: `*[_type=="blogs"]{desc,title,price,transactions,location,room,bathroom,garage,slug,size,name,
//   mainImage{asset->{url}}
//   }`,
//   // blogById:`*[_type=="blogs" && _id=="$id"]`
// }

// let DataQueriesCategory = {
//   categories: `*[_type=="categories"]{desc,title,slug,paragraph,name,
//   mainImage{asset->{url}}
//   }`,
//   // blogById:`*[_type=="blogs" && _id=="$id"]`
// }

// let DataQueriesStaffSlider = {
//   staffslider: `*[_type=="staffslider"]{desc,title,slug,paragraph,name,
//   mainImage{asset->{url}}
//   }`,
//   // blogById:`*[_type=="blogs" && _id=="$id"]`
// }

// async function getApiData(blogQuery,cb) {
//    let url = dynamicBlogQueryFunc(blogQuery);
//    fetch(url).then((res) => res.json()).then((res) => cb(res.result))

// }
// async function getApiDataCat(categoriesQuery,cb) {
//   let url = dynamicCategoriesQueryFunc(categoriesQuery);
//   fetch(url).then((res) => res.json()).then((res) => cb(res.result))

// }
// async function getApiDataSlide(StaffSlider,cb) {
//   let url = dynamicStaffSliderQueryFunc(StaffSlider);
//   fetch(url).then((res) => res.json()).then((res) => cb(res.result))

// }
// const BlogData = document.querySelector(".data-blogs");
// const DataWithSlider = document.querySelector(".slider-blog-el");
// const renderBlogsData = (blogs) =>{
//   blogs && blogs.forEach(blog => {
//     BlogData.innerHTML += `
//     <div class="col-xl-4 col-md-6 col-sm-12">
//           <div class="blog">
//             <div class="blog-img-box">
//               <div class="all">
//                 <div class="transactions">
//                   <h2>${blog.transactions}</h2>
//                 </div>
//                 <div class="price">
//                   <h2>${blog.price}</h2>
//                 </div>
//               </div>
//               <img src="${blog.mainImage.asset.url}" alt="">
//             </div>
//             <div class="name">
//               <h3>${blog.name}</h3>
//             </div>
//             <div class="location">
//               <i class="ri-map-pin-2-line"></i>
//               <h3>${blog.location}</h3>
//             </div>
//             <div class="details">
//               <div class="size">
//                 <i class="ri-drag-move-2-fill"></i>
//                 <h3>${blog.size} sqrt</h3>
//               </div>
//               <div class="rooms">
//                 <i class="ri-hotel-bed-line"></i>
//                 <h3>${blog.room}</h3>
//               </div>
//               <div class="bathroom">
//                 <i class="ri-drop-line"></i>
//                 <h3>${blog.bathroom}</h3>
//               </div>
//               <div class="garage">
//                 <i class="ri-roadster-line"></i>
//                 <h3>${blog.garage}</h3>
//               </div>
//             </div>
//           </div>
//         </div>
//   `
//   });
// }

// getApiData(DataQueries.blogs,(data)=>{
//   renderBlogsData(data)
// })

// const CategoriesData = document.querySelector(".data-categories");
// const renderCategoriesData = (categories) =>{
//   categories && categories.forEach(category => {
//     CategoriesData.innerHTML += `
//     <div class="col-xl-4 col-md-6 col-sm-12">
//         <div class="categories">
//           <div class="categories-img-box">
//             <img src="${category.mainImage.asset.url}" alt="">
//           </div>
//           <div class="name">
//             <h3>${category.name}</h3>
//           </div>
//           <div class="paragraph">
//             <p>${category.paragraph}</p>
//           </div>
//           <div class="categories-btn">
//             <a href="#">Explore Now</a>
//           </div>
//         </div>
//       </div>
    
//     `
//   })
// }
// getApiDataCat(DataQueriesCategory.categories,(data)=>{
//   renderCategoriesData(data)
// })


// const renderBlogsDataSlider = (slides) =>{
//   slides && slides.forEach((slide)=> {
//     DataWithSlider.innerHTML += `
//     <div class="swiper-slide">
//     <img src="${slide?.mainImage?.asset?.url}" class="card-img-top w-100" alt="">
//     <div class="intro">
//     <h1>${slide.name}</h1>
//     <p>${slide.paragraph}</p>
//     </div>
//     </div>
    
    
//     `
//   });
// }
// getApiDataSlide(DataQueriesStaffSlider.staffslider,(data)=>{
//   renderBlogsDataSlider(data)
// })
// window.addEventListener("DOMContentLoaded", () => {
//   var swiper = new Swiper(".mySwiper", {
//     slidesPerView: 4,
//     spaceBetween: 30,
//     autoplay: {
//       delay: 500, 
//       disableOnInteraction: false, 
//     },
//     speed: 1000, 
//   });
// });

// var swiper = new Swiper(".testSwiper", {
//   slidesPerView: "auto",
//   centeredSlides: true,
//   spaceBetween: 30,
//   // pagination: {
//   //   el: ".swiper-pagination",
//   //   clickable: true,
//   // },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

// // import {createClient} from '@sanity/client'
// const {createClient} = require("@sanity/client");
// const client = createClient({
//   projectId: '8ovfuzs4',
//   dataset: 'production',
//   useCdn: true, // set to `false` to bypass the edge cache
//   apiVersion: '2023-05-03',
//   token:"",
// })


let BlogQuery = `*[_type=="blogs"]`;
let CategoriesQuery = `*[_type=="categories"]`;
let StaffSlider = `*[_type=="staffslider"]`;
let Articles = `*[_type=="articles"]`;
let Faq = `*[_type=="faq"]`;
// let BlogPage = `*[_type=="blogpage"]`;
// export async function getPosts() {
//   const posts = await client.fetch('*[_type == "post"]')
//   return posts
// }
function dynamicBlogQueryFunc(query){
  let PROJECT_ID ='8ovfuzs4';
let DATASET = 'production';
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}
function dynamicCategoriesQueryFunc(query){
  let PROJECT_ID ='8ovfuzs4';
  let DATASET = 'production';
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function dynamicStaffSliderQueryFunc(query){
  let PROJECT_ID ='8ovfuzs4';
  let DATASET = 'production';
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function dynamicArticlesQueryFunc(query){
  let PROJECT_ID ='8ovfuzs4';
  let DATASET = 'production';
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}
function dynamicFaqQueryFunc(query){
  let PROJECT_ID ='8ovfuzs4';
  let DATASET = 'production';
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}
// function dynamicBlogPageQueryFunc(query){
//   let PROJECT_ID ='8ovfuzs4';
//   let DATASET = 'production';
//   return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
// }

// fetch(PROJECT_URL).then((res) => res.json()).then((res) => {
//   console.log(res);
// });

function urlFor(source) {
  return builder.image(source)
}

let DataQueries = {
  blogs: `*[_type=="blogs"]{desc,title,_id,price,transactions,location,room,bathroom,garage,slug,size,name,
  mainImage{asset->{url}}
  }`,
}

let DataQueriesCategory = {
  categories: `*[_type=="categories"]{desc,title,slug,paragraph,name,
  mainImage{asset->{url}}
  }`,
}

let DataQueriesStaffSlider = {
  staffslider: `*[_type=="staffslider"]{desc,title,slug,paragraph,name,
  mainImage{asset->{url}}
  }`,
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

// let DataQueriesBlogPage = {
//   blogpage: `*[_type=="blogpage"]{desc,title,slug,time,date,name,
//   mainImage{asset->{url}}
//   }`
// };

async function getApiData(blogQuery,cb) {
   let url = dynamicBlogQueryFunc(blogQuery);
   fetch(url).then((res) => res.json()).then((res) => cb(res.result))

}
async function getApiDataCat(categoriesQuery,cb) {
  let url = dynamicCategoriesQueryFunc(categoriesQuery);
  fetch(url).then((res) => res.json()).then((res) => cb(res.result))

}
async function getApiDataSlide(StaffSlider,cb) {
  let url = dynamicStaffSliderQueryFunc(StaffSlider);
  fetch(url).then((res) => res.json()).then((res) => cb(res.result))

}
async function getApiDataArticles(articlesQuery,cb) {
  let url = dynamicArticlesQueryFunc(articlesQuery);
  fetch(url).then((res) => res.json()).then((res) => cb(res.result))

}
async function getApiDataFaq(faqQuery,cb) {
  let url = dynamicFaqQueryFunc(faqQuery);
  fetch(url).then((res) => res.json()).then((res) => cb(res.result))

}
// async function getApiDataBlogPage(blogPage,cb) {
//   let url = dynamicBlogPageQueryFunc(blogPage);
//   fetch(url).then((res) => res.json()).then((res) => cb(res.result))

// }
const BlogData = document.querySelector(".data-blogs");
const DataWithSlider = document.querySelector(".slider-blog-el");
const renderBlogsData = (blogs) =>{
  BlogData.innerHTML = "";
  blogs && blogs.forEach(blog => {
    BlogData.innerHTML += `
    <div class="col-xl-4 col-md-6 col-sm-12">
          <div class="blog" onclick="navigateToDetail('${blog._id}')">
            <div class="blog-img-box">
              <div class="all">
                <div class="transactions">
                  <h2>${blog.transactions}</h2>
                </div>
                <div class="price">
                  <h2>${blog.price}</h2>
                </div>
              </div>
              <img src="${blog.mainImage.asset.url}" alt="">
            </div>
            <div class="name">
              <h3>${blog.name}</h3>
            </div>
            <div class="location">
              <i class="ri-map-pin-2-line"></i>
              <h3>${blog.location}</h3>
            </div>
            <div class="details">
              <div class="size">
                <i class="ri-drag-move-2-fill"></i>
                <h3>${blog.size} sqrt</h3>
              </div>
              <div class="rooms">
                <i class="ri-hotel-bed-line"></i>
                <h3>${blog.room}</h3>
              </div>
              <div class="bathroom">
                <i class="ri-drop-line"></i>
                <h3>${blog.bathroom}</h3>
              </div>
              <div class="garage">
                <i class="ri-roadster-line"></i>
                <h3>${blog.garage}</h3>
              </div>
            </div>
          </div>
        </div>
  `
  });
}
function navigateToDetail(blogId) {
  window.location.href = `/public/detail.html?id=${blogId}`;
}

// function navigateToDetail(blogId) {
//   window.location.href = `/public/detail.html?id=${blogId}`;
// }
// getApiData(DataQueries.blogs,(data)=>{
//   renderBlogsData(data)
// })

const itemsPerPage = 6;
let currentPage = 1;
let allBlogs = [];

const Blog = document.querySelector("#products-container");

const Pagination = document.querySelector(".pagination");

const renderPagination = () => {
  Pagination.innerHTML = "";
  console.log(Blog);
  const totalPages = Math.ceil(allBlogs.length / itemsPerPage);
  console.log("totalPages: " + totalPages);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.classList.add("pagination-btn");
    if (i === currentPage) button.classList.add("active");
    button.addEventListener("click", () => {
      currentPage = i;
      paginateBlogs();
    });
    Pagination.appendChild(button);
  }
};

const paginateBlogs = () => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const blogsToShow = allBlogs.slice(startIndex, endIndex);
  console.log("start: " + startIndex);
  console.log("end: " + endIndex);
  console.log(blogsToShow);
  renderBlogsData(blogsToShow);
  renderPagination();
};

getApiData(DataQueries.blogs, (data) => {
  allBlogs = data;
  paginateBlogs();
});


//----------------------------------------//

const CategoriesData = document.querySelector(".data-categories");
const renderCategoriesData = (categories) =>{
  categories && categories.forEach(category => {
    CategoriesData.innerHTML += `
    <div class="col-xl-4 col-md-6 col-sm-12">
        <div class="categories">
          <div class="categories-img-box">
            <img src="${category.mainImage.asset.url}" alt="">
          </div>
          <div class="name">
            <h3>${category.name}</h3>
          </div>
          <div class="paragraph">
            <p>${category.paragraph}</p>
          </div>
          <div class="categories-btn">
            <a href="#">Explore Now</a>
          </div>
        </div>
      </div>
    
    `
  })
}
getApiDataCat(DataQueriesCategory.categories,(data)=>{
  renderCategoriesData(data);
})

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

// const BlogArticlesData = document.querySelector(".blogarticles");
// const renderBlogArticlesData = (blogarticles) => {
//   blogarticles &&
//   blogarticles.forEach((blogarticle) => {
//       BlogArticlesData.innerHTML += `
//           <div class="col-xl-4 col-md-6 col-sm-12">
//               <div class="categories">
//                   <div class="categories-img-box">
//                       <img src="${blogarticle?.mainImage?.asset?.url || ''}" alt="">
//                   </div>
//                   <div class="name">
//                       <h3>${blogarticle?.name || ''}</h3>
//                   </div>
//                   <div class="dates">
//                       <div class="date">
//                           <i class="ri-calendar-2-line"></i>
//                           <h3>${blogarticle?.date || ''}</h3>
//                       </div>
//                       <div class="time">
//                           <i class="ri-timer-2-line"></i>
//                           <h3>${blogarticle?.time || ''}</h3>
//                       </div>
//                   </div>
//                   <div class="categories-btn">
//                       <a href="#">Read more</a>
//                   </div>
//               </div>
//           </div>
//       `;
//   });
// };


// getApiDataBlogPage(DataQueriesBlogPage.blogpage,(data)=>{
//   renderBlogArticlesData(data);
// });

getApiDataCat(DataQueriesArticles.articles,(data)=>{
  renderArticlesData(data);
});

const renderBlogsDataSlider = (slides) =>{
  slides && slides.forEach((slide)=> {
    DataWithSlider.innerHTML += `
    <div class="swiper-slide">
    <img src="${slide?.mainImage?.asset?.url}" class="card-img-top w-100" alt="">
    <div class="intro">
    <h1>${slide.name}</h1>
    <p>${slide.paragraph}</p>
    </div>
    </div>
    
    
    `
});
}
getApiDataSlide(DataQueriesStaffSlider.staffslider,(data)=>{
  renderBlogsDataSlider(data)
})


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

window.addEventListener("DOMContentLoaded", () => {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
      delay: 500, 
      disableOnInteraction: false, 
    },
    speed: 1000, 
  });
});

var swiper = new Swiper(".testSwiper", {
  slidesPerView: "auto",
  loop: true,
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


///images on scroll
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".process-left .full");
  const images = document.querySelectorAll(".process-right .img-box img");

  if (!steps.length || !images.length) {
    console.error("Steps or images not found. Check your HTML structure.");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(steps).indexOf(entry.target);

          if (index !== -1) {
            images.forEach((img, imgIndex) => {
              img.classList.toggle("active", imgIndex === index);
            });
          }
        }
      });
    },
    {
      root: null, 
      threshold: 0.5, 
    }
  );

  steps.forEach((step) => observer.observe(step));
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
  