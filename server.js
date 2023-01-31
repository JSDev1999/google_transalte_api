const PORT = 8000;
const axios = require("axios");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.get("/languages", async (req, res) => {
  const options = {
    method: "GET",
    url: "https://gcp-translate.p.rapidapi.com/languages",
    headers: {
      "X-RapidAPI-Key": "63d28da5bemsh5cf54013327a228p1cb755jsn23338e042adb",
      "X-RapidAPI-Host": "gcp-translate.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const arrayOfData = Object.keys(response.data).map((key) => ({
      id: key,
      name: response.data[key],
    }));

    res.status(200).json(arrayOfData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.post("/translation", async (req, res) => {
  // console.log(req.body);
  const { textToTranslate, outputLanguage, inputLanguage } = req.body;

  const options = {
    method: "POST",
    url: "https://gcp-translate.p.rapidapi.com/translate",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "63d28da5bemsh5cf54013327a228p1cb755jsn23338e042adb",
      "X-RapidAPI-Host": "gcp-translate.p.rapidapi.com",
    },
    data: {
      text: textToTranslate,
      src_lang: inputLanguage,
      dest_lang: outputLanguage,
    },
  };

  try {
    const response = await axios.request(options);
    //console.log(response.data);
    res.status(200).json(response.data?.translated_text);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

app.listen(PORT, () => console.log("Server running on port " + PORT));
