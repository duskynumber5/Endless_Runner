class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create () {
        // background
        this.underwater = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'underwater').setOrigin(0, 0)

        // jellyfish & infinite animation
        this.swim = this.add.sprite(game.config.width / 2.6, game.config.height - game.config.height / 3, 'jellyfish!').setOrigin(0,0)
        this.swim.anims.play('jellyfish!')              // play jellyfish animation

        // bind movement keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // set move speed
        this.moveSpeed = 7

        // config scene text
        let playConfig = {
            fontFamily: 'Gill Sans',
            fontSize: '25px',
            color: '#FFFFFF',
            align: 'left',
            padding: {top: 5, bottom: 5},
        }
        // restart and menu option
        this.add.text(game.config.width / 2 - 230, game.config.height - 50, 'press R to restart || press M for menu', playConfig).setOrigin(0,0)

        // bind restart and menu keys
        keyRESTART = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

    }  

    update() {
        // move background
        this.underwater.tilePositionY -= 7

        // movement w/ boundaries
        if(keyLEFT.isDown && this.swim.x >= borderUISize - this.swim.width / 1.2) {
            this.swim.x -= this.moveSpeed
        } else if(keyRIGHT.isDown && this.swim.x <= game.config.width - this.swim.width / 2) {
            this.swim.x += this.moveSpeed
        }

        // R key to restart
        if(Phaser.Input.Keyboard.JustDown(keyRESTART)) {
            this.scene.restart()
        }

        // M key for menu
        if(Phaser.Input.Keyboard.JustDown(keyMENU)) {
            this.scene.start('menuScene')
        }
    }

}