import verifyUser from "@/lib/verifyUser";
import { useRouter } from "next/router";



export async function getServerSideProps(context){
    
    const { req , res } = context;
  
    if(!req.cookies.token) {
       
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
    }

    if(!req.cookies.tokenOwnerId) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const user =  await verifyUser(req.cookies.token);

    
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
      }
    
    const { id } = user;
    const attemptedUserId = req.cookies.tokenOwnerId;
    console.log("Deneme " + attemptedUserId)
    if( id != attemptedUserId ) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
    
      return {
        props: {},
      };
}

export default function AdminDashBoard(){
    return "Merhabaaa Mehmet Han Hazretleri!";
}
