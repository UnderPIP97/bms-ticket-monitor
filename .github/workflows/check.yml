const fs = require("fs");

const URL = "https://in.bookmyshow.com/sports/icc-men-s-t20-world-cup-2026-semi-final-2/ET00474271";

const SERVICE_ID = "service_xet3t67";
const TEMPLATE_ID = "template_vphie6n";
const PUBLIC_KEY = "8USmaaWYFTn285YIh";

async function checkTickets() {
  try {
    // Stop if already alerted
    if (fs.existsSync("sent.flag")) {
      console.log("Already sent alert");
      return;
    }

    const res = await fetch(URL, { cache: "no-store" });
    const html = await res.text();

    const isComingSoon = html.includes("Coming Soon");

    const hasTicketUI =
      html.includes("event-action-button") ||
      html.includes("book-button") ||
      html.includes("price-chip") ||
      html.includes("ticket-price") ||
      html.includes("cta-book");

    if (!isComingSoon && hasTicketUI) {
      await sendEmail();
      fs.writeFileSync("sent.flag", "sent");
      console.log("LIVE detected — email sent");
    } else {
      console.log("Not live yet");
    }
  } catch (e) {
    console.log("Error:", e);
  }
}

async function sendEmail() {
  const ts = new Date().toISOString();

  await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: {
        to_email: "jaywagh01@gmail.com",
        ts: ts,
        source: "github-monitor"
      }
    })
  });
}

checkTickets();
