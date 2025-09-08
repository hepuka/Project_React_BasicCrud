import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBook, editBook } from "../service/api";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const templateRent = {
  bookid: 0,
  startdate: "",
  enddate: "",
  issued: "Kölcsönözve",
  issuedays: 0,
};

const BookDetails = () => {
  const [book, setBook] = useState({});
  const [rent, setRent] = useState(templateRent);
  const [showRentForm, setShowRentForm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  useEffect(() => {
    loadBookDetails();
  }, []);

  const loadBookDetails = async () => {
    const response = await getBook(id);
    if (response && response.data) {
      setBook(response.data);
    }
  };

  const onRentValueChange = (e) => {
    const { name, value } = e.target;

    setRent((prev) => {
      let updated = { ...prev, [name]: value };

      if (name === "issuedays") {
        const start = new Date();
        const end = new Date(start);
        end.setDate(start.getDate() + Number(value) * 7);

        updated.startdate = start.toISOString().split("T")[0];
        updated.enddate = end.toISOString().split("T")[0];
      }

      return updated;
    });
  };

  const addRentDetails = async () => {
    try {
      const rentPayload = {
        userid: user._id,
        bookid: book._id,
        startdate: rent.startdate,
        enddate: rent.enddate,
        issuedays: rent.issuedays,
        issued: "Kölcsönözve",
      };

      await axios.post("http://localhost:8000/user/rent", rentPayload);

      const updatedBook = { ...book, status: "issued" };
      await editBook(updatedBook, book._id);
      setBook(updatedBook);

      alert("Rent saved inside user and book status updated!");
      setShowRentForm(false);
      navigate("/dashboard/searchbook");
    } catch (err) {
      console.error(
        "Error while saving rent:",
        err.response?.data || err.message
      );
      alert("Failed to save rent. Check console for details.");
    }
  };

  const getRentedBook = async () => {
    try {
      const updatedBook = { ...book, status: "available" };
      await editBook(updatedBook, book._id);
      setBook(updatedBook);

      await axios.put(`http://localhost:8000/user/${user._id}/return`, {
        bookid: book._id,
      });
      alert("Book returned successfully and rent updated!");
      navigate("/dashboard/searchbook");
    } catch (error) {
      console.error(
        "Error while returning book:",
        error.response?.data || error.message
      );
      alert("Failed to return book. Check console for details.");
    }
  };

  return (
    <div>
      <h2>{book.name}</h2>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p>Ár: {book.price}</p>
      <p>Kategória: {book.category}</p>
      <p>Készlet: {book.quantity}</p>
      <p>Értékelés: {book.rating}</p>
      <p>{book.published}</p>
      <p>{book.language}</p>
      <p>{book.pages}</p>
      <p>{book.isbn}</p>
      <p>Státusz: {book.status}</p>

      {user.role === "basic" && showRentForm && (
        <>
          <Button
            variant="contained"
            onClick={() =>
              book.status === "issued" ? getRentedBook() : setShowRentForm(true)
            }
          >
            {book.status === "issued" ? "Visszavétel" : "Kölcsönöz"}
          </Button>
          <div style={{ marginTop: "20px" }}>
            <h1>Kölcsönző adatai</h1>

            <FormControl fullWidth margin="normal">
              <InputLabel>Kölcsönzés ideje (hét)</InputLabel>
              <Select
                onChange={onRentValueChange}
                name="issuedays"
                value={rent.issuedays || ""}
              >
                {[2, 4, 6, 8].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Kölcsönzés kezdete</InputLabel>
              <Input
                disabled
                type="text"
                name="startdate"
                value={rent.startdate}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Kölcsönzés vége</InputLabel>
              <Input disabled type="text" name="enddate" value={rent.enddate} />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={addRentDetails}
              style={{ marginRight: "10px" }}
            >
              Mentés
            </Button>
            <Button
              color="secondary"
              variant="outlined"
              component={Link}
              to={`/dashboard/${user._id}`}
            >
              Felhasználói adatok módosítása
            </Button>

            <Button variant="outlined" onClick={() => setShowRentForm(false)}>
              Mégse
            </Button>
          </div>
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        <Button>
          <Link to="/dashboard/searchbook">Vissza</Link>
        </Button>
      </div>
    </div>
  );
};

export default BookDetails;
