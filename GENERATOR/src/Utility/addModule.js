import fs from 'fs'
import prettier from 'prettier'

function addModule(moduleName) {
    // Define the new module name
    const newModuleName = moduleName; // Replace with your desired module name

    // Read the content of the app.module.ts file
    let appModuleContent = fs.readFileSync('src/app.module.ts', 'utf8');

    // Construct the import statement
    const moduleImportPath = `./module/${newModuleName}/${newModuleName.toLowerCase()}.module`;
    const importStatement = `import { ${newModuleName}Module } from '${moduleImportPath}';\n`;

    // Find the position to insert the new import statement (after MongooseModule and before the comments)
    const mongoosePosition = appModuleContent.indexOf('MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING)');
    const commentsPosition = appModuleContent.indexOf('// TemplateModule');

    if (mongoosePosition !== -1 && commentsPosition !== -1) {
        // Insert the newModuleName statement between MongooseModule and the comments
        appModuleContent =
            appModuleContent.slice(0, mongoosePosition) + `${newModuleName}Module,\n` +
            appModuleContent.slice(mongoosePosition);
    }

    // Insert the import statement at the top
    appModuleContent = importStatement + appModuleContent;

    // Reformat the code using Prettier
    const formattedCode = prettier.format(appModuleContent, { parser: 'typescript' });

    // Save the updated app.module.ts file
    fs.writeFileSync('src/app.module.ts', formattedCode, 'utf8');

    console.log('New module added to app.module.ts.');

}

export default addModule;