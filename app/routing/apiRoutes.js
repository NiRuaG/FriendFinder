const friendsData = require("../data/friends");
// console.log(friendsData);


module.exports = (app) => {
  app.get("/api/friends", (req, res) => {
    return res.send(friendsData);
  });

  app.post("/api/friends", ( {body: submitObj}, res) => {
    //TODO: give user back their average compatibility versus all other friends
    // console.log(submitObj);

    if (Array.isArray(friendsData) && friendsData.length === 0) {
      return res.status(500).end();
    }

    const submittedScores = submitObj.scores;

    if (!submittedScores.every(Number)) {
      return res.status(500).end();
    }

    const bestFriend = friendsData.reduce( (acc_bestFriendSoFar, curr_friendToCheck) => {

      const curr_friendCompat = curr_friendToCheck.scores.reduce( (acc_compatDiff, curr_QScore, index) => 
        acc_compatDiff + Math.abs(curr_QScore - submittedScores[index]), 0);
      // console.log(curr_friendCompat);

      if (curr_friendCompat < acc_bestFriendSoFar.compatibility) {
        return {
          friendObj    : curr_friendToCheck,
          compatibility: curr_friendCompat
        }
      }
      // else 
        return acc_bestFriendSoFar;
    }, {compatibility: Infinity}); // default is 'most incompatible'

    friendsData.push(submitObj);

    let { friendObj: {name, photoURL}, compatibility } = bestFriend;
    const MAX_DIFF_PER_Q = (5-1);
    const NUM_Qs = 10;
    const MAX_DIFF = MAX_DIFF_PER_Q * NUM_Qs;
    return res.json( 
      {
        name,
        photoURL,
        score: Number( (MAX_DIFF - compatibility)/(MAX_DIFF)+'e2' ).toFixed()
      }
    );
    
    // res.send("add friend by survey");
  });
};
