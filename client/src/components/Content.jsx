import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function Content() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("loading...");

  async function getData() {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${searchInput}`,
      );
      console.log(response);
      setData(response.data.data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, [searchInput]);
  return (
    <div className="flex flex-col justify-center w-[100%] gap-7">
      <input
        type="text"
        placeholder="หาที่เที่ยวแล้วไปกัน..."
        className=" border-b-2 outline-none"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
      />

      {status === "success" ? (
        data.map((item, index) => {
          return (
            <div key={index} className="flex flex-row gap-4">
              <img
                src={item.photos[0]}
                alt=""
                className="w-[150px] h-[170px] rounded-xl"
              />
              <div className="flex flex-col gap-2">
                <a href={item.url} target="_blank">
                  {item.title}
                </a>
                <p>
                  {item.description.substring(0, 100)}...
                  <a
                    className=" text-blue-400 underline"
                    href={item.url}
                    target="_blank"
                  >
                    อ่านต่อ
                  </a>
                </p>
                <p>
                  หมวด:
                  {item.tags.map((tag) => {
                    return <p> {tag}</p>;
                  })}
                </p>
                <div className="flex gap-5">
                  {item.photos.map((photo, index) => {
                    return index > 0 ? (
                      <img
                        key={index}
                        src={photo}
                        alt=""
                        className=" w-[75px] h-[75px] rounded-xl"
                      />
                    ) : (
                      ""
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>{status}</h1>
      )}
    </div>
  );
}

export default Content;
