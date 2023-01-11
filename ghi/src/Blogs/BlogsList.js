import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import React from "react";

const BlogsList = () => {
  const [blogs, setBlog] = useState([]);

  const getBlog = async () => {
    const url = "http://localhost:8080";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setBlog(data);
    }
  };

  const deleteBlog = async (id) => {
    const url = `http://localhost:8080/${id}`;
    const fetchConfig = { method: "delete" };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      getBlog();
      // const data = await response.json();
      // getBlog(data);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div>
    
    </div>
  );
};

export default BlogsList;
