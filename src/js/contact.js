let Faq = `*[_type=="faq"]`;
function dynamicFaqQueryFunc(query){
  let PROJECT_ID ='8ovfuzs4';
  let DATASET = 'production';
  return `https://${PROJECT_ID}.api.sanity.io/v2023-05-03/data/query/${DATASET}?query=${query}`;
}
function urlFor(source) {
  return builder.image(source)
}

let DataQueriesFaq = {
  faq: `*[_type=="faq"]{question,answer,title,slug}
  `, 
};

async function getApiDataFaq(faqQuery,cb) {
  let url = dynamicFaqQueryFunc(faqQuery);
  fetch(url).then((res) => res.json()).then((res) => cb(res.result))

}



const ACCARDION_DATA = document.querySelector(".accardion-data");
const renderAccardionData = (data) => {
  data &&
    data.forEach((faq, index) => {
      ACCARDION_DATA.innerHTML += `
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-heading-${index}">
            <button class="accordion-button collapsed" type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#flush-collapse-${index}" 
              aria-expanded="false" 
              aria-controls="flush-collapse-${index}">
              ${faq.question}
            </button>
          </h2>
          <div id="flush-collapse-${index}" class="accordion-collapse collapse" 
            aria-labelledby="flush-heading-${index}" 
            data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
              ${faq.answer}
            </div>
          </div>
        </div>
      `;
    });
};

  getApiDataFaq(DataQueriesFaq.faq, (data) => {
    renderAccardionData(data);
  });

//   