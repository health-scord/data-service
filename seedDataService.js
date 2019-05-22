const rp = require("request-promise")
const apiUrl = `https://157.230.2.203`

const main = () => {

    //needs to create a list of account objects and post them to database

    let accounts = [
        {
            id: 'r43e4564r',
            firstName: 'Jared',
            lastName: 'Starin',
            devices:[
                {
                    make: 'fitbit',
                    model: 'charge3',
                    deviceUserId: '26FFKE',
                    accessToken: '23423424234',
                    refreshToken: '45645645645645'
                }
            ],
            healthScore:{
                calculated:'670',
                components: {
                    sleep:{
                        averageDailySleepHours: '5.5',
                    },
                    fitness:{
                        averageDailyRigorousActivityMinutes: '35',
                        averageRigorousActivityTimesPerWeek: '3'
                    },
                    heartRate:{
                        averageRestingHeartRate: '73'
                    }
                }
            }

        }
    ]

    for (let account of accounts){
        let options = {
            uri: `http://${apiUrl}/accounts/${account.id}`,
            method: 'POST',
            body: account ,
            json: true
        }
                 
        try{            
            await rp(options)
        } catch(error){
            console.log(error)
        }
    }



}

main()