import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you are looking for does not exist."
      extra={
        <Button type="primary" onClick={handleBackHome}>
          Go to Home
        </Button>
      }
    />
  );
};

export default NotFound;
