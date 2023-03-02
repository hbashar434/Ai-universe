const loadAiData = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAiData(data.data.tools));
};

const displayAiData = (data) => {
  const cardContainer = document.getElementById("card-section");
  data.forEach((singleCard) => {
    const { name, image, features, published_in } = singleCard;
    cardContainer.innerHTML += `
        <div class="aiCard">
            <div class="card w-full h-full bg-base-100 shadow-xl">
            <figure><img src="${image}"/>
            </figure>
            <div class="card-body">
                <h2 class="card-title">
                Features
                <div>

                </div>
                </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                <div class="badge badge-outline">Fashion</div> 
                <div class="badge badge-outline">Products</div>
                </div>
            </div>
            </div>
        </div>
    `;
  });
};

loadAiData();
