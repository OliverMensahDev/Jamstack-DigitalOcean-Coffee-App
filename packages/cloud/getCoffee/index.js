// The function's dependencies.
const { MongoClient } = require('mongodb');

// Function starts here.
async function main(args) {

    // MongoDB client configuration.
    const uri = process.env['DATABASE_URL'];
    let client = new MongoClient(uri);

    // Instantiates a connection to the database and retrieves data from the `available-coffee` collection
    try {
        let name = args.name;
        await client.connect();
        const inventory = await client.db("do-coffee").collection("available-coffees").findOne({name})
        console.log(inventory);
        return {
            "body": inventory
        };
    } catch (e) {
        console.error(e);
        return {
            "body": { "error": "There was a problem retrieving data - " + e.message },
            "statusCode": 400
        };
    } finally {
        await client.close();
    }
}

// IMPORTANT: Makes the function available as a module in the project.
// This is required for any functions that require external dependencies.
exports.main = main; 
 
 
 
