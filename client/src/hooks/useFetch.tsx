import { useEffect, useState } from "react";
import axios from "axios";
interface Hotel{
  
  id:any ;
  name:string ;
  type:string;
  city:string;
  address:string;
  distance:number;
  photos:any[] ;
  desc:string;
  rating:number;
  rooms:any[];
  cheapestPrice:number;
  featured:boolean;



}

// interface Room{
//   title:any ;
//   price:number;
//   maxPeople:number;
//   desc:string;
//   roomNumbers:any[];
// }
export const api = axios.create({baseURL:"http://localhost:8005/"})
const useFetch = (url) => {
  const [data, setData] = useState<Hotel|any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;