
class Player extends Phaser.Sprite{
    constructor(game,x,y,cGroup){

        super(game, x, y,'player');
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
        this.body.setCircle(40 * 0.74, 0,-20 * 0.75);
        this.body.setCollisionGroup(cGroup);
        this.game.add.existing(this);

        this.game.gameOver.add(( o )=>{
            this.dead(!!o.wrong);

        });

        this.body.allowSleep = true;
        this.cGroup = cGroup;

        this.game.input.onDown.add(()=>{
            if (this.alive)
            {
                this.game.jumpSound.play()
            }


        });
    }

    moveUp(speed = this.speed){
        this.body.moveUp(speed);
    }

    update(){
        if (!this.alive) return;

        this.frameName = "mob_1.png";
        const d = this.game.input.activePointer.duration;

        if (this.rotation > 0) {
            this.rotation = 0;
        }

        if (this.rotation<0)
        {
            this.rotation += 0.05;
        }

        if (this.game.input.activePointer.isDown && d<=this.accelerationTotalTime)
        {
            this.frameName = "mob_2.png";
            this.moveUp(this.speed + (d * this.acceleration));
            if (this.rotation < -0.261799)
            {
                this.rotation -= 0.05;
            } else
            {
                this.rotation = -0.26179;
            }
            this.game.physics.p2.world.sleepMode = 2;// this.game.physics.p2.world.BODY_SLEEPING
        }

        this.body.immovable = true;

    }


    dead(wrong){
        if (this.alive)
        {
            this.game.loseSound.play();
            this.rotation = -1.5708;
            if (wrong)
            {
                this.body.fixedRotation = false;
                this.frameName = `vegetable_${this.game.rnd.between(1,9)}.png`;
                this.body.clearShapes();
                this.body.setCircle(30 * 0.75, 0,0);
                this.body.setCollisionGroup(this.cGroup);
            }
        }

        this.alive = false;

    }
}

export default Player;