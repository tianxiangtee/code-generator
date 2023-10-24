import { snakeToKebabCase, snakeToPascalCase, snakeToCamelCase } from './textTransform.js';

function replaceContent(content, userInput) {
    let kebabCaseInput = snakeToKebabCase(userInput);
    let pascalCaseInput = snakeToPascalCase(userInput);
    let camelCaseInput = snakeToCamelCase(userInput);

    //Snake case
    content = content.replace(/Template_DB/g, userInput);
    //Camel case
    content = content.replace(/templateCamelCase/g, camelCaseInput);
    //Kebab case
    content = content.replace(/template-kebab-case/g, kebabCaseInput);
    //Pascal case
    content = content.replace(/TemplatePascal/g, pascalCaseInput);
    return content;
}
export default replaceContent;