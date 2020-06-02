// @ts-check

const ArquivoUICtrl = (function () {
  const UISelectors = {
    searchInput: document.getElementById("search-input"),
    searchChoices: document.getElementById("search-choices"),
    btnSearch: document.getElementById("btn-search"),
    searchResultContainer: document.querySelector(".results-container"),
  };

  const displaySearchResult = (result) => {
    console.log(result);
    if (result) {
      UISelectors.searchResultContainer.innerHTML = result.toString();
    } else {
      UISelectors.searchResultContainer.innerHTML =
        "Não foram encontrados resultados para a sua pesquisa!";
    }
  };

  const loadEventListeners = () => {
    UISelectors.searchResultContainer.addEventListener("click", openManipulado);
  };

  function openManipulado(e) {
    if (e.target && e.target.className == "open-btn") {
      console.log(e.target.parentNode.id);
    }
  }

  return {
    UISelectors,
    displaySearchResult,
    loadEventListeners,
  };
})();

const ArquivoCtrl = (function (ArquivoUICtrl) {
  return {
    init: function () {
      ArquivoUICtrl.loadEventListeners();
    },
  };
})(ArquivoUICtrl);

ArquivoCtrl.init();
