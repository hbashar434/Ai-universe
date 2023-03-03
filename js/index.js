const loadAiData = (cardLimit = 6) => {
  document.getElementById("load-spinner").classList.remove("hidden");
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayAiData(data.data.tools, cardLimit);
      document.getElementById("load-spinner").classList.add("hidden");
      document.getElementById("see-more-section").classList.remove("hidden");
    });
};

const displayAiData = (data, cardLimit) => {
  const cardContainer = document.getElementById("card-section");
  cardContainer.textContent = "";
  const dataLimit = data.slice(0, cardLimit ? cardLimit : data.length);
  dataLimit.forEach((singleCard) => {
    const { id, name, image, features, published_in } = singleCard;
    cardContainer.innerHTML += `
        <div class="aiCard rounded">
         <div class="card w-full h-full bg-base-100 shadow-xl p-3">
            <figure><img class="rounded-lg h-48" src="${image}"/>
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
                    <label for="my-modal-3">
                    <i class="fa-solid fa-arrow-right text-red-700 cursor-pointer" onclick="fetchAiModal('${id}')"></i>
                    </label>
                    </div>
                </div>
            </div>
         </div>
        </div>
    `;
  });
};

const fetchAiModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAiModal(data.data));
};

const displayAiModal = (data) => {
  const modalDetails = document.getElementById("modal-details");
  modalDetails.textContent = "";
  const {
    description,
    image_link,
    pricing,
    features,
    integrations,
    input_output_examples,
    accuracy: { score },
  } = data;

  modalDetails.innerHTML += `
    <div class="card border-2 border-red-300 bg-red-50 p-8 modal-left">
      <h1 class="text-xl font-semibold">${description}</h1>
      <div class="flex justify-between gap-2 my-4 font-semibold text-center">
        <div class="card bg-white text-green-500 p-2 w-full h-full">
          <span class="mt-3">${pricing[0].price}</span> 
          <span>${pricing[0].plan}</span>
        </div>
        <div class="card bg-white text-amber-500 p-2 w-full h-full">
          <span class="mt-3" >${pricing[1].price}</span> 
          <span>${pricing[1].plan}</span>
        </div>
        <div class="card bg-white text-red-500 p-2 w-full h-full">
          <span>${pricing[2].price}</span> 
          <span>${pricing[2].plan}</span>
        </div>
      </div>

        <div class="flex justify-between">
          <div>
              <h1 class="text-xl font-semibold">Features</h1>
              <div class="ml-5 text-sm">
                  <ul class="list-disc">
                      <li>${features["1"].feature_name}</li>
                      <li>${features["2"].feature_name}</li>
                      <li>${features["3"].feature_name}</li>
                  <ul>
              </div> 
          </div>
          
          <div>
              <h1 class="text-xl font-semibold">Integrations</h1>
              <div class="ml-5 text-sm">
                  <ul class="list-disc">
                      <li>${integrations[0]}</li>
                      <li>${integrations[1]}</li>
                      <li>${integrations[2]}</li>
                  <ul>
              </div> 
          </div>
        </div>   
    </div>


    <div class="card border p-4 modal-right">
    <div id="accuracy" class="rounded w-3/12 bg-red-600 text-center text-xs font-semibold p-1 text-white relative top-8 left-64 ">${score}% accuracy</div>
      <figure>
      <img class="rounded-lg h-48" src="${image_link[0]}"/>
      </figure>
      <div class="mt-8 text-center p-8">
        <p class="font-bold text-xl mb-4">${input_output_examples[0].input}</p>
        <p>${input_output_examples[0].output}</p>
      </div>
    </div>
  `;
};

const seeMore = () => {
  loadAiData(0);
  const showAll = document.getElementById("show-all");
  showAll.classList.add("hidden");
};

loadAiData();
