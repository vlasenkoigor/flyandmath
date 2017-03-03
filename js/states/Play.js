import Player from "./../Player.js"
import PipeEmitter from "./../PipeEmitter";
import ExpresionGenerator from './../ExpresionGenerator';
import ProgressBar from './../ui/ProgressBar'

var playState = {
    preload: function(){
        this.time.advancedTiming = true;
    },
    create: function(){
        this.game.time.slowMotion = 1;
        window.game = this.game;

        this.started = false;
        this.game.expresionGenerator = new ExpresionGenerator(this.game.rnd);
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


        this.game.add.sprite(0,0,'back');


        this.clouds = this.game.add.tileSprite(0,
            70,
            this.game.width,
            this.game.cache.getImage('clouds').height,
            'clouds'
        );
        this.mountainsMid2 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('mountains-mid2').height,
            this.game.width,
            this.game.cache.getImage('mountains-mid2').height,
            'mountains-mid2'
        );

        this.mountainsMid1 = this.game.add.tileSprite(0,
            this.game.height - this.game.cache.getImage('mountains-mid1').height,
            this.game.width,
            this.game.cache.getImage('mountains-mid1').height,
            'mountains-mid1'
        );

        this.playerMock = this.game.add.sprite(250, this.game.world.centerY-12,'player', 'mob_2.png');
        this.playerMock.anchor.set(0.5);
        this.playerMock.scale.set(0.75);
        this.playerMock.tweenYoYo = this.game.add.tween(this.playerMock).to( { y: this.game.world.centerY+12 }, 400, "Linear", true, 0, -1);
        this.playerMock.tweenYoYo.yoyo(true, 0);

        this.game.pipeGroup = this.add.group();


        // this.time.events.loop(Phaser.Timer.SECOND * 7 / this.game.worldSpeed, this.pipeEmitter.spawn, this.pipeEmitter);


        this.builUI();

        this.slomoKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.game.input.onDown.add(()=>{
            if (!this.started)
            {
                this.start();
            }
        });
        this.slomoKey.onDown.add((p)=>{
            if (!this.started)
            {
                this.start();

            }
            this.slowMoStart();
        });


        this.slomoKey.onUp.add((p)=>{
            this.slowMoStop();
        });

        // this.newRecordAnim();
    },

    builUI(){
        this.calc = this.game.add.sprite(80,70,'calcul');
        this.calc.anchor.set(0.7);
        this.calc.scale.set(0.7);
        this.calcCnt = this.game.add.text(80,60,'x'+this.game.calcActive, {
            font : "30px MyWebFont2",
            fill : "#ffffff",
            stroke : "#96929b",
            strokeThickness : 2
        });

        this.slowMoBar = new ProgressBar(this.game);
        this.slowMoBar.y = this.world.height - 70;
        this.slowMoBar.x = 20;

        this.scoreText = this.game.add.text(game.world.centerX, 40, ''+this.score ,{
            font : "50px MyWebFont2",
            fill : "#ffffff",
            stroke : "#96929b",
            strokeThickness : 5
        });
        this.scoreText.anchor.set(0.5);

        //create win popup

        let h = this.game.cache.getImage('popup').height
        let w = this.game.cache.getImage('popup').width;
        this.popUp = this.game.add.group();
        this.popUp.fixedX = this.game.world.centerX - w/2;
        this.popUp.fixedY = this.game.world.centerY - h/2;

        this.popUp.x = this.popUp.fixedX;
        this.popUp.y = this.popUp.fixedY;

        this.popUp.create(0,0,'popup');

        let cup = this.popUp.create(0,0,'cubok_pres');

        cup.anchor.set(0.5);
        cup.x = w/2;
        cup.y = h/2 + 50;
        cup.alpha = 0.5;

        this.scoreTextPopUp = this.game.make.text(w/2, h/2, 'Your score : 1200' ,{
            font : "33px MyWebFont2",
            fill : "#ffffff",
            stroke : "#96929b",
            strokeThickness : 5
        });
        this.scoreTextPopUp.textPattern = 'Your score : ';

        this.scoreTextPopUp.anchor.set(0.5);

        this.bestScoreTextPopUp = this.game.make.text(w/2, h/2 + 70, 'Best score : 1200' ,{
            font : "33px MyWebFont2",
            fill : "#ffffff",
            stroke : "#96929b",
            strokeThickness : 5
        });

        this.bestScoreTextPopUp.textPattern = 'Best score : ';
        this.bestScoreTextPopUp.anchor.set(0.5);

        this.popUp.addChild(this.scoreTextPopUp);
        this.popUp.addChild(this.bestScoreTextPopUp);

        this.playButton = game.add.button(this.popUp.fixedX + 90, h + 130, 'play', ()=>{
            this.state.restart(true);
        }, this,);

        this.leadesButton = game.add.button(this.popUp.fixedX + w - 190, h + 130, 'cubok_pres', ()=>{
            this.state.start('leaders');
        }, this,);

        this.playButton.visible = false;
        this.leadesButton.visible = false;


        this.popUp.visible = false;

        this.tutorialText = this.game.add.text(game.world.centerX, game.world.centerY + 100,
            "click to fly\n hold spacebar for slowmo\nuse your brain to think" ,{
            font : "30px MyWebFont2",
            fill : "#ffffff",
            stroke : "#96929b",
            strokeThickness : 5,
            align : 'center'
        });

        this.tutorialText.anchor.set(0.5);

        this.game.bgSound = game.add.audio('bg');
        this.game.bgSound.loopFull();
        this.game.jumpSound = game.add.audio('jump');
        this.game.winSound = game.add.audio('win');
        this.game.loseSound = game.add.audio('lose');
        this.game.recordSound = game.add.audio('record');
    },


    start(){
        this.started = true;
        this.slowMoBar.start();

        this.tutorialText.destroy();
        this.playerMock.tweenYoYo.stop();
        this.playerMock.destroy();


        this.physics.startSystem(Phaser.Physics.P2JS);

        this.physicsFrameRate = this.physics.p2.frameRate;

        this.game.physics.p2.setImpactEvents(true);


        this.physics.p2.gravity.y = this.gravity ;
        this.physics.p2.world.defaultContactMaterial.friction = 0;
        this.physics.p2.world.setGlobalStiffness(1e9);
        this.physics.p2.world.setGlobalRelaxation(1.9);


        var playerCollisionGroup    = this.physics.p2.createCollisionGroup();
        var solidCollisionGroup     = this.physics.p2.createCollisionGroup();
        var quizCollisionGroup      = this.physics.p2.createCollisionGroup();
        var achivementllisionGroup  = this.physics.p2.createCollisionGroup();

        this.game.playerCollisionGroup = playerCollisionGroup;
        this.game.solidCollisionGroup = solidCollisionGroup;
        this.game.quizCollisionGroup = quizCollisionGroup;
        this.game.achivementllisionGroup = achivementllisionGroup;

        this.physics.p2.updateBoundsCollisionGroup();
        var worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');

        //  4 trues = the 4 faces of the world in left, right, top, bottom order
        this.game.physics.p2.setWorldMaterial(worldMaterial, true, true, true, true);
        //

        let playerCGroups = [solidCollisionGroup,quizCollisionGroup,achivementllisionGroup];
        this.player = new Player(this.game, 250,this.game.world.centerY, playerCollisionGroup, playerCGroups);
        this.player.body.collides([solidCollisionGroup], ()=>{this.gameOver(false)}, this);
        this.player.body.collides([quizCollisionGroup]);
        this.player.body.collides([achivementllisionGroup]);

        this.player.body.collideWorldBounds = true;
        this.player.body.onBeginContact.add((a,b,c,d,e)=>{
            // console.log(b,e[0].normalA);
            if (!a /*&& b == this.player.body*/ && e[0].normalA[0] === 0){
                this.gameOver();
            }

        });
        this.camera.follow(this.player);


        this.pipeEmitter = new PipeEmitter(this.game, solidCollisionGroup,quizCollisionGroup);
        this.pipeEmitter.spawn();



        this.game.physics.p2.setPostBroadphaseCallback(checkVeg, this);

        function checkVeg(a, b, c) {


            if (a.sprite.type == "quiz" || b.sprite.type == "quiz")
            {
                let q = a.sprite.type == "quiz" ? a.sprite : b.sprite;

                if (q.verify && !q.colledted)
                {
                    this.collectAnswer(q);
                } else if (!q.verify){
                    this.wrongAnswer();
                }

                return false;
            }

            if (a.sprite.type == "calc" || b.sprite.type == "calc")
            {
                let q = a.sprite.type == "calc" ? a.sprite : b.sprite;
                this.collectCalc(q);
                return false;
            }

            return true;
        }


    },
    collectAnswer(a){
        this.game.winSound.play()
        a.collected();
        this.scoreText.setText(++this.score);
    },

    collectCalc(a){
        a.kill();
        this.game.calcActive+=3;
    },

    wrongAnswer(){

        this.gameOver(true)
    },

    gameOver(wrong){
        this.game.gameOver.dispatch({wrong : !!wrong});
        this.game.worldSpeed = 0;
        this.game.worldSpeedPrev = 0;
        if (!this.game.isGameOver)
        {
            this.game.bgSound.stop();
            this.saveScore();
            this.game.time.events.add(Phaser.Timer.SECOND * 0.4, this.showGameOverPopUp, this);
        }
        this.game.isGameOver = true;
    },

    saveScore()
    {
        if (!this.score) return;
        this.game.scoreAPI.saveScore(this.game.userName, this.score);
    },



    update: function(){
        this.clouds.tilePosition.x -= 0.45 * this.game.worldSpeed;
        this.mountainsMid1.tilePosition.x -= 0.65 * this.game.worldSpeed;
        this.mountainsMid2.tilePosition.x -= 0.3 * this.game.worldSpeed;

        let top = this.game.pipeGroup.getTop();

        if (top && top.x && top.x < this.game.world.centerX)
        {
            this.pipeEmitter.spawn();
        }

        if (this.slowMoBar.value == 0 )
        {
            this.slowMoStop()
        }

        if (this.game.calcActive > 0)
        {
            this.calc.alpha = 1;
        } else
        {
            this.calc.alpha = 0.3;
        }

        this.calcCnt.setText('x'+this.game.calcActive);
    },

    slowMoStart(){
        if (this.game.isGameOver) return;

      this.game.slomoActive = true;
      // this.game.time.slowMotion = 2;
      this.physics.p2.frameRate = this.physicsFrameRate/7;

      this.game.worldSpeed /=5;
    },

    slowMoStop(){
        this.game.slomoActive = false;
        // this.game.time.slowMotion = 1;
        this.physics.p2.frameRate = this.physicsFrameRate;
        this.game.worldSpeed = this.game.worldSpeedPrev;
    },


    showGameOverPopUp(){
        this.popUp.visible = true;
        this.popUp.y = - this.game.cache.getImage('popup').height - 30;

        this.scoreTextPopUp.setText(this.scoreTextPopUp.textPattern + this.score);
        if (this.score > this.game.bestScore)
        {
            if (this.game.bestScore !== 0)
            {
                this.newRecord = true;
            }

            this.game.bestScore = this.score;
        }
        this.bestScoreTextPopUp.setText(this.bestScoreTextPopUp.textPattern + this.game.bestScore);

        let t = this.game.add.tween(this.popUp).to( { y : this.popUp.fixedY }, 1000, Phaser.Easing.Elastic.Out, true);
        t.onComplete.add(()=>{
            if (this.newRecord)
            {
                this.newRecordAnim();
            }

            this.playButton.visible = true;
            this.leadesButton.visible = true;
        })
    },


    newRecordAnim(){
        var recordText = this.game.add.text(game.world.centerX, game.world.height, 'new record!' ,{
            font : "50px MyWebFont2",
            fill : "#ffffff",
            stroke : "#96929b",
            strokeThickness : 5
        });

        let t = this.game.add.tween(recordText).to( { y : 200 }, 1000, Phaser.Easing.Linear.None, true);


        this.createRecordEmitter(recordText);
        recordText.anchor.set(0.5);
    },

    createRecordEmitter(t){
        var emitter = game.add.emitter(game.world.centerX, game.world.height, 100);

        this.game.recordSound.play();
        emitter= emitter.makeParticles([
            'pipe_center_1',
            'pipe_center_2',
            'pipe_center_3',
            'pipe_center_4',
            'pipe_center_5',
        ]);

        emitter.minParticleSpeed.setTo(-200, -300);
        emitter.maxParticleSpeed.setTo(200, -500);
        emitter.minParticleScale = 0.2;
        emitter.maxParticleScale = 1;
        emitter.gravity = 200;
        emitter.start(false, 20000, 1);
        emitter.width = 300;

        //  And 2 seconds later we'll destroy the emitter
        this.game.time.events.add(6000, ()=>{
            emitter.destroy();
            emitter.alive = false;
            t.destroy();
            this.game.recordSound.stop();
        }, this);

        window.emitter = emitter;
    },

    render(){
        this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
    }
};


export default playState;
