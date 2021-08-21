const fetch = require("sync-fetch");
const Page = require("./_layout/Default");

console.log("index.js");
module.exports = class extends Page {
  constructor() {
    super({ title: "Home", sName: "Moj" });
  }
  render(sPage) {
    const oJson = fetch(
      "https://project-5479518509391935408-default-rtdb.firebaseio.com/meals.json"
    ).json();
    console.log(oJson);
    let sResult = "<h1>Upcoming Popup Meals</h1>";
    sResult += "<div class ='card-deck'>";
    let n = 0;
    Object.keys(oJson).map((key) => {
      const oEntity = oJson[key];
      console.log(oEntity);
      oEntity.id = key;
      sResult += `
            <div class="card" style="width: 25rem;">
      
            <p><img class="card-img-top" src="${oEntity.featured_image}" alt="${
        oEntity.title
      }>"</p>
              <div class="card-body">
                  <h5 class="card-title">${oEntity.title}</h5>
            <p class="card-text" >${oEntity.full_description}</p>
            <p>Find us around ${oEntity.location}</p>
            <p>available from ${oEntity.date}</p>
            <p>${oEntity.cost} bucks</p>
            <form>
                <button id="button_${n++}" disabled class="paypal_button" data-cost="${
        oEntity.cost
      }">
                Order now
                </button>
            </div>
              </div>
            </form>
            `;
    });
    sResult += "</div>";
    return sResult;
  }
};
