var ready = false;
function loadComplete(){
    ready = true;
}

var Preloader = {
    preload: function(){


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

    create : function(){

    },
    update : function () {
        if (ready)
        {
            this.state.start('intro');
        }
    }
};

export default Preloader;