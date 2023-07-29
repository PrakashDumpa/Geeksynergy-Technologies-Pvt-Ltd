import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import "./index.css";

const MovieCard = (props) => {
  const {
    director,
    title,
    genre,
    stars,
    language,
    releasedDate,
    runTime,
    voted,
    upVoted,
    totalVoted,
    pageViews,
    poster,
  } = props.eachCard;
  const dateObj = new Date(releasedDate * 1000);
  return (
    <div className="mt-3 mb-3  h-100">
      <div className="shadow-lg d-flex flex-column">
        <div className="p-3 w-100  d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex flex-column col-2 jusify-content-between h-100 align-items-center">
            <div>
              <BsFillCaretUpFill className="icon_size " />
              <p className="m-0 text-center">{totalVoted}</p>
              <BsFillCaretDownFill className="icon_size" />
            </div>
            <p className="m-0">Votes</p>
          </div>

          <div className="bg-danger">
            <img className="h-100 w-100" src={poster} alt={title} />
          </div>
          <div className="col-7 mb-3 mt-3 ml-3">
            <h1 className="h5 mb-3 mt-3">{title}</h1>
            <div className="d-flex mb-3 mt-3">
              <h1 className="h5 text-secondary">Genre:</h1>
              <p>{genre}</p>
            </div>
            <div className="d-flex mb-3 mt-3">
              <h1 className="h5 text-secondary">Director:</h1>
              <p>{director[0]}</p>
            </div>
            <div className="d-flex mb-3 mt-3">
              <h1 className="h5 text-secondary">Starring:</h1>
              <p>{`${stars[0]} | ${stars[1]}`}</p>
            </div>
            <div className="d-flex mb-3 mt-3">
              <p className=" text-secondary">
                {runTime} Mins | {language} |{" "}
                {`${dateObj.getDate()}/${
                  dateObj.getMonth() + 1
                }/${dateObj.getFullYear()}`}
              </p>
            </div>
            <div className="d-flex">
              <p className=" text-secondary">Total views:{pageViews}</p>
              <div className="d-flex">
                <p className="text-secondary ml-2">Voted by</p>
                <p>{` ${voted.length} People`}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button className="btn btn-primary w-100">Watch Trailer</button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default MovieCard;
