import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://Morkosabanoub:689IsVMms3e6V0dK@cluster0.yh0mmvo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let translationsCollection;

async function startServer() {
  try {
    await client.connect();
    const db = client.db("translationsDB");
    translationsCollection = db.collection("translations");
    console.log("MongoDB connected!");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

startServer();

// ===== GENERAL =====

// إضافة مستخدم جديد مع تشفير الباسورد
app.post("/api/general/users", async (req, res) => {
  try {
    const newUser = req.body;

    const doc = await translationsCollection.findOne({ language: "general" });
    if (!doc)
      return res.status(404).json({ message: "General file not found" });

    // تنظيف البريد وتشفير الباسورد
    newUser.email = newUser.email.trim().toLowerCase();
    newUser.password = await bcrypt.hash(newUser.password, 10);

    doc.data.users.push(newUser);

    await translationsCollection.updateOne(
      { language: "general" },
      { $set: { "data.users": doc.data.users } }
    );

    res
      .status(201)
      .json({ message: "User added successfully!", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/general/users", async (req, res) => {
  try {
    const doc = await translationsCollection.findOne({ language: "general" });
    if (!doc)
      return res.status(404).json({ message: "General file not found" });

    res.json(doc.data.users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// تسجيل دخول المستخدم
app.post("/api/general/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const doc = await translationsCollection.findOne({ language: "general" });
    if (!doc)
      return res.status(404).json({ message: "General file not found" });

    const user = doc.data.users.find(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
    );
    if (!user)
      return res.status(401).json({ message: "Invalid credentials email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials password" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// تعديل بيانات مستخدم بالـ Username
app.put("/api/general/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const updates = req.body;

    const doc = await translationsCollection.findOne({ language: "general" });
    if (!doc)
      return res.status(404).json({ message: "General file not found" });

    const index = doc.data.users.findIndex(
      (user) => user.Username === username
    );
    if (index === -1)
      return res.status(404).json({ message: "User not found" });

    // تشفير الباسورد لو تم تغييره
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    doc.data.users[index] = { ...doc.data.users[index], ...updates };

    await translationsCollection.updateOne(
      { language: "general" },
      { $set: { "data.users": doc.data.users } }
    );

    res.json({
      message: "User updated successfully!",
      user: doc.data.users[index],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// حذف مستخدم بالـ Username
app.delete("/api/general/users/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const doc = await translationsCollection.findOne({ language: "general" });
    if (!doc)
      return res.status(404).json({ message: "General file not found" });

    doc.data.users = doc.data.users.filter(
      (user) => user.Username !== username
    );

    await translationsCollection.updateOne(
      { language: "general" },
      { $set: { "data.users": doc.data.users } }
    );

    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ===== LANGUAGES CRUD =====
const langEndpoints = [
  "users",
  "phones",
  "brands",
  "services",
  "slider",
  "company",
  "text",
];

langEndpoints.forEach((endpoint) => {
  // GET
  app.get(`/api/translations/:lang/${endpoint}`, async (req, res) => {
    const { lang } = req.params;
    try {
      const doc = await translationsCollection.findOne({ language: lang });
      if (!doc) return res.status(404).json({ message: "Language not found" });

      res.json(doc.data[endpoint]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // POST
  app.post(`/api/translations/:lang/${endpoint}`, async (req, res) => {
    const { lang } = req.params;
    const newItem = req.body;
    try {
      const doc = await translationsCollection.findOne({ language: lang });
      if (!doc) return res.status(404).json({ message: "Language not found" });

      if (!doc.data[endpoint]) doc.data[endpoint] = [];
      doc.data[endpoint].push(newItem);

      await translationsCollection.updateOne(
        { language: lang },
        { $set: { [`data.${endpoint}`]: doc.data[endpoint] } }
      );

      res
        .status(201)
        .json({ message: `${endpoint} added successfully!`, item: newItem });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // PUT
  app.put(`/api/translations/:lang/${endpoint}/:id`, async (req, res) => {
    const { lang, id } = req.params;
    const updates = req.body;
    try {
      const doc = await translationsCollection.findOne({ language: lang });
      if (!doc) return res.status(404).json({ message: "Language not found" });

      const index = doc.data[endpoint].findIndex(
        (item) => item.id === Number(id)
      );
      if (index === -1)
        return res.status(404).json({ message: `${endpoint} not found` });

      doc.data[endpoint][index] = { ...doc.data[endpoint][index], ...updates };

      await translationsCollection.updateOne(
        { language: lang },
        { $set: { [`data.${endpoint}`]: doc.data[endpoint] } }
      );

      res.json({
        message: `${endpoint} updated successfully!`,
        item: doc.data[endpoint][index],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });

  // DELETE
  app.delete(`/api/translations/:lang/${endpoint}/:id`, async (req, res) => {
    const { lang, id } = req.params;
    try {
      const doc = await translationsCollection.findOne({ language: lang });
      if (!doc) return res.status(404).json({ message: "Language not found" });

      doc.data[endpoint] = doc.data[endpoint].filter(
        (item) => item.id !== Number(id)
      );

      await translationsCollection.updateOne(
        { language: lang },
        { $set: { [`data.${endpoint}`]: doc.data[endpoint] } }
      );

      res.json({ message: `${endpoint} deleted successfully!` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
  // تحديث جزئي (PATCH) لمستخدم بالـ Username
  app.patch("/api/general/users/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const updates = req.body; // ممكن يكون { cart } أو { liked } أو أي فيلد تاني

      const doc = await translationsCollection.findOne({ language: "general" });
      if (!doc)
        return res.status(404).json({ message: "General file not found" });

      const index = doc.data.users.findIndex(
        (user) => user.Username === username
      );
      if (index === -1)
        return res.status(404).json({ message: "User not found" });

      // دمج التعديلات مع اليوزر الحالي
      doc.data.users[index] = { ...doc.data.users[index], ...updates };

      await translationsCollection.updateOne(
        { language: "general" },
        { $set: { "data.users": doc.data.users } }
      );

      res.json({
        message: "User patched successfully!",
        user: doc.data.users[index],
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
});
