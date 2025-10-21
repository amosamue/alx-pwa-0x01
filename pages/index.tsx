import { useEffect } from "react"; 
import { useRouter } from "next/router"; 

export default function Home() { 
  const router = useRouter(); 

  useEffect(() => { 
    router.replace("/movies"); // redirect to /movies 
  }, [router]); 

  return <p>Redirecting to movies...</p>; // optional fallback 
}