
/* 1. Select the HTML elements */
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

/* 2. Create an array to store notes */
let notes = [];

/* 3. Display the correct note count */
function updateNoteCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

/* 4. Render the notes on the page */
function render() {
  // Remove the previous list items
  notesList.replaceChildren();

  // Create a card for each note
  notes.forEach((note) => {
    const noteCard = document.createElement("li");
    noteCard.classList.add("note-card");

    // Apply a category-specific CSS class
    noteCard.classList.add(
      `category-${note.category.toLowerCase()}`
    );

    // Note text
    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    // Category label
    const categoryLabel = document.createElement("span");
    categoryLabel.classList.add("category-label");
    categoryLabel.textContent = note.category;

    // Creation date
    const dateLabel = document.createElement("small");
    dateLabel.textContent = note.createdAt;

    // Delete button (functionality comes in Task 4)
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";

    // Add elements to the note card
    noteCard.append(
      noteText,
      categoryLabel,
      document.createElement("br"),
      dateLabel,
      document.createElement("br"),
      deleteButton
    );

    // Add the card to the list
    notesList.append(noteCard);
  });

  updateNoteCount();
}

/* 5. Handle form submission */
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Basic validation will be expanded in Task 4
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // Create a new note object
  const newNote = {
    id: Date.now().toString(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  // Add the note to the array
  notes.push(newNote);

  // Clear the input and error message
  noteInput.value = "";
  errorMessage.textContent = "";

  // Refresh the displayed notes
  render();
});

/* 6. Display the initial empty state */
render();
