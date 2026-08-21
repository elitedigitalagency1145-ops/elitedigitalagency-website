import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

interface LeadPayload {
  name: string;
  email?: string;
  phone?: string;
  service?: string;
  message: string;
  source?: string;
  language?: string;
  timestamp?: string;
  transcriptDetails?: {
    step1Question?: string;
    step1Answer?: string;
    step2Question?: string;
    step2Answer?: string;
    step3Question?: string;
    step3Answer?: string;
    closingMessage?: string;
  };
}

// In-memory list for recent leads
const receivedLeads: LeadPayload[] = [];
const NOTIFY_TARGET_EMAIL = "elitedigitalagency1145@gmail.com";
const VERIFIED_FORMSUBMIT_TOKEN = "9081327a6b791ab2ab1a0af55e3d897b";

// Helper function to dispatch actual email to elitedigitalagency1145@gmail.com
async function sendEmailNotification(lead: LeadPayload) {
  try {
    const emailSubject = `🎙️ [AI CONVERSATION & LEAD] ${lead.name} - ${lead.service || 'Agency Inquiry'}`;
    const tDetails = lead.transcriptDetails || {};

    const formattedBody: Record<string, any> = {
      _subject: emailSubject,
      _template: "table",
      _captcha: "false",
      "👤 Client Name": lead.name,
      "📞 Phone Number": lead.phone || "Not Provided",
      "✉️ Email Address": lead.email || "Not Provided",
      "🛠️ Service Required": lead.service || "General Inquiry",
      "🌐 Source Channel": lead.source || "Website Live Agent",
      "🗣️ Language": lead.language || "te",
      "🕒 Received At": lead.timestamp || new Date().toISOString(),
    };

    if (tDetails.step1Question || tDetails.step1Answer) {
      formattedBody["1️⃣ [Step 1] Agent Question"] = tDetails.step1Question;
      formattedBody["1️⃣ [Step 1] Client Answer"] = tDetails.step1Answer || lead.service;
    }
    if (tDetails.step2Question || tDetails.step2Answer) {
      formattedBody["2️⃣ [Step 2] Agent Question"] = tDetails.step2Question;
      formattedBody["2️⃣ [Step 2] Client Answer"] = tDetails.step2Answer || lead.name;
    }
    if (tDetails.step3Question || tDetails.step3Answer) {
      formattedBody["3️⃣ [Step 3] Agent Question"] = tDetails.step3Question;
      formattedBody["3️⃣ [Step 3] Client Answer"] = tDetails.step3Answer || (lead.phone || lead.email);
    }
    if (tDetails.closingMessage) {
      formattedBody["4️⃣ [Step 4] Agent Closing"] = tDetails.closingMessage;
    }

    formattedBody["📜 Full Conversation Transcript"] = lead.message;

    // Forward to FormSubmit direct inbox gateway for elitedigitalagency1145@gmail.com
    const response = await fetch(`https://formsubmit.co/ajax/${NOTIFY_TARGET_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formattedBody),
    });

    if (response.ok) {
      console.log(`✅ [EMAIL DISPATCHED TO ${NOTIFY_TARGET_EMAIL}]:`, await response.json());
      return true;
    } else {
      console.warn(`⚠️ [EMAIL DISPATCH NOTICE]: FormSubmit status ${response.status}`);
      return false;
    }
  } catch (err) {
    console.error("⚠️ [EMAIL GATEWAY LOG]:", err);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", agency: "Elite Digital Agency", targetEmail: NOTIFY_TARGET_EMAIL, timestamp: new Date().toISOString() });
  });

  // API Route: Receive Lead & Dispatch to elitedigitalagency1145@gmail.com
  app.post("/api/inquiries", async (req, res) => {
    try {
      const { name, email, phone, service, message, source, language } = req.body;

      if (!name || (!email && !phone && !message)) {
        return res.status(400).json({ error: "Name and contact details or message are required." });
      }

      const leadData: LeadPayload = {
        name: String(name).trim(),
        email: email ? String(email).trim() : undefined,
        phone: phone ? String(phone).trim() : undefined,
        service: service ? String(service).trim() : "AI Automation Consultation",
        message: message ? String(message).trim() : "Direct inquiry from Elite Digital Agency",
        source: source ? String(source).trim() : "Website Live Agent",
        language: language ? String(language).trim() : "te",
        timestamp: new Date().toISOString(),
      };

      receivedLeads.unshift(leadData);

      // Console Notification Log
      console.log(`\n======================================================`);
      console.log(`🚀 [NEW CLIENT INQUIRY FOR: ${NOTIFY_TARGET_EMAIL}]`);
      console.log(`👤 Client Name: ${leadData.name}`);
      console.log(`📞 Phone: ${leadData.phone || "Not Provided"}`);
      console.log(`✉️ Email: ${leadData.email || "Not Provided"}`);
      console.log(`🛠️ Service Requested: ${leadData.service}`);
      console.log(`🌐 Source & Lang: ${leadData.source} (${leadData.language})`);
      console.log(`💬 Message / Transcript: ${leadData.message}`);
      console.log(`🕒 Timestamp: ${leadData.timestamp}`);
      console.log(`======================================================\n`);

      // Trigger background real email dispatch
      sendEmailNotification(leadData).catch((e) => console.warn("Email send async log:", e));

      return res.status(200).json({
        success: true,
        dispatchedTo: NOTIFY_TARGET_EMAIL,
        message: "Inquiry successfully recorded and queued for delivery.",
        lead: leadData,
      });
    } catch (error) {
      console.error("Error processing lead submission:", error);
      return res.status(500).json({ error: "Internal server error saving inquiry." });
    }
  });

  // API Route: Get Server Leads List
  app.get("/api/inquiries", (req, res) => {
    res.json({ targetEmail: NOTIFY_TARGET_EMAIL, total: receivedLeads.length, leads: receivedLeads });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Elite Digital Agency Server running on http://0.0.0.0:${PORT}`);
    console.log(`Destination Lead Email: ${NOTIFY_TARGET_EMAIL}`);
  });
}

startServer();
