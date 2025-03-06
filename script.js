document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            zip: document.getElementById("zip").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value
        };

        saveContact(contact);
        displayContacts();
        contactForm.reset();
    });

    function saveContact(contact) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.push(contact);
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    function displayContacts() {
        contactList.innerHTML = "";
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

        contacts.forEach((contact, index) => {
            let li = document.createElement("li");
            li.textContent = `${contact.firstName} ${contact.lastName} - ${contact.phone}`;
            contactList.appendChild(li);
        });
    }

    displayContacts();
});
