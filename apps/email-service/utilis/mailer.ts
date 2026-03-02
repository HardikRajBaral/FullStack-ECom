import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Shortcut for Gmail's SMTP settings - see Well-Known Services
  auth: {
    type: "OAuth2",
    user: "hardikrajbaral232@gmail.com",
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

const sendMail= async({email,subject,text}:{email:string,subject:string,text:string}) => {
    const res= await transporter.sendMail({
        from:'"Ecom Team" <hardikrajbaral232@gmail.com>',
        to: email,
        subject,
        text
    })
}

export default sendMail