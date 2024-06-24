document.addEventListener("DOMContentLoaded", () => {
    interface Book {
        title: string;
        author: string;
        pages: number;
        isRead: boolean;
        toggleIsRead: Function;
    }

    let libraryArray: Array<Book> = [];
    const dialog = document.querySelector("dialog");

    const showButton = document.getElementById("openNewBookDialog");
    showButton.addEventListener("click", () => dialog.showModal());

    document.getElementById("bookForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const title = (document.getElementById("newTitle") as HTMLInputElement)
            .value;
        const author = (
            document.getElementById("newAuthor") as HTMLInputElement
        ).value;
        const pages = (document.getElementById("newPages") as HTMLInputElement)
            .value;

        addBookToLibrary(new Book(title, author, parseInt(pages)));

        console.log(libraryArray);

        renderBookCards();

        dialog.close();
    });

    function addBookToLibrary(book: Book) {
        libraryArray.push(book);
    }

    function Book(this: any, title: string, author: string, pages: number) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = false;

        this.toggleIsRead = function () {
            this.isRead = !this.isRead;
        };

        this.info = function () {
            console.log(
                `${this.title} by ${this.author}, ${this.pages} pages, ${
                    this.isRead ? "it was read" : "not read yet"
                }.`
            );
        };
    }

    const TheLordOfTheRings = new Book(
        "The Lord of the Rings",
        "J.R.R. Tolkien",
        299
    );

    addBookToLibrary(new Book("Grease", "Author of Grease", 356));
    addBookToLibrary(new Book("JP", "JP", 211));
    addBookToLibrary(new Book("penis", "Max M.", 222));
    addBookToLibrary(new Book("ARRRH!", "Max M.", 222));
    addBookToLibrary(new Book("BLEIGH!", "Max M.", 222));

    console.log("Books: ", libraryArray);

    let container = document.getElementById("booksList");

    // Render book cards
    function renderBookCards() {
        if (container) {
            container.innerHTML = "";
        }
        libraryArray.forEach((book) => {
            if (container) {
                const newCard = document.createElement("div");
                newCard.classList.add("bookCard");
                newCard.append(document.createTextNode(`${book.title}`));
                container.append(newCard);
                newCard.append(
                    document.createTextNode(
                        `${book.isRead ? " -> gelesen" : " -> ungelesen"}`
                    )
                );
                container.append(newCard);
                const newButton = document.createElement("button");
                newButton.setAttribute("id", "deleteBookButton");
                newButton.innerHTML = "Remove";
                newButton.addEventListener("click", (event) => {
                    libraryArray = libraryArray.filter(
                        (filteredBook) => filteredBook.title !== book.title
                    );
                    console.log("removing book...");
                    renderBookCards();
                });
                newCard.append(newButton);

                const readButton = document.createElement("button");
                readButton.setAttribute("id", "readBookButton");
                readButton.innerHTML = "Toggle Read";
                readButton.addEventListener("click", (event) => {
                    book.toggleIsRead();
                    renderBookCards();
                });
                newCard.append(readButton);
            } else {
                container = document.getElementById("booksList");
                console.log("Ulf is not present to read", book);
            }
        });
    }

    renderBookCards();
});
