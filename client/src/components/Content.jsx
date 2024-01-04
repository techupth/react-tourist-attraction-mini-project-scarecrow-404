import React, { useEffect, useState } from "react";
import ShareIcon from "@mui/icons-material/Share";
import { IconButton, Tooltip } from "@mui/material";
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

  function handleCategoryClick(category) {
    setSearchInput((currentValue) => {
      const updateValue = currentValue
        ? `${currentValue} ${category}`
        : category;
      return updateValue;
    });
  }
  function copyUrlToClipboard(url) {
    navigator.clipboard.writeText(url);
  }
  return (
    <>
      <h1 className=" pl-[10%]">ค้นหาที่เที่ยว</h1>
      <div className="flex flex-col items-center w-[100%] gap-7 p-10 ">
        <input
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน..."
          className=" border-b-2 outline-none text-center w-[85%]"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />

        {status === "success" ? (
          data.map((item, index) => {
            return (
              <div key={index} className="flex flex-row gap-4 w-[80%]">
                <img
                  src={item.photos[0]}
                  alt=""
                  className="w-[250px] h-[200px] rounded-xl"
                />
                <div className="flex flex-col gap-2">
                  <a href={item.url} target="_blank" className=" text-xl">
                    {item.title}
                  </a>
                  <p className=" text-gray-600">
                    {item.description.substring(0, 100)}...
                    <a
                      className=" text-blue-400 underline"
                      href={item.url}
                      target="_blank"
                    >
                      อ่านต่อ
                    </a>
                  </p>
                  <p className="text-gray-6007">
                    หมวด:
                    {item.tags.map((tag, index, self) => {
                      return index + 1 < self.length ? (
                        <button
                          key={index}
                          className=" ml-1 text-gray-600 underline"
                          onClick={() => {
                            handleCategoryClick(tag);
                          }}
                        >
                          {/* {console.log(self.length, index)} */}
                          {tag}
                        </button>
                      ) : (
                        <>
                          {" "}
                          และ
                          <button
                            key={index}
                            className=" ml-1 text-gray-600 underline"
                            onClick={() => {
                              handleCategoryClick(tag);
                            }}
                          >
                            {/* {console.log(self.length, index)} */}
                            {tag}
                          </button>
                        </>
                      );
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
                <div>
                  <Tooltip title="Copy URL">
                    <IconButton
                      onClick={() => {
                        copyUrlToClipboard(item.url);
                      }}
                      style={{ color: "blue" }}
                    >
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            );
          })
        ) : (
          <h1>{status}</h1>
        )}
      </div>
    </>
  );
}

export default Content;
