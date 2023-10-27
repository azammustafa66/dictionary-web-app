import { useEffect, useState } from "react";

import { fetchFromAPI } from "../../utils/fetchFromAPI";
import searchIcon from "/assets/images/icon-search.svg";
import iconPlay from "/assets/images/icon-play.svg";
import List from "../components/List";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../utils/darkModeSlice";
import Error from "../components/Error";

const Body = () => {
  const [searchTerm, setSearchTerm] = useState("keyboard");
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const isDarkMode = useSelector(selectDarkMode);

  const textColour = isDarkMode ? "text-white" : "";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchFromAPI(searchTerm)
      .then((result) => {
        if (result && result[0]) {
          setData(result[0]);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <section
      className={`flex flex-col items-start justify-center gap-y-6 w-80 md:w-[689px] lg:w-[739px] mx-auto ${textColour}`}
    >
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className={`w-80 h-12 md:w-[689px] md:h-16 lg:w-[739px] rounded-2xl p-4 md:px-2 
              ${isDarkMode ? "bg-[#1F1F1F]" : "bg-[#F4F4F4]"} ${textColour}"} 
              ${!searchTerm.trim() ? "border-2 border-[#FF5252]" : ""}
              outline-none`}
          />
          {!searchTerm.trim() && (
            <p className="text-[#FF5252] mt-2">Whoops, can&apos;t be empty</p>
          )}
        </form>

        <img
          src={searchIcon}
          alt="search"
          className="relative right-8 md:right-10 cursor-pointer"
          onClick={() => fetchData()}
        />
      </div>

      {error ? (
        <Error />
      ) : (
        <>
          <div className="w-[327px] md:w-[689px] lg:w-[739px] flex items-center justify-between">
            <div>
              <h1
                className={`text-3xl md:text-[64px] leading-normal font-bold ${textColour}`}
              >
                {data?.word}
              </h1>
              <p className="text-lg md:text-2xl text-[#A445ED] font-normal">
                {data.phonetic}
              </p>
            </div>
            <div>
              <button>
                <img
                  src={iconPlay}
                  alt="play"
                  className={`w-12 h-12 md:w-20 md:h-20 ${
                    isDarkMode ? "opacity-[0.8]" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <div>
              <p className={`text-lg md:text-2xl font-bold ${textColour}`}>
                noun
              </p>
            </div>
            <div>
              <p className="text-base md:text-xl font-normal text-[#757575] mb-2">
                Meaning
              </p>
              {data.meanings &&
                data.meanings[0].definitions?.map((definition, index) => (
                  <List
                    key={index}
                    definition={definition.definition}
                    width={"70%"}
                    isDarkMode={isDarkMode}
                  />
                ))}
            </div>
          </div>

          <div className="flex gap-x-7 md:gap-x-10 items-center">
            <p className="text-base md:text-xl font-normal text-[#757575]">
              Synonyms
            </p>
            {data.meanings?.[0].synonyms?.map((synonym, index) => (
              <p
                key={index}
                className="text-base md:text-xl font-bold text-[#A445ED]"
              >
                {synonym}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-y-1">
            <div>
              <p className="text-lg md:text-2xl font-bold">verb</p>
            </div>
            <div>
              <p className="text-base md:text-xl font-normal text-[#757575] mb-2">
                Meaning
              </p>
              {data.meanings &&
                data.meanings[1].definitions?.map((definition, index) => (
                  <List
                    key={index}
                    definition={definition.definition}
                    width={"100%"}
                    example={
                      data.meanings && data.meanings[1].definitions[0].example
                    }
                    quotes={true}
                    color={"#757575"}
                    isDarkMode={isDarkMode}
                  />
                ))}
            </div>
            <div className="border-[0.5px] w-[300px] md:w-[650px] border-[#757575] mt-3" />
          </div>

          <div className="mb-5">
            <p className="text-sm md:text-lg text-[#757575] mb-2 underline">
              Source
            </p>
            <a
              href={`https://en.wiktionary.org/wiki/${searchTerm}`}
              className={`underline ${isDarkMode ? "text-white" : ""}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://en.wiktionary.org/wiki/{searchTerm}
            </a>
          </div>
        </>
      )}
    </section>
  );
};

export default Body;
