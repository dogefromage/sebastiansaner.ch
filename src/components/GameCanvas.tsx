import React, { useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { Game } from '../game/Game';
import { styled } from 'styled-components';

const CanvasWrapperDiv = styled.div`
    width: 100%;
    height: 100%;
    
    position: relative;

    overflow: hidden;

    canvas {
        position: absolute;
        left: 0;
        top: 0;

        width: 100%;
        height: 100%;

        cursor: pointer;
    }
`

interface Props {

}

const GameCanvas = ({}: Props) => {
    const { width, height, ref: wrapperRef } = useResizeDetector();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<Game>();

    useEffect(() => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();

        const game = new Game(
            canvasRef.current,
            Math.floor(rect.width),
            Math.floor(rect.height)
        );

        gameRef.current = game;

        function animate() {
            game.animate();
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);

    }, []);

    useEffect(() => {
        if (!canvasRef.current ||
            !width ||
            !height) return;

        const w = Math.floor(width);
        const h = Math.floor(height);

        canvasRef.current.width = w;
        canvasRef.current.height = h;

        if (gameRef.current) gameRef.current.resize(w, h);

    }, [width, height]);

    return (
        <CanvasWrapperDiv ref={wrapperRef}>
            <canvas
                ref={canvasRef}
            />
        </CanvasWrapperDiv>
    );
}

export default GameCanvas;