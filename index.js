import express from "express";
import bodyParser from "body-parser";
import { MailtrapClient } from "mailtrap"


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
