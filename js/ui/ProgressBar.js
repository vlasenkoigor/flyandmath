class ProgressBar extends Phaser.Group {
    constructor(game){
        super(game)
        this.bg = this.add(game.make.sprite(0,0,'bar_2'));
        let w = this.game.cache.getImage('bar').width;
        let h = this.game.cache.getImage('bar').height;
        this.bar = this.add(game.make.tileSprite(40,22,w ,h,'bar'));

        this.bar_length = w;

        this.value = 50;
        this.setValue(this.value);
        this.started = false;
    }

    setValue(val)
    {
        if (val < 0)
        {
            val = 0;
        }

        if (val>100)
        {
            val = 100;
        }

        this.value = val;

        var w = val * this.bar_length / 100;
        if (w == 0)
        {
            w = 0.1;
        }

        this.bar.width = w;
    }

    update(){
        if (!this.started) return;
        if (this.game.slomoActive)
        {
            this.setValue(this.value - 0.4)
        } else if (!this.game.isGameOver)
        {
            this.setValue(this.value + 0.08)
        }
    }

    start()
    {
        this.started = true;
    }
}


export default ProgressBar;