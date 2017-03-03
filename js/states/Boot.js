var bootState = {
    preload: function() {
        this.load.image('preloadbar', 'assets/phaser-game-progress-bar.png');
    },
    create: function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
    },
    update: function(){
        this.state.start('preloader');
    }
}

export default bootState;
