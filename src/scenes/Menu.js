class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {

    }

    create() {
        this.add.rectangle(0, borderUISize + borderPadding * 2, game.config.width, borderUISize, 0xFFFFFF
        ).setOrigin(0, 0)
    }

    update() {

    }
}