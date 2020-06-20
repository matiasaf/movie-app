function castNameScript(movieName) {
    const names = ListScripts();
    return names[movieName] ? names[movieName] : movieName;
}

function ListScripts() {
    return {
        'The Godfather': 'Godfather',
        '2001: A Space Odyssey': '2001-A-Space-Odyssey',
        'Apocalypse Now': 'Apocalypse-Now',
        'Dallas Buyers Club': 'Dallas-Buyers-Club',
        Chinatown: 'Chinatown',
        'The Lord of the Rings: The Fellowship of the Ring':
            'Lord-of-the-Rings-Fellowship-of-the-Ring,-The',
        'The Lord of the Rings: The Return of the King':
            'Lord-of-the-Rings-Return-of-the-King',
        'The Lord of the Rings: The Two Towers':
            'Lord-of-the-Rings-The-Two-Towers',
    };
}

export default {
    castNameScript: castNameScript,
    listScripts: ListScripts,
};
