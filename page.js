document.addEventListener('DOMContentLoaded',async ()=>{
  await render();
});

const loadBtn = document.querySelector("#loadBtn");
loadBtn.addEventListener('click', render)

const apikey = "live_p2BBUekHFih0yGPvhMXdj0fOwro7duwaDGSoSxg7LYQ30wbExYcu4joK7tlLxXiu";
const url =`https://api.thecatapi.com/v1/images/search?api_key=${apikey}&limit=9&order=RAND&has_breeds=1`;

// Data
async function getdata (){
  const res = await fetch(url).catch((error)=>{alert("システムでエラーが発生しました。しばらく時間を空けてからご利用ください。")});;
  const getdata = await res.json();
  return getdata;
}

// DOM
async function render(){
   const datas = await getdata();
   for (let item of datas) {
    const list = document.querySelector("#list");
    const li = document.createElement("li");
    li.className = "cat-card";

    li.dataset.image = item.url;

    li.dataset.name = item.breeds[0].name;
    
    li.dataset.origin = item.breeds[0].origin;
    
    li.dataset.description = item.breeds[0].description;
    
    li.dataset.weight = item.breeds[0].weight.metric;
    li.dataset.lifeSpan = item.breeds[0].life_span;


    const imgBox = document.createElement("div");
    imgBox.className = 'imgBox';
    const img = document.createElement("img");
    img.src = item.url;

    const name = document.createElement("span");
    name.className = 'name';
    name.textContent = item.breeds[0].name;

    const btns = document.createElement("div");
    btns.className = "btns";

    const more = document.createElement("button");
    const likeBtn = document.createElement("i");
    likeBtn.className = 'fa-regular fa-heart'

    const saveImg = li.dataset.image;
    const saveName = li.dataset.name;
    const saveCa = li.dataset.origin;
    const saveDes = li.dataset.description;
    const saveWeight = li.dataset.weight;
    const savelifeSpan =  li.dataset.lifeSpan;

    more.textContent = "詳細";
    more.className = "detailsBtn";
    more.onclick = () => {
      Swal.fire({
        title: saveName,
        html: `
        
        <div class="drawer-name-box">
          <div class="drawer-origin"><i class="fa-solid fa-location-dot"></i><span>${saveCa}</span></div>
        </div>
        <div class="age-weight">
          <div class="age-weight-data">
              <p class="age-weight-num">${savelifeSpan}</p>
              <p class="age-weight-label">寿命</p>
          </div>
          <div class="vertical-line"></div>
          <div class="age-weight-data">
              <p class="age-weight-num">${saveWeight}</p>
              <p class="age-weight-label">体重 (kg) </p>
          </div> 
          
        </div>
        <p class="description">
        <span class="description-title">特徴・性格</span>
         <br>
         ${saveDes}<p/>
         <hr>`,
        imageUrl: saveImg,
        imageWidth: 400,
        // imageHeight: 300,
        confirmButtonText: "閉じる",
        confirmButtonColor: "#ffa500",
        showCloseButton: false
      });
    };
    
    list.append(li);
    li.append(imgBox, name, btns);
    
    imgBox.append(img)
    btns.append(more, likeBtn);

    likeBtn.onclick = (e) => {
      if(e.target.className.includes('fa-regular')){
        e.target.classList.remove('fa-regular');
        e.target.classList.add('fa-solid');
      }else{
        e.target.classList.remove('fa-solid');
        e.target.classList.add('fa-regular');
      };
        
    };
  };
};

