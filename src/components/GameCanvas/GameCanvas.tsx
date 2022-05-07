import React, { useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { Game } from '../../game/Game';
import SolarSystem from '../SolarSystem/SolarSystem';
import styles from './GameCanvas.module.scss';

interface Props
{

}

const GameCanvas = ({ }: Props) =>
{
    const { width, height, ref: wrapperRef } = useResizeDetector();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [ game, setGame ] = useState<Game>();

    useEffect(() =>
    {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        
        const game = new Game(canvasRef.current, rect.width, rect.height);


        setGame(game);

        function animate()
        {
            game.animate();
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);

    }, [ canvasRef.current ]);

    useEffect(() =>
    {
        if (!canvasRef.current ||
            !width ||
            !height) return;

        canvasRef.current.width = width;
        canvasRef.current.height = height;
        
        if (game) game.resize(width, height);

    }, [ width, height, canvasRef.current ]);

    return (
        <div
            className={styles.wrapper}
            ref={wrapperRef}
        >
            <canvas
                ref={canvasRef}
            />
            {
                game && <SolarSystem game={game} />
            }
        </div>
    );
}

export default GameCanvas;