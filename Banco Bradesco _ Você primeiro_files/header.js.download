function addClassToSubsItems() {
  const subs = mainHeader.getElementsByClassName("sub");

  for (let sub of subs) {
    sub.onmouseover = () => {
      sub.classList.add("active_arrow");
    };

    sub.onmouseleave = () => {
      sub.classList.remove("active_arrow");
    };
  }
}

function openSearchModal() {
  textobusca.onclick = () => {
    const modal = document.getElementsByClassName("modal-busca")[0];

    modal.classList.add("active");
  };

  textobuscamobile.onclick = () => {
    const modal = document.getElementsByClassName("modal-busca")[0];

    document.body.classList.add("remove-scroll");

    modal.classList.add("active");
  }
}

function closeSearchModal() {
  const closeModal = document.getElementById("fechar-modal-busca");
  const searchField = document.getElementById("campo-busca");

  closeModal.onclick = () => {
    const modal = document.getElementsByClassName("modal-busca")[0];

    modal.classList.remove("active");
    searchField.value = "";


    document.body.classList.remove("remove-scroll");
  };
}

function SendSearchForm(saveTerm) {

  const termSearched = ValorCampoBusca();

  if (saveTerm == true || saveTerm == undefined) {
    let lastWordsSearched = getCookieBusca("lastWordsSearched");

    if (
      lastWordsSearched != null &&
      lastWordsSearched != undefined &&
      lastWordsSearched != ""
    ) {
      const lastWordsSearchedArray = lastWordsSearched.split("|");
      var isSearched = false;

      for (
        var counter = 0;
        counter < lastWordsSearchedArray.length;
        counter++
      ) {
        if (
          lastWordsSearchedArray[counter].toLowerCase() ==
          termSearched.toLowerCase()
        )
          isSearched = true;
      }

      if (isSearched == false) {
        lastWordsSearched = lastWordsSearched + "|" + termSearched;
      }
    } else {
      lastWordsSearched = termSearched;
    }

    setCookie("lastWordsSearched", lastWordsSearched, 30);
  }

  const urlToRedirect = setNewUrlToSearch(termSearched);
  $(location).attr('href', urlToRedirect);

}

function ValorCampoBusca() {
  const termSearchedAux = document.getElementById("campo-busca").value;
  return termSearchedAux.trim().includes("<script>") || termSearchedAux.trim() === '' ? '' : termSearchedAux.toString().toLowerCase();
}

function setNewUrlToSearch(termSearchedAux) {
  if (
    window.location.origin.includes("localhost") ||
    window.location.origin.includes("127.0.0.1") ||
    window.location.origin.includes("")
  ) {
    return "https://banco.bradesco/html/classic/resultado-busca/index-nova-busca.shtm?termsearched=" + termSearchedAux + "&segmentFilter=Classic";
  }
  return window.location.protocol + "//" + window.location.host + "/html/classic/resultado-busca/index-nova-busca.shtm?termsearched=" + termSearchedAux + "&segmentFilter=Classic";
}

function handleSearchForm() {
  const searchButton = document.getElementById("search-button");
  const searchField = document.getElementById("campo-busca");
  const seeResults = document.getElementById("ver-resultados");
  const searchForm = document.getElementById("search-form");

  // Execute a function when the user presses a key on the keyboard
  searchField.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      if (searchField.value) {
        SendSearchForm(true);
      }
    }
  });

  searchButton.onclick = (e) => {
    e.preventDefault();

    if (searchField.value) {
      SendSearchForm(true);
    }
  };
  
  seeResults.onclick = () => {
    if (searchField.value) {
      SendSearchForm(true);
    }
  };

  searchForm.onsubmit = (e) => {
    e.preventDefault();

    if (searchField.value) {
      SendSearchFormSubmit();
    }
  };
}

function SendSearchFormSubmit() {
  const searchField = document.getElementById("campo-busca");
  e.preventDefault();
  if (searchField.value) {
    SendSearchForm(true);
  }
}

function FillAndSearch(term) {
  document.getElementById("campo-busca").value = term;
  SendSearchForm(false);
}

