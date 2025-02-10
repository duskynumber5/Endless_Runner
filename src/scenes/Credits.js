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
        this.add.text(game.config.width - game.config.width / 2 - 280, game.config.height / 20 - 30, '-- CREDITS! --', creditsConfig).setOrigin(0,0)

        creditsConfig.fontSize = '35px'
        // credits!
        this.add.text(game.config.width / 2 - 450, game.config.height / 2 - 340, 'game design & programming:\n          Maddison Lobo', creditsConfig).setOrigin(0,0)
        this.add.text(game.config.width / 2 - 450, game.config.height / 2 - 220, 'background art & sprite art:\n          Maddison Lobo', creditsConfig).setOrigin(0,0)
        this.add.text(game.config.width / 2 - 450, game.config.height / 2 - 130, 'music:\n          "Airship Serenity" Kevin MacLeod (incompetech.com)\n            Licensed under Creative Commons: By Attribution 4.0\n            License http://creativecommons.org/licenses/by/4./0', creditsConfig).setOrigin(0,0)
        this.add.text(game.config.width / 2 - 450, game.config.height / 2 + 30, 'sfx:\n          Maddison Lobo', creditsConfig).setOrigin(0,0)
        this.add.text(game.config.width / 2 - 450, game.config.height / 2 + 130, 'tools & tech:\n          developed with Phaser.js\n          artwork created with Piskel\n          sfx created with JFXR', creditsConfig).setOrigin(0,0)
        this.add.text(game.config.width / 2 - 450, game.config.height / 2 + 310, 'special thanks:\n          testers :)', creditsConfig).setOrigin(0,0)

        // change titles text size
        creditsConfig.fontSize = '25px'
        this.add.text(game.config.width / 2 - 107, game.config.height - 50, 'press M for menu', creditsConfig).setOrigin(0,0)

        // bind menu key
        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

    }

    update() {
        // M key for menu
        if(Phaser.Input.Keyboard.JustDown(keyMENU)) {
            this.sound.play('select')
            this.scene.start('menuScene')
        }
    }
}