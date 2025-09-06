import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBook } from "../service/api";
import { Button } from "@mui/material";

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
  const { id } = useParams();

  useEffect(() => {
    loadBookDetails();
  }, []);

  const loadBookDetails = async () => {
    const response = await getBook(id);
    setBook(response.data);
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

      <Button>
        <Link to="/dashboard/searchbook">Back</Link>
      </Button>
    </div>
  );
};

export default BookDetails;
