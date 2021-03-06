import bootState from './states/Boot'
import Preloader from './states/Preloader'
import introState from './states/Intro'
import leadesState from './states/Leaders'
import playState from './states/Play'
import menuState from './states/Menu'

import Api from './api/api';
var game;
window.addEventListener("load", function () {

    var userName = getJsonFromUrl().user || 'test11';
    game = new Phaser.Game(1024, 576, Phaser.CANVAS, '', {}, true);
    game.scoreAPI = new Api();
    game.userName = userName;
    game.state.add("boot", bootState);
    game.state.add("preloader", Preloader);
    game.state.add("intro", introState);
    game.state.add("play",playState );
    game.state.add("leaders",leadesState );
    game.state.add("menu",menuState );

    game.bestScore = 0;

    game.state.start("boot");
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
