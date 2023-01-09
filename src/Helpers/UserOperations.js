const User = require("../Database/User");
const Link = require("../Database/Link");

async function timeoutUser(second, ip) {
    const realMilliSecond = second * 1000;

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    await User.findOneAndUpdate({ ip: ip }, { timeouted: true });

    await sleep(realMilliSecond);

    await User.findOneAndUpdate({ ip: ip }, { timeouted: false });
};

async function addUrl(ip, realUrl, shortUrl) {
    await User.findOneAndUpdate({ ip: ip }, { $push: { urls: { url: realUrl, shortUrl: shortUrl } } });
    const newLink = new Link({
      author: ip,
      shortUrl: shortUrl,
      url: realUrl
    });
   await newLink.save()
}

module.exports = { timeoutUser, addUrl };