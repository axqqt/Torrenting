import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

export default function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [quality, setQuality] = useState("all");

  async function submitx(query_term, qual, limit) {
    try {
      const response = await Axios.get(
        `http://localhost:5000/main/?query_term=${query_term}&quality=${qual}&limit=${limit}`
      );

      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  function handler(e) {
    e.preventDefault();
    submitx(search, quality);
  }

  return (
    <div className="App">
      <form onSubmit={handler}>
        <h1>
          Hit Enter/Submit Again , if correct outcome is not being displayed!
        </h1>
    /*
        <label >Select Quality:</label>
        <select
          name="membership"
          id="membership"
          onChange={(e) => {
            setQuality(e.target.value);
          }}
          value={quality}
        >
          <option selected>All</option>
          <option value={"3D"}>3D</option>
          <option value={"1080p"}>1080p</option>
          <option value={"720p"}>720p</option>
        </select>
    */
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
          placeholder="Search Here"
          type="text"
          className="searchbar"
        ></input>
            /*
        <select>
          <option value={"20"} className="show">
            20
          </option>
        </select>
        */
    
        <button type="submit">Submit</button>
        {data.length === 0 ? (
          <p>No results found</p>
        ) : (
          data.map((item) => (
            <div className="within" key={item.id}>
              <h1>Title: {item.title || "Unavailable"}</h1>
              <br></br>
              <img
                src={item.large_cover_image || "Unavailable"}
                alt={`Cover for ${item.title}`}
              />
              <br></br>
              <a href={item.url || "Unavailable"}>Read More</a>
              <p> {item.summary || "Unavailable"}</p>
              <p>Year: {item.year || "Unavailable"}</p>
              <p>Rating: {item.rating || "Unavailable"} / 10 </p>
              <br></br>
              <img
                src={item.background_image_original || "Unavailable"}
                alt={`Background for ${item.title}`}
              />
              <p> Genre: {item.genres+"" || "Unavailable"}</p>
              {item.torrents.length > 0 ? (
                <div>
                  <a href={item.torrents[0].url}>Torrent Download</a>
                  <p>Quality: {item.torrents[0].quality || "Unavailable"}</p>
                  <p>Size: {item.torrents[0].size || "Unavailable"}</p>
                  <p>
                    Uploaded On:
                    {item.torrents[0].date_uploaded || "Unavailable"}
                  </p>
                </div>
              ) : (
                <p>Torrent information not available</p>
              )}
              <p> Runtime : {item.runtime || "Unavailable"} mins</p>
            </div>
          ))
        )}
      </form>
    </div>
  );
}
