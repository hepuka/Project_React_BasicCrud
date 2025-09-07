import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBook } from "../service/api";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  styled,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

const templateBook = {
  name: "",
  author: "",
  description: "",
  price: 0,
  image: "",
  category: "",
  quantity: 0,
  rating: 0,
  status: "available",
};

const BookDetails = () => {
  const [book, setBook] = useState(templateBook);
  const [showBorrower, setShowBorrower] = useState(false);
  const { id } = useParams();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  useEffect(() => {
    loadBookDetails();
  }, []);

  const loadBookDetails = async () => {
    const response = await getBook(id);
    setBook(response.data);
  };
  const handleBorrowClick = () => {
    setShowBorrower(true);
  };

  const onValueChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <p>{book.name}</p>
      <p>{book.author}</p>
      <p>{book.description}</p>
      <p>{book.price}</p>
      <p>{book.image}</p>
      <p>{book.category}</p>
      <p>{book.quantity}</p>
      <p>{book.rating}</p>
      <p>{book.status}</p>

      <Button variant="contained" onClick={handleBorrowClick}>
        Kölcsönöz
      </Button>

      {showBorrower && (
        <div>
          <h1>Kölcsönzés adatai</h1>
          <FormControl>
            <InputLabel>Kölcsönző neve</InputLabel>
            <Input
              type="text"
              onChange={(e) => onValueChange(e)}
              name="name"
              value={user.name}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Kölcsönzés dátuma</InputLabel>
            <Input
              disabled
              type="text"
              onChange={(e) => onValueChange(e)}
              name="startdate"
              value={new Date().toISOString().split("T")[0]}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Kölcsönzés ideje(hét)</InputLabel>
            <Select
              onChange={onValueChange}
              name="issuedays"
              value={book.issuedays || ""}
            >
              {[2, 4, 6, 8].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Kölcsönzés vége</InputLabel>
            <Input
              disabled
              type="text"
              name="enddate"
              value={
                book.issuedays
                  ? new Date(
                      new Date(book.startdate || new Date()).getTime() +
                        book.issuedays * 7 * 24 * 60 * 60 * 1000
                    )
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
            />
          </FormControl>
          <FormControl>
            <InputLabel>Irányítószám</InputLabel>
            <Input
              type="number"
              onChange={(e) => onValueChange(e)}
              name="postcode"
              value={user.postcode || ""}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Település</InputLabel>
            <Input
              type="text"
              onChange={(e) => onValueChange(e)}
              name="city"
              value={user.city || ""}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Utca</InputLabel>
            <Input
              type="text"
              onChange={(e) => onValueChange(e)}
              name="street"
              value={user.street || ""}
            />
          </FormControl>

          <FormControl>
            <InputLabel>Házszám</InputLabel>
            <Input
              type="number"
              onChange={(e) => onValueChange(e)}
              name="housenumber"
              value={user.housenumber || ""}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Emelet</InputLabel>
            <Input
              type="number"
              onChange={(e) => onValueChange(e)}
              name="floor"
              value={user.floor || ""}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Ajtószám</InputLabel>
            <Input
              type="number"
              onChange={(e) => onValueChange(e)}
              name="doornumber"
              value={user.doornumber || ""}
            />
          </FormControl>
        </div>
      )}

      <Button>
        <Link to="/dashboard/searchbook">Back</Link>
      </Button>
    </div>
  );
};

export default BookDetails;
