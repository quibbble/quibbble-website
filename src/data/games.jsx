
export const gamedata = {
    'carcassonne': {
        enabled: true,
        color: 'orange',
        minTeams: 2,
        maxTeams: 4,
        minTime: 30,
        maxTime: 60,
        complexity: 2,
        variants: null,
        learn: <div>
                <p className="mb-2"><span className="text-yellow">Goal:</span> Score the most points. Gain points by creating and claiming cities, roads, farms, and monasteries.</p>
                <p className="mb-1"><span className="text-yellow">How To Play:</span></p>
                <p className="mb-2"><span className="text-yellow">Part 1:</span> Click on your tile to rotate it. Drag and drop the tile onto an open space on the board.</p>
                <p className="mb-2"><span className="text-yellow">Part 2:</span> Drag and drop a Meeple onto a section of the tile you just placed or skip placing a Meeple.</p>
            </div>
    },
    'connect4': {
        enabled: true,
        color: 'yellow',
        minTeams: 2,
        maxTeams: 3,
        minTime: 5,
        maxTime: 10,
        complexity: 0,
        variants: null,
        learn: <div>
                <p className="mb-2"><span className="text-yellow">Goal:</span> Connect four of your discs in a row.</p>
                <p><span className="text-yellow">How To Play:</span> Click the column you wish to drop your disc into.</p>
            </div>
    },
    'tsuro': {
        enabled: true,
        color: 'red',
        minTeams: 2,
        maxTeams: 8,
        minTime: 5,
        maxTime: 15,
        complexity: 0,
        variants: ['classic', 'longest_path', 'most_crossings', 'open_tiles', 'solo'],
        learn: <div>
                <p className="mb-2"><span className="text-yellow">Goal:</span> Keep your token from running off the board. Last one standing wins.</p>
                <p><span className="text-yellow">How To Play:</span> Click tiles to rotate them then drag and drop a tile onto the board.</p>
            </div>
    },
    'tictactoe': {
        enabled: true,
        color: 'teal',
        minTeams: 2,
        maxTeams: 2,
        minTime: 5,
        maxTime: 10,
        complexity: 0,
        variants: null,
        learn: <div>
                <p className="mb-2"><span className="text-yellow">Goal:</span> Connect three marks in a row.</p>
                <p><span className="text-yellow">How To Play:</span> Click on an empty square to mark it.</p>
            </div>
    },
    'indigo': {
        enabled: true,
        color: 'indigo',
        minTeams: 2,
        maxTeams: 4,
        minTime: 15,
        maxTime: 30,
        complexity: 1,
        variants: ['classic', 'large_hands'],
        learn: <div>
                <p className="mb-2"><span className="text-yellow">Goal:</span> Score the most points. Gain points by moving gems into your gateways.</p>
                <p><span className="text-yellow">How To Play:</span> Click tiles to rotate them then drag and drop a tile onto the board.</p>
            </div>
    },
    'stratego': {
        enabled: true,
        color: 'sky',
        minTeams: 2,
        maxTeams: 2,
        minTime: 15,
        maxTime: 30,
        complexity: 1,
        variants: ['classic', 'quick_battle'],
        learn: <div>
                <p className="mb-2"><span className="text-yellow">Goal:</span> Protect your flag and capture your opponent's.</p>
                <p><span className="text-yellow">How To Play:</span> Drag and drop a friendly unit onto an open tile or enemy unit.</p>
            </div>
    },
    // 'azul': {
    //     enabled: true,
    //     color: 'blue',
    //     minTeams: 2,
    //     maxTeams: 4,
    //     minTime: 15,
    //     maxTime: 30,
    //     complexity: 1,
    //     variants: null
    // },
    // 'battleship': {
    //     enabled: true,
    //     color: 'purple',
    //     minTeams: 2,
    //     maxTeams: 2,
    //     minTime: 15,
    //     maxTime: 30,
    //     complexity: 0,
    //     variants: null
    // },
    // 'blockus': {
    //     enabled: true,
    //     color: 'pink',
    //     minTeams: 2,
    //     maxTeams: 4,
    //     minTime: 15,
    //     maxTime: 30,
    //     complexity: 1,
    //     variants: null
    // },
    // 'codenames': {
    //     enabled: true,
    //     color: 'purple',
    //     minTeams: 2,
    //     maxTeams: 2,
    //     minTime: 20,
    //     maxTime: 30,
    //     complexity: 1,
    //     variants: null
    // },
    // 'hive': {
    //     enabled: true,
    //     color: 'lime',
    //     minTeams: 2,
    //     maxTeams: 2,
    //     minTime: 15,
    //     maxTime: 30,
    //     complexity: 1,
    //     variants: null
    // },
    // 'qwirkle': {
    //     enabled: true,
    //     color: 'magenta',
    //     minTeams: 2,
    //     maxTeams: 2,
    //     minTime: 15,
    //     maxTime: 30,
    //     complexity: 1,
    //     variants: null
    // },
}
