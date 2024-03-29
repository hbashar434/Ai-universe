let dataContainer = [];
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
  dataContainer = dataLimit;
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
                    <div>${
                      features?.[0] ? `<li>${features?.[0]}</li>` : ""
                    }</div>
                    <div>${
                      features?.[1] ? `<li>${features?.[1]}</li>` : ""
                    }</div>
                    <div>${
                      features?.[2] ? `<li>${features?.[2]}</li>` : ""
                    }</div>
                    <div>${
                      features?.[3] ? `<li>${features?.[3]}</li>` : ""
                    }</div>
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

const fetchAiModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAiModal(data.data);
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
          <span class="mt-2">${
            pricing?.[0].price ? pricing[0].price : "Free of Cost/"
          }</span> 
          <span>${pricing?.[0].plan ? pricing[0].plan : "Basic"}</span>
        </div>
        <div class="card bg-white text-amber-500 p-2 w-full h-full">
          <span class="mt-2" >${
            pricing?.[1].price ? pricing[1].price : "Free of Cost/"
          }</span> 
          <span>${pricing?.[1].plan ? pricing[1].plan : "Pro"}</span>
        </div>
        <div class="card bg-white text-red-500 p-2 w-full h-full">
          <span>${
            pricing?.[2].price ? pricing[2].price : "Free of Cost/"
          }</span> 
          <span>${pricing?.[2].plan ? pricing[2].plan : "Enterprise"}</span>
        </div>
      </div>

        <div class="flex justify-between gap-6">
          <div>
              <h1 class="text-xl font-semibold">Features</h1>
              <div class="ml-5 text-sm">
                    <ul class="list-disc">
                        <div>${
                          features?.[1]
                            ? `<li>${features?.["1"].feature_name}</li>`
                            : ""
                        }</div>
                        <div>${
                          features?.[2]
                            ? `<li>${features?.["2"].feature_name}</li>`
                            : ""
                        }</div>
                        <div>${
                          features?.[3]
                            ? `<li>${features?.["3"].feature_name}</li>`
                            : ""
                        }</div>
                        <div>${
                          features?.[4]
                            ? `<li>${features?.["4"].feature_name}</li>`
                            : ""
                        }</div>                           
                  <ul>
              </div> 
          </div>
          
          <div>
              <h1 class="text-xl font-semibold">Integrations</h1>
              <div class="ml-5 text-sm">
                  <ul class="list-disc">
                      <div class="text-lg">${
                        integrations === null ? "No Data Found" : ""
                      }</div>
                      <div>${
                        integrations?.[0] ? `<li>${integrations?.[0]}</li>` : ""
                      }</div>
                      <div>${
                        integrations?.[1] ? `<li>${integrations?.[1]}</li>` : ""
                      }</div>
                      <div>${
                        integrations?.[2] ? `<li>${integrations?.[2]}</li>` : ""
                      }</div>
                  <ul>
              </div> 
          </div>
        </div>   
    </div>

    <div class="card border p-4 modal-right">
    <div id="accuracy-badge">${
      score
        ? `<span class=" rounded w-3/12 bg-red-600 text-center text-xs font-semibold p-1 text-white relative top-8 left-56 lg:top-8 lg:left-64">${
            score * 100
          }% accuracy</span>`
        : ""
    }</div>
      <figure>
      <img class="rounded-lg h-48 w-80" src="${image_link?.[0]}"/>
      </figure>
      <div class="mt-8 text-center p-8">
        <p class="font-bold text-xl mb-4">${
          input_output_examples?.[0].input
            ? input_output_examples[0].input
            : "Can you give any example?"
        }</p>
        <p>${
          input_output_examples?.[0].output
            ? input_output_examples[0]?.output
            : "No! Not Yet! Take a break!!!"
        }</p>
      </div>
    </div>
  `;
};

const seeMore = () => {
  loadAiData(0);
  const showAll = document.getElementById("show-all");
  showAll.classList.add("hidden");
};

const sortByDate = () => {
  sortedDateData(dataContainer);
};

const sortedDateData = (data) => {
  data.sort((a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);

    if (dateA > dateB) {
      return -1;
    }
    if (dateB > dateA) {
      return 1;
    }
    return 0;
  });
  displayAiData(data);
};

loadAiData();
