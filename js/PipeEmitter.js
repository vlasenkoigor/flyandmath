
class PipeEmitter {

    constructor(game){
        this.game = game;

    }
    spawn(){
        // debugger;
        const worldHeight = this.game.world.height,
            height = 120,//this.game.rnd.between(worldHeight * 0.1,worldHeight * 0.35 ),
            gap = 50,
            x = this.game.world.right,
            verify = !!this.game.rnd.between(0,1);
        this.game.pipeGroup.add(new PipeBox(this.game,x, 1));
        this.game.pipeGroup.add(new QuizCloud(this.game, x, 1,verify));
        this.game.pipeGroup.add(new PipeBox(this.game, x, 2));
        this.game.pipeGroup.add(new QuizCloud(this.game, x, 2,!verify));
        this.game.pipeGroup.add(new PipeBox(this.game, x, 3));


        if (this.game.toNextCalacSpawn == 0)
        {
            this.game.pipeGroup.add(new CalcAchive(this.game, x, 3));
            this.game.toNextCalacSpawn = this.game.rnd.between(10, 12);
        } else {
            this.game.toNextCalacSpawn--;
        }
    }
}


class PipeBox extends Phaser.Sprite{

    constructor(game, x, align ){
       //align 1-up, 2-center, 3 - bottom

        const prefixes = {
            1 : "up",
            2 : "center",
            3 : "down",
        };

        const polygons = {
            1 : "let_up_1",
            2 : "let_centr_1",
            3 : "let_down_1",
        };

        const rand = game.rnd.between(1,5),
            textureName = `pipe_${prefixes[align]}_${rand}`,
            textureHeight = game.cache.getImage(textureName).height;

        const positions = {
            1 : 0,
            2 : game.world.centerY - 10,
            3 : game.world.height - textureHeight,
        };


        const y = positions[align];


        let phys = game.cache.getJSON('physics').pipe,
            CGrroup = game.solidCollisionGroup;


        super(game, x,y,textureName);
        this.align = align;
        game.physics.p2.enable(this, false);
        this.body.static = true;


        this.body.x += (161 * this.anchor.x);

        this.body.y += (textureHeight * this.anchor.y);
        this.body.velocity.x = phys.speed * game.worldSpeedPrev;
        this.body.clearShapes();
        this.body.loadPolygon("sprite_physics", polygons[align]);
        this.body.setCollisionGroup(CGrroup);

        this.body.collides([game.playerCollisionGroup]);
        this.checkWorldBounds = true;
        this.game.gameOver.add(( o ) =>{
            if (!this.alive) return;

            game.add.tween(this.body.velocity).to( { x: 0 }, 1000, Phaser.Easing.Linear.None, true);


        });

          this.events.onOutOfBounds.add(this.dead, this);

    }
    
    dead(d)
    {
        if (d.body.x > 0)
        {
            return
        }
        this.kill();
        this.destroy();
    }
}


class QuizCloud extends Phaser.Sprite{
    constructor(game, x ,align,verify){

        x += 67;
        const positions = {
            1 : 90,
            2 : 320,
        };
        const y = positions[align];
        super(game, x, y, 'portal');
        // this.game.physics.p2.enable(this, true);
        // this.body.static = true;

        this.type = "quiz";
        this.verify = verify;
        this.colledted = false;

        if (this.game.calcActive > 0 && this.verify)
        {
            this.game.calcActive--;
            this.highlited = true;
        }

        let phys = this.game.cache.getJSON('physics').pipe;
        let CGrroup = game.quizCollisionGroup;
        let text = game.expresionGenerator.getExp(verify);
        let textEl = new Phaser.Text(game, 30,0, text ,{fill : "#fff", stroke : "#f44242", strokeThickness : 4});

        game.physics.p2.enable(this, false);
        // this.body.static = true;
        this.body.immovable = true;
        this.body.kinematic = true;
        this.body.mass = 0;
        this.body.x += (this.width * this.anchor.x);
        this.body.y += (this.height * this.anchor.y);
        this.body.velocity.x = phys.speed * game.worldSpeedPrev;
        this.body.setCollisionGroup(CGrroup);
        this.body.collides([game.playerCollisionGroup]);
        this.checkWorldBounds = true;
        this.game.gameOver.add((o )=>{
            if (!this.alive) return;

            game.add.tween(this.body.velocity).to( { x: 0 }, 1000, Phaser.Easing.Linear.None, true);

        });

        this.events.onOutOfBounds.add(this.dead, this);
        this.addChild(textEl);
        this.textEl = textEl;
        let g = new Phaser.Sprite(game,-175,-86,"portal_gow");
        g.alpha = 0.5;
        this.addChildAt(g, 0);

        this.glowSprite = g;

        if (this.highlited)
        {
            let t = game.add.tween(this).to( { alpha: 0.3 }, 500, "Linear", true, 0, -1);
            t.yoyo(true, 0);

            t = game.add.tween(this.glowSprite).to( { alpha: 0.3 }, 500, "Linear", true, 0, -1);
            t.yoyo(true, 0)
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

    collected(){
        this.colledted = true;
        // debugger;
        if (!this.highlited)
        {
            var t = game.add.tween(this.glowSprite).to( { alpha: 1 }, 200, "Linear", true, 0, -1);
            t.yoyo(true, 0);
        }

        this.game.add.tween(this.textEl).to( { y : -500 }, 1000, Phaser.Easing.Linear.None, true);

        // this.glowSprite.alpha = 1;
    }

    update(d){
        this.emitter.x = this.x;
        if (this.highlited)
        {
            this.tint = 0xf44242;
            this.glowSprite.tint = 0xf44242;
        }

    }
    dead(d)
    {
        if (d.body.x > 0)
        {
            return
        }

        this.emitter.destroy();
        this.kill();
        this.destroy();
    }
}



class CalcAchive extends Phaser.Sprite{
    constructor(game, x ){
        super(game, x + game.rnd.between(200, 350), game.rnd.between(150, game.height - 150) , 'calcul');

        let phys = this.game.cache.getJSON('physics').pipe;

        let CGrroup =  this.game.achivementllisionGroup;
        game.physics.p2.enable(this, false);

        this.type = 'calc';
        this.body.immovable = true;
        this.body.kinematic = true;
        this.body.mass = 0;
        this.body.x += (this.width * this.anchor.x);
        this.body.y += (this.height * this.anchor.y);
        this.body.velocity.x = phys.speed * game.worldSpeedPrev;
        this.body.setCollisionGroup(CGrroup);
        this.body.collides([game.playerCollisionGroup]);
        this.game.gameOver.add((o )=>{
            if (!this.alive) return;
            game.add.tween(this.body.velocity).to( { x: 0 }, 1000, Phaser.Easing.Linear.None, true);
        });

        this.events.onOutOfBounds.add(this.dead, this);

    }

    update(d){
        if (this.highlited)
        {
            this.tint = 0xf44242;
            this.glowSprite.tint = 0xf44242;
        }

    }


    dead(d){
        if (d.body.x > 0)
        {
            return
        }

        this.emitter.destroy();
        this.kill();
        this.destroy();
    }
}


export default PipeEmitter;





