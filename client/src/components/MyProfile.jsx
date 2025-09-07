import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../service/api";

const MyProfile = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const currentuser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUser(currentuser._id);
    setUser(response.data);
  };
  console.log(user);
  return <div>MyProfile</div>;
};

export default MyProfile;
