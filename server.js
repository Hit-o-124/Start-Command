import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fetch from "node-fetch";
import crypto from "crypto";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// 🟦 1) DATABASE (MongoDB Atlas)
// ----------------------
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✔ Connected to MongoDB Atlas"))
  .catch(err => console.log("❌ Mongo Error:", err));


// ----------------------
// 🟧 2) ROUTES (Modular)
// ----------------------
import authRoutes from "./routes/auth.js";
import tasksRoutes from "./routes/tasks.js";
import withdrawRoutes from "./routes/withdraw.js";
import supportRoutes from "./routes/support.js";
import payoutRoutes from "./routes/payout.js";
import adminTasksRoutes from "./routes/admin_tasks.js";
import analyticsRoutes from "./routes/analytics.js";

app.use("/auth", authRoutes);
app.use("/tasks", tasksRoutes);
app.use("/withdraw", withdrawRoutes);
app.use("/support", supportRoutes);
app.use("/payout", payoutRoutes);
app.use("/admin/tasks", adminTasksRoutes);
app.use("/analytics", analyticsRoutes);


// ----------------------
// 🟪 3) COINBASE COMMERCE API
// ----------------------
const COINBASE_API_KEY = process.env.COINBASE_API_KEY;
const COINBASE_WEBHOOK_SECRET = process.env.COINBASE_WEBHOOK_SECRET;

// יצירת חשבונית תשלום
app.post("/create-payment", async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const response = await fetch("https://api.commerce.coinbase.com/charges", {
      method: "POST",
      headers: {
        "X-CC-Api-Key": COINBASE_API_KEY,
        "X-CC-Version": "2018-03-22",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "ModernWork Payment",
        description: "Deposit",
        pricing_type: "fixed_price",
        local_price: {
          amount: amount,
          currency: "USD",
        },
        metadata: { userId },
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Payment creation failed" });
  }
});


// Webhook – קבלת אישור תשלום
app.post("/payment/webhook", (req, res) => {
  const signature = req.headers["x-cc-webhook-signature"];
  const rawBody = JSON.stringify(req.body);

  const expectedSig = crypto
    .createHmac("sha256", COINBASE_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (signature !== expectedSig) {
    return res.status(401).send("Invalid signature");
  }

  const event = req.body.event;

  if (event.type === "charge:confirmed") {
    const userId = event.data.metadata.userId;

    console.log("💰 Payment Confirmed:", userId);

    // כאן נזכה את המשתמש אחרי החיבור ל-DB
  }

  res.send("OK");
});


// ----------------------
// 🟩 4) ROOT TEST ENDPOINT
// ----------------------
app.get("/", (req, res) => {
  res.send("🔥 ModernWork backend is running.");
});


// ----------------------
// 🟦 5) START SERVER
// ----------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 ModernWork backend running on port ${PORT}`);
});
