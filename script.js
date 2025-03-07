document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");
    const contactCount = document.getElementById("contactCount");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    let addressBook = JSON.parse(localStorage.getItem("addressBook")) || [];

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

            const isDuplicate = addressBook
                .filter(person => 
                    person.firstName.toLowerCase() === contact.firstName.toLowerCase() &&
                    person.lastName.toLowerCase() === contact.lastName.toLowerCase()
                ).length > 0;

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

    function searchContacts() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            alert("Please enter a city or state to search.");
            return;
        }

        const results = addressBook.filter(contact =>
            contact.city.toLowerCase() === query || contact.state.toLowerCase() === query
        );

        searchResults.innerHTML = results.length 
            ? results.map(contact => `<li>${contact.firstName} ${contact.lastName} - ${contact.city}, ${contact.state}</li>`).join("")
            : "<li>No contacts found</li>";

        alert(`Found ${results.reduce(total => total + 1, 0)} contact(s) matching '${query}'`);
    }

    displayContacts();
});
