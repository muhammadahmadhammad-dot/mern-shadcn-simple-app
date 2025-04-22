import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Link } from "react-router-dom";
export const Home = () => {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    if (window.localStorage.getItem("token") || false) {
      window.localStorage.removeItem("token");
    }
    if (window.localStorage.getItem("auth") || false) {
      window.localStorage.removeItem("auth");
    }
    toast.success("Logout Successfully");
  };
  const fetchData = async () => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/posts`)
      .then((response) => {
        if (response.data.success) {
          setPosts(response.data.posts);
        }
        console.log("Error in FetchData response", response);
      })
      .catch((error) => {
        console.log("Error in FetchData", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Home Page</CardTitle>
          <CardContent>
            {useSelector((state) =>
              state.user ? <Button onClick={handleLogout}>LOGOUT</Button> : ""
            )}
          </CardContent>
          <CardDescription>
            <Link to="/create/posts">
              <Button>Create a post</Button>
            </Link>
          </CardDescription>
        </CardHeader>
      </Card>

      {posts &&
        posts.map((post) => (
          <Card className="mt-2" key={post._id}>
            <CardHeader>
              <CardTitle className="text-2xl">{post.title}</CardTitle>
              <CardDescription>{post.shortDescription}</CardDescription>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
};
