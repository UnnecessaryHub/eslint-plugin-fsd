const isRelative = (path) => {
    return path.startsWith('.') || path.startsWith('./') || path.startsWith('../')
}

const fsdLayers = [
    'app',
    'widgets',
    'features',
    'entities',
    'shared',
    'pages'
]

module.exports = {
    isRelative,
    fsdLayers
}
