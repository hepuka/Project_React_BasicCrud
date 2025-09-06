import { useNavigate, useParams, Link } from "react-router-dom";
import { editBook, getBook, getCategories, getLanguages } from "../service/api";

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
import { useEffect } from "react";
import { useState } from "react";

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 25px;
  }
`;

const templateBook = {
  name: "",
  author: "",
  description: "",
  price: 0,
  image: "",
  category: "",
  language: "",
  pages: 0,
  published: "",
  isbn: "",
  quantity: 0,
  rating: 0,
  status: "available",
};

const EditBook = () => {
  const [book, setBook] = useState(templateBook);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    loadBookDetails();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const catRes = await getCategories();
      if (catRes && catRes.data) setCategories(catRes.data || []);

      const langRes = await getLanguages();
      if (langRes && langRes.data) setLanguages(langRes.data || []);
    };
    fetchData();
  }, []);

  const loadBookDetails = async () => {
    const response = await getBook(id);
    setBook(response.data);
  };

  const editBookDetails = async () => {
    await editBook(book, id);
    navigate("/dashboard/searchbook");
  };

  const onValueChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h4">Edit Book</Typography>

      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={book.name || ""}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Author</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="author"
          value={book.author || ""}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Description</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="description"
          value={book.description || ""}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Published</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="published"
          value={book.published || 0}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Language</InputLabel>
        <Select
          onChange={onValueChange}
          name="language"
          value={
            languages.some((l) => l.name === book.language) ? book.language : ""
          }
        >
          {languages.map((lang, index) => (
            <MenuItem
              key={lang._id || `${lang.name}-${index}`}
              value={lang.name}
            >
              {lang.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Pages</InputLabel>
        <Input onChange={onValueChange} name="pages" value={book.pages || 0} />
      </FormControl>

      <FormControl>
        <InputLabel>Price</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="price"
          value={book.price || 0}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Image</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="image"
          value={book.image}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Category</InputLabel>
        <Select
          onChange={(e) => onValueChange(e)}
          name="category"
          value={book.category || ""}
        >
          {categories.map((cat, index) => (
            <MenuItem key={cat._id || `${cat.name}-${index}`} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Quantity</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="quantity"
          value={book.quantity || 0}
        />
      </FormControl>

      <FormControl>
        <InputLabel>ISBN</InputLabel>
        <Input onChange={onValueChange} name="isbn" value={book.isbn || ""} />
      </FormControl>

      <FormControl>
        <Button variant="contained" onClick={() => editBookDetails()}>
          Edit Book
        </Button>
        <Button>
          <Link to="/dashboard/searchbook">Back</Link>
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditBook;
