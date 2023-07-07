const URL = "https://striveschool-api.herokuapp.com/api/product/";

const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get("id");
console.log("PRODUCTID", productId);
console.log(URL + productId);

fetch(URL + productId, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmQxNDEyYjUwYzAwMTQ5ZTRlZjIiLCJpYXQiOjE2ODg3MTQ1MTcsImV4cCI6MTY4OTkyNDExN30.HY9KtvnkU55TRuIvaoVvmaLYNyioQ4QdyqgeTchm3NM",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Errore nel recupero dei dettagli del prodotto");
    }
  })
  .then((detail) => {
    console.log("DETAIL", detail);

    const spinnerContainer = document.getElementById("spinner-container");
    spinnerContainer.classList.add("d-none");

    let newCol = document.createElement("div");
    newCol.classList.add("col", "col-12", "col-sm-6", "text-center");
    newCol.innerHTML = `
      <div class="card">
        <img src="${detail.imageUrl}" class="card-img-top" alt="Product image" />
        <div class="card-body">
          <h5 class="card-title">${detail.name}</h5>
          <p class="card-text">${detail.description}</p>
          <p class="card-text fw-bold">${detail.brand}</p>
          <p class="card-text fw-bold">${detail.price}€</p>
          <div>
            <a href="./backoffice.html?id=${detail._id}" class="btn btn-warning">Modifica prodotto</a>
            <button type="button" class="btn btn-danger">Elimina prodotto</button>
          </div>
        </div>
      </div>
    `;

    const productsRow = document.getElementById("products-row");
    productsRow.appendChild(newCol);

    let deleteButton = document.querySelector(".btn-danger");
    deleteButton.addEventListener("click", function () {
      fetch(URL + productId, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmQxNDEyYjUwYzAwMTQ5ZTRlZjIiLCJpYXQiOjE2ODg3MTQ1MTcsImV4cCI6MTY4OTkyNDExN30.HY9KtvnkU55TRuIvaoVvmaLYNyioQ4QdyqgeTchm3NM",
        },
      })
        .then((res) => {
          if (res.ok) {
            alert("Prodotto eliminato!");
            location.assign("backoffice.html");
          } else {
            throw new Error("Problema nell'eliminazione del prodotto");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  })
  .catch((err) => {
    console.log(err);
  });
