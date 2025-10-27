const nodemailer = require("nodemailer");

// 🔐 Shared transporter for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * 🛒 Sends order confirmation email to customer and admin
 * @param {Object} order - Order data
 */
function sendOrderEmail(order) {
  const itemsList = order.items
    .map(item => `• ${item.name} x${item.quantity}`)
    .join("\n");

  const userMailOptions = {
    from: `"Casuals By Archana 👗" <${process.env.EMAIL_USER}>`,
    to: order.customerEmail,
    subject: `🛍️ Thank You for Your Order #${order.id} – Casuals By Archana`,
    text: `
Hi ${order.name},

Thank you for shopping with Casuals By Archana – your go-to destination for trendy, handcrafted fashion. ✨  
Your order has been successfully received and is now being processed.

🧾 Order ID: ${order.id}  
💰 Total Amount: ₹${order.total}  
👗 Items Ordered:  
${itemsList}

📍 Shipping Address: ${order.address}  
📞 Contact Number: ${order.phone}

You’ll receive a notification as soon as your order is packed and ready to ship.

Stay stylish,  
Team Casuals By Archana
    `.trim(),
  };

  const adminMailOptions = {
    from: `"Order Notification Bot" <${process.env.EMAIL_USER}>`,
    to: "casualsbyarchanasolanki@gmail.com",
    subject: `📥 New Order Received – #${order.id} | Casuals By Archana`,
    text: `
📦 A new order has been placed on Casuals By Archana.

👤 Customer: ${order.name}  
📞 Phone: ${order.phone}  
✉️ Email: ${order.customerEmail}  
📍 Address: ${order.address}

🛍️ Items:  
${itemsList}

💰 Total: ₹${order.total}  
🆔 Order ID: ${order.id}
    `.trim(),
  };

  // Send to customer
  transporter.sendMail(userMailOptions, (err, info) => {
    if (err) return console.error("❌ User Email Error:", err);
    console.log("✅ User email sent:", info.response);
  });

  // Send to admin
  transporter.sendMail(adminMailOptions, (err, info) => {
    if (err) return console.error("❌ Admin Email Error:", err);
    console.log("✅ Admin email sent:", info.response);
  });
}

/**
 * 🔐 Sends a password reset email with secure token link
 * @param {string} toEmail - User's email
 * @param {string} resetLink - Password reset URL with token
 */
function sendResetPasswordEmail(toEmail, resetLink) {
  const mailOptions = {
    from: `"Casuals By Archana 👗" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "🔐 Reset Your Password – Casuals By Archana",
    html: `
      <p>Hi there,</p>
      <p>You recently requested to reset your password. Click the link below to proceed:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>This link will expire in 1 hour. If you didn't request a reset, please ignore this email.</p>
      <br/>
      <p>Thanks,<br/>Team Casuals By Archana</p>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
      if (err) return console.error("❌ Reset Email Error:", err);
      console.log("✅ Reset password email sent:", info.response);
  });
}

module.exports = {
  sendOrderEmail,
  sendResetPasswordEmail,
};
