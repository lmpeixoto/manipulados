function formatDatesOnTable() {
    let dates = document.querySelectorAll('.date');
    dates.forEach((date) => {
        date.textContent = moment(date.textContent).format('DD-MM-YYYY');
    });
}

formatDatesOnTable();

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll('tr'));

    // Sort each row
    const sortedRows = sortRows(rows, column, dirModifier);

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table
        .querySelectorAll('th')
        .forEach((th) => th.classList.remove('th-sort-asc', 'th-sort-desc'));
    table
        .querySelector(`th:nth-child(${column + 1})`)
        .classList.toggle('th-sort-asc', asc);
    table
        .querySelector(`th:nth-child(${column + 1})`)
        .classList.toggle('th-sort-desc', !asc);
}

document.querySelectorAll('.table th').forEach((headerCell) => {
    headerCell.addEventListener('click', () => {
        const tableElement =
            headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(
            headerCell.parentElement.children,
            headerCell
        );
        const currentIsAscending = headerCell.classList.contains('th-sort-asc');

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});
function sortRows(rows, column, dirModifier) {
    return rows.sort((a, b) => {
        const aColText = a
            .querySelector(`td:nth-child(${column + 1})`)
            .textContent.trim();
        const bColText = b
            .querySelector(`td:nth-child(${column + 1})`)
            .textContent.trim();
        return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
    });
}
let editButtons = document.querySelectorAll('.btn-warning');

editButtons.forEach((button) => {
    button.addEventListener('click', editManipulado);
});

function editManipulado(e) {
    e.preventDefault();
    let manipuladoID = e.target.parentElement.parentElement.className.split(
        '-'
    )[1];
    console.log(manipuladoID);
    let form =
        e.target.parentElement.parentElement.parentElement.parentElement
            .parentElement;
    form.action = '/editarManipulado' + `?manipuladoID=${manipuladoID}`;
    form.method = 'POST';
    console.log(form);
    form.submit();
}

let viewButtons = document.querySelectorAll('.btn-primary');

viewButtons.forEach((button) => {
    button.addEventListener('click', viewManipulado);
});

function viewManipulado(e) {
    e.preventDefault();
    let manipuladoID = e.target.parentElement.parentElement.className.split(
        '-'
    )[1];
    console.log(manipuladoID);
    let form =
        e.target.parentElement.parentElement.parentElement.parentElement
            .parentElement;
    form.action = '/verManipulado' + `?manipuladoID=${manipuladoID}`;
    form.method = 'POST';
    console.log(form);
    form.submit();
}
