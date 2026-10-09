
/* 1. Select the HTML elements */
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

/* 2. Local storage key */
const STORAGE_KEY = "quicknotes-notes";

/* 3. Load saved notes from localStorage */
function loadNotes() {
  try {
    const savedNotes = localStorage.getItem(STORAGE_KEY);

    if (savedNotes === null) {
      return [];
    }

    const parsedNotes = JSON.parse(savedNotes);

    return Array.isArray(parsedNotes) ? parsedNotes : [];
  } catch (error) {
    console.error("Could not load saved notes:", error);
    return [];
  }
}

/* 4. Store notes in an array */
let notes = loadNotes();

/* 5. Save notes to localStorage */
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/* 6. Update the note count */
function updateNoteCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

/* 7. Render notes, applying the current search */
function render() {
  notesList.replaceChildren();

  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm)
  );

  if (filteredNotes.length === 0 && searchTerm !== "") {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    notesList.append(message);
  } else {
    filteredNotes.forEach((note) => {
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

      deleteButton.addEventListener("click", () => {
        notes = notes.filter((item) => item.id !== note.id);
        saveNotes();
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
  }

  updateNoteCount();
}

/* 8. Validate and add a note */
noteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent =
      "Notes must be 200 characters or fewer.";
    return;
  }

  const newNote = {
    id: `${Date.now()}-${Math.random()}`,
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };

  notes.push(newNote);
  saveNotes();

  noteInput.value = "";
  errorMessage.textContent = "";

  render();
});

/* 9. Search as the user types */
searchInput.addEventListener("input", render);

/* 10. Display saved notes when the page opens */
render();

