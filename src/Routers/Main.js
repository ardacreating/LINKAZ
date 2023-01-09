const router = require("express").Router();
const User = require("../Database/User");
const Link = require("../Database/Link");

const { checkUser, createUser } = require("../Helpers/Check");
const { timeoutUser, addUrl } = require("../Helpers/UserOperations");
const { getRandomCode } = require("../Helpers/RandomCodeGenerator")

router.get("/", async (req, res) => {
     const ipHeader = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
     let ip = ipHeader.replace("::ffff:", "");
     
     const Check = await checkUser(ip);

     if(Check == false) {
        createUser(ip);
     };

     const user = await User.findOne({ ip: ip });

     res.render("index", {
      urls: user.urls
     })
})

router.post("/", async (req, res) => {
     const ipHeader = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
     let ip = ipHeader.replace("::ffff:", "");
     
     const Check = await checkUser(ip);

     if(Check == false) {
        createUser(ip);
     };

     const user = await User.findOne({ ip: ip });
     
     if(user.timeouted == true) return res.send("Timeouted Bro.")

     const url = await req.body.url;
     const shortUrl = getRandomCode()

     await addUrl(ip, url, shortUrl);
     res.redirect(`/${shortUrl}`);
     await timeoutUser(10, ip);
});

router.get("/:url", async (req, res) => {
   const url = req.params.url;

   const redirectUrl = await Link.findOne({ shortUrl: url });

   if(redirectUrl) {
      res.redirect(redirectUrl.url)
   } else {
      res.redirect("/")
   }
})

module.exports = router;