import propTypes from "prop-types";

const List = ({ definition, width, example, quotes, color, isDarkMode }) => {
  return (
    <>
      <ul className={`list-disc w-[${width}] ml-14`}>
        <li className={`mb-2 li-disc ${isDarkMode ? "text-white" : ""}`}>
          {definition}
        </li>
        {example && (
          <p
            className={`text-sm md:text-lg font-normal ${
              quotes ? "quotes" : ""
            } text-[${color}]`}
          >
            {example}
          </p>
        )}
      </ul>
    </>
  );
};

List.propTypes = {
  definition: propTypes.string.isRequired,
  width: propTypes.string.isRequired,
  example: propTypes.string,
  quotes: propTypes.bool,
  color: propTypes.string,
  isDarkMode: propTypes.bool.isRequired,
};

export default List;
