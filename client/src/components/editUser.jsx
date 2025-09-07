import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editUser, getUser } from "../service/api";

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
};

const EditUser = () => {
  const [user, setUser] = useState(templateUser);
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUser(id);
    setUser(response.data);
  };

  const editUserDetails = async () => {
    await editUser(user, id);
    navigate("/dashboard/all");
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h4">Edit User</Typography>

      <FormControl>
        <InputLabel>Name</InputLabel>

        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={user.name}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Username</InputLabel>

        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={user.username}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Email</InputLabel>

        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={user.email}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Phone</InputLabel>

        <Input
          onChange={(e) => onValueChange(e)}
          name="phone"
          value={user.phone}
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={user.role?.toLowerCase() || ""}
          onChange={onValueChange}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="base">Base</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel>Postcode</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="postcode"
          value={user.postcode}
        />
      </FormControl>
      <FormControl>
        <InputLabel>City</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="city"
          value={user.city}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Street</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="street"
          value={user.street}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Housenumber</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="housenumber"
          value={user.housenumber}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Floor</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="floor"
          value={user.floor}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Doornumber</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="doornumber"
          value={user.doornumber}
        />
      </FormControl>

      <FormControl>
        <Button variant="contained" onClick={() => editUserDetails()}>
          Edit User
        </Button>
        <Button>
          <Link to="/dashboard/all">Back</Link>
        </Button>
      </FormControl>
    </Container>
  );
};

export default EditUser;
