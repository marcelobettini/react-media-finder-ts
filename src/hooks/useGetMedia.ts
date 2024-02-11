import { useState, useEffect } from "react";
import { getMediaState } from "../entities/media.entity";
const url: string = "http://www.omdbapi.com/?apikey=88395455&s=";
const resultsPerPage: number = 10;
interface Props {
  query: string;
  currentPage: number;
}
export default function useGetMedia({ query, currentPage }: Props) {
  const [apiState, setApiState] = useState<getMediaState>({
    isLoading: true,
    error: null,
    data: [],
    pages: 0,
  });

  useEffect(() => {
    if (!query) {
      setApiState((state) => ({ ...state, isLoading: false }));
      return;
    }
    setApiState((state) => ({ ...state, isLoading: true }));
    fetch(url + query + "&page=" + currentPage)
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP Error");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setApiState((state: getMediaState) => ({
          ...state,
          data: data.Search,
          pages: Math.ceil(data.totalResults / resultsPerPage) || 0,
        }));
      })
      .catch((error) =>
        setApiState((state) => ({ ...state, error: error.message }))
      )
      .finally(() => setApiState((state) => ({ ...state, isLoading: false })));
  }, [query, currentPage]);

  return { ...apiState };
}
