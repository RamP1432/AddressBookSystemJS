document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");
    const contactCount = document.getElementById("contactCount");
    const viewInput = document.getElementById("viewInput");
    const viewResults = document.getElementById("viewResults");
    let addressBook = JSON.parse(localStorage.getItem("addressBook")) || [];

    function validateContact(contact) {
        
        const zipRegex = /^[1-9][0-9]{5}$/;
        
        if (!zipRegex.test(contact.zip)) throw "Invalid ZIP Code!";
        
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const contact = {
            firstName: document.getElementById("firstName").value.trim(),
            lastName: document.getElementById("lastName").value.trim(),
            address: document.getElementById("address").value.trim(),
            city: document.getElementById("city").value.trim(),
            state: document.getElementById("state").value.trim(),
            zip: document.getElementById("zip").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            email: document.getElementById("email").value.trim()
        };

        try {
            validateContact(contact);

            const isDuplicate = addressBook.some(person => 
                person.firstName.toLowerCase() === contact.firstName.toLowerCase() &&
                person.lastName.toLowerCase() === contact.lastName.toLowerCase()
            );

            if (isDuplicate) {
                alert("Duplicate Entry! This contact already exists.");
                return;
            }

            addressBook.push(contact);
            localStorage.setItem("addressBook", JSON.stringify(addressBook));
            displayContacts();
            contactForm.reset();
            alert("Contact added successfully!");
        } catch (error) {
            alert(error);
        }
    });

    function displayContacts() {
        contactList.innerHTML = "";
        addressBook.forEach((contact, index) => {
            let li = document.createElement("li");
            li.textContent = `${contact.firstName} ${contact.lastName} - ${contact.city}, ${contact.state}`;

            let editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.onclick = () => editContact(index);

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => deleteContact(index);

            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
            contactList.appendChild(li);
        });

        updateContactCount();
    }

    function deleteContact(index) {
        if (confirm("Are you sure you want to delete this contact?")) {
            addressBook.splice(index, 1);
            localStorage.setItem("addressBook", JSON.stringify(addressBook));
            displayContacts();
        }
    }

    function updateContactCount() {
        const count = addressBook.reduce((total) => total + 1, 0);
        contactCount.textContent = `Total Contacts: ${count}`;
    }

    function viewPersonsByCityOrState() {
        const query = viewInput.value.trim().toLowerCase();
        if (!query) {
            alert("Please enter a city or state to view contacts.");
            return;
        }

        const results = addressBook.filter(contact =>
            contact.city.toLowerCase() === query || contact.state.toLowerCase() === query
        );

        viewResults.innerHTML = results.length 
            ? results.map(contact => `<li>${contact.firstName} ${contact.lastName} - ${contact.city}, ${contact.state}</li>`).join("")
            : "<li>No contacts found</li>";

        alert(`Found ${results.reduce(total => total + 1, 0)} contact(s) in '${query}'`);
    }

    function countContactsByCityOrState() {
        const query = document.getElementById("countInput").value.trim().toLowerCase();
        if (!query) {
            alert("Please enter a city or state to count.");
            return;
        }

        const matchingContacts = addressBook.filter(contact =>
            contact.city.toLowerCase() === query || contact.state.toLowerCase() === query
        );

        const totalCount = matchingContacts.reduce(total => total + 1, 0);

        document.getElementById("countResult").textContent = 
            `Total contacts in '${query}': ${totalCount}`;
    }

    function sortContacts() {
        const criteria = document.getElementById("sortBy").value;
        
        if (!criteria) {
            alert("Please select a sorting criteria.");
            return;
        }
    
        const sortedContacts = [...addressBook].sort((a, b) => {
            return a[criteria].localeCompare(b[criteria]);
        });
    
        const sortedList = document.getElementById("sortedResults");
        sortedList.innerHTML = sortedContacts
            .map(contact => `<li>${contact.firstName} ${contact.lastName} - ${contact[criteria]}</li>`)
            .join("");
    }
    
    displayContacts();
});
