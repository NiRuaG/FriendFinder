const friendData = require("../data/friends");
console.log(friendData);

module.exports = (app) => {
  app.get("/api/friends", (req, res) => {
    return res.send(friendData);
  });

  app.post("/api/friends", (req, res) => {
    console.log(req);
    res.send("add friend by survey")
  });
};
