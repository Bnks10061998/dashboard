import mongoose from "mongoose";
import Client from "../../Models/Client.js";

// ✅ Get all clients
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Add a new client
export const addClient = async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    console.error("Error adding client:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update client
export const updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(updatedClient);
  } catch (err) {
    console.error("Error updating client:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete client
export const deleteClient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid client ID" });
  }

  try {
    const result = await Client.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "Client not found" });

    res.json({ message: "Client deleted" });
  } catch (err) {
    console.error("Error deleting client:", err);
    res.status(500).json({ message: "Server error" });
  }
};
