class Jellyfish extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // add object to existing scene
        scene.add.existing(this)   
        scene.physics.add.existing(this)  
        
        this.body.setCollideWorldBounds(true)
        this.moveSpeed = 7         // rocket speed in pixels/frame

        this.body.setSize(200, 200)
    }

    update() {   
        this.body.setVelocity(0)

        // movement w/ boundaries
        if(keyLEFT.isDown && this.x >= borderUISize - this.width / 1.2) {
            this.x -= this.moveSpeed
        } else if(keyRIGHT.isDown && this.x <= game.config.width - this.width / 2) {
            this.x += this.moveSpeed
        }

    }
    
    reset() {
        this.setPosition(game.config.width / 2 - 125, game.config.height - game.config.height / 3); // Center horizontally, bottom of the screen
    }

}