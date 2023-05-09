import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { env } from "process";

const handler = async (req,res) => {
    const { email , password } = req.body;
    
    const client = await clientPromise;
    const db = client.db("news");

    let result = await db.collection("authors").find({email : email , password : password}).toArray();


    const  {SECRET_KEY} = process.env;
    var admin = result[0];
    var { _id } = admin;
    const id = _id.toString();
    
    if (id) {
        
        const token = jwt.sign({id : id} , SECRET_KEY , {
            expiresIn : "1h",
        })
       
        
        res.status(200).json({ token  : token , ownerId : id});
    }else {
        res.status(401).json({ message : "There is no user like this"})
    }
}

export default handler;
