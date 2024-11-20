function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const weekdays = ['SONNTAG', 'MONTAG', 'DIENSTAG', 'MITTWOCH', 'DONNERSTAG', 'FREITAG', 'SAMSTAG'];
    const weekday = weekdays[now.getDay()];

    clockElement.innerHTML = `
        <div id="time">${hours}:${minutes}</div>
        <div id="weekday">${weekday}</div>
    `;
}

// Aktualisiert die Uhr jede Minute
setInterval(updateClock, 60000);
updateClock();
