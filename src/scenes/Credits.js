class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    create () {
        // config scene text
        let creditsConfig = {
            fontFamily: 'Gill Sans',
            fontSize: '90px',
            color: '#FFFFFF',
            align: 'left',
            padding: {top: 5, bottom: 5},
        }   
        
        // title text
        this.add.text(game.config.width / 3, game.config.height / 10, 'CREDITS!', creditsConfig).setOrigin(0,0)

        // change titles text size
        creditsConfig.fontSize = '25px'
        this.add.text(game.config.width / 2.5, game.config.height - 50, 'press M for menu', creditsConfig).setOrigin(0,0)

        // bind menu key
        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

    }

    update() {
        // M key for menu
        if(Phaser.Input.Keyboard.JustDown(keyMENU)) {
            this.scene.start('menuScene')
        }
    }
}