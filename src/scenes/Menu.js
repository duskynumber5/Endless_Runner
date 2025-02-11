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
        // load audio
        this.load.audio('background', './assets/background.mp3')
        this.load.audio('hurt', './assets/hurt.wav')
        this.load.audio('select', './assets/select.wav')
        this.load.audio('spawn', './assets/spawn.wav')
        this.load.audio('gameOver', './assets/gameOver.wav')
    }

    create() {
// ------------------------------------- MUSIC ------------------------------------- //
        this.background = this.sound.get('background')
        if(!this.background) {
                this.background = this.sound.add('background', {
                loop: true,
                volume: 0.25,
            })
            this.background.play()
        }   
// --------------------------------------------------------------------------------- //

// ------------------------------------- DECOR ------------------------------------- //
        // decor lol
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x318bc0).setOrigin(0, 0)
        this.add.rectangle(0, borderUISize + borderPadding * 2, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, game.config.height / 4, game.config.width, borderUISize + 50, 0x456378).setOrigin(0, 0)
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
        this.add.text(game.config.width / 2 - 300, game.config.height / 4, 'JELLYFISH JUKE', menuConfig).setOrigin(0,0)
        
        menuConfig.fontSize = '40px'
        // start text
        this.add.text(game.config.width / 2 - 135, game.config.height / 2.5, 'press ↑ to start', menuConfig).setOrigin(0,0)
        menuConfig.fontSize = '25px'
        // controls text
        this.add.text(game.config.width / 2 - 135, game.config.height / 2, 'use ←→ arrows to move', menuConfig).setOrigin(0,0)
        // credit text
        this.add.text(game.config.width / 2 - 107, game.config.height - 50, 'press C for credits', menuConfig).setOrigin(0,0)
        menuConfig.fontSize = '20px'
        // lifes text
        this.add.text(game.config.width / 3 + 10, game.config.height / 1.75, 'avoid all the trash and survive as long as you can!', menuConfig).setOrigin(0,0)
// --------------------------------------------------------------------------------- //

// ----------------------------------- KEY BINDS ----------------------------------- //
        // bind up key
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
// --------------------------------------------------------------------------------- //

// ----------------------------------- ADD SPRITE ----------------------------------- //
        // add jellyfish
        this.jellyfish = new Jellyfish(this, game.config.width / 2 - 125, game.config.height - game.config.height / 3, 'jellyfish!').setOrigin(0,0)
        // create animation
        this.anims.create({
            key: 'jellyfish!',
            frames: this.anims.generateFrameNumbers('jellyfish!', { start: 0, end: 2, first: 0}),
            frameRate: 3,
            repeat: -1,
        })
// ---------------------------------------------------------------------------------- //
    }

    update() {
// ----------------------------------- KEY BINDS ----------------------------------- //
        // up arrow to start game
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.time.addEvent({
                delay: 2500,
                callback: () => {
                    this.scene.start('playScene') 
                },
                callbackScope: this,
                loop: true
            })
            this.sound.play('select')
            this.jellyfish.anims.play('jellyfish!')
            this.jellyfish.menuSwim()
        }

        // C for credits
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {
            this.sound.play('select')
            this.scene.start('creditsScene') 
        }
// ---------------------------------------------------------------------------------- //
    }
}