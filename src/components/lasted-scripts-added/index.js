import React, { useState } from 'react';
import fun from '../../shared/functions';
import './index.css';
export default function LastedScriptsAdded() {
    const [scripts, setScripts] = useState(fun.listScripts());
    return (
        <div className="lasted-scripts">
            <h1>Lasted scripts added</h1>
            <ul>
                {Object.keys(scripts).map((movie) => (
                    <li>{movie}</li>
                ))}
            </ul>
        </div>
    );
}
