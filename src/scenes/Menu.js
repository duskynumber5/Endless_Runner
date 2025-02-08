class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        // load jellyfish
        this.load.spritesheet('jellyfish!', './assets/jellyfish!.png', {
            frameWidth: 224,
            frameHeight: 224,
            startFrame: 0,
            endFrame: 2,
        })
        // load plastic1
        this.load.spritesheet('plastic1', './assets/plastic1.png', {
            frameWidth: 224,
            frameHeight: 224,
            startFrame: 0,
            endFrame: 3,
        })
        // load plasticBag
        this.load.spritesheet('plasticBag', './assets/plasticBag.png', {
            frameWidth: 224,
            frameHeight: 224,
            startFrame: 0,
            endFrame: 1,
        })
        // load restarting
        this.load.spritesheet('restarting', './assets/restarting.png', {
            frameWidth: 732,
            frameHeight: 732,
            startFrame: 0,
            endFrame: 2,
        })
        // load background
        this.load.image('underwater', './assets/underwater.png')
    }

    create() {
// ------------------------------------- DECOR ------------------------------------- //
        // decor lol
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x318bc0).setOrigin(0, 0)
        this.add.rectangle(0, borderUISize + borderPadding * 2, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
// --------------------------------------------------------------------------------- //

// --------------------------------- TEXT & CONFIG --------------------------------- //
        // menu text config
        let menuConfig = {
            fontFamily: 'Gill Sans',
            fontSize: '90px',
            color: '#FFFFFF',
            align: 'left',
            padding: {top: 5, bottom: 5},
        }
        // title text
        this.add.text(game.config.width / 2 - 200, game.config.height / 4, 'JELLYFISH!', menuConfig).setOrigin(0,0)
        
        menuConfig.fontSize = '40px'
        // start text
        this.add.text(game.config.width / 2 - 135, game.config.height / 2.5, 'press ↑ to start', menuConfig).setOrigin(0,0)
        menuConfig.fontSize = '25px'
        // controls text
        this.add.text(game.config.width / 2 - 135, game.config.height / 2, 'use ←→ arrows to move', menuConfig).setOrigin(0,0)
        // credit text
        this.add.text(game.config.width / 2 - 107, game.config.height - 50, 'press C for credits', menuConfig).setOrigin(0,0)
// --------------------------------------------------------------------------------- //

// ----------------------------------- KEY BINDS ----------------------------------- //
        // bind up key
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
// --------------------------------------------------------------------------------- //

// ----------------------------------- ADD SPRITE ----------------------------------- //
        // add jellyfish
        let swim = this.add.sprite(game.config.width / 2 - 125, game.config.height - game.config.height / 3, 'jellyfish!').setOrigin(0,0)
// ---------------------------------------------------------------------------------- //

    }

    update() {
// ----------------------------------- KEY BINDS ----------------------------------- //
        // up arrow to start game
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start('playScene') 
        }

        // C for credits
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {
            this.scene.start('creditsScene') 
        }
// ---------------------------------------------------------------------------------- //
    }
}