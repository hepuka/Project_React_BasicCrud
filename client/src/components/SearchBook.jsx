import { useEffect, useState } from "react";
import { getCategories, searchBooks, getBooks } from "../service/api";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SearchBook = () => {
  const [filters, setFilters] = useState({
    name: "",
    author: "",
    year: "",
    category: "",
  });

  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await getCategories();
      if (catRes && catRes.data) setCategories(catRes.data || []);

      const bookRes = await getBooks();
      if (bookRes && bookRes.data) setResults(bookRes.data || []);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const response = await searchBooks(filters);
    if (response) setResults(response.data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Search Books</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={filters.name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Search by Author"
          value={filters.author}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="year"
          placeholder="Search by Year"
          value={filters.year}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={cat._id || `${cat.name}-${index}`} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      <div className="mt-6">
        {results.length > 0 ? (
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-2 py-1">Name</th>
                <th className="border border-gray-400 px-2 py-1">Author</th>
                <th className="border border-gray-400 px-2 py-1">Price</th>
                <th className="border border-gray-400 px-2 py-1">Pages</th>
                <th className="border border-gray-400 px-2 py-1">Language</th>
                <th className="border border-gray-400 px-2 py-1">ISBN</th>
                <th className="border border-gray-400 px-2 py-1">Rating</th>
                <th className="border border-gray-400 px-2 py-1">Year</th>
                <th className="border border-gray-400 px-2 py-1">Category</th>
                <th className="border border-gray-400 px-2 py-1">Status</th>
                <th className="border border-gray-400 px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((book) => (
                <tr key={book._id}>
                  <td className="border border-gray-400 px-2 py-1">
                    {book.name}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">
                    {book.author}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">
                    {book.price}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">
                    {book.pages}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">
                    {book.language}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">
                    {book.isbn}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">
                    {book.rating}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">
                    {book.published}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">
                    {book.category}
                  </td>
                  <td className="border border-gray-400 px-2 py-1">
                    {book.status}
                  </td>
                  <td className="border border-gray-400 px-2 py-1 text-center">
                    <Button
                      color="secondary"
                      variant="outlined"
                      style={{ marginRight: 15 }}
                      component={Link}
                      to={`/dashboard/book/${book._id}`}
                    >
                      Profile
                    </Button>
                    <Button
                      color="primary"
                      variant="outlined"
                      style={{ marginRight: 15 }}
                      component={Link}
                      to={`/dashboard/book/edit/${book._id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      color="error"
                      variant="outlined"
                      style={{ marginRight: 15 }}
                      component={Link}
                      to={`/dashboard/book/${book._id}`}
                    >
                      delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBook;
