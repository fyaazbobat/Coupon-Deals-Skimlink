import React, { useState } from "react";
import {useRef} from 'react';
//import "./App.css";
import { Card, Badge, Button, Collapse } from "react-bootstrap";

export default function Coupon({ coupon }) {
  const [open, setOpen] = useState(false);
  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between">
          <div>
            <Card.Title>
              {coupon.title} -{" "}
              <span className="text-muted font-weight-light">
                {coupon["merchant_details"].name}
              </span>
            </Card.Title>

            <Card.Subtitle
              className="text-muted mb-2"
              style={{ wordBreak: "break-all" }}
            >
              Offer Starts: {new Date(coupon.offer_starts).toLocaleDateString()}
            </Card.Subtitle>
            <Card.Subtitle className="text-muted mb-2">
              Offer Expires: {new Date(coupon.offer_ends).toLocaleDateString()}
            </Card.Subtitle>
            {coupon.coupon_code && (
            <Card.Subtitle className="text-dark font-weight-bold">  
              Coupon Code: {coupon.coupon_code}
            </Card.Subtitle>
          )}
            {/* <Badge style={{wordBreak: 'break-all'}} varient="badge badge-secondary"><h5 className='text-light bg-secondary mb-2'>{coupon["merchant_details"].country_codes }</h5></Badge> */}
          </div>
          {coupon["merchant_details"].metadata.logo && (
            <img
              className="d-none d-md-block"
              height="50"
              alt={coupon["merchant_details"].name}
              src={coupon["merchant_details"].metadata.logo}
            />
          )}
        </div>
        <Card.Text>
          <Button
            href={coupon.url}
            target="_blank"
            className="mr-6"
            style={{ marginLeft: "15px" }}
          >
            Go To Offer
          </Button>
          <Button
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            className="mr-6"
            style={{ marginLeft: "15px" }}
          >
            {open ? "Hide Details" : "View Details"}
          </Button>
          
        </Card.Text>
        <Collapse in={open}>
          <div className="me-4">
            {coupon.title} <br></br>
            {coupon.description}
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
