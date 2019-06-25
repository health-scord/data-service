const rp = require("request-promise");
const apiUrl = `68.183.100.145:5000`;

const main = async () => {
  //needs to create a list of account objects and post them to database

  let accounts = [
    {
      id: "r43e4564r",
      firstName: "Jared",
      lastName: "Starin",
      devices: [
        {
          make: "fitbit",
          model: "charge3",
          deviceUserId: "",
          accessToken: "",
          refreshToken: ""
        }
      ],
      healthScore: {
        calculated: "780",
        components: {
          sleep: {
            averageDailySleepHours: "5.5"
          },
          fitness: {
            averageDailyRigorousActivityMinutes: "35",
            averageRigorousActivityTimesPerWeek: "3"
          },
          heartRate: {
            averageRestingHeartRate: "73"
          }
        }
      }
    }
    // {
    //   id: "r43e4533r",
    //   firstName: "Zach",
    //   lastName: "Starin",
    //   devices: [
    //     {
    //       make: "fitbit",
    //       model: "charge3",
    //       deviceUserId: "",
    //       accessToken: "",
    //       refreshToken: ""
    //     }
    //   ],
    //   healthScore: {
    //     calculated: "670",
    //     components: {
    //       sleep: {
    //         averageDailySleepHours: "5.5"
    //       },
    //       fitness: {
    //         averageDailyRigorousActivityMinutes: "35",
    //         averageRigorousActivityTimesPerWeek: "3"
    //       },
    //       heartRate: {
    //         averageRestingHeartRate: "73"
    //       }
    //     }
    //   }
    // },
    // {
    //   id: "r43e2344r",
    //   firstName: "Marshall",
    //   lastName: "Cox",
    //   devices: [
    //     {
    //       make: "fitbit",
    //       model: "charge3",
    //       deviceUserId: "",
    //       accessToken: "",
    //       refreshToken: ""
    //     }
    //   ],
    //   healthScore: {
    //     calculated: "500",
    //     components: {
    //       sleep: {
    //         averageDailySleepHours: "5.5"
    //       },
    //       fitness: {
    //         averageDailyRigorousActivityMinutes: "35",
    //         averageRigorousActivityTimesPerWeek: "3"
    //       },
    //       heartRate: {
    //         averageRestingHeartRate: "73"
    //       }
    //     }
    //   }
    // }
  ];

  for (let account of accounts) {
    let options = {
      uri: `http://${apiUrl}/accounts/${account.id}`,
      method: "POST",
      body: account,
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
