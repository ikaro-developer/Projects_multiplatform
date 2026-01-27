import { useState, ReactNode } from "react";

// import { auth } from '../services/Firebase'
// import {onAuthStateChanged} from 'firebase/auth'

import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export default function Private({ children }: PrivateProps) {
  //   const [loading, setLoading] = useState(true);
  const [sign] = useState(true);

  // useEffect(()=>{
  //     async function checkLogin(){
  //         const unsub = onAuthStateChanged(auth,(user)=>{
  //             if(user){
  //                 const userData={
  //                     uid:user.id,
  //                     email:user.email
  //                 }
  //                 localStorage.setItem("@deatilUser", JSON.stringify(userData))
  //                 setLoading(false)
  //                 setSign(true)
  //             }else{
  //                 setLoading(false)
  //                 setSign(false)
  //             }
  //         })
  //     }
  //     checkLogin()
  // },[])

  //   if (loading) {
  //     return <div></div>;
  //   }
  if (!sign) {
    return <Navigate to="/home" />;
  }
  return children;
}
