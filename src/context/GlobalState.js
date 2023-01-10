import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext()
const GlobalProvider = props => {
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState("a")
    const [movies, setMovies] = useState([])
    const [favorites, setFavorites] = useState(localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : [])

    const API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${query ? query :"a"}`

    useEffect(() => {
        const fetchMovies = async (url) => {
            setLoading(true)
            try {
                const response = await fetch(url)
                const data = await response.json()
                if(!query){
                    setQuery("a")
                }
                setMovies(data.results)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        fetchMovies(`${API}`)
    }, [query])
    const addToFavorites = (movie) => {
        setFavorites([...favorites, movie])
        localStorage.setItem("favorites", JSON.stringify([...favorites, movie]))
    }
    const removeFromFavorites = (id) => {
        const newArray = favorites.filter(item => item.id !== id)
        setFavorites(newArray)
        localStorage.setItem("favorites", JSON.stringify(newArray))
    }

    return (
        <GlobalContext.Provider value={{
            loading,
            setLoading,
            movies,
            setMovies,
            setQuery,
            favorites,
            addToFavorites,
            removeFromFavorites
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
export { GlobalContext, GlobalProvider }

