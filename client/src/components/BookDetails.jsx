import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBook, addRent, editBook } from "../service/api";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const templateRent = {
  userid: user._id,
  bookids: [],
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

  useEffect(() => {
    loadBookDetails();
  }, []);

  useEffect(() => {
    if (book._id) {
      setRent((prev) => ({
        ...prev,
        bookids: prev.bookids.includes(book._id)
          ? prev.bookids
          : [...prev.bookids, book._id],
      }));
    }
  }, [book._id]);

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
      const response = await axios.get(
        `http://localhost:8000/rent/user/${rent.userid}`
      );
      const existingRent = response.data;

      if (existingRent) {
        const updatedBookIds = existingRent.bookids.includes(book._id)
          ? existingRent.bookids
          : [...existingRent.bookids, book._id];

        const updatedRent = {
          ...existingRent,
          bookids: updatedBookIds,
          startdate: rent.startdate,
          enddate: rent.enddate,
          issuedays: rent.issuedays,
        };

        await axios.put(
          `http://localhost:8000/rent/${existingRent._id}`,
          updatedRent
        );
      } else {
        await addRent(rent);
      }

      const updatedBook = { ...book, status: "issued" };
      await editBook(updatedBook, book._id);
      setBook(updatedBook);

      alert("Rent saved and book status updated!");
      setShowRentForm(false);
    } catch (err) {
      console.error(
        "Error while adding or updating rent:",
        err.response?.data || err.message
      );
      alert("Failed to save rent. Check console for details.");
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

      <Button
        variant="contained"
        onClick={() => setShowRentForm(true)}
        disabled={book.status === "issued"}
      >
        Kölcsönöz
      </Button>

      {showRentForm && (
        <div style={{ marginTop: "20px" }}>
          <h1>Kölcsönző adatai</h1>

          <FormControl fullWidth margin="normal">
            <InputLabel>Kölcsönzés dátuma</InputLabel>
            <Input
              disabled
              type="text"
              name="startdate"
              value={rent.startdate}
            />
          </FormControl>

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

          <Button variant="outlined" onClick={() => setShowRentForm(false)}>
            Mégse
          </Button>
        </div>
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
