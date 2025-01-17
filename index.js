import express from "express";
import bodyParser from "body-parser";
import { MailtrapClient } from "mailtrap"
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { onRequest } from "firebase-functions/v2/https";
// import { logger } from "firebase-functions/logger";

// const firebaseConfig = {
//     apiKey: "AIzaSyA9cZwsMghXMX10LJzuEjbcK3XqiY0eoLM",
//     authDomain: "karupati-coffee.firebaseapp.com",
//     projectId: "karupati-coffee",
//     storageBucket: "karupati-coffee.firebasestorage.app",
//     messagingSenderId: "967366216647",
//     appId: "1:967366216647:web:4ee09d41f3b455865e67e2",
//     measurementId: "G-6ZN8TT0YJE"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const apps = express();
const port = 3000;
const TOKEN = "3f5517d4d15601a03f6541a010128a79";
const SENDER_EMAIL = "hello@demomailtrap.com";
const RECIPIENT_EMAIL = "newbiemill72@gmail.com";

const client = new MailtrapClient({ token: TOKEN });

// const sender = { name: "Karuppatti-coffee", email: SENDER_EMAIL };

apps.use(bodyParser.urlencoded({ extended: true }));
apps.use(express.static("public"));

apps.get("/",(req,res)=>{
    res.render("index.ejs")
})
apps.post("/submit",(req,res)=>{
    const {name,mail,number,location,texts}= req.body;
    client.send({
    from: { name: "Mailtrap Test", email: SENDER_EMAIL },
    to: [{ email: RECIPIENT_EMAIL }],
    template_uuid: "f13edfaa-4c02-42ca-a5fe-0832f16dbd41",
    template_variables: {
      "name": name,
      "email": mail,
      "number": number,
      "location": location,
      "texts": texts
    }
  })
  .then(console.log)
  .catch(console.error);
  res.redirect("/");
})

apps.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
// exports.apps = functions.https.onRequest(apps);