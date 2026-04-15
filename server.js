// 1. Install dependencies in your backend folder: 
// npm install express cors

import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5174; // The port you requested the API to run on

// Middleware
// This allows your website on port 5173 and WMS on 5175 to talk to this API
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5175']
}));
app.use(express.json());

// --- IN-MEMORY DATABASE ---
// For this local demo, we will store leads and jobs in arrays.
// In the future, you can swap this out for MongoDB or PostgreSQL.
let leads = [];
let jobs = [];

// --- API ENDPOINTS ---

// 1. Create a New Lead (Website sends data here)
app.post('/api/leads', (req, res) => {
    console.log("New booking received:", req.body);
    
    const newLead = {
        id: Date.now().toString(),
        ...req.body,
        status: 'New Lead',
        createdAt: new Date().toISOString()
    };
    
    leads.push(newLead);
    res.status(201).json({ message: "Booking successful!", lead: newLead });
});

// 2. Get All Leads (WMS fetches data from here)
app.get('/api/leads', (req, res) => {
    res.status(200).json(leads);
});

// 3. Delete a Lead (WMS deletes a lead)
app.delete('/api/leads/:id', (req, res) => {
    leads = leads.filter(l => l.id !== req.params.id);
    res.status(200).json({ message: "Lead deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Nexus Backend API is running on http://localhost:${PORT}`);
});