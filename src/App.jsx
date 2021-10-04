import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import ThreeProvider from './components/threeProvider';
import World from './components/world';
import Navigation from './components/navigation';
import { BrowserRouter as Router } from 'react-router-dom';
import { LoadingProvider } from './components/loadingProvider';

function App() 
{
    const canvasRef = useRef();
    const [ loaded, setLoaded ] = useState(false);

    useEffect(() =>
    {
        console.log('The source code for this page is available at AAAAAAAAAAAAAAA');
    }, []);

    useEffect(() =>
    {
        let canvas = canvasRef.current;
        if (!canvas) return;
        setLoaded(true);
    }, [canvasRef]);

    return (
        <Router>
            <LoadingProvider>
                <div className="canvas-container">
                    <canvas ref={canvasRef} width="600" height="600"/>
                </div>
                <Navigation />
                {
                    loaded && 
                    <ThreeProvider canvas={ canvasRef.current }>
                        <World />
                    </ThreeProvider>
                }
            </LoadingProvider>
        </Router>
    );
}

export default App;