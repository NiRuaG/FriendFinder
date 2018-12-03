const friendData = require("../data/friends");
console.log(friendData);

module.exports = (app) => {
  app.get("/api/friends", (req, res) => {
    res.send("return all friends");
  });

  app.post("/api/friends", (req, res) => {
    console.log(req);
    res.send("add friend by survey")
  });
};
