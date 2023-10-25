import fs from 'fs/promises'; // Import fs.promises for asynchronous file operations
import prettier from 'prettier';
import path from 'path';
import { fileURLToPath } from 'url';
import { snakeToKebabCase, snakeToPascalCase } from './textTransform.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function addModule(moduleName, folderPath = null) {
    try {
        // Get the current working directory
        const currentDirectory = process.cwd();
        // Define the default path and the path to the app.module.ts file
        const defaultPath = path.join(currentDirectory, 'src');
        const appModulePath = path.join(defaultPath, 'app.module.ts');

        console.log('appModulePath', appModulePath);

        // Convert the module name to PascalCase
        const folderName = snakeToPascalCase(moduleName);
        // Calculate the new module name based on provided parameters
        const newModuleName = folderPath == null ? folderName : snakeToPascalCase(`${moduleName}${folderPath}`);
        // Calculate the module filename based on provided parameters
        const moduleFilename = folderPath == null ? snakeToKebabCase(moduleName) : snakeToKebabCase(`${moduleName}-${folderPath.toLowerCase()}`);
        // Create a folder path string based on the parameters
        const folderPathStr = folderPath == null ? '' : `${folderPath.toLowerCase()}/`;

        // Read the content of the app.module.ts file
        let appModuleContent = await fs.readFile(appModulePath, 'utf8');

        // Define the import statement for the new module
        const moduleImportPath = `./module/${folderName}/${folderPathStr}${moduleFilename}.module`;
        const importStatement = `import { ${newModuleName}Module } from '${moduleImportPath}';\n`;

        // Find the position to insert the new import statement (between MongooseModule and the comments)
        const mongoosePosition = appModuleContent.indexOf('MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING)');
        const commentsPosition = appModuleContent.indexOf('// TemplateModule');

        if (mongoosePosition !== -1 && commentsPosition !== -1) {
            // Insert the newModuleName statement between MongooseModule and the comments
            appModuleContent =
                appModuleContent.slice(0, mongoosePosition) + `${newModuleName}Module,\n` +
                appModuleContent.slice(mongoosePosition);
        }

        // Insert the import statement at the top of the file
        appModuleContent = importStatement + appModuleContent;

        // Reformat the code using Prettier with the TypeScript parser
        const formattedCode = await prettier.format(appModuleContent, { parser: 'typescript' });

        // Save the updated app.module.ts file
        await fs.writeFile(appModulePath, formattedCode, 'utf8');

        console.log('New module added to app.module.ts.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

export default addModule;
