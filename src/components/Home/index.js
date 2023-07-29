import { useEffect, useMemo, useState } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import { RenderFailureView, manualMoviesData, url } from "../../Source";
import { apiStatusConstants } from "../../Source";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import MovieCard from "../MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [getMoviesApiStatus, setGetMoviesApiStatus] = useState(
    apiStatusConstants.initial
  );

  const renderList = () => {
    return (
      <li className="">
        {movies.map((obj) => (
          <MovieCard eachCard={obj} />
        ))}
      </li>
    );
  };

  const getAllMovies = async () => {
    setGetMoviesApiStatus(apiStatusConstants.load);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: "movies",
        language: "kannada",
        genre: "all",
        sort: "voting",
      }),
    };
    try {
      const response = await fetch(
        "https://hoblist.com/api/movieList",
        options
      );
      const data = await response.json();
      setMovies(data.result);
      console.log(data.result);
      setGetMoviesApiStatus(apiStatusConstants.success);
    } catch (e) {
      console.log(e);
      // due to cors policy error API is not working so,i am using manual data incase of api failure.
      setMovies(manualMoviesData);
      setGetMoviesApiStatus(apiStatusConstants.success);
      // setGetMoviesApiStatus(apiStatusConstants.fail);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  const renderSuccessView = () => (
    <>
      <h1 className="h3 mt-3" style={{ color: "black" }}>
        All Movies
      </h1>
      <div className="">
        <hr className="m-0 p-0" />
      </div>
      <ul className="list-unstyled w-100  ">{renderList()}</ul>
    </>
  );

  const EachSkeleton = () => (
    <div className="homeFeedCardCon p-3 mt-3 mb-3">
      <div className="userDetCon d-flex">
        <div className=" w-100">
          <Skeleton variant="rectangular" height={200} className="mb-2" />
          <Skeleton variant="rectangular" height={30} />
        </div>
      </div>
    </div>
  );

  const renderLoadingView = () => (
    <>
      <h1 className="h3 mt-3" style={{ color: "black" }}>
        <Skeleton variant="text" sx={{ fontSize: "2rem", width: "15rem" }} />
      </h1>
      <div className="">
        <hr className="m-0 p-0" />
      </div>
      <div className="feedCon align-self-center">
        {Array.from({ length: 10 }).map(() => (
          <EachSkeleton key={uuidv4()} />
        ))}
      </div>
    </>
  );

  const renderHomeUI = () => {
    switch (getMoviesApiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.load:
        return renderLoadingView();
      case apiStatusConstants.fail:
        return <RenderFailureView callAgain={getAllMovies} />;
      default:
        return <></>;
    }
  };

  return (
    <div className="homeCon d-flex flex-column mb-5">{renderHomeUI()}</div>
  );
};

export default Home;
