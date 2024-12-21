let BlogQuery = `*[_type=="blogs"]`;

function dynamicBlogQueryFunc(query) {
  let PROJECT_ID = "8ovfuzs4";
  let DATASET = "production";
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}
function urlFor(source) {
  return builder.image(source);
}

let DataQueries = {
  blogs: `*[_type=="blogs"]{desc,title,_id,price,transactions,location,room,bathroom,garage,slug,size,name,
  mainImage{asset->{url}}
  }`,
};

async function getApiData(blogQuery, cb) {
  let url = dynamicBlogQueryFunc(blogQuery);
  fetch(url)
    .then((res) => res.json())
    .then((res) => cb(res.result));
}

const BlogData = document.querySelector(".data-blogs");
const renderBlogsData = (blogs) => {
  BlogData.innerHTML = "";
  blogs &&
    blogs.forEach((blog) => {
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
  `;
    });
};

const itemsPerPage = 3;
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



const fetchBlogById = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get("id");

  if (!blogId) {
    console.error("No blog ID found in the URL");
    return;
  }

  const query = encodeURIComponent(`
    *[_type == "blogs" && _id == "${blogId}"][0]{
      title,
      mainImage{asset->{url}},
      location,
      name,
      price,
      size,
      room,
      bathroom,
      garage,
      desc,
      prop,
    }
  `);

  const url = `https://8ovfuzs4.api.sanity.io/v1/data/query/production?query=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result) {
      renderBlogDetails(data.result);
    } else {
      console.error("Blog not found");
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
};

const renderBlogDetails = (blog) => {
  document.getElementById("blog-name").innerText = blog.name;
  document.getElementById("blog-image").src = blog.mainImage.asset.url;
  document.getElementById("blog-location").innerText = blog.location;
  document.getElementById("blog-price").innerText = `${blog.price}`;
  document.getElementById("blog-size").innerText = `${blog.size} sqft`;
  document.getElementById("blog-rooms").innerText = blog.room;
  document.getElementById("blog-bathrooms").innerText = blog.bathroom;
  document.getElementById("blog-garage").innerText = blog.garage;
  document.getElementById("blog-description").innerText = blog.desc;
  document.getElementById("blog-property").innerText = blog.prop;
};

fetchBlogById();

//add to cart/ Add to Cart Function

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

document.getElementById("addtocart").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent the default link behavior
  renderCartModal(); // Render the cart modal
  document.getElementById("cart-modal").style.display = "block"; // Show the cart modal
});
//modal



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