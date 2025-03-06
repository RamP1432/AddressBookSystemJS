document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");
    let addressBook = JSON.parse(localStorage.getItem("addressBook")) || []; // Initialize from localStorage

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
            addressBook.push(contact); // Add to array
            localStorage.setItem("addressBook", JSON.stringify(addressBook)); // Save in localStorage
            displayContacts();
            contactForm.reset();
            alert("Contact added successfully!");
        } catch (error) {
            alert(error);
        }
    });

    function validateContact(contact) {
        const namePattern = /^[A-Z][a-zA-Z]{2,}$/;
        const addressPattern = /^.{4,}$/;
        const zipPattern = /^[0-9]{5}$/;
        const phonePattern = /^[0-9]{10}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!namePattern.test(contact.firstName)) throw "Invalid First Name (Min 3 chars, start with capital)";
        if (!namePattern.test(contact.lastName)) throw "Invalid Last Name (Min 3 chars, start with capital)";
        if (!addressPattern.test(contact.address)) throw "Invalid Address (Min 4 characters)";
        if (!addressPattern.test(contact.city)) throw "Invalid City (Min 4 characters)";
        if (!addressPattern.test(contact.state)) throw "Invalid State (Min 4 characters)";
        if (!zipPattern.test(contact.zip)) throw "Invalid Zip Code (Must be 5 digits)";
        if (!phonePattern.test(contact.phone)) throw "Invalid Phone Number (Must be 10 digits)";
        if (!emailPattern.test(contact.email)) throw "Invalid Email Address";
    }

    function displayContacts() {
        contactList.innerHTML = "";
        addressBook.forEach((contact, index) => {
            let li = document.createElement("li");
            li.textContent = `${contact.firstName} ${contact.lastName} - ${contact.phone}`;
            contactList.appendChild(li);
        });
    }

    displayContacts();
});
