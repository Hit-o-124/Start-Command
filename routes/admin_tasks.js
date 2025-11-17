import express from "express"; 
const router = express.Router(); 
ECHO is on.
router.get("/test", (req, res) =
  res.json({ status: "ok", message: "Admin route works" }); 
}); 
ECHO is on.
export default router; 
