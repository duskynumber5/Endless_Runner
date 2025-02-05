class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create () {
        // background
        this.underwater = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'underwater').setOrigin(0, 0)

        this.swim = this.add.sprite(game.config.width / 2.6, game.config.height - game.config.height / 3, 'jellyfish!').setOrigin(0,0)
        this.swim.anims.play('jellyfish!')              // play jellyfish animation

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.moveSpeed = 7

    }  

    update() {
        // move background
        this.underwater.tilePositionY -= 7

        if(keyLEFT.isDown) {
            this.swim.x -= this.moveSpeed
        } else if(keyRIGHT.isDown) {
            this.swim.x += this.moveSpeed
        }
    }

}