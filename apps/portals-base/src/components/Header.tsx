import React from "react";
import { Typography } from "@mui/material";
import { usePortalContext } from "./PortalContext";
import "../web-components/CustomButton";
import { Button } from "smart-webcomponents-react/button";
import AiChatbot from "../web-components/AiChatbot";

function Header() {
  const { headerConfig } = usePortalContext();
  const {
    summary,
    title,
    showBlur = false,
    centerText = false,
    HeaderSvg,
  } = headerConfig;

  const handleSmartButtonClick = () => {
    alert("Smart Button clicked!");
  };

  const handleCustomButtonClick = () => {
    alert("Custom Button clicked!");
  };

  const hasImg = HeaderSvg !== undefined;
  const content = (
    <>
      <div
        className={`header-text ${showBlur ? "blur" : ""} ${
          centerText ? "center-text" : ""
        }`}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            marginTop: "20px",
            marginBottom: "30px",
          }}
        >
          {title}
        </Typography>
        <Typography variant="body1">{summary}</Typography>
        <custom-button onClick={handleCustomButtonClick}>
          Custom Button
        </custom-button>
        <Button
          style={{
            backgroundColor: "lightgrey",
            color: "black",
            border: "2px solid black",
          }}
          onClick={handleSmartButtonClick}
        >
          Custom
        </Button>
        <Button className="primary" onClick={handleSmartButtonClick}>
          Normal
        </Button>
        <Button className="outlined primary" onClick={handleSmartButtonClick}>
          Outlined
        </Button>
      </div>
    </>
  );
  return (
    <header id="header">
      {hasImg && (
        <>
          <HeaderSvg />
          {content}
        </>
      )}
      {!hasImg && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-offset-1 col-md-10">{content}</div>
          </div>
        </div>
      )}
    </header>
  );
}

export default React.memo(Header);
