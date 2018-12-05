const NAMES = [ "Moshe", "Charlie", "Seth", "Aleena", "Kiara", "Isabelle"];
const PHOTO_SIZEs  = [200,250,300];

module.exports = [...Array(4)].map(_=> {
  return {
    name  : NAMES[Math.floor(Math.random()*NAMES.length)],
    photo : `https://fillmurray.com/${PHOTO_SIZEs[Math.floor(Math.random()*PHOTO_SIZEs.length)]}/${PHOTO_SIZEs[Math.floor(Math.random()*PHOTO_SIZEs.length)]}`,
    scores: [...Array(10)].map(_=>Math.floor(Math.random()*5)+1),
  }
});