function getRecentsSearchs() {
  const searchsRecentsContent = document.getElementById(
    "buscas-recentes-content"
  );
  const lastWordsSearched = getCookieBusca("lastWordsSearched");

  if (lastWordsSearched != "") {
    const lastWordsSearchedArray = lastWordsSearched.split("|");

    searchsRecentsContent.innerHTML = "";

    for (let counter = 0; counter < lastWordsSearchedArray.length; counter++) {
      const liSearched = document.createElement("li");
      liSearched.onclick = (event) => {
        FillAndSearch(event.target.textContent);
      };
      liSearched.innerText = lastWordsSearchedArray[counter];

      searchsRecentsContent.appendChild(liSearched);
    }
  } else {
    if (searchsRecentsContent.innerHTML == "") {
      searchsRecentsContent.appendChild(
        '<li class="empty">Você ainda não fez nenhuma busca</li>'
      );
    }
  }
}

function handleDesktop() {
  $(".recentes").removeClass("none");
  $(".input label").addClass("none");

  $("#campo-busca")
    .val("")
    .on("keyup", function (e) {
      if ($(this).val().length > 0) {
        // $(".search-icon").addClass("none");
        $(".arrow-back-icon").addClass("none");
        $(".search-close-icon").removeClass("none");

        $(".buscas").removeClass("none");

        $(".mais-buscados").addClass("none");
        $(".recentes").addClass("none");
        $(".sugestoes").removeClass("none");
        $("#ver-resultados").removeClass("none");

        $(".voice-container").addClass("none hover");
        $("#voice-close-button").addClass("none");
        $("#voice-search-button").removeClass("none");
        $("#voice-open-button").removeClass("active");

        $(".para-voce-container").addClass("none");
        $(".interesse-container").removeClass("none");
      } else {
        // $(".search-icon").removeClass("none");
        $(".search-close-icon").addClass("none");
        $(".arrow-back-icon").addClass("none");

        $(".mais-buscados").removeClass("none");
        $(".recentes").removeClass("none");
        $(".sugestoes").addClass("none");

        $(".para-voce-container").removeClass("none");
        $(".interesse-container").addClass("none");
      }
    });

  $(".input-search-container .icon").click(function () {
    $("#campo-busca").val("");
    $(".search-icon").removeClass("none");
    $(".search-close-icon").addClass("none");

    $(".buscas").removeClass("none");

    $(".mais-buscados").removeClass("none");
    $(".recentes").removeClass("none");
    $(".sugestoes").addClass("none");

    $(".voice-container").addClass("none");
    $(".para-voce-container").removeClass("none");
    $(".interesse-container").addClass("none");

    $("#voice-close-button").addClass("none");
    $("#voice-search-button").removeClass("none");
  });

  $("#voice-search-button").click(function () {
    $(this).addClass("none");
    $("#voice-close-button").removeClass("none");

    $("#campo-busca").val("");

    $(".search-icon").removeClass("none");
    $(".search-close-icon").addClass("none");

    $(".buscas").addClass("none");
    $(".voice-container").removeClass("none");

    $(".para-voce-container").addClass("none");
    $(".interesse-container").addClass("none");
  });

  $("#voice-close-button").click(function () {
    $(this).addClass("none");
    $("#voice-search-button").removeClass("none");

    $(".buscas").removeClass("none");
    $(".mais-buscados").removeClass("none");
    $(".recentes").removeClass("none");
    $(".sugestoes").addClass("none");

    $(".voice-container").addClass("none hover");
    $("#voice-open-button").removeClass("active");

    $(".para-voce-container").removeClass("none");
    $(".interesse-container").addClass("none");
  });

  $("#voice-open-button").click(function () {
    $(this).addClass("active");
    $(".voice-container").removeClass("hover");
    $("#voice-text").text("Cartões");
  });
}

