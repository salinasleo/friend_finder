
var friends = require("../data/friends");

module.exports = function (app) {

    // this one shows all "friends" available"
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.get("/api/friends/:friend", function (req, res) {
        var chosen = req.params.friend;
        console.log(chosen);

        for (var i = 0; i < friends.length; i++) {
            if (chosen === friends[i].name) {
                return res.json(friends[i]);
            }
        }

        // What does this code do?
        return res.send("No friend found by that name");
    });



    app.post("/api/friends", function (req, res) {

        // var userChoice = {
        //   name: "",
        //   photo: "",
        //   friendDifference: Infinity //tried integer first had to look this up as we have never used it!
        // };
        // //vars for logic userData will be used in HTML
        var newfriend = req.body;
        var newfriendscores = newfriend.scores;
        var compatibility = 0;
        var bestmatch = 9999;
        var k = 0;
        var matchedFriend = [];
        // {
        //     name: "",
        //     photo: ""
        //   };

        for (var i = 0; i < friends.length; i++) {

            // hold info and initialize compatibility
            var friendi = friends[i];
            compatibility = 0;

            // loop through qualities and add
            for (var j = 0; j < friendi.scores.length; j++) {
                compatibility += Math.abs(friends[i].scores[j] - newfriendscores[j]);
            }
            // if best match so far then record this
            bestmatch = Math.min(compatibility, bestmatch);

            // if equally match keep track of all but will display latest found in iteration
            if (bestmatch === compatibility) {
                matchedFriend.unshift(friendi);     
                // matchedFriend[k].compatibility =  bestmatch;       
                // matchedFriend.photo = friendi.photo;
                // k += 1;
                // matchedFriend.sort(function(a, b){return a - b})
            }
        }

        friends.push(newfriend);
        res.json(matchedFriend);
    });
};
