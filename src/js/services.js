let Articles = `*[_type=="articles"]`;




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


async function getApiDataArticles(articlesQuery,cb) {
  let url = dynamicArticlesQueryFunc(articlesQuery);
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
  