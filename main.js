// const track = document.querySelector('.slider_track');
// const slides = document.querySelectorAll('.slide');
// const prevBtn = document.querySelector('.prev');
// const nextBtn = document.querySelector('.next');

// let currentSlide = 0;
// const totalSlides = slides.length;

// function updateSlidePosition(){
//     const offset = currentSlide * -100;
//     track.style.transform = `translateX(${offset}%)`;
//     applySlideEffects();
// }
// function applySlideEffects(){
//     slides.forEach((slide, index) => {
//         slide.style.transform = 'rotateY(0)';
//         if(index === currentSlide){
//             slide.style.transform = 'scale(1) rotateY(0deg)';
//         } else {
//             slide.style.transform = 'scale(.8) rotateY(-15deg)';
//         }
//     });
// }
// prevBtn.addEventListener('click', () => {
//     currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
//     updateSlidePosition();
// });
// nextBtn.addEventListener('click', () => {
//     currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
//     updateSlidePosition();
// });
// updateSlidePosition();

// script.js
document.addEventListener("DOMContentLoaded", () => {
    const submitBookingBtn = document.querySelector("#submitBookingBtn");
    const bookingList = document.querySelector("#bookingList tbody");

    const deleteModal = document.querySelector("#deleteModal");
    const confirmDeleteBtn = document.querySelector("#confirmDeleteBtn");
    const cancelDeleteBtn = document.querySelector("#cancelDeleteBtn");

    let bookings = [];
    let editIndex = -1;
    let deleteIndex = -1; // New variable to track index for deletion

    const loadBookings = () => {
        const storedBookings = localStorage.getItem("bookings");
        if (storedBookings) bookings = JSON.parse(storedBookings);
        renderBookings();
    };

    const saveBookings = () => {
        localStorage.setItem("bookings", JSON.stringify(bookings));
    };

    const renderBookings = () => {
        bookingList.innerHTML = ""; // Clear existing rows
        bookings.forEach((booking, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${booking.name}</td>
                <td>${booking.email}</td>
                <td>${booking.bookingDate}</td>
                <td>
                    <button class="btn edit-btn primary-btn" data-index="${index}">Edit</button>
                    <button class="btn delete-btn primary-btn" data-index="${index}">Delete</button>
                </td>
            `;
            bookingList.appendChild(row);
        });
    };

    const clearForm = () => {
        document.querySelector("#name").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#bookingDate").value = "";
        editIndex = -1; // Reset edit mode
    };

    submitBookingBtn.onclick = () => {
        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const bookingDate = document.querySelector("#bookingDate").value.trim();

        if (name && email && bookingDate) {
            if (editIndex === -1) {
                // Add new booking
                bookings.push({ name, email, bookingDate });
            } else {
                // Update existing booking
                bookings[editIndex] = { name, email, bookingDate };
                editIndex = -1; // Exit edit mode
            }
            saveBookings();
            renderBookings();
            clearForm();
        }
    };

    bookingList.onclick = (e) => {
        const index = e.target.dataset.index;
        
        if (e.target.classList.contains("delete-btn")) {
            deleteIndex = index; // Set the index for deletion
            deleteModal.style.display = "flex"; // Show the modal
        } else if (e.target.classList.contains("edit-btn")) {
            // Edit booking
            const booking = bookings[index];
            document.querySelector("#name").value = booking.name;
            document.querySelector("#email").value = booking.email;
            document.querySelector("#bookingDate").value = booking.bookingDate;
            editIndex = index; 
        }
    };

    // Modal confirm and cancel actions
    confirmDeleteBtn.onclick = () => {
        bookings.splice(deleteIndex, 1);
        saveBookings();
        renderBookings();
        deleteModal.style.display = "none"; // Hide the modal
    };

    cancelDeleteBtn.onclick = () => {
        deleteModal.style.display = "none"; // Hide the modal
        deleteIndex = -1; // Reset delete index
    };

    loadBookings();
});
