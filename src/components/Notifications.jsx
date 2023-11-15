import PropTypes from "prop-types";
import React from "react";

export default function Notifications({ notif: { message, success = false } }) {
  let style = {
    color: success ? "green" : "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (message === null) {
    return null;
  }

  return <div id="notif" style={style}>{message}</div>;
}

Notifications.propTypes = {
  notif: PropTypes.shape({
    message: PropTypes.string,
    success: PropTypes.bool,
  }),
};
