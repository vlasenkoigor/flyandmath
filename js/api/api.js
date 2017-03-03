/**
 * Created by Ivlasenko on 2/19/2017.
 */
class Api{
    constructor(){
        App42.initialize("89633700275542faf694868d356721ae5d073f334843e68cdc72fa91986be532", "4611b1e5b7875d8a4f93dda329322d87bb8dcbccf2b565694b3610ef08dd980a");
        this.gameName = "fm";
        this.scoreBoardService = new App42ScoreBoard();
    }


    saveScore(userName, score){

        this.scoreBoardService.saveUserScore(this.gameName,userName, score, {
            success: function(object) {
                // var game = JSON.parse(object);
                // var result = game.app42.response.games.game;
                // var scoreList = result.scores.score;
            },
            error: function(error) {
                console.log(error);
            }
        });

    }

    getTopFive(success, error){


        this.scoreBoardService.getTopNRankers(this.gameName, 5, {
            success: function(object) {
                var game = JSON.parse(object);
                var result = game.app42.response.games.game;
                var scoreList = result.scores.score;
                success(scoreList)
                // if (scoreList instanceof Array) {
                //     for (var i = 0; i < scoreList.length; i++) {
                //         console.log("userName is : " + scoreList[i].userName)
                //         console.log("scoreId is : " + scoreList[i].scoreId)
                //         console.log("value is : " + scoreList[i].value)
                //     }
                // } else {
                //     console.log("userName is : " + scoreList.userName)
                //     console.log("scoreId is : " + scoreList.scoreId)
                //     console.log("value is : " + scoreList.value)
                // }
            },
            error: function(error) {
                console.log(error);
            }

        });
    }

    getUserRank(userName, success, error){


        this.scoreBoardService.getUserRanking(this.gameName, userName, {
            success : function (object) {
                var game = JSON.parse(object);
                var result = game.app42.response.games.game;

                success(result)
            },

            error : function () {
            }
        })
    }


    // delete(){
    //     var userName = "igor";
    //     var result ;
    //     App42.initialize("316555fb6ba2d8d5bd8b22870fac958f71f60b52e7a963b8599d179417fdf11c","cad6220c41aaa94116e3e357fe294c25b34d103e7f542c79bc5c36dd7099e8d5");
    //     var userService  = new App42User();
    //     userService.deleteUser(userName,{
    //         success: function(object)
    //         {
    //             var userObj = JSON.parse(object);
    //             result = userObj.app42.response.users.user;
    //             console.log("userName is " + result.userName)
    //         },
    //         error: function(error) {
    //         }
    //     });
    // }
    //
    //
    // create(){
    //     var gameName = "fm",
    //         description = "description",
    //         result ;
    //     App42.initialize("89633700275542faf694868d356721ae5d073f334843e68cdc72fa91986be532","4611b1e5b7875d8a4f93dda329322d87bb8dcbccf2b565694b3610ef08dd980a");
    //     var gameService  = new App42Game();
    //     gameService.createGame(gameName,description,{
    //         success: function(object) {
    //             var game = JSON.parse(object);
    //             result = game.app42.response.games.game;
    //             console.log("gameName is " + result.name)
    //             console.log("gameDescription is " + result.description)
    //         },
    //         error: function(error) {
    //         }
    //     });
    // }
}


export default Api;