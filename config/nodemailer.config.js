const nodemailer = require("nodemailer");

// Create a transporter
module.exports.transporter = nodemailer.createTransport({
    service: "gmail", // Use your preferred email service
    auth: {
        user: process.env.NODEMAILER_EMAIL, // Your email
        pass: process.env.NODEMAILER_PASSWORD, // Your email account password or app-specific password
    },
});

// Create email template
module.exports.createEmailTemplate = (user) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title>Nested Living - Activación de Cuenta</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #E7E7E7;
      color: #2980B9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFFFF;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1, h2, p {
      color: #2980B9;
    }
    .activate-btn {
      display: block;
      padding: 15px;
      font-size: 16px;
      color: #FFFFFF;
      background-color: #2980B9;
      text-decoration: none;
      border-radius: 5px;
      text-align: center;
      margin-top: 20px;
    }
    .image-container {
      text-align: center;
      margin-top: 30px;
    }
    .image {
      max-width: 50px;
      height: auto;
      margin: 0 10px;
    }
  </style>
  <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
</head>
<body>
  <div class="container">
    <h1>Bienvenido a Nested Living</h1>
    <h2>¡Hola ${user.username}!</h2>
    <p>Gracias por registrarte en Nested Living. Para activar tu cuenta, haz clic en el siguiente botón:</p>
    <div class="image-container">
      <img class="image" src="https://cdn-icons-png.flaticon.com/512/3114/3114317.png" alt="House Icon 1">
      <img class="image" src="https://cdn-icons-png.flaticon.com/512/3114/3114318.png" alt="House Icon 2">
      <img class="image" src="https://cdn-icons-png.flaticon.com/512/595/595642.png" alt="Suitcase Icon">
    </div>
    <a href="http://localhost:5173/activate/${user.activationToken}" class="activate-btn" target="_blank">Activar Cuenta</a>
  </div>
</body>
</html>
  `;
};