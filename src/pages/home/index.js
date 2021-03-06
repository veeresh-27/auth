import React from "react";
import "./styles.css";
import Card from "../../components/card";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import MovieCard from "../../components/movieCard";
import CustomPagination from "../../components/customPagination";

function Home() {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_MOVIESDB_API_KEY}&page=${page}`
    );
    setContent(data.results);
    console.log("Trending:", data);
  };
  useEffect(() => {
    fetchTrending();
  }, [page]);

  return (
    <div className="home">
      <h1>Trending</h1>
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
              mediaType={data.media_type}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
}

export default Home;
