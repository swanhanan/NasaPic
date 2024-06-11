import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// const MYKEY = "kfoG6ZnJT1Ku1ezXSVP0mVE2ITsSln0xpiyesTgY";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.nasa.gov/planetary/apod?api_key=kfoG6ZnJT1Ku1ezXSVP0mVE2ITsSln0xpiyesTgY");

    const result = response.data;
    res.render("index.ejs", {data : result});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  
try{
  let dateEntered = req.body.picDate;
  console.log(req.body.picDate);
  console.log("you pressed submit");
  const url = "https://api.nasa.gov/planetary/apod?api_key=kfoG6ZnJT1Ku1ezXSVP0mVE2ITsSln0xpiyesTgY&"+ 'date=' +dateEntered;

  const response = await axios.get(url);
  const result = response.data;
 console.log(response);
  res.render("index.ejs", {data: result});
}
catch(error){
  console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });

}
  
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
