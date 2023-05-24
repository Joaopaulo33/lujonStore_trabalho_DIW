let html = "";
let produtos = document.getElementById("rowProducts");
let rate = 0;
let htmlRate = "";
let numeroQuebrado = false;
let estrelaPelaMetade =false
let estralasVazias =0
fetch("https://fakestoreapi.com/products").then((res) => res.json())
  .then((json) =>
    json.map((item) => {
      htmlRate="";
      let i=0;
      if(rate < Math.trunc(item.rating.rate)){
        numeroQuebrado=true;

      }
      rate = Math.trunc(item.rating.rate)
      estralasVazias = 5-rate;
      numeroQuebrado?estrelaPelaMetade = true:estrelaPelaMetade=false;
      if(estrelaPelaMetade){
        estralasVazias--;
      }
      while(i<rate) {
        htmlRate +=` <i class="bi bi-star-fill"></i>`
        i++
      }
      i=0;
      if(estrelaPelaMetade){
        htmlRate +=`<i class="bi bi-star-half"></i>`
      }
      
      while(i<estralasVazias) {
        console.log("ola")
        htmlRate +=` <i class="bi bi-star"></i>        `
        i++
      }
      console.log(item)
  html = ` <div id="${item.id}"class="col-lg-3 div_product_container">
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
                  R$:${item.price}
              </b>
             
          </p>
      </div>
  </div>`;
      produtos.innerHTML += html;
    }));