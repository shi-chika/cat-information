const loadBtn = document.querySelector("#loadBtn");
loadBtn.addEventListener('click', render)

const apikey = "live_p2BBUekHFih0yGPvhMXdj0fOwro7duwaDGSoSxg7LYQ30wbExYcu4joK7tlLxXiu";
const url =`https://api.thecatapi.com/v1/images/search?api_key=${apikey}&limit=28&page=3&order=RAND&has_breeds=1`;

// Data
async function getdata (){
  const res = await fetch(url).catch((error)=>{alert("システムでエラーが発生しました。しばらく時間を空けてからご利用ください。")});;
  const datas = await res.json();
  return datas;
}

// DOM
async function render(){
   const datas = await getdata();
   for (let product of datas) {
    let list = document.querySelector("#list");
    let li = document.createElement("li");
    li.className = "product";

    li.dataset.image = product.url;

    li.dataset.title = product.breeds[0].name;
    
    li.dataset.category = product.breeds[0].origin;
    
    li.dataset.description = product.breeds[0].description;
    
    li.dataset.weight = product.breeds[0].weight.metric;


    let img = document.createElement("img");
    let title = document.createElement("span");
    let btns = document.createElement("div");
    let more = document.createElement("button");
    let del = document.createElement("button");
    let saveImg = li.dataset.image;
    let saveTitle = li.dataset.title;
    let saveCa = li.dataset.category;
    let saveDes = li.dataset.description;
    let savePri = li.dataset.weight;

    img.src = product.url;
    title.textContent = product.title;
    more.textContent = "Details";
    more.className = "detailsBtn";
    more.onclick = () => {
      Swal.fire({
        title: saveTitle,
        html: `<p class="category"> ${saveCa} </p><hr>
               <p class="description">${saveDes}<p/><hr> 
               <p class="weight">$${savePri}</p>`,
        imageUrl: saveImg,
        imageWidth: 300,
        imageHeight: 300,
        confirmButtonText: "close",
        confirmButtonColor: "#ffa500",
        showCloseButton: false
      });
    };
    del.className = "delBtn";
    del.textContent = "Delete";
    btns.className = "btns";
    list.append(li);
    li.append(img, title, btns);
    btns.append(more, del);
    del.onclick = (e) => {
      
        e.target.closest("li").remove();
        
    };
  }
}

// loadBtn.addEventListener('click',()=>{
//   fetch("https://fakestoreapi.com/products")
//   .then((res) => res.json())
//   .then((data) => {
//     for (let product of data) {
//       let list = document.querySelector("#list");
//       let li = document.createElement("li");
//       li.className = "product";
//       let img = document.createElement("img");
      
//       let title = document.createElement("span");
//       let btns = document.createElement("div");
//       let more = document.createElement("button");
//       let del = document.createElement("button");

//       li.dataset.title = product.title;
//       let saveTitle = li.dataset.title;
//       li.dataset.category = product.category;
//       let saveCa = li.dataset.category;
//       li.dataset.description = product.description;
//       let saveDes = li.dataset.description;
//       li.dataset.image = product.image;
//       let saveImg = li.dataset.image;
//       li.dataset.weight = product.weight;
//       let savePri = li.dataset.weight;

//       img.src = product.image;
//       title.textContent = product.title;
//       more.textContent = "Details";
//       more.className = "detailsBtn";
//       more.onclick = () => {
//         Swal.fire({
//           title: saveTitle,
//           html: `<p class="category"> ${saveCa} </p><hr>
//                  <p class="description">${saveDes}<p/><hr> 
//                  <p class="weight">$${savePri}</p>`,
//           imageUrl: saveImg,
//           imageWidth: 200,
//           imageHeight: 200,
//           confirmButtonText: "close",
//           confirmButtonColor: "#ffa500",
//           showCloseButton: false
//         });
//       };
//       del.className = "delBtn";
//       del.textContent = "Delete";
//       btns.className = "btns";
//       list.append(li);
//       li.append(img, title, btns);
//       btns.append(more, del);
//       del.onclick = (e) => {
//         fetch("https://fakestoreapi.com/products/6", { method: "DELETE" })
//           .then((res) => res.json())
//           .then((data) => {
//             e.target.closest("li").remove();
//           })
//           .catch((error) => alert("システムでエラーが発生しました。しばらく時間を空けてからご利用ください。"));
//       };
//     }
//   })
//   .catch((error) => {
//     alert("システムでエラーが発生しました。しばらく時間を空けてからご利用ください。");
//   });


// }) 
 