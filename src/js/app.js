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
// fetch(PROJECT_URL).then((res) => res.json()).then((res) => {
//   console.log(res);
// });

function urlFor(source) {
  return builder.image(source)
}

let DataQueries = {
  blogs: `*[_type=="blogs"]{desc,title,price,transactions,location,room,bathroom,garage,slug,size,name,
  mainImage{asset->{url}}
  }`,
  // blogById:`*[_type=="blogs" && _id=="$id"]`
}

let DataQueriesCategory = {
  categories: `*[_type=="categories"]{desc,title,slug,paragraph,name,
  mainImage{asset->{url}}
  }`,
  // blogById:`*[_type=="blogs" && _id=="$id"]`
}

let DataQueriesStaffSlider = {
  staffslider: `*[_type=="staffslider"]{desc,title,slug,paragraph,name,
  mainImage{asset->{url}}
  }`,
  // blogById:`*[_type=="blogs" && _id=="$id"]`
}

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
const BlogData = document.querySelector(".data-blogs");
const DataWithSlider = document.querySelector(".slider-blog-el");
const renderBlogsData = (blogs) =>{
  blogs && blogs.forEach(blog => {
    BlogData.innerHTML += `
    <div class="col-xl-4 col-md-6 col-sm-12">
          <div class="blog">
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

getApiData(DataQueries.blogs,(data)=>{
  renderBlogsData(data)
})

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
  renderCategoriesData(data)
})


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
