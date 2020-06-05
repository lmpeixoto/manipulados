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

    const loadEventListeners = () => {
        UISelectors.searchResultContainer.addEventListener(
            'click',
            editManipulado
        );
    };

    function editManipulado(e) {
        e.preventDefault();
        if (e.target && e.target.className == 'edit-btn') {
            let manipuladoID = e.target.parentNode.id.split('-')[1];
            console.log(manipuladoID);
            let form = e.target.parentNode.parentNode;
            form.action = '/editarManipulado' + `?manipuladoID=${manipuladoID}`;
            form.submit();
        }
    }
    // function openManipulado(e) {
    //   e.preventDefault();
    //   if (e.target && e.target.className == "edit-btn") {
    //     let manipuladoID = e.target.parentNode.id.split("-")[1];
    //     console.log(manipuladoID);
    //     fetch("/editarManipulado", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         manipuladoID: manipuladoID,
    //       }),
    //     })
    //       .then((response) => response.json())
    //       .then((response) => {
    //         console.log(response);
    //       })
    //       .catch((err) => console.log(err));
    //   }
    // }

    return {
        UISelectors,
        displaySearchResult,
        loadEventListeners
    };
})();

const ArquivoCtrl = (function (ArquivoUICtrl) {
    return {
        init: function () {
            ArquivoUICtrl.loadEventListeners();
        }
    };
})(ArquivoUICtrl);

ArquivoCtrl.init();
