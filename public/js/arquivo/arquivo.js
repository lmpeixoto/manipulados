function formatDatesOnTable() {
    let dates = document.querySelectorAll('.date');
    dates.forEach((date) => {
        date.textContent = moment(date.textContent).format('DD-MM-YYYY');
    });
}

formatDatesOnTable();
