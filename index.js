#! /usr/bin/env node
import inquirer from "inquirer"; // Importing the inquirer library for user interaction
import chalk from "chalk"; // Importing chalk for colorizing terminal output
console.log("\n \t Welcome to the TODO List: \n");
let todosList = []; // Initialize an empty array to store TODO list items
let loop = true; // Initialize a loop control variable
async function todos() {
    while (loop) { // Main loop for the TODO list application
        // Prompt the user for the action they want to perform
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "TODO",
                message: chalk.yellow("What would you like to do with your todo list?"),
                choices: ["Add a new task", "Delete an existing task", "Mark a task as completed", "View your todo list", "Quit"]
            }
        ]);
        switch (answers.TODO) {
            //  Add a new task
            case "Add a new task":
                console.log(chalk.green("\n \t Please enter a new task: \n"));
                // Prompt the user to enter a new task
                let addTask = await inquirer.prompt({
                    type: "input",
                    name: "task",
                    message: chalk.green("Enter your new task: ")
                });
                todosList.push(addTask.task); // Add the new task to the list
                console.log(chalk.green(`The tasks ${addTask.task} has been succesfully added to the TODO List `));
                break;
            // Delete an existing task
            case "Delete an existing task":
                console.log(chalk.red("\n \t Please select the task you would like to delete: \n"));
                // Prompt the user to select the task they want to delete
                let deleteTask = await inquirer.prompt([
                    {
                        type: "list",
                        name: "delete",
                        message: chalk.red("Which task would you like to delete? "),
                        choices: todosList, // Provide the list of current tasks as choices
                    }
                ]);
                const indexToDelete = todosList.indexOf(deleteTask.delete); // Find the index of the task to delete
                if (indexToDelete !== -1) {
                    todosList.splice(indexToDelete, 1); // Remove the task from the list
                    console.log(chalk.red(`The task ${deleteTask.delete} has been succesfully deleted from the todo list.`));
                }
                else {
                    console.log(chalk.red("Task not found!"));
                }
                break;
            // Mark a task as completed
            case "Mark a task as completed":
                console.log(chalk.blue("\n \t Please enter the index of the task you would like to mark as completed: \n"));
                // Prompt the user to select the task they want to mark as completed
                let markTask = await inquirer.prompt({
                    type: "list",
                    name: "mark",
                    message: chalk.blue("Which task you would like to mark as completed? "),
                    choices: todosList, // Provide the list of current tasks as choices
                });
                todosList[markTask.mark] = "Completed"; // Mark the selected task as completed
                const markIndex = todosList.indexOf(markTask.mark); // Find the index of the marked task
                if (markIndex !== -1) {
                    // Update the task's status to indicate it's completed
                    todosList[markIndex] = `${todosList[markIndex]} (Completed)`;
                    console.log(chalk.blue(`The task "${markTask.mark}" has been successfully marked as completed.`));
                }
                else {
                    console.log(chalk.blue("Task not found!"));
                }
                break;
            // View your todo list:
            case "View your todo list":
                console.log(chalk.yellow("\n \t Here are your tasks: \n"));
                // Display the list of tasks
                todosList.forEach((task, index) => {
                    console.log(chalk.yellow(`${index + 1}. ${task}`));
                });
                break;
            // Quit
            case "Quit":
                loop = false; // Set loop control variable to false to exit the main loop
                console.log(chalk.cyan("Goodbye!")); //  Print a goodbye message
                break;
            default:
                console.log(chalk.red("Invalid choice, Please choose a valid option.")); // Handle invalid user input
        }
    }
}
todos();
// Call the main function to start the TODO list application
