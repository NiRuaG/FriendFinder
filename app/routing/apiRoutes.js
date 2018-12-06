const friendData = require("../data/friends");
console.log(friendData);


module.exports = (app) => {
  app.get("/api/friends", (req, res) => {
    return res.send(friendData);
  });

  app.post("/api/friends", (req, res) => {
    console.log(req.body);

    const submittedScores = req.body.scores;

    const bestFriend = friendData.reduce( (bestSoFar, currFriendCheck) => {

      const currCompat = currFriendCheck.scores.reduce( (accComp, currQScore, index) => 
        accComp + Math.abs(currQScore - submittedScores[index]), 0);
      console.log(currCompat);

      if (currCompat < bestSoFar.compatScore) {
        return {
          friendObj  : currFriendCheck,
          compatScore: currCompat
        }
      }
      // else 
        return bestSoFar;
    }, {compatScore: Infinity}); // default is most-incompatible

    friendData.push(req.body);

    let { friendObj: {name, photo}, compatScore } = bestFriend;
    res.json( { name, photo, compatScore } );
    
    // res.send("add friend by survey");
  });
};
