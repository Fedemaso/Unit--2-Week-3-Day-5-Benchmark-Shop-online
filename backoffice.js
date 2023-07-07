const URL = "https://striveschool-api.herokuapp.com/api/product/";

const addressBarContent = new URLSearchParams(location.search);
const productId = addressBarContent.get("id");
console.log("PRODUCTID", productId);
console.log(URL + productId);

const productForm = document.getElementById("product-form");
productForm.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("Raccolgo i dati dal form");

  // validazione del form

  // Richiesta di conferma per la modifica del prodotto
  if (confirm("Sei sicuro di voler salvare il prodotto?")) {
    const nameInput = document.getElementById("product-name");
    const descriptionInput = document.getElementById("product-description");
    const brandInput = document.getElementById("product-brand");
    const imageUrlInput = document.getElementById("product-imageUrl");
    const priceInput = document.getElementById("product-price");

    const updatedProduct = {
      name: nameInput.value,
      description: descriptionInput.value,
      brand: brandInput.value,
      imageUrl: imageUrlInput.value,
      price: priceInput.value,
    };

    console.log("Ecco i valori recuperati dal form:", updatedProduct);

    let urlToUse;
    let methodToUse;
    if (productId) {
      urlToUse = URL + productId;
      methodToUse = "PUT";
    } else {
      urlToUse = URL;
      methodToUse = "POST";
    }

    fetch(urlToUse, {
      method: methodToUse,
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3YmQxNDEyYjUwYzAwMTQ5ZTRlZjIiLCJpYXQiOjE2ODg3MTQ1MTcsImV4cCI6MTY4OTkyNDExN30.HY9KtvnkU55TRuIvaoVvmaLYNyioQ4QdyqgeTchm3NM",
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Prodotto salvato!");

          // Codice per la pulizia del form...

          location.assign("index.html");
        } else {
          throw new Error("Errore nel salvataggio del prodotto");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

let deleteButton = document.querySelector(".btn-danger");
deleteButton.addEventListener("click", function () {
  // Richiesta conferma per la cancellazione del prodotto
  if (confirm("Sei sicuro di voler eliminare il prodotto?")) {
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
          location.assign("index.html");
        } else {
          throw new Error("Problema nell'eliminazione del prodotto");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//  pulsante Reset
let resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", function () {
  // Richiesta di conferma per il reset del form
  if (confirm("Sei sicuro di voler resettare il form?")) {
    productForm.reset();
  }
});

const nameInput = document.getElementById("product-name");
const descriptionInput = document.getElementById("product-description");
const brandInput = document.getElementById("product-brand");
const imageUrlInput = document.getElementById("product-imageUrl");
const priceInput = document.getElementById("product-price");

//  informazioni del prodotto selezionato
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
      throw new Error("Errore nel recupero del prodotto");
    }
  })
  .then((product) => {
    // inserisco le informazioni del prodotto
    nameInput.value = product.name;
    descriptionInput.value = product.description;
    brandInput.value = product.brand;
    imageUrlInput.value = product.imageUrl;
    priceInput.value = product.price;
  })
  .catch((err) => {
    console.log(err);
  });
