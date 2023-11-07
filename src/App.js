import "./App.css";
import { useState } from "react";
import Axios from "axios";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  async function apiCalls(e) {
    e.preventDefault();
    try {
      const response = await Axios.get(`http://localhost:8000/home/login`, {
        params: { search: search }, 
      });
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
      <form onSubmit={apiCalls} >
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          type="text"
          placeholder="Search Film"
        ></input>
        {movies.length === 0 ? (
          <p>No results found</p>
        ) : (
          movies.map((x) => (
            <div key={x.id} >
              <br />
              <h1>{x.title}</h1>
              <img src={x.large_cover_image} alt="" />
              <p>{x.description_full || "Description unavailable"}</p>
              <img src={x.background_image_original} alt="" />
              <br />
            </div>
          ))
        )}
        <button type="submit" className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Get request</button>
      </form>
      <br></br>
      <div>
    <span className="">
            <h1>Yo i'm Veloxal</h1>
    </span>
  </div>
  <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
  <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
    </div>
  );
}
