import { useEffect } from "react";

interface Props {
  pages: number;
  onPageChange: (selectedPage: number) => void;
  setQuery: (query: string) => void;
  currentPage: number;
  setCurrentPage: (n: number) => void;
}

export default function Paginator({
  currentPage,
  setCurrentPage,
  pages,
  onPageChange,
}: Props) {
  //
  useEffect(() => {
    return () => {
      setCurrentPage(1);
    };
  }, [pages, setCurrentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
      pageNumbers.push(
        <li
          key={i}
          style={{
            listStyleType: "none",
            display: "inline-block",
            margin: "0.5rem",
            cursor: "pointer",
            fontWeight: currentPage === i ? "bold" : "normal",
            color: currentPage === i ? "hotpink" : "",
          }}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <ul
      style={{
        padding: 0,
        textAlign: "center",
      }}
    >
      {renderPageNumbers()}
    </ul>
  );
}
