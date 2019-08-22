const rp = require("request-promise");
const apiUrl = `data-service:9000`;

const main = async () => {
  const options = {
    uri: `http://${apiUrl}/accounts/`,
    method: "GET",
    json: true
  };

  //get all accounts in db
  const accounts = await rp(options);

  console.log("got accounts:");
  console.log(JSON.stringify(accounts));

  for await (let account of accounts) {
    let options = {
      uri: `http://${apiUrl}/accounts/${account.id}`,
      method: "PATCH",
      body: {
        offers: [
          {
            title: "Life Insurance Policy",
            description: "30% less on monthly premium",
            company: "Ladder Life Insurance",
            image: "none",
            link: "https://www.ladderlife.com/"
          },
          {
            title: "Running Shoes",
            description: "30% discount",
            company: "Nike",
            image: "none",
            link: "https://www.nike.com/"
          },
          {
            title: "Vitamins",
            description: "20% discounted supplements",
            company: "VitaminShoppe",
            image: "none",
            link: "https://www.vitaminshoppe.com"
          }
        ]
      },
      json: true
    };

    try {
      await rp(options);
    } catch (error) {
      console.log(error.message);
    }
  }
};

main();
