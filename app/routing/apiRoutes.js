const friendData = require("../data/friends");
console.log(friendData);


module.exports = (app) => {
  app.get("/api/friends", (req, res) => {
    return res.send(friendData);
  });

  app.post("/api/friends", ( { body: submitObj }, res) => {
    console.log(submitObj);

    if (Array.isArray(friendData) && friendData.length === 0) {
      return res.status(500).end();
    }

    const submittedScores = submitObj.scores;    

    if (!submittedScores.every(Number)) {
      return res.status(500).end();
    }

    const bestFriend = friendData.reduce( (bestSoFar, currFriendCheck) => {

      const currCompat = currFriendCheck.scores.reduce( (accComp, currQScore, index) => 
        accComp + Math.abs(currQScore - submittedScores[index]), 0);
      console.log(currCompat);

      if (Number.isNaN(currCompat)) {
        return 
      }

      if (currCompat < bestSoFar.compatScore) {
        return {
          friendObj  : currFriendCheck,
          compatScore: currCompat
        }
      }
      // else 
        return bestSoFar;
    }, {compatScore: Infinity}); // default is 'most incompatible'

    friendData.push(submitObj);

    let { friendObj: {name, photo}, compatScore } = bestFriend;
    res.json( { name, photo, compatScore } );
    
    // res.send("add friend by survey");
  });
};
