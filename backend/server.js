import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

/* -------------------- SUPABASE CONFIG -------------------- */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/* -------------------- MIDDLEWARE -------------------- */
app.use(
  cors({
    origin: "*", // allow CloudFront + localhost
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);

app.use(express.json());

/* -------------------- ROOT -------------------- */
app.get("/", (req, res) => {
  res.json({
    message: "Landing Page Backend API",
    status: "running",
    endpoints: {
      health: "/health",
      submitContact: "POST /api/contacts",
      getContacts: "GET /api/contacts"
    }
  });
});

/* -------------------- HEALTH -------------------- */
app.get("/health", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

/* -------------------- POST CONTACT -------------------- */
app.post("/api/contacts", async (req, res) => {
  try {
    console.log("Incoming body:", req.body);

    const { email, phone } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        error: "Email and phone are required"
      });
    }

    const { data, error } = await supabase
      .from("contacts")
      .insert([{ email, phone }])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact saved successfully",
      data: data[0]
    });
  } catch (err) {
    console.error("FULL ERROR:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Server error"
    });
  }
});

/* -------------------- GET CONTACTS -------------------- */
app.get("/api/contacts", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data
    });
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

/* -------------------- START SERVER -------------------- */
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});