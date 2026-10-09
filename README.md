
# QuickNotes

QuickNotes is a simple, responsive note-taking web application built with HTML, CSS, and JavaScript. It allows users to create notes, organize them into categories, search for specific notes, and delete notes they no longer need. Notes are saved in the browser using localStorage, so they remain available after refreshing the page.

## Features

- Add notes with a text description.
- Organize notes into Personal, Work, and Study categories.
- Display the date and time each note was created.
- Validate notes to prevent empty entries and notes longer than 200 characters.
- Delete individual notes.
- Search notes using case-insensitive text matching.
- Save notes in localStorage so they persist after a page refresh.
- Display an accurate note count.
- Responsive layout for desktop and mobile screens.

## Technologies Used

- HTML5 for page structure and semantic elements.
- CSS3 for styling, Flexbox, category colors, and responsive design.
- JavaScript for note management, validation, searching, and rendering.
- localStorage for saving notes in the browser.

## How to Run Locally

1. Clone this repository:

   ```bash
   git clone https://github.com/Bugbyte-rmrf/quicknotes-app.git
   ```

2. Open the project folder:

   ```bash
   cd quicknotes-app
   ```

3. Open `index.html` in your web browser.

   Alternatively, open the folder in Visual Studio Code and use the Live Server extension to launch the application.

No server or package installation is required.

## What I Learned

- How to structure a web page using semantic HTML elements and accessible form labels.
- How to style a responsive interface using CSS, Flexbox, and media queries.
- How to use JavaScript arrays and objects to manage a collection of notes.
- How to handle form submission, input validation, and individual item deletion.
- How to create and update DOM elements safely using `createElement` and `textContent`.
- How to save and retrieve data using `localStorage`, `JSON.stringify`, and `JSON.parse`.
- How to use Git commits and GitHub to track and publish project development.
