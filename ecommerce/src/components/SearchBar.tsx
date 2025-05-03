const SearchBar = () => {
  return (
    <div className="flex-grow flex justify-center">
      <input
        type="text"
        placeholder="Search..."
        className="w-full max-w-md rounded-md pl-5 border"
      />
    </div>
  );
};

export default SearchBar;
