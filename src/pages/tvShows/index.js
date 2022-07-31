import React from "react";
import Card from "../../components/card";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import MovieCard from "../../components/movieCard";
import CustomPagination from "../../components/customPagination";
import Genre from "../../components/genre";
import useGenre from "../../hooks/useGenre";

function TvShows() {
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [genre, setGenre] = useState([]);
  const genreForMovies = useGenre(selectedGenre);

  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreForMovies}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
    console.log("Series:", data);
  };
  useEffect(() => {
    fetchTrending();
  }, [page, genreForMovies]);

  return (
    <div className="home">
      <h1>Series</h1>
      <Genre
        type="tv"
        selectedGenre={selectedGenre}
        genre={genre}
        setGenre={setGenre}
        setSelectedGenre={setSelectedGenre}
        page={page}
        setPage={setPage}
      />
      <div className="cards">
        {content &&
          content.map((data, index) => (
            <MovieCard
              key={data.id}
              id={data.id}
              title={data.title || data.name}
              poster={data.poster_path}
              rating={data.vote_average}
              date={data.release_date || data.first_air_date}
              mediaType='tv'
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
}

export default TvShows;
