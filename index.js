const getProductData = function () {
  const URL = "https://striveschool-api.herokuapp.com/api/product";
  fetch(URL, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmQxNDEyYjUwYzAwMTQ5ZTRlZjIiLCJpYXQiOjE2ODg3MTQ1MTcsImV4cCI6MTY4OTkyNDExN30.HY9KtvnkU55TRuIvaoVvmaLYNyioQ4QdyqgeTchm3NM",
    },
  })
    .then((res) => {
      console.log("Response della GET", res);
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella chiamata API");
      }
    })
    .then((products) => {
      console.log("PRODUCTS", products);
      const spinnerContainer = document.getElementById("spinner-container");
      spinnerContainer.classList.add("d-none");
      products.forEach((product) => {
        let newCol = document.createElement("div");
        newCol.classList.add("col", "col-12", "col-sm-6", "col-md-3");
        newCol.innerHTML = `
                <div class="card d-flex m-2 justify-content-between h-100">
                  <img
                    src="${product.imageUrl}"
                    class="card-img-top"
                    alt="Product image"
                  />
                  <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">${product.brand}</p>
                    <p class="card-text fw-bold">${product.price}€</p>
                    <a href="./details.html?id=${product._id}" class="btn btn-primary">Scopri di più</a>
                    <button type="button" class="btn btn-warning" onclick="editProduct('${product._id}')">Modifica</button>
                  </div>
                </div>
              `;
        const productsRow = document.getElementById("products-row");
        productsRow.appendChild(newCol);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

getProductData();

function editProduct(productId) {
  location.assign(`./backoffice.html?id=${productId}`);
}
