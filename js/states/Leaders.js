/**
 * Created by Ivlasenko on 2/18/2017.
 */

var leadesState =
{
    create: function () {
        this.game.add.sprite(0, 0, 'back');

        this.game.scoreAPI.getTopFive((list)=>{
            console.log(list);
            let formatted = [];
            if (list instanceof Array)
            {
                list.forEach((e)=>{
                    formatted.push({name : e.userName, points : e.value, player : e.userName  === this.game.userName})
                })
            } else {
                formatted.push({name : list.userName, points : list.value, player : list.userName  === this.game.userName})
            }


            this.drawList(formatted)
        }, () => {
            let list = [
                {name : "Leo Messi", points : 100},
                {name : "Ben Bruce", points : 50},
                {name : "Anton Goncharov", points : 50},
                {name : "Donald Trump ", points : 50},
                {name : "Barak Obama", points : 50},
            ];
        });


        // let playerObj =  {name : "Igor Vlasenko", points : 20, player : true, place : 44};
        // this.mountainsMid2 = this.game.add.tileSprite(0,
        //     this.game.height - this.game.cache.getImage('mountains-mid2').height,
        //     this.game.width,
        //     this.game.cache.getImage('mountains-mid2').height,
        //     'mountains-mid2'
        // );

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

        this.popUp.create(0,0,'popup');

        let cup = this.popUp.create(0,0,'cubok_pres');

        cup.anchor.set(0.5);
        cup.x = w/2;
        cup.y = h/2 + 50;
        cup.alpha = 0.5;

        this.label = this.game.make.text(w/2, -20, 'Top 5 scorers' ,{
            font : "33px MyWebFont2",
            fill : "#ffffff",
            stroke : "#96929b",
            strokeThickness : 5
        });





        this.label.anchor.set(0.5);

        this.popUp.addChild(this.label);

        this.backButton = this.game.add.button(this.popUp.fixedX + w/2, h + 170, 'back_press', ()=>{
            this.state.start('menu');
        }, this,);

        this.backButton.anchor.set(0.5);


    },

    drawList(list){

        
        if (this.game.state.current !== 'leaders')
        {
            return;
        }
        let wasPlayer = false;
        list.forEach(( p, i)=>{
            wasPlayer = wasPlayer || p.player;
            let text = `${i+1}. ${p.name} - ${p.points}`;
            this.game.add.text(this.popUp.x + 20 , this.popUp.y + 100 + (i*35) , text ,{
                font : "20px MyWebFont2",
                fill : p.player ? "#ed1c1c" : "#ffffff",
                stroke : "#96929b",
                strokeThickness : 5
            });
        });


        if (!wasPlayer){
            this.game.scoreAPI.getUserRank(this.game.userName, (result) =>{
                if (this.game.state.current !== 'leaders')
                {
                    return;
                }
                var score = result.scores.score;
                let playerObj = {name : score.userName, points : score.value, place : score.rank};
                let text = `...\n${playerObj.place}. ${playerObj.name} - ${playerObj.points}`;
                this.game.add.text(this.popUp.x + 20 , this.popUp.y + 100 + (5*35) -10 , text ,{
                    font : "15px MyWebFont2",
                    fill :  "#000000" ,
                    stroke : "#96929b",
                    strokeThickness : 5
                });
            },
            ()=>{});

        }

    }
};
export default leadesState;