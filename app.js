/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Ivlasenko on 2/19/2017.
 */
class Api {
    constructor() {
        App42.initialize("89633700275542faf694868d356721ae5d073f334843e68cdc72fa91986be532", "4611b1e5b7875d8a4f93dda329322d87bb8dcbccf2b565694b3610ef08dd980a");
        this.gameName = "fm";
        this.scoreBoardService = new App42ScoreBoard();
    }

    saveScore(userName, score) {

        this.scoreBoardService.saveUserScore(this.gameName, userName, score, {
            success: function (object) {
                // var game = JSON.parse(object);
                // var result = game.app42.response.games.game;
                // var scoreList = result.scores.score;
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    getTopFive(success, error) {

        this.scoreBoardService.getTopNRankers(this.gameName, 5, {
            success: function (object) {
                var game = JSON.parse(object);
                var result = game.app42.response.games.game;
                var scoreList = result.scores.score;
                success(scoreList);
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
            error: function (error) {
                console.log(error);
            }

        });
    }

    getUserRank(userName, success, error) {

        this.scoreBoardService.getUserRanking(this.gameName, userName, {
            success: function (object) {
                var game = JSON.parse(object);
                var result = game.app42.response.games.game;

                success(result);
            },

            error: function () {}
        });
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

/* harmony default export */ __webpack_exports__["a"] = (Api);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var bootState = {
    preload: function () {
        this.load.image('preloadbar', 'assets/phaser-game-progress-bar.png');
    },
    create: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
    },
    update: function () {
        this.state.start('preloader');
    }
};

/* harmony default export */ __webpack_exports__["a"] = (bootState);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Ivlasenko on 2/7/2017.
 */
var introState = {
    preload: function () {
        this.game.load.json('tangram', 'assets/tangram.json');
        this.game.load.image('logo', 'assets/logo.png');
    },
    create: function () {

        var tangram = [];
        var logo;
        var game = this.game;

        var colors = [0xf6921e, 0x005aa9, 0xd7172f, 0xb1d249, 0xf5d944, 0x8c2b85, 0x00bedf5];

        var tangramPoints = game.cache.getJSON('tangram').datalogo;

        var group = game.add.group();
        group.x = 300;
        group.y = 50;
        for (var i = 0; i < tangramPoints.length; i++) {
            var poly = new Phaser.Polygon(tangramPoints[i].shape);
            var graphics = game.make.graphics(0, 0);
            group.add(graphics);
            graphics.beginFill(colors[i]);
            graphics.drawPolygon(poly.points);
            graphics.endFill();
            tangram.push(graphics);
        }

        var lastTween = null;
        tangram.forEach(function (t) {
            t.x += game.rnd.integerInRange(-1000, 1000);
            t.y += game.rnd.integerInRange(-1000, 1000);
            t.alpha = 0;game.rnd.frac();
            // t.scale.set(game.rnd.normal());
            lastTween = game.add.tween(t).to({ x: 0, y: 0, alpha: 1 }, 2000, Phaser.Easing.Elastic.Out, true);
        });

        logo = game.make.sprite(0, 0, "logo");
        logo.scale.set(0.1);
        logo.x = 40;
        logo.y = 420;
        group.add(logo);
        logo.alpha = 0;
        var logoTween = game.add.tween(logo).to({ alpha: 1 }, 700, Phaser.Easing.Exponential.In, false);
        lastTween.onComplete.add(function () {
            logoTween.start();
        }.bind(this));

        logoTween.onComplete.add(function () {
            this.time.events.add(Phaser.Timer.SECOND * 1, function () {
                // this.camera.flash(0x000, 1000);
                this.state.start('menu');
            }, this);
        }, this);

        // this.camera.onFlashComplete.add(function () {
        //     this.time.events.add(Phaser.Timer.SECOND * 0.4, function () {
        //         this.camera.resetFX();
        //     }, this);
        // }, this)

    },
    render: function () {}
};

/* harmony default export */ __webpack_exports__["a"] = (introState);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Ivlasenko on 2/18/2017.
 */

var leadesState = {
    create: function () {
        this.game.add.sprite(0, 0, 'back');

        this.game.scoreAPI.getTopFive(list => {
            console.log(list);
            let formatted = [];
            if (list instanceof Array) {
                list.forEach(e => {
                    formatted.push({ name: e.userName, points: e.value, player: e.userName === this.game.userName });
                });
            } else {
                formatted.push({ name: list.userName, points: list.value, player: list.userName === this.game.userName });
            }

            this.drawList(formatted);
        }, () => {
            let list = [{ name: "Leo Messi", points: 100 }, { name: "Ben Bruce", points: 50 }, { name: "Anton Goncharov", points: 50 }, { name: "Donald Trump ", points: 50 }, { name: "Barak Obama", points: 50 }];
        });

        // let playerObj =  {name : "Igor Vlasenko", points : 20, player : true, place : 44};
        // this.mountainsMid2 = this.game.add.tileSprite(0,
        //     this.game.height - this.game.cache.getImage('mountains-mid2').height,
        //     this.game.width,
        //     this.game.cache.getImage('mountains-mid2').height,
        //     'mountains-mid2'
        // );

        this.mountainsMid1 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid1').height, this.game.width, this.game.cache.getImage('mountains-mid1').height, 'mountains-mid1');

        let h = this.game.cache.getImage('popup').height;
        let w = this.game.cache.getImage('popup').width;
        this.popUp = this.game.add.group();
        this.popUp.fixedX = this.game.world.centerX - w / 2;
        this.popUp.fixedY = this.game.world.centerY - h / 2;

        this.popUp.x = this.popUp.fixedX;
        this.popUp.y = this.popUp.fixedY;

        this.popUp.create(0, 0, 'popup');

        let cup = this.popUp.create(0, 0, 'cubok_pres');

        cup.anchor.set(0.5);
        cup.x = w / 2;
        cup.y = h / 2 + 50;
        cup.alpha = 0.5;

        this.label = this.game.make.text(w / 2, -20, 'Top 5 scorers', {
            font: "33px MyWebFont2",
            fill: "#ffffff",
            stroke: "#96929b",
            strokeThickness: 5
        });

        this.label.anchor.set(0.5);

        this.popUp.addChild(this.label);

        this.backButton = this.game.add.button(this.popUp.fixedX + w / 2, h + 170, 'back_press', () => {
            this.state.start('menu');
        }, this);

        this.backButton.anchor.set(0.5);
    },

    drawList(list) {

        if (this.game.state.current !== 'leaders') {
            return;
        }
        let wasPlayer = false;
        list.forEach((p, i) => {
            wasPlayer = wasPlayer || p.player;
            let text = `${i + 1}. ${p.name} - ${p.points}`;
            this.game.add.text(this.popUp.x + 20, this.popUp.y + 100 + i * 35, text, {
                font: "20px MyWebFont2",
                fill: p.player ? "#ed1c1c" : "#ffffff",
                stroke: "#96929b",
                strokeThickness: 5
            });
        });

        if (!wasPlayer) {
            this.game.scoreAPI.getUserRank(this.game.userName, result => {
                if (this.game.state.current !== 'leaders') {
                    return;
                }
                var score = result.scores.score;
                let playerObj = { name: score.userName, points: score.value, place: score.rank };
                let text = `...\n${playerObj.place}. ${playerObj.name} - ${playerObj.points}`;
                this.game.add.text(this.popUp.x + 20, this.popUp.y + 100 + 5 * 35 - 10, text, {
                    font: "15px MyWebFont2",
                    fill: "#000000",
                    stroke: "#96929b",
                    strokeThickness: 5
                });
            }, () => {});
        }
    }
};
/* harmony default export */ __webpack_exports__["a"] = (leadesState);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by Ivlasenko on 2/18/2017.
 */

var menuState = {
    create: function () {
        this.game.add.sprite(0, 0, 'back');

        this.clicked = false;
        this.clouds = this.game.add.tileSprite(0, 70, this.game.width, this.game.cache.getImage('clouds').height, 'clouds');

        this.mountainsMid2 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid2').height, this.game.width, this.game.cache.getImage('mountains-mid2').height, 'mountains-mid2');

        this.mountainsMid1 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid1').height, this.game.width, this.game.cache.getImage('mountains-mid1').height, 'mountains-mid1');

        let h = this.game.cache.getImage('popup').height;
        let w = this.game.cache.getImage('popup').width;
        this.popUp = this.game.add.group();
        this.popUp.fixedX = this.game.world.centerX - w / 2;
        this.popUp.fixedY = this.game.world.centerY - h / 2;
        this.popUp.x = this.popUp.fixedX;
        this.popUp.y = this.popUp.fixedY;

        this.label = this.game.make.text(w / 2, -20, 'Fly&Math', {
            font: "63px MyWebFont2",
            fill: "#ffffff",
            stroke: "#96929b",
            strokeThickness: 5
        });

        this.label.anchor.set(0.5);

        this.popUp.addChild(this.label);

        this.playButton = this.game.add.button(this.popUp.fixedX + 90, h + 130, 'play', () => {
            if (this.clicked) return;
            this.clicked = true;
            this.game.add.audio('fly').play();
            let t = this.game.add.tween(this.dude).to({ x: this.game.world.width + 200 }, 1500, Phaser.Easing.Elastic.In, true);
            t.onComplete.add(() => {
                this.state.start('play');
            });
        }, this);

        this.leadesButton = this.game.add.button(this.popUp.fixedX + w - 190, h + 130, 'cubok_pres', () => {
            if (this.clicked) return;
            this.clicked = true;
            this.state.start('leaders');
        }, this);

        this.dude = this.game.add.sprite(-100, this.game.world.centerY, "loodscrin");
        this.dude.anchor.set(0.5);

        this.game.add.audio('fly').play();
        let t = this.game.add.tween(this.dude).to({ x: this.game.world.centerX }, 2000, Phaser.Easing.Elastic.Out, true);
        t.onComplete.add(() => {});
    },

    update() {
        this.clouds.tilePosition.x -= 0.7;
    }
};
/* harmony default export */ __webpack_exports__["a"] = (menuState);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Player_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PipeEmitter__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ExpresionGenerator__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_ProgressBar__ = __webpack_require__(11);





var playState = {
        preload: function () {
                this.time.advancedTiming = true;
        },
        create: function () {
                this.game.time.slowMotion = 1;
                window.game = this.game;

                this.started = false;
                this.game.expresionGenerator = new __WEBPACK_IMPORTED_MODULE_2__ExpresionGenerator__["a" /* default */](this.game.rnd);
                this.game.worldSpeed = 1.5;
                this.game.worldSpeedPrev = 2.5;
                //  Enable p2 physics
                this.game.isGameOver = false;
                this.gravity = 1500;

                this.game.gameOver = new Phaser.Signal();

                this.score = 0;

                this.newRecord = false;

                this.game.toNextCalacSpawn = this.game.rnd.between(1, 2);
                this.game.slomoActive = false;
                this.game.calcActive = 0;

                this.game.add.sprite(0, 0, 'back');

                this.clouds = this.game.add.tileSprite(0, 70, this.game.width, this.game.cache.getImage('clouds').height, 'clouds');
                this.mountainsMid2 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid2').height, this.game.width, this.game.cache.getImage('mountains-mid2').height, 'mountains-mid2');

                this.mountainsMid1 = this.game.add.tileSprite(0, this.game.height - this.game.cache.getImage('mountains-mid1').height, this.game.width, this.game.cache.getImage('mountains-mid1').height, 'mountains-mid1');

                this.playerMock = this.game.add.sprite(250, this.game.world.centerY - 12, 'player', 'mob_2.png');
                this.playerMock.anchor.set(0.5);
                this.playerMock.scale.set(0.75);
                this.playerMock.tweenYoYo = this.game.add.tween(this.playerMock).to({ y: this.game.world.centerY + 12 }, 400, "Linear", true, 0, -1);
                this.playerMock.tweenYoYo.yoyo(true, 0);

                this.game.pipeGroup = this.add.group();

                // this.time.events.loop(Phaser.Timer.SECOND * 7 / this.game.worldSpeed, this.pipeEmitter.spawn, this.pipeEmitter);


                this.builUI();

                this.slomoKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

                this.game.input.onDown.add(() => {
                        if (!this.started) {
                                this.start();
                        }
                });
                this.slomoKey.onDown.add(p => {
                        if (!this.started) {
                                this.start();
                        }
                        this.slowMoStart();
                });

                this.slomoKey.onUp.add(p => {
                        this.slowMoStop();
                });

                // this.newRecordAnim();
        },

        builUI() {
                this.calc = this.game.add.sprite(80, 70, 'calcul');
                this.calc.anchor.set(0.7);
                this.calc.scale.set(0.7);
                this.calcCnt = this.game.add.text(80, 60, 'x' + this.game.calcActive, {
                        font: "30px MyWebFont2",
                        fill: "#ffffff",
                        stroke: "#96929b",
                        strokeThickness: 2
                });

                this.slowMoBar = new __WEBPACK_IMPORTED_MODULE_3__ui_ProgressBar__["a" /* default */](this.game);
                this.slowMoBar.y = this.world.height - 70;
                this.slowMoBar.x = 20;

                this.scoreText = this.game.add.text(game.world.centerX, 40, '' + this.score, {
                        font: "50px MyWebFont2",
                        fill: "#ffffff",
                        stroke: "#96929b",
                        strokeThickness: 5
                });
                this.scoreText.anchor.set(0.5);

                //create win popup

                let h = this.game.cache.getImage('popup').height;
                let w = this.game.cache.getImage('popup').width;
                this.popUp = this.game.add.group();
                this.popUp.fixedX = this.game.world.centerX - w / 2;
                this.popUp.fixedY = this.game.world.centerY - h / 2;

                this.popUp.x = this.popUp.fixedX;
                this.popUp.y = this.popUp.fixedY;

                this.popUp.create(0, 0, 'popup');

                let cup = this.popUp.create(0, 0, 'cubok_pres');

                cup.anchor.set(0.5);
                cup.x = w / 2;
                cup.y = h / 2 + 50;
                cup.alpha = 0.5;

                this.scoreTextPopUp = this.game.make.text(w / 2, h / 2, 'Your score : 1200', {
                        font: "33px MyWebFont2",
                        fill: "#ffffff",
                        stroke: "#96929b",
                        strokeThickness: 5
                });
                this.scoreTextPopUp.textPattern = 'Your score : ';

                this.scoreTextPopUp.anchor.set(0.5);

                this.bestScoreTextPopUp = this.game.make.text(w / 2, h / 2 + 70, 'Best score : 1200', {
                        font: "33px MyWebFont2",
                        fill: "#ffffff",
                        stroke: "#96929b",
                        strokeThickness: 5
                });

                this.bestScoreTextPopUp.textPattern = 'Best score : ';
                this.bestScoreTextPopUp.anchor.set(0.5);

                this.popUp.addChild(this.scoreTextPopUp);
                this.popUp.addChild(this.bestScoreTextPopUp);

                this.playButton = game.add.button(this.popUp.fixedX + 90, h + 130, 'play', () => {
                        this.state.restart(true);
                }, this);

                this.leadesButton = game.add.button(this.popUp.fixedX + w - 190, h + 130, 'cubok_pres', () => {
                        this.state.start('leaders');
                }, this);

                this.playButton.visible = false;
                this.leadesButton.visible = false;

                this.popUp.visible = false;

                this.tutorialText = this.game.add.text(game.world.centerX, game.world.centerY + 100, "click to fly\n hold spacebar for slowmo\nuse your brain to think", {
                        font: "30px MyWebFont2",
                        fill: "#ffffff",
                        stroke: "#96929b",
                        strokeThickness: 5,
                        align: 'center'
                });

                this.tutorialText.anchor.set(0.5);

                this.game.bgSound = game.add.audio('bg');
                this.game.bgSound.loopFull();
                this.game.jumpSound = game.add.audio('jump');
                this.game.winSound = game.add.audio('win');
                this.game.loseSound = game.add.audio('lose');
                this.game.recordSound = game.add.audio('record');
        },

        start() {
                this.started = true;
                this.slowMoBar.start();

                this.tutorialText.destroy();
                this.playerMock.tweenYoYo.stop();
                this.playerMock.destroy();

                this.physics.startSystem(Phaser.Physics.P2JS);

                this.physicsFrameRate = this.physics.p2.frameRate;

                this.game.physics.p2.setImpactEvents(true);

                this.physics.p2.gravity.y = this.gravity;
                this.physics.p2.world.defaultContactMaterial.friction = 0;
                this.physics.p2.world.setGlobalStiffness(1e9);
                this.physics.p2.world.setGlobalRelaxation(1.9);

                var playerCollisionGroup = this.physics.p2.createCollisionGroup();
                var solidCollisionGroup = this.physics.p2.createCollisionGroup();
                var quizCollisionGroup = this.physics.p2.createCollisionGroup();
                var achivementllisionGroup = this.physics.p2.createCollisionGroup();

                this.game.playerCollisionGroup = playerCollisionGroup;
                this.game.solidCollisionGroup = solidCollisionGroup;
                this.game.quizCollisionGroup = quizCollisionGroup;
                this.game.achivementllisionGroup = achivementllisionGroup;

                this.physics.p2.updateBoundsCollisionGroup();
                var worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');

                //  4 trues = the 4 faces of the world in left, right, top, bottom order
                this.game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);
                //

                let playerCGroups = [solidCollisionGroup, quizCollisionGroup, achivementllisionGroup];
                this.player = new __WEBPACK_IMPORTED_MODULE_0__Player_js__["a" /* default */](this.game, 250, this.game.world.centerY, playerCollisionGroup, playerCGroups);
                this.player.body.collides([solidCollisionGroup], () => {
                        this.gameOver(false);
                }, this);
                this.player.body.collides([quizCollisionGroup]);
                this.player.body.collides([achivementllisionGroup]);

                this.player.body.collideWorldBounds = true;
                this.player.body.onBeginContact.add((a, b, c, d, e) => {
                        // console.log(b,e[0].normalA);
                        if (!a /*&& b == this.player.body*/ && e[0].normalA[0] === 0) {
                                this.gameOver();
                        }
                });
                this.camera.follow(this.player);

                this.pipeEmitter = new __WEBPACK_IMPORTED_MODULE_1__PipeEmitter__["a" /* default */](this.game, solidCollisionGroup, quizCollisionGroup);
                this.pipeEmitter.spawn();

                this.game.physics.p2.setPostBroadphaseCallback(checkVeg, this);

                function checkVeg(a, b, c) {

                        if (a.sprite.type == "quiz" || b.sprite.type == "quiz") {
                                let q = a.sprite.type == "quiz" ? a.sprite : b.sprite;

                                if (q.verify && !q.colledted) {
                                        this.collectAnswer(q);
                                } else if (!q.verify) {
                                        this.wrongAnswer();
                                }

                                return false;
                        }

                        if (a.sprite.type == "calc" || b.sprite.type == "calc") {
                                let q = a.sprite.type == "calc" ? a.sprite : b.sprite;
                                this.collectCalc(q);
                                return false;
                        }

                        return true;
                }
        },
        collectAnswer(a) {
                this.game.winSound.play();
                a.collected();
                this.scoreText.setText(++this.score);
        },

        collectCalc(a) {
                a.kill();
                this.game.calcActive += 3;
        },

        wrongAnswer() {

                this.gameOver(true);
        },

        gameOver(wrong) {
                this.game.gameOver.dispatch({ wrong: !!wrong });
                this.game.worldSpeed = 0;
                this.game.worldSpeedPrev = 0;
                if (!this.game.isGameOver) {
                        this.game.bgSound.stop();
                        this.saveScore();
                        this.game.time.events.add(Phaser.Timer.SECOND * 0.4, this.showGameOverPopUp, this);
                }
                this.game.isGameOver = true;
        },

        saveScore() {
                if (!this.score) return;
                this.game.scoreAPI.saveScore(this.game.userName, this.score);
        },

        update: function () {
                this.clouds.tilePosition.x -= 0.45 * this.game.worldSpeed;
                this.mountainsMid1.tilePosition.x -= 0.65 * this.game.worldSpeed;
                this.mountainsMid2.tilePosition.x -= 0.3 * this.game.worldSpeed;

                let top = this.game.pipeGroup.getTop();

                if (top && top.x && top.x < this.game.world.centerX) {
                        this.pipeEmitter.spawn();
                }

                if (this.slowMoBar.value == 0) {
                        this.slowMoStop();
                }

                if (this.game.calcActive > 0) {
                        this.calc.alpha = 1;
                } else {
                        this.calc.alpha = 0.3;
                }

                this.calcCnt.setText('x' + this.game.calcActive);
        },

        slowMoStart() {
                if (this.game.isGameOver) return;

                this.game.slomoActive = true;
                // this.game.time.slowMotion = 2;
                this.physics.p2.frameRate = this.physicsFrameRate / 7;

                this.game.worldSpeed /= 5;
        },

        slowMoStop() {
                this.game.slomoActive = false;
                // this.game.time.slowMotion = 1;
                this.physics.p2.frameRate = this.physicsFrameRate;
                this.game.worldSpeed = this.game.worldSpeedPrev;
        },

        showGameOverPopUp() {
                this.popUp.visible = true;
                this.popUp.y = -this.game.cache.getImage('popup').height - 30;

                this.scoreTextPopUp.setText(this.scoreTextPopUp.textPattern + this.score);
                if (this.score > this.game.bestScore) {
                        if (this.game.bestScore !== 0) {
                                this.newRecord = true;
                        }

                        this.game.bestScore = this.score;
                }
                this.bestScoreTextPopUp.setText(this.bestScoreTextPopUp.textPattern + this.game.bestScore);

                let t = this.game.add.tween(this.popUp).to({ y: this.popUp.fixedY }, 1000, Phaser.Easing.Elastic.Out, true);
                t.onComplete.add(() => {
                        if (this.newRecord) {
                                this.newRecordAnim();
                        }

                        this.playButton.visible = true;
                        this.leadesButton.visible = true;
                });
        },

        newRecordAnim() {
                var recordText = this.game.add.text(game.world.centerX, game.world.height, 'new record!', {
                        font: "50px MyWebFont2",
                        fill: "#ffffff",
                        stroke: "#96929b",
                        strokeThickness: 5
                });

                let t = this.game.add.tween(recordText).to({ y: 200 }, 1000, Phaser.Easing.Linear.None, true);

                this.createRecordEmitter(recordText);
                recordText.anchor.set(0.5);
        },

        createRecordEmitter(t) {
                var emitter = game.add.emitter(game.world.centerX, game.world.height, 100);

                this.game.recordSound.play();
                emitter = emitter.makeParticles(['pipe_center_1', 'pipe_center_2', 'pipe_center_3', 'pipe_center_4', 'pipe_center_5']);

                emitter.minParticleSpeed.setTo(-200, -300);
                emitter.maxParticleSpeed.setTo(200, -500);
                emitter.minParticleScale = 0.2;
                emitter.maxParticleScale = 1;
                emitter.gravity = 200;
                emitter.start(false, 20000, 1);
                emitter.width = 300;

                //  And 2 seconds later we'll destroy the emitter
                this.game.time.events.add(6000, () => {
                        emitter.destroy();
                        emitter.alive = false;
                        t.destroy();
                        this.game.recordSound.stop();
                }, this);

                window.emitter = emitter;
        },

        render() {
                this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
        }
};

/* harmony default export */ __webpack_exports__["a"] = (playState);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var ready = false;
function loadComplete() {
        ready = true;
}

var Preloader = {
        preload: function () {

                this.preloadBar = this.add.sprite(10, 30, 'preloadbar');
                this.preloadBar.anchor.set(0.5);
                this.preloadBar.x = this.world.centerX;
                this.preloadBar.y = this.world.centerY;
                this.load.setPreloadSprite(this.preloadBar);
                this.load.image('logo', 'assets/logo.png');
                this.load.image('back', 'assets/back.jpg');
                this.load.image('box', 'assets/box.png');
                this.load.image('cloud', 'assets/cloud.png');
                this.load.image('ground', 'assets/ground.png');

                // configs
                this.load.json('physics', 'configs/physicsConfig.json');
                this.load.physics("sprite_physics", "assets/polygons.json");

                this.load.spritesheet("bird", "assets/bird-sprite.png", 183, 168.3, 13);

                this.game.load.image('clouds', 'assets/clouds.png');
                this.game.load.image('mountains-mid1', 'assets/mountains-mid1.png');
                this.game.load.image('mountains-mid2', 'assets/mountains-mid2.png');

                //pipeCenter
                this.load.image('pipe_center_1', 'assets/pipes/let_centr_1.png');
                this.load.image('pipe_center_2', 'assets/pipes/let_centr_2.png');
                this.load.image('pipe_center_3', 'assets/pipes/let_centr_3.png');
                this.load.image('pipe_center_4', 'assets/pipes/let_centr_4.png');
                this.load.image('pipe_center_5', 'assets/pipes/let_centr_5.png');

                //pipeUp
                this.load.image('pipe_up_1', 'assets/pipes/let_up_1.png');
                this.load.image('pipe_up_2', 'assets/pipes/let_up_2.png');
                this.load.image('pipe_up_3', 'assets/pipes/let_up_3.png');
                this.load.image('pipe_up_4', 'assets/pipes/let_up_4.png');
                this.load.image('pipe_up_5', 'assets/pipes/let_up_5.png');

                //pipeDown
                this.load.image('pipe_down_1', 'assets/pipes/let_down_1.png');
                this.load.image('pipe_down_2', 'assets/pipes/let_down_2.png');
                this.load.image('pipe_down_3', 'assets/pipes/let_down_3.png');
                this.load.image('pipe_down_4', 'assets/pipes/let_down_4.png');
                this.load.image('pipe_down_5', 'assets/pipes/let_down_5.png');

                this.load.image('partikl', 'assets/pipes/partikl.png');

                //quiz
                this.load.image('portal', 'assets/pipes/portal.png');
                this.load.image('portal_gow', 'assets/pipes/portal_gow.png');

                //player
                this.load.atlas('player', 'assets/player/player.png', 'assets/player/player.json');

                //UI
                this.load.image('calcul', 'assets/ui/calcul.png');
                this.load.image('bar_2', 'assets/ui/bar_2.png');
                this.load.image('bar', 'assets/ui/bar.jpg');
                this.load.image('popup', 'assets/ui/popap.png');
                this.load.image('cubok_pres', 'assets/ui/cubok_pres.png');
                this.load.image('play', 'assets/ui/play_pres.png');
                this.load.image('back_press', 'assets/ui/back_press.png');
                this.load.image('loodscrin', 'assets/ui/loodscrin.png');

                //sound

                this.load.audio('bg', 'assets/sound/bg.mp3');
                this.load.audio('fly', 'assets/sound/fly.mp3');
                this.load.audio('jump', 'assets/sound/jump.wav');
                this.load.audio('record', 'assets/sound/record.mp3');
                this.load.audio('win', 'assets/sound/win.mp3');
                this.load.audio('lose', 'assets/sound/loose.mp3');

                //user pic
                this.load.image('avatar', 'https://pp.userapi.com/c623823/v623823433/52688/WmkTpKfgNOI.jpg');

                this.load.onLoadComplete.add(loadComplete, this);
        },

        create: function () {},
        update: function () {
                if (ready) {
                        this.state.start('intro');
                }
        }
};

/* harmony default export */ __webpack_exports__["a"] = (Preloader);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ExpresionGenerator {
    constructor(generator) {
        this.rnd = generator;
        this.tick = 1;
        this.max = {
            1: 10,
            2: 10,
            3: 10
        };
    }

    getExp(verify) {

        this.tick++;

        let options = ['simplePlus'];

        if (this.tick > 3) {
            options.push('simpleMinus');
        }

        if (this.tick > 10) {
            options.push('simpleMmultiply');
        }

        if (this.tick > 13) {
            options.push('simpleDiv');
        }

        let option = options[this.rnd.between(0, options.length - 1)];

        return this[option](verify);
    }

    simplePlus(verify) {

        if (this.tick > 3 && verify) {
            this.max[1] = this.max[1] + 1;
        }

        let max = this.max[1];
        let first = this.rnd.between(0, max - 1),
            second = this.rnd.between(0, max - first);

        if (second == 0 && first == 0) {
            second++;
        }

        let result = verify ? first + second : this.rnd.between(1, max);
        if (!verify && result == first + second) {
            result++;
        }

        return `${first} + ${second} = ${result}`;
    }

    simpleMinus(verify) {

        if (this.tick > 6 && verify) {
            this.max[2] = this.max[2] + 1;
        }

        let max = this.max[2];
        let first = this.rnd.between(1, max - 1),
            second = this.rnd.between(0, max - first);

        if (second == 0 && first == 0) {
            first++;
        }

        if (second > first) {
            first = second + 2;
        }

        let result = verify ? first - second : this.rnd.between(1, max);
        if (!verify && result == first - second) {
            result++;
        }

        return `${first} - ${second} = ${result}`;
    }

    simpleMmultiply(verify) {
        let max = this.max[3];
        let first = this.rnd.between(1, max),
            second = this.rnd.between(1, max);

        let result = verify ? first * second : this.rnd.between(1, max);
        if (!verify && result == first * second) {
            result++;
        }
        return `${first} x ${second} = ${result}`;
    }

    simpleDiv(verify) {
        let max = this.max[3];
        let first = this.rnd.between(1, max),
            second = this.rnd.between(1, max);

        let result = verify ? first * second : this.rnd.between(1, max);
        if (!verify && result == first * second) {
            result++;
        }
        return `${result} / ${second} = ${first}`;
    }

}

/* harmony default export */ __webpack_exports__["a"] = (ExpresionGenerator);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class PipeEmitter {

    constructor(game) {
        this.game = game;
    }
    spawn() {
        // debugger;
        const worldHeight = this.game.world.height,
              height = 120,
              //this.game.rnd.between(worldHeight * 0.1,worldHeight * 0.35 ),
        gap = 50,
              x = this.game.world.right,
              verify = !!this.game.rnd.between(0, 1);
        this.game.pipeGroup.add(new PipeBox(this.game, x, 1));
        this.game.pipeGroup.add(new QuizCloud(this.game, x, 1, verify));
        this.game.pipeGroup.add(new PipeBox(this.game, x, 2));
        this.game.pipeGroup.add(new QuizCloud(this.game, x, 2, !verify));
        this.game.pipeGroup.add(new PipeBox(this.game, x, 3));

        if (this.game.toNextCalacSpawn == 0) {
            this.game.pipeGroup.add(new CalcAchive(this.game, x, 3));
            this.game.toNextCalacSpawn = this.game.rnd.between(10, 12);
        } else {
            this.game.toNextCalacSpawn--;
        }
    }
}

class PipeBox extends Phaser.Sprite {

    constructor(game, x, align) {
        //align 1-up, 2-center, 3 - bottom

        const prefixes = {
            1: "up",
            2: "center",
            3: "down"
        };

        const polygons = {
            1: "let_up_1",
            2: "let_centr_1",
            3: "let_down_1"
        };

        const rand = game.rnd.between(1, 5),
              textureName = `pipe_${prefixes[align]}_${rand}`,
              textureHeight = game.cache.getImage(textureName).height;

        const positions = {
            1: 0,
            2: game.world.centerY - 10,
            3: game.world.height - textureHeight
        };

        const y = positions[align];

        let phys = game.cache.getJSON('physics').pipe,
            CGrroup = game.solidCollisionGroup;

        super(game, x, y, textureName);
        this.align = align;
        game.physics.p2.enable(this, false);
        this.body.static = true;

        this.body.x += 161 * this.anchor.x;

        this.body.y += textureHeight * this.anchor.y;
        this.body.velocity.x = phys.speed * game.worldSpeedPrev;
        this.body.clearShapes();
        this.body.loadPolygon("sprite_physics", polygons[align]);
        this.body.setCollisionGroup(CGrroup);

        this.body.collides([game.playerCollisionGroup]);
        this.checkWorldBounds = true;
        this.game.gameOver.add(o => {
            if (!this.alive) return;

            game.add.tween(this.body.velocity).to({ x: 0 }, 1000, Phaser.Easing.Linear.None, true);
        });

        this.events.onOutOfBounds.add(this.dead, this);
    }

    dead(d) {
        if (d.body.x > 0) {
            return;
        }
        this.kill();
        this.destroy();
    }
}

class QuizCloud extends Phaser.Sprite {
    constructor(game, x, align, verify) {

        x += 67;
        const positions = {
            1: 90,
            2: 320
        };
        const y = positions[align];
        super(game, x, y, 'portal');
        // this.game.physics.p2.enable(this, true);
        // this.body.static = true;

        this.type = "quiz";
        this.verify = verify;
        this.colledted = false;

        if (this.game.calcActive > 0 && this.verify) {
            this.game.calcActive--;
            this.highlited = true;
        }

        let phys = this.game.cache.getJSON('physics').pipe;
        let CGrroup = game.quizCollisionGroup;
        let text = game.expresionGenerator.getExp(verify);
        let textEl = new Phaser.Text(game, 30, 0, text, { fill: "#fff", stroke: "#f44242", strokeThickness: 4 });

        game.physics.p2.enable(this, false);
        // this.body.static = true;
        this.body.immovable = true;
        this.body.kinematic = true;
        this.body.mass = 0;
        this.body.x += this.width * this.anchor.x;
        this.body.y += this.height * this.anchor.y;
        this.body.velocity.x = phys.speed * game.worldSpeedPrev;
        this.body.setCollisionGroup(CGrroup);
        this.body.collides([game.playerCollisionGroup]);
        this.checkWorldBounds = true;
        this.game.gameOver.add(o => {
            if (!this.alive) return;

            game.add.tween(this.body.velocity).to({ x: 0 }, 1000, Phaser.Easing.Linear.None, true);
        });

        this.events.onOutOfBounds.add(this.dead, this);
        this.addChild(textEl);
        this.textEl = textEl;
        let g = new Phaser.Sprite(game, -175, -86, "portal_gow");
        g.alpha = 0.5;
        this.addChildAt(g, 0);

        this.glowSprite = g;

        if (this.highlited) {
            let t = game.add.tween(this).to({ alpha: 0.3 }, 500, "Linear", true, 0, -1);
            t.yoyo(true, 0);

            t = game.add.tween(this.glowSprite).to({ alpha: 0.3 }, 500, "Linear", true, 0, -1);
            t.yoyo(true, 0);
        }
        var emitter = this.game.add.emitter(x, y + 100, 100);
        emitter.makeParticles(['partikl']);

        emitter.height = 200;
        emitter.minParticleSpeed.setTo(-300, 0);
        emitter.maxParticleSpeed.setTo(-400, 0);
        emitter.minParticleScale = 0.5;
        emitter.maxParticleScale = 1;
        emitter.setAlpha(0.5, 1);
        this.emitter = emitter;
        emitter.flow(500, 500, 5, -1);
    }

    collected() {
        this.colledted = true;
        // debugger;
        if (!this.highlited) {
            var t = game.add.tween(this.glowSprite).to({ alpha: 1 }, 200, "Linear", true, 0, -1);
            t.yoyo(true, 0);
        }

        this.game.add.tween(this.textEl).to({ y: -500 }, 1000, Phaser.Easing.Linear.None, true);

        // this.glowSprite.alpha = 1;
    }

    update(d) {
        this.emitter.x = this.x;
        if (this.highlited) {
            this.tint = 0xf44242;
            this.glowSprite.tint = 0xf44242;
        }
    }
    dead(d) {
        if (d.body.x > 0) {
            return;
        }

        this.emitter.destroy();
        this.kill();
        this.destroy();
    }
}

class CalcAchive extends Phaser.Sprite {
    constructor(game, x) {
        super(game, x + game.rnd.between(200, 350), game.rnd.between(150, game.height - 150), 'calcul');

        let phys = this.game.cache.getJSON('physics').pipe;

        let CGrroup = this.game.achivementllisionGroup;
        game.physics.p2.enable(this, false);

        this.type = 'calc';
        this.body.immovable = true;
        this.body.kinematic = true;
        this.body.mass = 0;
        this.body.x += this.width * this.anchor.x;
        this.body.y += this.height * this.anchor.y;
        this.body.velocity.x = phys.speed * game.worldSpeedPrev;
        this.body.setCollisionGroup(CGrroup);
        this.body.collides([game.playerCollisionGroup]);
        this.game.gameOver.add(o => {
            if (!this.alive) return;
            game.add.tween(this.body.velocity).to({ x: 0 }, 1000, Phaser.Easing.Linear.None, true);
        });

        this.events.onOutOfBounds.add(this.dead, this);
    }

    update(d) {
        if (this.highlited) {
            this.tint = 0xf44242;
            this.glowSprite.tint = 0xf44242;
        }
    }

    dead(d) {
        if (d.body.x > 0) {
            return;
        }

        this.emitter.destroy();
        this.kill();
        this.destroy();
    }
}

/* harmony default export */ __webpack_exports__["a"] = (PipeEmitter);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Player extends Phaser.Sprite {
    constructor(game, x, y, cGroup) {

        super(game, x, y, 'player');
        let phys = this.game.cache.getJSON('physics').player;
        this.speed = phys.startSped || 300;
        this.acceleration = phys.acceleration || 2;
        this.accelerationTotalTime = phys.accelerationTotalTime || 100;

        // this.frameName = "mob_1.png";
        // this.scale.setTo(0.5);

        //  Enable if for physics. This creates a default rectangular body.
        this.scale.set(0.75);
        this.game.physics.p2.enable(this, false);
        this.body.fixedRotation = true;
        this.body.setCircle(40 * 0.74, 0, -20 * 0.75);
        this.body.setCollisionGroup(cGroup);
        this.game.add.existing(this);

        this.game.gameOver.add(o => {
            this.dead(!!o.wrong);
        });

        this.body.allowSleep = true;
        this.cGroup = cGroup;

        this.game.input.onDown.add(() => {
            if (this.alive) {
                this.game.jumpSound.play();
            }
        });
    }

    moveUp(speed = this.speed) {
        this.body.moveUp(speed);
    }

    update() {
        if (!this.alive) return;

        this.frameName = "mob_1.png";
        const d = this.game.input.activePointer.duration;

        if (this.rotation > 0) {
            this.rotation = 0;
        }

        if (this.rotation < 0) {
            this.rotation += 0.05;
        }

        if (this.game.input.activePointer.isDown && d <= this.accelerationTotalTime) {
            this.frameName = "mob_2.png";
            this.moveUp(this.speed + d * this.acceleration);
            if (this.rotation < -0.261799) {
                this.rotation -= 0.05;
            } else {
                this.rotation = -0.26179;
            }
            this.game.physics.p2.world.sleepMode = 2; // this.game.physics.p2.world.BODY_SLEEPING
        }

        this.body.immovable = true;
    }

    dead(wrong) {
        if (this.alive) {
            this.game.loseSound.play();
            this.rotation = -1.5708;
            if (wrong) {
                this.body.fixedRotation = false;
                this.frameName = `vegetable_${this.game.rnd.between(1, 9)}.png`;
                this.body.clearShapes();
                this.body.setCircle(30 * 0.75, 0, 0);
                this.body.setCollisionGroup(this.cGroup);
            }
        }

        this.alive = false;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__states_Boot__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__states_Preloader__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__states_Intro__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__states_Leaders__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__states_Play__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__states_Menu__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_api__ = __webpack_require__(0);








var game;
window.addEventListener("load", function () {

    // var userName = getJsonFromUrl().user || 'Data guest';
    game = new Phaser.Game(1024, 576, Phaser.CANVAS, '', {}, true);
    game.scoreAPI = new __WEBPACK_IMPORTED_MODULE_6__api_api__["a" /* default */]();
    // game.userName = userName;
    game.state.add("boot", __WEBPACK_IMPORTED_MODULE_0__states_Boot__["a" /* default */]);
    game.state.add("preloader", __WEBPACK_IMPORTED_MODULE_1__states_Preloader__["a" /* default */]);
    game.state.add("intro", __WEBPACK_IMPORTED_MODULE_2__states_Intro__["a" /* default */]);
    game.state.add("play", __WEBPACK_IMPORTED_MODULE_4__states_Play__["a" /* default */]);
    game.state.add("leaders", __WEBPACK_IMPORTED_MODULE_3__states_Leaders__["a" /* default */]);
    game.state.add("menu", __WEBPACK_IMPORTED_MODULE_5__states_Menu__["a" /* default */]);

    game.bestScore = 0;

    /*VK.init(function (a, b, c) {
        // API initialization succeeded
        // Your code here
        console.log('vk loaded', a, b, c);
        // VK.callMethod("showInstallBox");

        VK.api("users.get", { "name_case": "Nom" }, function (data) {
            console.log(data);

            game.userName = data.response[0].last_name + ' ' + data.response[0].first_name;

            game.scoreAPI.getUserRank(game.userName, result => {
                var score = result.scores.score;
                game.bestScore = score.value;
            });
        });

        game.state.start("boot");
    }, function () {
        // API initialization failed
        // Can reload page here
        console.log('VK fail');
    }, '5.63');
    //*/
 game.state.start("boot");
    //https://pp.userapi.com/c623823/v623823433/52688/WmkTpKfgNOI.jpg
});

function getJsonFromUrl() {
    var query = location.search.substr(1);
    var result = {};
    query.split("&").forEach(function (part) {
        var item = part.split("=");
        result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ProgressBar extends Phaser.Group {
    constructor(game) {
        super(game);
        this.bg = this.add(game.make.sprite(0, 0, 'bar_2'));
        let w = this.game.cache.getImage('bar').width;
        let h = this.game.cache.getImage('bar').height;
        this.bar = this.add(game.make.tileSprite(40, 22, w, h, 'bar'));

        this.bar_length = w;

        this.value = 50;
        this.setValue(this.value);
        this.started = false;
    }

    setValue(val) {
        if (val < 0) {
            val = 0;
        }

        if (val > 100) {
            val = 100;
        }

        this.value = val;

        var w = val * this.bar_length / 100;
        if (w == 0) {
            w = 0.1;
        }

        this.bar.width = w;
    }

    update() {
        if (!this.started) return;
        if (this.game.slomoActive) {
            this.setValue(this.value - 0.4);
        } else if (!this.game.isGameOver) {
            this.setValue(this.value + 0.08);
        }
    }

    start() {
        this.started = true;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (ProgressBar);

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map
