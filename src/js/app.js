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


// export async function getPosts() {
//   const posts = await client.fetch('*[_type == "post"]')
//   return posts
// }
function dynamicBlogQueryFunc(query){
  let PROJECT_ID ='8ovfuzs4';
let DATASET = 'production';
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}

// fetch(PROJECT_URL).then((res) => res.json()).then((res) => {
//   console.log(res);
// });
let DataQueries = {
  blogs: `*[_type=="blogs"]`,
  blogById:`*[_type=="blogs" && _id=="$id"]`
}
async function getApiData(blogQuery,cb) {
   let url = dynamicBlogQueryFunc(blogQuery);
   fetch(url).then((res) => res.json()).then((res) => cb(res.result))

}
const BlogData = document.querySelector(".data-blogs");
const renderBlogsData = (blogs) =>{
  blogs && blogs.forEach(blog => {
    BlogData.innerHTML += `
    <div class="col-xl-4">
          <div class="card"
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${blog.title}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>`
  });
}

getApiData(DataQueries.blogs,(data)=>{
  renderBlogsData(data)
})