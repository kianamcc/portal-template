import { DeepChat } from "deep-chat-react";
// import "deep-chat-react/dist/index.css";
import React from "react";

const AiChatbot = () => {
  const openAIConfig = {
    openAI: {
      key: "",
      chat: {
        max_tokens: 500,
        system_prompt: "Assist me with anything you can",
      },
    },
  };
  const history = [
    // { role: "user", text: "Hey, how are you today?" },
    { role: "ai", text: "Hi, what can I help you with today?" },
  ];

  return (
    <DeepChat
      demo={true}
      style={{ borderRadius: "10px" }}
      textInput={{ placeholder: { text: "Welcome to the demo!" } }}
      history={history}
      //   directConnection={openAIConfig}
    />
  );
};

export default AiChatbot;
