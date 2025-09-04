import { useEffect, useState } from "react";
import { getUser } from "../service/api";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const templateUser = {
  name: "",
  username: "",
  email: "",
  phone: "",
  role: "",
};

const UserDetails = () => {
  const [user, setUser] = useState(templateUser);
  const { id } = useParams();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUser(id);
    setUser(response.data);
  };

  return (
    <div>
      <p>{user.name}</p>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <p>{user.role}</p>

      <Button
        color="error"
        variant="outlined"
        style={{ marginRight: 15 }}
        component={Link}
        to={`/reset`}
      >
        Change password
      </Button>
    </div>
  );
};

export default UserDetails;
