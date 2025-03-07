document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");
    const contactCount = document.getElementById("contactCount"); // For displaying count
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
            li.textContent = `${contact.firstName} ${contact.lastName} - ${contact.phone}`;

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

        updateContactCount(); // Update count when displaying contacts
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

    displayContacts();
});
