import fetch from "node-fetch";
import React, { useState } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import Pagination from "./Pagination";
import Filter from "./Filter";
import Coupons from "./Coupons";
import filter from "./utils/filter";

const COUPON_API_URL = "http://localhost:3001/coupons";

//const mockCoupons = [
// {title: '10% off', domain: 'Dell'},
// {title: '30% off', domain: 'Walmart'},
//// {title: '50% off', domain: 'H&M'}

//]

//async function fetchCoupons(updataCb)
//{
//const res = await fetch(COUPON_API_URL);
// let json = await res.json();
//console.log('Testing', {json})
// updataCb(json);

//}

async function fetchCoupons(updataCb) {
  const res = await fetch(COUPON_API_URL);
  const json = await res.text();
  const coupon = await JSON.parse(json);
  console.log("Testing", { coupon });

  updataCb(coupon);
}

function App() {
  const [couponList, updateCoupons] = useState([]);
  const [filtredCoupons, setFiltredCoupons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtered, setFilter] = useState("");
  console.log(filtered);
  //get current post
  const [postPerPage] = useState(100);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = filtredCoupons.slice(indexOfFirstPost, indexOfLastPost);

  // change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  React.useEffect(() => {
    fetchCoupons(updateCoupons);
    setFiltredCoupons(couponList);
  }, []);

  React.useEffect(() => {
    let cpns = filter(couponList, filtered, setCurrentPage);
    setFiltredCoupons(cpns);
    console.log(cpns.length);
    console.log(couponList.length);
    console.log(filtredCoupons.length);
  }, [filtered, couponList]);

  return (
    <Container className="my-4">
      <h1 className="mb-4">Coupons & Deals</h1>
      <Filter setFilter={setFilter} />
      <Pagination
        postPerPage={postPerPage}
        totalPosts={filtredCoupons.length}
        paginate={paginate}
      />
      <Coupons coupons={(filtredCoupons, currentPosts)} />
      <Pagination
        postPerPage={postPerPage}
        totalPosts={filtredCoupons.length}
        paginate={paginate}
      />
    </Container>
  );
}

export default App;
