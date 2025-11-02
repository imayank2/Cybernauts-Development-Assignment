const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ======= MongoDB Connection =======
const MONGO_URL = "mongodb://127.0.0.1:27017/cybernauts";
mongoose.connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB connection failed:", err));

// ======= User Schema =======
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  hobbies: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const User = mongoose.model("User", userSchema);

// ======= Routes =======

//  Create User
app.post("/api/users", async (req, res) => {
  try {
    const { name, age, hobbies } = req.body;
    if (!name || !age || !hobbies)
      return res.status(400).json({ message: "All fields required" });

    const user = new User({ name, age, hobbies, friends: [] });
    await user.save();
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: "Error creating user", error: err.message });
  }
});

// 📄 Get All Users
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().populate("friends", "name age");
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// ✏️ Update User
app.put("/api/users/:id", async (req, res) => {
  try {
    const { name, age, hobbies } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, age, hobbies },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});

// ❌ Delete User
app.delete("/api/users/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
});

// 🔗 Create Relationship (Friend Connection)
app.post("/api/users/relationship", async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    if (!userId || !friendId)
      return res.status(400).json({ message: "userId and friendId required" });

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    if (!user || !friend) return res.status(404).json({ message: "User not found" });

    if (!user.friends.includes(friendId)) user.friends.push(friendId);
    if (!friend.friends.includes(userId)) friend.friends.push(userId);

    await user.save();
    await friend.save();

    res.json({ message: "Relationship created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating relationship", error: err.message });
  }
});

// 🕸️ Get Graph Data
app.get("/api/users/graph", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching graph data", error: err.message });
  }
});

// ======= Start Server =======
const PORT = 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
