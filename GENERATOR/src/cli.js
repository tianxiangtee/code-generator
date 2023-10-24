#!/usr/bin/env node
import inquirer from 'inquirer';
console.log('cli')
import generateBasicTemplate from './Basic/index.js';
import generateRequestProfileTemplate from './RequestProfile/index.js';

const templates = [
    { name: 'Basic API', value: generateBasicTemplate },
    { name: 'Request Profile API', value: generateRequestProfileTemplate },
    // { name: 'Parent Child API', value: executeTemplateA },
];

inquirer
    .prompt([
        {
            type: 'list',
            name: 'templateChoice',
            message: 'Choose a template:',
            choices: templates,
        },
    ])
    .then(async (answers) => {
        const selectedTemplate = answers.templateChoice;
        // If the selected template is generateBasicTemplate, ask for additional parameters
        if (selectedTemplate === generateBasicTemplate || selectedTemplate === generateRequestProfileTemplate) {
            const params = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'moduleName',
                    message: 'Enter module name (snake_case):',
                    validate: function (input) {
                        if (/^[a-z0-9_]+$/.test(input)) {
                            return true; // Valid snake_case format
                        }
                        return "Please enter a valid snake_case name (lowercase letters, numbers, and underscores)";
                    },
                },
                {
                    type: 'input',
                    name: 'skipAudit',
                    message: 'Is audit required (Y/N):',
                    validate: function (input) {
                        input = input.trim().toUpperCase(); // Convert input to uppercase and remove leading/trailing spaces
                        if (input === 'Y' || input === 'N') {
                            return true; // Valid input
                        }
                        return "Please enter 'Y' or 'N'"; // Invalid input, prompt again
                    },
                },
                // Add more prompts for additional parameters as needed
            ]);

            // Call the template function with the provided parameters
            selectedTemplate(params);
        } else {
            // For other templates, simply call the template function
            selectedTemplate();
        }
    });
