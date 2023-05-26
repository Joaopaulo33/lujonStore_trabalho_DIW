function showProducts(products) {
  let html = "";
  let produtos = document.getElementById("rowProducts");
  let rate = 0;
  let htmlRate = "";
  let numeroQuebrado = false;
  let estrelaPelaMetade = false;
  let estralasVazias = 0;
  produtos.textContent = "";

  products.map(async (item) => {
    htmlRate = "";
    let i = 0;
    if (rate < Math.trunc(item.rating.rate)) {
      numeroQuebrado = true;
    }
    rate = Math.trunc(item.rating.rate);
    estralasVazias = 5 - rate;
    numeroQuebrado ? (estrelaPelaMetade = true) : (estrelaPelaMetade = false);
    if (estrelaPelaMetade) {
      estralasVazias--;
    }
    while (i < rate) {
      htmlRate += ` <i class="bi bi-star-fill"></i>`;
      i++;
    }
    i = 0;
    if (estrelaPelaMetade) {
      htmlRate += `<i class="bi bi-star-half"></i>`;
    }

    while (i < estralasVazias) {
      htmlRate += ` <i class="bi bi-star"></i>        `;
      i++;
    }
    // console.log(item);
    html = ` <div id="${
      item.id
    }"class="col-lg-3 div_product_container" onclick="informacoesProduto(this.id)" data-toggle="modal" data-target="#exampleModal">
          <div class="col-lg-12 div_product_content">
              <img src="${item.image}"
                  alt="">
              <p href="">${item.title}</p>
              <p>
                  ${htmlRate}
                  ${item.rating.rate}
                  <span>(${item.rating.count})</span>
              </p>
              <p>
                  <b>
                      R$:${item.price.toFixed(2).replace(".", ",")}
                  </b>
                 
              </p>
          </div>
      </div>`;
    produtos.innerHTML += html;
  });
}

function showProductsRecomend(products) {
  let html = "";
  let count = 0;
  let produtos = document.getElementById("products_recomend");
  let rate = 0;
  let htmlRate = "";
  let numeroQuebrado = false;
  let estrelaPelaMetade = false;
  let estralasVazias = 0;
  produtos.textContent = "";

  products.map(async (item) => {
    count++;
    htmlRate = "";
    let i = 0;
    if (rate < Math.trunc(item.rating.rate)) {
      numeroQuebrado = true;
    }
    rate = Math.trunc(item.rating.rate);
    estralasVazias = 5 - rate;
    numeroQuebrado ? (estrelaPelaMetade = true) : (estrelaPelaMetade = false);
    if (estrelaPelaMetade) {
      estralasVazias--;
    }
    while (i < rate) {
      htmlRate += ` <i class="bi bi-star-fill"></i>`;
      i++;
    }
    i = 0;
    if (estrelaPelaMetade) {
      htmlRate += `<i class="bi bi-star-half"></i>`;
    }

    while (i < estralasVazias) {
      htmlRate += ` <i class="bi bi-star"></i>        `;
      i++;
    }
    // console.log(item);
    html = ` <div class="row">
    <div class="col-lg-6 div_image_product_review">
        <img style="width: 80%;"
            src="${item.image}"
            alt="">
    </div>
    <div class="col-lg-6">
        <p href="">Piercing ferradura com strass. </p>
        <p>
        ${htmlRate}
        ${item.rating.rate}
            <span>(${item.rating.count})</span>
        </p>
        <p>
            <b>
            R$:${item.price.toFixed(2).replace(".", ",")}
            </b>
        </p>
    </div>
</div>
<hr>`;
    if (count < 6) {
      produtos.innerHTML += html;
    }
  });
}
$(document).ready(() => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      showProducts(json);
      showProductsRecomend(json);
    });

  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((json) => setCategories(json));
});

function setCategories(categories) {
  select = document.getElementById("category_input");

  categories.map((category) => {
    var opt = document.createElement("option");
    opt.value = category;
    opt.innerHTML = category;
    select.appendChild(opt);
  });
}

$("#button_search").click(() => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => {
      let productsFilter = [];
      json.map((product) => {
        if (
          product.title
            .toUpperCase()
            .includes($("#search-input").val().toUpperCase())
        ) {
          productsFilter.push(product);
        }
      });
      let divPrdutos = document.getElementById("rowProducts");
      divPrdutos.textContent = "";
      showProducts(productsFilter);
    });
});

$("#button_category").click(() => {
  categoryRequest = "";
  if ($("#category_input").val() != "") {
    categoryRequest = `category/${$("#category_input").val()}`;
  }
  fetch(`https://fakestoreapi.com/products/${categoryRequest}`)
    .then((res) => res.json())
    .then((json) => showProducts(json));
});

function informacoesProduto(product) {
  let div_modal_produto = document.getElementById("div_produto_detalhe");
  // div_modal_produto.textContent = "";
  div_modal_produto.innerHTML = '<div class="loader"></div>';
  fetch(`https://fakestoreapi.com/products/${product}`)
    .then((res) => res.json())
    .then((json) => {
      let rate = 0;
      let htmlRate = "";
      let numeroQuebrado = false;
      let estrelaPelaMetade = false;
      let estralasVazias = 0;

      htmlRate = "";
      let i = 0;
      if (rate < Math.trunc(json.rating.rate)) {
        numeroQuebrado = true;
      }
      rate = Math.trunc(json.rating.rate);
      estralasVazias = 5 - rate;
      numeroQuebrado ? (estrelaPelaMetade = true) : (estrelaPelaMetade = false);
      if (estrelaPelaMetade) {
        estralasVazias--;
      }
      while (i < rate) {
        htmlRate += ` <i class="bi bi-star-fill"></i>`;
        i++;
      }
      i = 0;
      if (estrelaPelaMetade) {
        htmlRate += `<i class="bi bi-star-half"></i>`;
      }

      while (i < estralasVazias) {
        htmlRate += ` <i class="bi bi-star"></i>        `;
        i++;
      }
      html_div_modal = ` <div id="${
        json.id
      }"class="col-lg-12 div_product_details" style="display:flex;aling-itens:center;justify-content:center;max-width:"400px;" onclick="informacoesProduto(this.id)" data-toggle="modal" data-target="#exampleModal">
          <div class="col-lg-12 div_product_details_content">
            <div class="div_image_product_details_content">
            <img src="${json.image}" id ="produto_imagem"
            alt="">
            </div>
              <p href="" style="margin-top:20px">${json.description}</p>
              <p>
                  ${htmlRate}
                  ${json.rating.rate}
                  <span>(${json.rating.count})</span>
              </p>
              <p>
                  <b>
                      R$:${json.price.toFixed(2).replace(".", ",")}
                  </b>
                 
              </p>
          </div>
      </div>`;
      let produto_imagem = document.getElementById("produto_imagem");
      setTimeout(() => {
        div_modal_produto.innerHTML = html_div_modal;
      }, 1000);
      // produto_imagem.onload = () => {};
    });
}
