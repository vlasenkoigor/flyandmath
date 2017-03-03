/**
 * Created by Ivlasenko on 2/7/2017.
 */
var introState =
{
    preload : function() {
        this.game.load.json('tangram', 'assets/tangram.json');
        this.game.load.image('logo', 'assets/logo.png');
    },
    create : function() {

        var tangram = [];
        var logo;
        var game = this.game;

        var colors = [
            0xf6921e,
            0x005aa9,
            0xd7172f,
            0xb1d249,
            0xf5d944,
            0x8c2b85,
            0x00bedf5
        ];

        var tangramPoints = game.cache.getJSON('tangram').datalogo;

        var group = game.add.group();
            group.x = 300;
            group.y = 50;
        for (var i = 0 ;i<tangramPoints.length; i++){
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
            t.x += game.rnd.integerInRange(-1000,1000);
            t.y += game.rnd.integerInRange(-1000,1000);
            t.alpha =0; game.rnd.frac();
            // t.scale.set(game.rnd.normal());
            lastTween = game.add.tween(t).to({x:0, y :0, alpha : 1}, 2000,Phaser.Easing.Elastic.Out, true);
        });

        logo = game.make.sprite(0,0, "logo");
        logo.scale.set(0.1);
        logo.x = 40;
        logo.y = 420;
        group.add(logo);
        logo.alpha = 0;
        var logoTween = game.add.tween(logo).to({alpha  : 1}, 700,Phaser.Easing.Exponential.In, false);
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
    render: function () {
    }
};

export default introState;