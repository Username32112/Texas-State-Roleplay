const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

const ERLC_KEY = process.env.ERLC_API_KEY;

// SERVER STATS ROUTE
app.get("/stats", async (req, res) => {
  try {

    const response = await axios.get("https://api.policeroleplay.community/v1/server", {
      headers: {
        "Server-Key": ERLC_KEY
      }
    });

    const data = response.data;

    res.json({
      players: data.CurrentPlayers,
      queue: data.Queue,
      vehicles: data.Vehicles,
      staff: data.OnlineStaff,
      status: "Online"
    });

  } catch (err) {
    res.json({
      players: 0,
      queue: 0,
      vehicles: 0,
      staff: 0,
      status: "Offline"
    });
  }
});

app.listen(3000, () => console.log("Server running"));
