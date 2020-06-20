function castNameScript(movieName) {
    const names = {
        'The Godfather': 'Godfather',
        '2001: A Space Odyssey': '2001-A-Space-Odyssey',
        'Apocalypse Now': 'Apocalypse-Now',
        'Dallas Buyers Club': 'Dallas-Buyers-Club',
    };
    return names[movieName] ? names[movieName] : movieName;
}

function ListScripts(movieName) {
    return {
        'The Godfather': 'Godfather',
        '2001: A Space Odyssey': '2001-A-Space-Odyssey',
        'Apocalypse Now': 'Apocalypse-Now',
        'Dallas Buyers Club': 'Dallas-Buyers-Club',
    };
}

export default {
    castNameScript: castNameScript,
    listScripts: ListScripts,
};
