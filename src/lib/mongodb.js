import { MongoClient } from "mongodb";

const uri = "mongodb+srv://admin:Emar1234@cluster0.omqnjkq.mongodb.net/?retryWrites=true&w=majority";

let client;
let clientPromise;

if (!clientPromise){
    client =  new  MongoClient(uri)
    clientPromise =  client.connect();
}

export default clientPromise;