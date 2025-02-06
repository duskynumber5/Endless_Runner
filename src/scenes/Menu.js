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
        // load background
        this.load.image('underwater', './assets/underwater.png')
    }

    create() {
        // decor lol
        this.add.rectangle(0, borderUISize + borderPadding * 2, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)

        // menu text config
        let menuConfig = {
            fontFamily: 'Gill Sans',
            fontSize: '90px',
            color: '#FFFFFF',
            align: 'left',
            padding: {top: 5, bottom: 5},
        }
        // title text
        this.add.text(game.config.width / 3, game.config.height / 3, 'JELLYFISH!', menuConfig).setOrigin(0,0)
        
        menuConfig.fontSize = '40px'
        // start text
        this.add.text(game.config.width / 2.6, game.config.height / 2, 'press ↑ to start', menuConfig).setOrigin(0,0)
        menuConfig.fontSize = '25px'
        // credit text
        this.add.text(game.config.width / 2.5, game.config.height - 50, 'press C for credits', menuConfig).setOrigin(0,0)

        // bind up key
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)

        // create animation
        this.anims.create({
            key: 'jellyfish!',
            frames: this.anims.generateFrameNumbers('jellyfish!', { start: 0, end: 2, first: 0}),
            frameRate: 3,
            repeat: -1,
        })

        // add jellyfish
        let swim = this.add.sprite(game.config.width / 2.6, game.config.height - game.config.height / 3, 'jellyfish!').setOrigin(0,0)
        //swim.anims.play('jellyfish!')              // play jellyfish animation

    }

    update() {
        // up arrow to start game
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.scene.start('playScene') 
        }

        // C for credits
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {
            this.scene.start('creditsScene') 
        }
    }
}