function handleMobile() {
  $(".recentes").addClass("none");
  $(".input label").removeClass("none");

  $("#voice-mobile-open-button")
    .on("touchstart mousedown", function (e) {
      e.preventDefault();

      $("#voice-mobile-open-button .icon").addClass("active");
      $("#voice-mobile-open-button .icon img").attr(
        "src",
        "/assets/classic/home/common/resultado-busca/svg/" +
        pathArray[1] +
        'https://assets.bradesco/content/dam/portal-bradesco/icon-voice-color.svg'
      );
      $("#voice-text-mobile").text("Escutando...");
    }, { passive: true })
    .on("touchend mouseup", function (e) {
      e.preventDefault();

      $("#voice-mobile-open-button .icon").removeClass("active");
      $("#voice-mobile-open-button .icon img").attr(
        "src",
        'https://assets.bradesco/content/dam/portal-bradesco/assets/classic/home/common/resultado-busca/svg/icon-voice-white.svg'
      );
      $("#voice-text-mobile").text("Entendido... Pesquisando...");

      $("#campo-busca").val("Cartões");
      $(".input label").addClass("keep-float");

      $(".arrow-back-icon").removeClass("none").css("height", "12px");

      $(".mais-buscados").addClass("none");
      $(".recentes").addClass("none");

      $(".sugestoes").removeClass("none");
      $("#ver-resultados").addClass("none");
    }, { passive: true });

  $("#campo-busca")
    .removeAttr("placeholder")
    .val("")
    .on("focus", function (e) {
      $(this).removeAttr("placeholder");
      if ($(this).val().length <= 0) {
        $(".mais-buscados").addClass("none");
        $(".recentes").removeClass("none");
        $(".sugestoes").addClass("none");
      } else {
        $("#voice-text-mobile").text("Aperte para falar");
      }
    })
    .on("blur", function (e) {
      $(this).removeAttr("placeholder");
      if ($(this).val().length <= 0) {
        $(".mais-buscados").removeClass("none");
        $(".recentes").addClass("none");
        $(".sugestoes").addClass("none");
      }
    })
    .on("keyup", function (e) {
      if ($(this).val().length > 0) {
        $(".input label").addClass("keep-float");

        $(".search-close-icon").addClass("none");
        $(".arrow-back-icon").removeClass("none").css("height", "12px");

        $(".mais-buscados").addClass("none");
        $(".recentes").addClass("none");

        $(".sugestoes").removeClass("none");
        $("#ver-resultados").addClass("none");
      } else {
        $(".input label").removeClass("keep-float");

        $(".search-icon").removeClass("none");
        $(".arrow-back-icon").addClass("none");

        $(".recentes").removeClass("none");
        $(".sugestoes").addClass("none");
      }
    });

  $(".arrow-back-icon").click(function () {
    $(".search-icon").removeClass("none");
    $(".search-close-icon").addClass("none");
    $(".arrow-back-icon").addClass("none");

    $("#campo-busca").val("");
    $(".input label").removeClass("keep-float");

    $(".mais-buscados").removeClass("none");

    $(".sugestoes").addClass("none");
    $(".recentes").addClass("none");

    $("#voice-text-mobile").text("Aperte para falar");
  });
}

function handleDrag() {
  // Drag cards
  var paraVoce = document.querySelector("#para-voce");
  var interesse = document.querySelector("#interesse");

  if (paraVoce) createDrag(paraVoce);
  if (interesse) createDrag(interesse);

  function createDrag(element) {
    var drag = element;
    var isDown = false;
    var startX;
    var scrollLeft;

    drag.addEventListener("mousedown", function (e) {
      isDown = true;
      drag.classList.add("active");
      startX = e.pageX - drag.offsetLeft;
      scrollLeft = drag.scrollLeft;
    });
    drag.addEventListener("mouseleave", function () {
      isDown = false;
      drag.classList.remove("active");
    });
    drag.addEventListener("mouseup", function (e) {
      e.preventDefault();
      isDown = false;
      drag.classList.remove("active");
    });
    drag.addEventListener("mousemove", function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - drag.offsetLeft;
      var walk = (x - startX) * 0.5; //scroll-fast
      drag.scrollLeft = scrollLeft - walk;
    });
  }
}

function initHeader() {
  addClassToSubsItems();
  openSearchModal();
  closeSearchModal();
  handleSearchForm();
  getRecentsSearchs();
  handleDrag();

  // Verifica o funcionamento da tela de acordo com a resolução
  // ao carregar a tela;
  const windowWidth = $(window).outerWidth();
  if (windowWidth <= 680) {
    $(".recentes").addClass("none");
    handleMobile();
  } else {
    $(".recentes").removeClass("none");
    handleDesktop();
  }

  // Ajusta o funcionamento da tela de acordo com a resolução,
  // quando o usuário der resize na tela;;
  $(window).resize(function () {
    const windowWidth = $(window).outerWidth();

    if (windowWidth <= 680) {
      handleMobile();
    } else {
      handleDesktop();
    }
  });
}

initHeader();

// Exibe o Botão fixo no scroll
window.onscroll = function () {
  var mydivpos = $(window).outerWidth() <= 680 ? 0 : document.getElementsByClassName("MainMenuMobile")[0].offsetTop + 50;
  if (($(this).scrollTop() > mydivpos)) {
    $("#float-abra-conta-link").addClass("active");
  } else {
    $("#float-abra-conta-link").removeClass("active");
  }
};