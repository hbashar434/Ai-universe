const loadAiData = (cardLimit = 6) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAiData(data.data.tools, cardLimit));
};

const displayAiData = (data, cardLimit) => {
  const cardContainer = document.getElementById("card-section");
  cardContainer.textContent = "";
  const dataLimit = data.slice(0, cardLimit ? cardLimit : data.length);
  dataLimit.forEach((singleCard) => {
    const { name, image, features, published_in } = singleCard;
    cardContainer.innerHTML += `
        <div class="aiCard rounded">
         <div class="card w-full h-full bg-base-100 shadow-xl p-3">
            <figure><img class="rounded-lg" src="${image}"/>
            </figure>
            <div class="card-body">
                <h2 class="card-title">Features</h2>
                <div class="ml-5">
                    <ol class="list-decimal">
                    <li>${features[0]}</li>
                    <li>${features[1]}</li>
                    <li>${features[2]}</li>
                    <ol>
                </div>
                <hr class="my-4">
                <div class="flex justify-between items-center">
                    <div>
                    <p class="font-bold mb-1">${name}</p>
                    <p><i class="fa-sharp fa-regular fa-calendar"></i>  ${published_in}</p>
                    </div>
                    <div>
                    <i class="fa-solid fa-arrow-right text-red-700"></i>
                    </div>
                </div>
            </div>
         </div>
        </div>
    `;
  });
};

const seeMore = () => {
  loadAiData(0);
  const showAll = document.getElementById("show-all");
  showAll.classList.add("hidden");
};

loadAiData();
