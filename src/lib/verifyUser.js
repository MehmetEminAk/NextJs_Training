import jwt from "jsonwebtoken";

const verifyUser = (token) => {
    const {SECRET_KEY} = process.env;
    
    
    try {
        
        const credentials =  jwt.verify(token,SECRET_KEY);
        
         const user = { id : credentials.id}
         return user
    }catch (err) {
        console.error(err);
    }
    
    
}

export default verifyUser;