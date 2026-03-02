const fs = require("fs");

const SERVICE_ID = "service_xet3t67";
const TEMPLATE_ID = "template_vphie6n";
const PUBLIC_KEY = "8USmaaWYFTn285YIh";

async function checkTickets() {
  try {
    console.log("TEST MODE — forcing email send");

    await sendEmail();

    // create flag so workflow step still works
    fs.writeFileSync("sent.flag", "test");

    console.log("TEST email sent");
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
        source: "github-test"
      }
    })
  });
}

checkTickets();
