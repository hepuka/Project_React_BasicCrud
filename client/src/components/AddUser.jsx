import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addUser } from "../service/api";
import bcrypt from "bcryptjs";

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

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 auto;
  & > div {
    margin-top: 25px;
  }
`;

const templateUser = {
  name: "",
  username: "",
  email: "",
  phone: "",
  role: "",
  password: "",
  repassword: "",
};

const AddUser = () => {
  const [user, setUser] = useState(templateUser);

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    if (
      user.name === "" ||
      user.username === "" ||
      user.email === "" ||
      user.phone === "" ||
      user.role === "" ||
      user.password === "" ||
      user.repassword === ""
    ) {
      return;
    }

    if (user.password !== user.repassword) {
      alert("Passwords do not match!");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    const userToSend = { ...user, password: hashedPassword };
    delete userToSend.repassword;

    await addUser(userToSend);

    navigate("/dashboard/all");
  };

  return (
    <Container>
      <Typography variant="h4">Add User</Typography>

      <FormControl>
        <InputLabel>Name</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="name" />
      </FormControl>

      <FormControl>
        <InputLabel>Username</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="username" />
      </FormControl>

      <FormControl>
        <InputLabel>Email</InputLabel>
        <Input type="email" onChange={(e) => onValueChange(e)} name="email" />
      </FormControl>

      <FormControl>
        <InputLabel>Phone</InputLabel>
        <Input type="number" onChange={(e) => onValueChange(e)} name="phone" />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={user.role || ""}
          onChange={(e) => onValueChange(e)}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="basic">Basic</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Password</InputLabel>

        <Input
          type="password"
          onChange={(e) => onValueChange(e)}
          name="password"
        />
      </FormControl>
      <FormControl>
        <InputLabel>Re-Password</InputLabel>

        <Input
          type="password"
          onChange={(e) => onValueChange(e)}
          name="repassword"
        />
      </FormControl>
      <FormControl>
        <InputLabel>Irányítószám</InputLabel>
        <Input
          type="number"
          onChange={(e) => onValueChange(e)}
          name="postcode"
        />
      </FormControl>
      <FormControl>
        <InputLabel>Település</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="city" />
      </FormControl>
      <FormControl>
        <InputLabel>Utca</InputLabel>
        <Input type="text" onChange={(e) => onValueChange(e)} name="street" />
      </FormControl>

      <FormControl>
        <InputLabel>Házszám</InputLabel>
        <Input
          type="number"
          onChange={(e) => onValueChange(e)}
          name="housenumber"
        />
      </FormControl>
      <FormControl>
        <InputLabel>Emelet</InputLabel>
        <Input type="number" onChange={(e) => onValueChange(e)} name="floor" />
      </FormControl>
      <FormControl>
        <InputLabel>Ajtószám</InputLabel>
        <Input
          type="number"
          onChange={(e) => onValueChange(e)}
          name="doornumber"
        />
      </FormControl>

      <FormControl>
        <Button variant="contained" onClick={() => addUserDetails()}>
          Add New User
        </Button>
        <Button>
          <Link to="/dashboard">Back</Link>
        </Button>
      </FormControl>
    </Container>
  );
};

export default AddUser;
