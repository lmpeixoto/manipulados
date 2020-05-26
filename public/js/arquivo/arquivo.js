const ArquivoUICtrl = (function () {
  const UISelectors = {
    searchInput: document.getElementById("search-input"),
    searchChoices: document.getElementById("search-choices"),
    btnSearch: document.getElementById("btn-search"),
  };

  return {
    UISelectors,
  };
})();

const ArquivoCtrl = (function (ArquivoUICtrl) {
  const loadEventListeners = () => {
    ArquivoUICtrl.UISelectors.btnSearch.addEventListener("click", search);
  };

  const search = (e) => {
    e.preventDefault();
    let searchQuery = ArquivoUICtrl.UISelectors.searchInput.value;
    let searchChoice = ArquivoUICtrl.UISelectors.searchChoices.value;
    fetch("/arquivo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchQuery, searchChoice }),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
    init: function () {
      loadEventListeners();
    },
  };
})(ArquivoUICtrl);

ArquivoCtrl.init();
