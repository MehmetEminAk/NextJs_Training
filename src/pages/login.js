import { Content } from "next/font/google";
import React from "react";
import { useState } from "react";
import { headers } from "../../next.config";
import { useRouter } from "next/router";

const Login = () => {

    const [email,setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [result,setResult] = useState(null);
    const router = useRouter();
    const  formHandler = async (e) => {
        e.preventDefault();
        
        const result = await fetch("/api/login", {
            method : "POST" ,
            body : JSON.stringify({email , password}),
            headers : {
                "Content-Type" : "application/json",
            }
        });
       
       const deneme = await result.json();
    
        console.log(JSON.stringify(deneme))
        if (deneme) {
           
            const { token , ownerId } = deneme;
            console.log("Deneemeeeeeabc");
            console.log(token);
            document.cookie = `token=${token}`;
            document.cookie = `tokenOwnerId=${ownerId}`;
            router.push("/adminPage");
        }else {
            setResult("Şifreniz veya email adresiniz hatalı! Lütfen tekrar kontrol ediniz");
        }


    }


    return (
    
    
    <div>
        <div>{result}</div>
        <form onSubmit={formHandler}>
        <input type = "text" value={email} onChange= { (e) => { setEmail(e.target.value)}}></input><br/><br/>
        <input type = "text" value={password} onChange= { (e) => { setPassword(e.target.value)}}></input><br/><br/>
        <button type="submit">Giriş Yap</button>
        </form>
    </div>)
}

export default Login;