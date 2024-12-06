// // import {createClient} from '@sanity/client'
// const {createClient} = require("@sanity/client");
// const client = createClient({
//   projectId: '8ovfuzs4',
//   dataset: 'production',
//   useCdn: true, // set to `false` to bypass the edge cache
//   apiVersion: '2023-05-03',
//   token:"",
// })

// // export async function getPosts() {
// //   const posts = await client.fetch('*[_type == "post"]')
// //   return posts
// // }

// module.exports = client;

const urlParams = new URLSearchParams(window.location.search);
const slug = urlParams.get('slug'); // Get the slug from the URL

if (slug) {
  const blogQuery = `*[_type=="blogs" && slug.current=="${slug}"]{
    title, desc, location, price, room, bathroom, garage, size,
    mainImage{asset->{url}}
  }`;

  const dynamicBlogQueryFunc = (query) => {
    const PROJECT_ID = '8ovfuzs4';
    const DATASET = 'production';
    return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
  };

  fetch(dynamicBlogQueryFunc(blogQuery))
    .then(res => res.json())
    .then(data => {
      const blog = data.result[0];
      if (blog) {
        document.getElementById('blog-title').textContent = blog.title;
        document.getElementById('blog-image').src = blog.mainImage.asset.url;
        document.getElementById('blog-description').textContent = blog.desc;
        document.getElementById('blog-location').textContent = blog.location;
        document.getElementById('blog-price').textContent = blog.price;
        document.getElementById('blog-rooms').textContent = blog.room;
        document.getElementById('blog-bathrooms').textContent = blog.bathroom;
        document.getElementById('blog-garage').textContent = blog.garage;
        document.getElementById('blog-size').textContent = blog.size;
      } else {
        document.getElementById('blog-detail').innerHTML = `<p>Blog not found.</p>`;
      }
    })
    .catch(error => console.error('Error fetching blog:', error));
} else {
  document.getElementById('blog-detail').innerHTML = `<p>No blog specified.</p>`;
}
