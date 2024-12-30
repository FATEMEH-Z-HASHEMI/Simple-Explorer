import { useEffect, useState } from "react";


export function useInfiniteScroll(callback: () => void){
    const[observer,setObserver] = useState<IntersectionObserver | null>(null);

    useEffect(()=>{
        const options = {
            root:null,
            rootMargin:"20px",
            threshold:1.0,
        }

        const observer = new IntersectionObserver((entries) => {
            const[entry] = entries;
            if(entry.isIntersecting){
                callback()
            }
        },options)
    
        setObserver(observer)
    
        return () => {
            if(observer){
                observer.disconnect();
            }
        };
    },[callback]);

    return observer

    
}