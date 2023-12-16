document.addEventListener('DOMContentLoaded', function() {
    const addPageButton = document.querySelector('.add-page');
    const pageList = document.querySelector('.page-list');
    const notesContainer = document.querySelector('.notes-container');
    const notesSection = document.querySelector('.notes-section');
    const welcomeMessage = document.querySelector('.welcome-message');
    const loginRegisterForms = document.getElementById('login-register-forms');

    let currentPage = null;

    addPageButton.addEventListener('click', function() {
        const pageIndex = pageList.children.length + 1;
        const newPage = createPageElement(pageIndex);
        pageList.appendChild(newPage);
        currentPage = `Page ${pageIndex}`;
        saveDataToLocalStorage();
    });

    function createPageElement(index) {
        const newPage = document.createElement('li');
        newPage.textContent = `Page ${index}`;
        newPage.addEventListener('click', function() {
            currentPage = newPage.textContent;
            displayNotes(currentPage);
        });

        return newPage;
    }

    function displayNotes(page) {
        if (currentPage !== page) {
            notesContainer.innerHTML = '';
        }

        notesSection.style.display = 'block';
        const notes = getNotesForPage(page);

        notesContainer.innerHTML = '';

        const noteElement = document.createElement('p');
        noteElement.textContent = notes.length > 0 ? notes[0] : 'No notes available for this page.';
        noteElement.contentEditable = true;
        noteElement.addEventListener('input', function(event) {
            const editedNote = event.target.textContent;
            saveNotesToLocalStorage(currentPage, 0, editedNote);
        });
        notesContainer.appendChild(noteElement);
        saveDataToLocalStorage();
    }

    function getNotesForPage(page) {
        const storedData = JSON.parse(localStorage.getItem('notesData')) || {};
        return storedData[page] || [];
    }

    function saveNotesToLocalStorage(page, index, note) {
        const storedData = JSON.parse(localStorage.getItem('notesData')) || {};
        storedData[page] = storedData[page] || [];
        storedData[page][index] = note;
        localStorage.setItem('notesData', JSON.stringify(storedData));
    }

    function saveDataToLocalStorage() {
        const pages = Array.from(pageList.children).map(page => page.textContent);
        const notes = {};
        pages.forEach(page => {
            notes[page] = getNotesForPage(page);
        });
        localStorage.setItem('notesData', JSON.stringify(notes));
    }

    function loadDataFromLocalStorage() {
        const storedData = JSON.parse(localStorage.getItem('notesData')) || {};
        const savedPages = Object.keys(storedData);
        savedPages.forEach(page => {
            const pageIndex = parseInt(page.split(' ')[1]); // Extract page index
            const newPage = createPageElement(pageIndex);
            pageList.appendChild(newPage);
        });
    }

    loadDataFromLocalStorage();
    const savedPages = Object.keys(JSON.parse(localStorage.getItem('notesData')) || {});
    if (savedPages.length > 0) {
        currentPage = savedPages[0];
        displayNotes(currentPage);
    
        const pageOne = document.querySelector('.page-list li');
        pageOne.click(); // Trigger click event on the first page
    }

    function createPageElement(index) {
        const newPage = document.createElement('li');
        const pageName = document.createElement('span');
        
        pageName.textContent = `Page ${index}`;
        
        // Event listener for clicking the page name
        pageName.addEventListener('click', function() {
            currentPage = pageName.textContent;
            displayNotes(currentPage);

            const allPages = document.querySelectorAll('.page-list li');
            allPages.forEach(page => {
                page.classList.remove('selected-page');
            });

            newPage.classList.add('selected-page');
        });
        
        newPage.appendChild(pageName);
        pageList.appendChild(newPage);
        return newPage;
    }
    
    function createPageElement(index) {
        const newPage = document.createElement('li');
        const pageName = document.createElement('span');
        const deleteButton = document.createElement('button'); // Create a delete button
        deleteButton.classList.add('delete-button'); // Add a class to the delete button

        pageName.textContent = `Page ${index}`;
        deleteButton.textContent = 'Delete'; // Set delete button text (you can use an icon here)

        // Event listener for clicking the delete button
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the click from propagating to the pageName click event
            const pageToDelete = event.target.parentNode;
            const pageText = pageToDelete.textContent.trim();

            // Remove the page from localStorage
            deletePageFromLocalStorage(pageText);

            // Remove the page from the UI
            pageToDelete.remove();

            // Display the first page's notes or a message if no pages exist
            const firstPage = document.querySelector('.page-list li');
            if (firstPage) {
                firstPage.click();
            } else {
                notesContainer.innerHTML = '';
                notesSection.style.display = 'none';
                welcomeMessage.style.display = 'block';
                loginRegisterForms.style.display = 'block';
            }
        });

        // Event listener for clicking the page name
        pageName.addEventListener('click', function() {
            currentPage = pageName.textContent;
            displayNotes(currentPage);

            const allPages = document.querySelectorAll('.page-list li');
            allPages.forEach(page => {
                page.classList.remove('selected-page');
            });

            newPage.classList.add('selected-page');
        });

        newPage.appendChild(pageName);
        newPage.appendChild(deleteButton); // Append the delete button to the page element
        pageList.appendChild(newPage);
        return newPage;
    }

    function deletePageFromLocalStorage(page) {
        const storedData = JSON.parse(localStorage.getItem('notesData')) || {};
        delete storedData[page];
        localStorage.setItem('notesData', JSON.stringify(storedData));
    }
    
    
});
