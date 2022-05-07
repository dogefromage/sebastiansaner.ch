import { Game } from "./Game";

export abstract class GameObject
{
    constructor(
        private game: Game
    )
    {
        this.game.gameObjects.push(this);
    }

    abstract update(dt: number): void;
}