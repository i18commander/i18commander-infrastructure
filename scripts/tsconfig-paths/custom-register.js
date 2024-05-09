//TODO: finish custom paths loader
const {loadConfig, register} =  require( "tsconfig-paths");
const {globSync} = require("glob")
const path = require("path")

const tsconfigPath = '../'

const mapAliases = (paths) => {
    Object.entries(paths).reduce((mappedPaths, [alias, pathPatterns]) => {
        // TODO: support pathPattern multi-element array
        // TODO: support index.ts on dir path

        const pathPattern = pathPatterns[0]
        const path = pathPattern.replace('*', '')
        const filePaths = globSync('**/*.ts', {
            cwd: path,
            absolute: false
        })

        const filePathMappings = Object.fromEntries(filePaths.map((filePath) => {
            const fileAlias = alias.replace('*', filePath)
            const fullFilePath = pathPattern.replace('*', filePath)
            return [fileAlias, fullFilePath]
        }))

        return {...mappedPaths, ...filePathMappings}
    }, {})
}

    const tsConfig = loadConfig(tsconfigPath);

const alias = '@components/*'
const paths = tsConfig.paths[alias][0].replace('*', '')
const filePaths = globSync('**/*.ts', {
    cwd: paths,
    absolute: false
})
const fileAliases = filePaths.map((filePath) => [alias.replace('*', filePath), tsConfig.paths[alias][0].replace('*',filePath )])

console.log(fileAliases)
console.log(filePaths)
console.log(Object.fromEntries(fileAliases))





// const isPulumiCommand = process.argv[1]?.includes('pulumi') ?? false;
// if (isPulumiCommand) {
//     const tsConfig = loadConfig(tsconfigPath);
//
//     console.log(tsConfig.paths)
//
//     if (tsConfig.resultType === 'success') {
//         register({
//             baseUrl: tsConfig.absoluteBaseUrl,
//             paths: tsConfig.paths,
//         });
//     }
// }