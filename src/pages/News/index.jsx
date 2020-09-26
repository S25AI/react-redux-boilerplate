import React from "react";
import { Link } from "react-router-dom";

export const News = () => (
  <>
    <h2>This is news page</h2>
    <Link to="/news/123">go to category news page</Link>
  </>
);
