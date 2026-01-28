import {useState, useEffect} from "react"
import axios from 'axios'
import { LOCAL_URL } from "../api/local"
import { PROD_URL } from "../api/production"

<<<<<<< HEAD
const BASE_URL = process.env.REACT_APP_SERVER_MODE === 'production'? PROD_URL : LOCAL_URL
console.log('BASE_URL', process.env.REACT_APP_SERVER_MODE, BASE_URL)
=======
const BASE_URL = process.env.SERVER_MODE === 'production'? PROD_URL : LOCAL_URL
console.log(BASE_URL)
>>>>>>> e5f759321a483f6192d23a70195b823dfa1e38fc

export const useFetch = (url) => {
    
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async ()=>{
            setLoading(true)
            try{
                const res = await axios.get(BASE_URL + url, {
                    withCredentials: true
                })
                console.log(res)
                setData(res.data)
            }catch(err){
                setError(true)
            }
            setLoading(false)

        }
        fetchData()
    },[url])

    const reFetch = async ()=>{
        setLoading(true)
        try{
            const res = axios.get(url)
            setData(res.data)
        }catch(err){
            setError(true)
        }
        setLoading(false)

    }

    return {data, loading, error, reFetch}
}

