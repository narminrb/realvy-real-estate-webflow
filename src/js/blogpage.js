let BlogPage = `*[_type=="blogpage"]`;

function dynamicBlogPageQueryFunc(query){
  let PROJECT_ID ='8ovfuzs4';
  let DATASET = 'production';
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

function urlFor(source) {
  return builder.image(source)
}

let DataQueriesBlogPage = {
  blogpage: `*[_type=="blogpage"]{desc,title,slug,time,date,name,
  mainImage{asset->{url}}
  }`
};

async function getApiDataBlogPage(blogPage,cb) {
  let url = dynamicBlogPageQueryFunc(blogPage);
  fetch(url).then((res) => res.json()).then((res) => cb(res.result))

}


const BlogArticlesData = document.querySelector(".blogarticles");
const renderBlogArticlesData = (blogarticles) => {
  BlogArticlesData.innerHTML = "";
  blogarticles &&
  blogarticles.forEach((blogarticle) => {
      BlogArticlesData.innerHTML += `
          <div class="col-xl-4 col-md-6 col-sm-12">
              <div class="categories">
                  <div class="categories-img-box">
                      <img src="${blogarticle?.mainImage?.asset?.url || ''}" alt="">
                  </div>
                  <div class="name">
                      <h3>${blogarticle?.name || ''}</h3>
                  </div>
                  <div class="dates">
                      <div class="date">
                          <i class="ri-calendar-2-line"></i>
                          <h3>${blogarticle?.date || ''}</h3>
                      </div>
                      <div class="time">
                          <i class="ri-timer-2-line"></i>
                          <h3>${blogarticle?.time || ''}</h3>
                      </div>
                  </div>
                  <div class="categories-btn">
                      <a href="#">Read more</a>
                  </div>
              </div>
          </div>
      `;
  });
};


getApiDataBlogPage(DataQueriesBlogPage.blogpage,(data)=>{
  renderBlogArticlesData(data);
});


const itemsPerPage = 6;
let currentPage = 1;
let allBlogs = [];

const Blog = document.querySelector("#user-container");

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
  renderBlogArticlesData(blogsToShow);
  renderPagination();
};

getApiDataBlogPage(DataQueriesBlogPage.blogpage, (data) => {
  allBlogs = data;
  paginateBlogs();
});


// const tbody = document.getElementById('user-container');
// fetch("http://localhost:3333/structure/blogs")
// .then(response=> response.json())
// .then(users=>{
//     users.map(user=>{
//         const row = document.createElement("tr");
//         const nametd = document.createElement("td");
//         const agetd = document.createElement("td");
//         const citytd = document.createElement("td");
//         nametd.textContent = user.name;
//         agetd.textContent = user.age;
//         citytd.textContent = user.city;
//         row.appendChild(nametd);
//         row.appendChild(agetd);
//         row.appendChild(citytd);
//         tbody.appendChild(row);

//     })

// })
// const search = document.getElementById('search');
// search.addEventListener('keyup',searchFunc);


// function searchFunc(){
//     const rows = document.querySelectorAll('tbody>tr');
//     const td = document.querySelectorAll('tbody>tr>td');
//     const searchValue = search.value;
//     rows.forEach(row=>{
//         const allData = row.querySelectorAll('td');
//         const name = allData[0].textContent;
//         if(name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1){
//             row.style.display = 'table-row';
//         }
//         else{
//             row.style.display = 'none'; 
//         }
//         console.log(name);
//     })
// }


const search = document.getElementById('search');
const blogArticlesContainer = document.querySelector('.blogarticles');


search.addEventListener('keyup', searchBlogArticles);

function searchBlogArticles() {
    const searchValue = search.value.toLowerCase(); 
    const blogItems = blogArticlesContainer.querySelectorAll('.categories');

    blogItems.forEach((item) => {
        const title = item.querySelector('.name h3').textContent.toLowerCase(); 
        const date = item.querySelector('.dates .date h3').textContent.toLowerCase();
        const time = item.querySelector('.dates .time h3').textContent.toLowerCase(); 


        if (
            title.includes(searchValue) ||
            date.includes(searchValue) ||
            time.includes(searchValue)
        ) {
            item.parentElement.style.display = 'block'; 
        } else {
            item.parentElement.style.display = 'none'; 
        }
    });
}
