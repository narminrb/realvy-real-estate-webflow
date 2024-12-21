let Agents= `*[_type=="agents"]`;
let Articles = `*[_type=="articles"]`;
let Faq = `*[_type=="faq"]`;

function dynamicAgentsQueryFunc(query){
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
function urlFor(source) {
  return builder.image(source)
}

let DataQueriesAgents = {
  agents: `*[_type=="agents"]{title,slug,paragraph,name,
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
async function getApiDataAgents(agents,cb) {
  let url = dynamicAgentsQueryFunc(agents);
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

const AgentsData = document.querySelector(".blogarticles");
const renderBlogArticlesData = (agents) => {
  AgentsData.innerHTML = "";
  agents &&
  agents.forEach((agent) => {
    AgentsData.innerHTML += `
          <div class="col-xl-4 col-md-6 col-sm-12">
              <div class="agent">
                  <div class="agent-img-box">
                      <img src="${agent?.mainImage?.asset?.url || ''}" alt="">
                  </div>
                  <div class="intro">
                  <h1>${agent.name}</h1>
                  <p>${agent.paragraph}</p>
                  </div>
              </div>
          </div>
      `;
  });
};
getApiDataAgents(DataQueriesAgents.agents,(data)=>{
  renderBlogArticlesData(data);
});

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
  
//search
const search = document.getElementById('search');
const blogArticlesContainer = document.querySelector('.blogarticles');


search.addEventListener('keyup', searchBlogArticles);

function searchBlogArticles() {
    const searchValue = search.value.toLowerCase(); 
    const blogItems = blogArticlesContainer.querySelectorAll('.agent');

    blogItems.forEach((item) => {
        const name = item.querySelector('.intro h1').textContent.toLowerCase();
        const job = item.querySelector('.intro p').textContent.toLowerCase(); 


        if (
            name.includes(searchValue) ||
            job.includes(searchValue)
        ) {
            item.parentElement.style.display = 'block'; 
        } else {
            item.parentElement.style.display = 'none'; 
        }
    });
}


//pagination

const itemsPerPage = 12;
let currentPage = 1;
let allBlogs = [];

const Blog = document.querySelector(".products-container");

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
  renderBlogArticlesData(blogsToShow);
  renderPagination();
};

getApiDataAgents(DataQueriesAgents.agents, (data) => {
  allBlogs = data;
  paginateBlogs();
});

