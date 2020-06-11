// @ts-check

const ArquivoUICtrl = (function () {
    const UISelectors = {
        searchInput: document.getElementById('search-input'),
        searchChoices: document.getElementById('search-choices'),
        btnSearch: document.getElementById('btn-search'),
        searchResultContainer: document.querySelector('.results-container')
    };

    const displaySearchResult = (result) => {
        console.log(result);
        if (result) {
            UISelectors.searchResultContainer.innerHTML = result.toString();
        } else {
            UISelectors.searchResultContainer.innerHTML =
                'Não foram encontrados resultados para a sua pesquisa!';
        }
    };

    function formatDatesOnResults() {
        let dates = document.querySelectorAll('.date');
        dates.forEach((date) => {
            date.textContent = moment(date.textContent).format('DD-MM-YYYY');
        });
    }

    function addEventListenersToSearchResult() {
        let editButtons = document.querySelectorAll('.btn-edit');

        editButtons.forEach((button) => {
            button.addEventListener('click', editManipulado);
        });

        function editManipulado(e) {
            e.preventDefault();
            let manipuladoID = e.target.parentNode.parentNode.parentNode.id.split(
                '-'
            )[1];
            let form = e.target.parentNode.parentNode.parentNode.parentNode;
            form.action = '/editarManipulado' + `?manipuladoID=${manipuladoID}`;
            form.submit();
        }

        let viewButtons = document.querySelectorAll('.btn-view');

        viewButtons.forEach((button) => {
            button.addEventListener('click', viewManipulado);
        });

        function viewManipulado(e) {
            e.preventDefault();
            let manipuladoID = e.target.parentNode.parentNode.parentNode.id.split(
                '-'
            )[1];
            let form = e.target.parentNode.parentNode.parentNode.parentNode;
            form.action = '/verManipulado' + `?manipuladoID=${manipuladoID}`;
            form.submit();
        }
    }

    return {
        UISelectors,
        displaySearchResult,
        addEventListenersToSearchResult,
        formatDatesOnResults
    };
})();

const ArquivoCtrl = (function (ArquivoUICtrl) {
    return {
        init: function () {
            ArquivoUICtrl.addEventListenersToSearchResult();
            ArquivoUICtrl.formatDatesOnResults();
        }
    };
})(ArquivoUICtrl);

ArquivoCtrl.init();
