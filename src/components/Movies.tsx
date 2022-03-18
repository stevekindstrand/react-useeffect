import axios from "axios"
import { useEffect, useState } from "react";
import { IMovie } from "../models/IMovie";
import { Movie } from "../models/Movie";

export function Movies() {
    const [movies, setMovies] = useState<Movie[]>([]);
    
    useEffect(() => {
        getData();
       }, []);

    function getData() {
        axios.get<IMovie[]>('http://medieinstitutet-wie-products.azurewebsites.net/api/products')
        .then((response) => {
            let moviesFromApi = response.data.map((movie: IMovie) => {
                return new Movie(movie.id, movie.name, movie.imageUrl);
            });
            setMovies(moviesFromApi);
        });
    }

    let MovieList = movies.map((movies) => {
        return (<li key={movies.id}>{movies.id}, {movies.title}</li>)
    });

    return (
        <ul>{MovieList}</ul>
    )
}