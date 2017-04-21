import bootState from './states/Boot'
import Preloader from './states/Preloader'
import introState from './states/Intro'
import leadesState from './states/Leaders'
import playState from './states/Play'
import menuState from './states/Menu'

import Api from './api/api';
var game;
window.addEventListener("load", function () {

    // var userName = getJsonFromUrl().user || 'Data guest';
    game = new Phaser.Game(1024, 576, Phaser.CANVAS, '', {}, true);
    game.scoreAPI = new Api();
    // game.userName = userName;
    game.state.add("boot", bootState);
    game.state.add("preloader", Preloader);
    game.state.add("intro", introState);
    game.state.add("play",playState );
    game.state.add("leaders",leadesState );
    game.state.add("menu",menuState );

    game.bestScore = 0;
    game.scoreAPI.getUserRank(game.userName, (result) =>{
            var score = result.scores.score;
            game.bestScore = score.value;
    });


    VK.init(function(a, b, c) {
        // API initialization succeeded
        // Your code here
        console.log('vk loaded', a,b,c);
        // VK.callMethod("showInstallBox");

        VK.api("users.get", {"name_case": "Nom"}, function (data) {
            console.log(data);

            game.userName = data.last_name + ' ' + data.first_name;
        });


        game.state.start("boot");


    }, function() {
        // API initialization failed
        // Can reload page here
        console.log('VK fail');

    }, '5.63');
    //

    //https://pp.userapi.com/c623823/v623823433/52688/WmkTpKfgNOI.jpg

});

function getJsonFromUrl() {
    var query = location.search.substr(1);
    var result = {};
    query.split("&").forEach(function(part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}
