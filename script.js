
/* 1. Select the HTML elements */
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

/* 2. Store notes in an array */
let notes = [];

/* 3. Update the note count */
function updateNoteCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

/* 4. Render the notes */
function render() {
  notesList.replaceChildren();

  notes.forEach((note) => {
    const noteCard = document.createElement("li");
    noteCard.classList.add(
      "note-card",
      `category-${note.category.toLowerCase()}`
    );

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const categoryLabel = document.createElement("span");
    categoryLabel.classList.add("category-label");
    categoryLabel.textContent = note.category;

    const dateLabel = document.createElement("small");
    dateLabel.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";

    // Delete only the note associated with this card
    deleteButton.addEventListener("click", () => {
      notes = notes.filter((item) => item.id !== note.id);
      render();
    });

    noteCard.append(
      noteText,
      categoryLabel,
      document.createElement("br"),
      dateLabel,
      document.createElement("br"),
      deleteButton
    );

    notesList.append(noteCard);
  });

  updateNoteCount();
}

/* 5. Validate and add a note */
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Reject empty notes
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  // Reject notes longer than 200 characters
  if (text.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  // Create a note object
  const newNote = {
    id: `${Date.now()}-${Math.random()}`,
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);

  // Reset the form and error message
  noteInput.value = "";
  errorMessage.textContent = "";

  render();
});

/* 6. Render the initial state */
render();

