import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation()
{
    return (
        <div className='navigation'>
            <Link className="link" to='/'>Home</Link>
            <Link className="link" to='/projects'>Projects</Link>
            <Link className="link" to='/contact'>Contact</Link>
        </div>
    )
}