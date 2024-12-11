document.addEventListener("DOMContentLoaded", () => {
    const calendarDiv = document.getElementById("calendar");
    const selectedDateDiv = document.createElement("div");
    selectedDateDiv.id = "selected-date";
    selectedDateDiv.style.marginTop = "1rem";
    selectedDateDiv.style.fontWeight = "bold";
    calendarDiv.parentNode.appendChild(selectedDateDiv);

    // Initialize current date
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let selectedDate = null;

    // Month and day names
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Function to render the calendar
    function renderCalendar(month, year) {
        calendarDiv.innerHTML = ""; // Clear existing content

        // Create header for month navigation
        const header = document.createElement("div");
        header.className = "calendar-header";
        header.innerHTML = `
            <button class="nav-button" id="prevMonth">&lt;</button>
            <span class="month-year">${monthNames[month]} ${year}</span>
            <button class="nav-button" id="nextMonth">&gt;</button>
        `;
        calendarDiv.appendChild(header);

        // Event listeners for navigation
        document.getElementById("prevMonth").addEventListener("click", () => {
            currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
            currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
            renderCalendar(currentMonth, currentYear);
        });

        document.getElementById("nextMonth").addEventListener("click", () => {
            currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
            currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
            renderCalendar(currentMonth, currentYear);
        });

        // Create weekday headers
        const daysHeader = document.createElement("div");
        daysHeader.className = "days-header";
        daysOfWeek.forEach(day => {
            const dayElem = document.createElement("div");
            dayElem.className = "day-name";
            dayElem.textContent = day;
            daysHeader.appendChild(dayElem);
        });
        calendarDiv.appendChild(daysHeader);

        // Create days grid
        const daysGrid = document.createElement("div");
        daysGrid.className = "days-grid";

        // Get first day of the month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Fill in empty slots before the first day
        for (let i = 0; i < firstDay; i++) {
            const emptySlot = document.createElement("div");
            emptySlot.className = "day empty";
            daysGrid.appendChild(emptySlot);
        }

        // Fill in days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const daySlot = document.createElement("div");
            daySlot.className = "day";
            daySlot.textContent = day;

            // Highlight today's date
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                daySlot.classList.add("today");
            }

            // Highlight selected date
            if (selectedDate && selectedDate.day === day && selectedDate.month === month && selectedDate.year === year) {
                daySlot.classList.add("selected");
            }

            // Add click event to select a date
            daySlot.addEventListener("click", () => {
                selectedDate = { day, month, year };
                displaySelectedDate();
                renderCalendar(currentMonth, currentYear); // Re-render to update highlight
            });

            daysGrid.appendChild(daySlot);
        }

        calendarDiv.appendChild(daysGrid);
    }

    // Function to display the selected date
    function displaySelectedDate() {
        if (selectedDate) {
            selectedDateDiv.textContent = `You have selected: ${monthNames[selectedDate.month]} ${selectedDate.day}, ${selectedDate.year}`;
        } else {
            selectedDateDiv.textContent = "";
        }
    }

    // Render the initial calendar
    renderCalendar(currentMonth, currentYear);
});
