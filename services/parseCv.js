const axios = require("axios");
const prompt = require("../constants/prompt");

const parseCv = async (input) => {
  const body = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: input,
      },
    ],
    temperature: 0.7,
  };

  const req = {
    method: "POST",
    url: process.env.OAI_URL,
    headers: {
      Authorization: `Bearer ${process.env.OAI_TOKEN}`,
    },
    data: body,
  };

  const response = await axios.request(req);

  // TODO: handle error responses

  try {
    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error("Invalid JSON:", response.data.choices[0].message.content);
    throw error;
  }
};

module.exports = parseCv;
