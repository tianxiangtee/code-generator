// Variable use camelCase
function snakeToCamelCase(userInput) {
    return userInput.replace(/(_\w)/g, (match) => match[1].toUpperCase());
}

// DB name use snakeCase
function snakeToKebabCase(userInput) {
    return userInput.replace(/_/g, '-');
}

// Class use Pascal Case
function snakeToPascalCase(userInput) {
    return userInput
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

export { snakeToCamelCase, snakeToKebabCase, snakeToPascalCase}