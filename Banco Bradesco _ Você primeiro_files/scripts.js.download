// Função para abrir o menu de produtos e serviços para urls que terminam com #produtos-servicos
window.addEventListener("DOMContentLoaded", function () {
    if (window.location.href.includes("/html/classic/index.shtm#produtos-servicos")) {
        var produtosServicos = document.getElementById("mm-2");

        if (produtosServicos) {
            produtosServicos.classList.remove("mm-hidden");
            produtosServicos.classList.add("selected");
        }
    }
});

// Função para abrir o menu de canais digitais para urls que terminam com #canais
window.addEventListener("DOMContentLoaded", function () {
    if (window.location.href.includes("/html/classic/index.shtm#canais-digitais")) {
        var canaisDigitais = document.getElementById("mm-3");

        if (canaisDigitais) {
            canaisDigitais.classList.remove("mm-hidden");
            canaisDigitais.classList.add("selected");
        }
    }
});

// Função para limpar a hash da URL quando o menu é fechado
var primeiroClique = true;
document.addEventListener('click', function(event) {
    if (primeiroClique) {
        history.replaceState(null, document.title, window.location.pathname);
        primeiroClique = false;
    }
});


setTimeout(function() {
    if (window.location.href.includes("#Sistema-de-Informacoes-de-Creditos-SCR")) {
        $('.sistema').click()
    }
}, 1000);

window.trackBradesco = function () { var a = Array.prototype.slice.call(arguments); dataLayer.push({ event: "ga.custom_event", custom: { category: a[0], action: a[1], label: a[2] } }) };

function trackPortal(location, action, element, product, flow){
	dataLayer.push({
		'event': 'Event_Data',
		'event_type': 'new',
		'ga_event': {
			'location': location,
			'action': action,
			'element_name': element
		},
		'product': {
			'product': product,
			'flow': flow
		},
		'user': {
			'segment': 'classic',
			'logged_user': 'deslogado',
		},
	})
}


$(document).ready(function () {
  var magnificPopup = $.magnificPopup.instance;
  function modalIB() {
    $('.modalIB').magnificPopup({
      type: 'ajax',
      callbacks: {
        parseAjax: function (mfpResponse) {
          var data = $(mfpResponse.data).filter('#modalIB').removeClass('mfp-hide');

          var modalWidth = $(magnificPopup.st.el).attr('data-width');
          $('.mfp-content').css({
            'max-width': modalWidth + 'px'
          });
          mfpResponse.data = data;
        },
        ajaxContentAdded: function () {
          $(this.content).find('button.mfp-close').attr('onclick', $(magnificPopup.st.el).attr('data-trackfechar'));
        }
      }
    });
  };
  modalIB()
})

function copyPix() {
  var inputCodigo = document.getElementById("codigoPix").value;
  navigator.clipboard.writeText(inputCodigo);
}