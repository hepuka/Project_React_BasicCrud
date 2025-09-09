import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBook, getUser } from "../service/api";
import { Button } from "@mui/material";

const MyProfile = () => {
  const [user, setUser] = useState({});
  const [books, setBooks] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const currentuser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    try {
      const response = await getUser(currentuser._id);
      const userData = response.data;
      setUser(userData);

      if (userData?.rents?.length > 0) {
        const rentedBooks = await Promise.all(
          userData.rents.map((rent) => getBook(rent.bookid))
        );

        setBooks(rentedBooks.map((res) => res.data));
      }
    } catch (error) {
      console.error("Failed to load user details:", error);
    }
  };
  console.log(books);
  return (
    <>
      <div>
        <p>{user.name}</p>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.postcode}</p>
        <p>{user.city}</p>
        <p>{user.street}</p>
        <p>{user.housenumber}</p>
        <p>{user.floor}</p>
        <p>{user.doornumber}</p>
      </div>
      <div>
        <h2>Rented books</h2>
        <table>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Issued Date</th>
              <th>End Date</th>
              <th>Visszahozva</th>
              <th>Státusz</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book, index) => (
                <tr
                  key={index}
                  onClick={() => navigate(`/dashboard/book/${book._id}`)}
                >
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.isbn}</td>
                  <td>{user.rents[index]?.startdate}</td>
                  <td>{user.rents[index]?.enddate}</td>
                  <td>{new Date().toISOString().split("T")[0]}</td>
                  <td>{user.rents[index]?.issued}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No rented books</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyProfile;
