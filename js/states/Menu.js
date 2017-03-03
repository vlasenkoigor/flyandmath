/**
 * Created by Ivlasenko on 2/18/2017.
 */

var menuState =
{
    create: function () {
        this.game.add.sprite(0, 0, 'back');

        this.clicked = false;
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

        let h = this.game.cache.getImage('popup').height
        let w = this.game.cache.getImage('popup').width;
        this.popUp = this.game.add.group();
        this.popUp.fixedX = this.game.world.centerX - w/2;
        this.popUp.fixedY = this.game.world.centerY - h/2;
        this.popUp.x = this.popUp.fixedX;
        this.popUp.y = this.popUp.fixedY;


        this.label = this.game.make.text(w/2, -20, 'Fly&Math' ,{
            font : "63px MyWebFont2",
            fill : "#ffffff",
            stroke : "#96929b",
            strokeThickness : 5
        });

        this.label.anchor.set(0.5);

        this.popUp.addChild(this.label);

             this.playButton = this.game.add.button(this.popUp.fixedX + 90, h + 130, 'play', ()=>{
                 if (this.clicked) return;
                 this.clicked = true;
                 this.game.add.audio('fly').play();
                 let t = this.game.add.tween(this.dude).to( { x : this.game.world.width + 200 }, 1500, Phaser.Easing.Elastic.In, true);
                 t.onComplete.add(()=>{
                     this.state.start('play');
                 })

        }, this,);

        this.leadesButton = this.game.add.button(this.popUp.fixedX + w - 190, h + 130, 'cubok_pres', ()=>{
            if (this.clicked) return;
            this.clicked = true;
            this.state.start('leaders');
        }, this,);

        this.dude = this.game.add.sprite(-100, this.game.world.centerY, "loodscrin");
        this.dude.anchor.set(0.5);

        this.game.add.audio('fly').play();
        let t = this.game.add.tween(this.dude).to( { x : this.game.world.centerX }, 2000, Phaser.Easing.Elastic.Out, true);
            t.onComplete.add(()=>{
        })

    },

    update(){
        this.clouds.tilePosition.x -= 0.7;
    }
};
export default menuState;