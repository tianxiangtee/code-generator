#!/usr/bin/env node
import inquirer from 'inquirer';
import executeTemplateA from './templateA.js';
console.log('cli')
import generateBasicTemplate from './Basic/index.js';

const templates = [
    { name: 'TemplateA', value: executeTemplateA },
    { name: 'Basic API', value: generateBasicTemplate },
    { name: 'Request Profile API', value: executeTemplateA },
    { name: 'Parent Child API', value: executeTemplateA },
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
        if (selectedTemplate === generateBasicTemplate) {
            const params = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'moduleName',
                    message: 'Enter module name (catModule):',
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
