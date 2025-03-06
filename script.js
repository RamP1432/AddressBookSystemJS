document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");

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
            saveContact(contact);
            displayContacts();
            contactForm.reset();
            alert("Contact added successfully!");
        } catch (error) {
            alert(error);
        }
    });

    function validateContact(contact) {
        const namePattern = /^[A-Z][a-zA-Z]{2,}$/; // Capital first letter, min 3 characters
        const addressPattern = /^.{4,}$/; // Min 4 characters
        const zipPattern = /^[0-9]{5}$/; // 5-digit zip code
        const phonePattern = /^[0-9]{10}$/; // 10-digit phone number
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Valid email format

        if (!namePattern.test(contact.firstName)) throw "Invalid First Name (Min 3 chars, start with capital)";
        if (!namePattern.test(contact.lastName)) throw "Invalid Last Name (Min 3 chars, start with capital)";
        if (!addressPattern.test(contact.address)) throw "Invalid Address (Min 4 characters)";
        if (!addressPattern.test(contact.city)) throw "Invalid City (Min 4 characters)";
        if (!addressPattern.test(contact.state)) throw "Invalid State (Min 4 characters)";
        if (!zipPattern.test(contact.zip)) throw "Invalid Zip Code (Must be 5 digits)";
        if (!phonePattern.test(contact.phone)) throw "Invalid Phone Number (Must be 10 digits)";
        if (!emailPattern.test(contact.email)) throw "Invalid Email Address";
    }

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
