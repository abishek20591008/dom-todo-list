# My To-do List — DOM Scripting Project

## Application description
My To-do List is a small browser application for writing down tasks, marking them as completed, filtering the list, and deleting tasks. The application uses native JavaScript and the browser's localStorage.

## Plan
1. Create a page with a task form and a task list.
2. Validate the task input before adding it.
3. Use DOM scripting to create, complete, filter, and delete tasks.
4. Save the task array in localStorage so it is available after refreshing the page.
5. Test the application with valid and invalid input.

## Wireframe

```text
+--------------------------------------+
|             MY TO-DO LIST            |
|       Small steps make a difference  |
+--------------------------------------+
| Add a task                           |
| [ What do you need to do? ] [ Add ]  |
| Error message appears here           |
+--------------------------------------+
| Your tasks              3 tasks left |
| [All] [Active] [Completed]           |
| [ ] Read course material      Delete |
| [x] Send an email             Delete |
| [ ] Finish assignment         Delete |
|                         Clear completed
+--------------------------------------+
```

## Technologies
- HTML
- CSS
- Native JavaScript
- DOM manipulation and event listeners
- localStorage

## How to run
Open `index.html` in a browser, or use the Live Server extension in Visual Studio Code.

## Links
- Published application: https://abishek20591008.github.io/dom-todo-list/
- Presentation video: https://drive.google.com/file/d/1jP2X19Uz0PwnWIhSREzVWzfrGfgQ5q2M/view?usp=sharing
- GitHub repository: https://github.com/abishek20591008/dom-todo-list.git

## Self-assessment
The application meets the main requirements: users can add tasks, invalid input is rejected with an error message, tasks can be completed and deleted, and tasks are saved in localStorage. The application also includes task filters, an open-task counter, and a clear-completed button.

Before submission, I will test adding, completing, deleting, filtering, refreshing the page, and entering invalid values.

## Use of AI
AI assistance was used to help plan the application, explain JavaScript concepts, and review the structure of the code. I reviewed and tested the code and will make sure I can explain the functions and event handling in my presentation.

## Sources
- MDN Web Docs, Web Storage API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
- MDN Web Docs, Document Object Model (DOM): https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
