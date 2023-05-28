import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:08priyank28@gmail@gmail.com">
        <Button>Contact: 08priyank28@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
