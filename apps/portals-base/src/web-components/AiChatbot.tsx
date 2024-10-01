import { DeepChat } from "deep-chat-react";
import { Typography } from "@mui/material";
import React from "react";

export declare type AiChatbotProps = {
  demo?: boolean;
};

const AiChatbot = () => {
  const openAIConfig = {
    openAI: {
      key: import.meta.env.VITE_OPENAI_KEY,
      chat: {
        max_tokens: 500,
        system_prompt: "Assist me with anything you can",
      },
    },
  };
  const history = [{ role: "ai", text: "Hi, what can I help you with today?" }];
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          fontSize: "18px",
          fontWeight: "bold",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        AI Chatbot
      </Typography>
      <DeepChat
        demo={true}
        style={{ borderRadius: "10px" }}
        textInput={{ placeholder: { text: "Welcome to the demo!" } }}
        history={history}
        directConnection={openAIConfig.openAI.key || ""}
      />
    </>
  );
};

export default AiChatbot;
