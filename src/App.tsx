import { ColorRing } from "react-loader-spinner";

import { FormEvent, useState } from "react";
import MediaList from "./components/MediaList";
import useGetMedia from "./hooks/useGetMedia";
import Error from "./components/Error";
import Paginator from "./components/Paginator";

//debouncing with no libraries
let debounceTimeout: number;
function debounce(func: () => void, delay: number) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(func, delay);
}
function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const { isLoading, data, error, pages } = useGetMedia({ query, currentPage });
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const inputSearchContent: string = formData.get("searchInput") as string;
    setQuery(inputSearchContent);
  }

  function handleSearch(term: string) {
    setSearchInput(term);
    if (!term) {
      setQuery(" ");
    } else {
      debounce(() => setQuery(term), 500);
    }
    setCurrentPage(1);
  }

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  return (
    <>
      <header>
        <h1>Media Finder</h1>
        <p>OMDB API</p>
        <nav>
          <form
            action=""
            style={{ display: "flex" }}
            onSubmit={(e) => handleSubmit(e)}
          >
            <label
              htmlFor="
            searchInput"
            >
              Enter your search:
            </label>
            <input
              type="search"
              name="searchInput"
              id="searchInput"
              placeholder="tv, serie, videogame..."
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <input type="submit" value="search" />
          </form>
        </nav>
      </header>
      <main>
        <Paginator
          pages={pages}
          onPageChange={handlePageChange}
          setQuery={setQuery}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        {isLoading ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        ) : error ? (
          <Error message={error} />
        ) : (
          <>
            <MediaList media={data} />
          </>
        )}
      </main>
    </>
  );
}

export default App;
