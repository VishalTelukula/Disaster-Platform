require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🚨 Disaster Response API is running!");
});
const supabase = require('./config/supabaseClient');

// Test query
(async () => {
  const { data, error } = await supabase.from('disasters').select('*');
  if (error) {
    console.error("❌ Supabase Error:", error.message);
  } else {
    console.log("📦 Supabase Connected: disaster data =", data);
  }
})();


// WebSocket logic
io.on("connection", (socket) => {
  console.log("🟢 New client connected");

  socket.emit("connected", "✅ You are now connected to the disaster socket");

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});
// testing the disaster routes
const disasterRoutes = require('./routes/disasterRoutes');

app.use('/disasters', disasterRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});




