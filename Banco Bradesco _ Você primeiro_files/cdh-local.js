(function () {
  var actionUrls = {
    'Taxas Especiais para Você!': 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/credito-pessoal/index.shtm',
    'Finalize seu Contrato de Crédito Online': 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/credito-pessoal-consignado.shtm',
    'Antecipação Saque-Aniversário FGTS': 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/antecipacao-saque-aniversario.shtm',
    'Aprovações Rápidas!': 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/credito-pessoal/limite-de-credito-pessoal.shtm'
  };

  function resolveDestination(rawTitle) {
    if (!rawTitle) return null;

    var title = rawTitle.trim();
    if (!title) return null;

    if (actionUrls[title]) return actionUrls[title];

    var withoutExclamation = title.replace(/!+$/, '');
    if (actionUrls[withoutExclamation]) return actionUrls[withoutExclamation];

    return null;
  }

  function bindCardNavigation(card) {
    var button = card.querySelector('.learnmore-cdh');
    if (!button) return;

    var heading = card.querySelector('h3');
    var destination = heading && resolveDestination(heading.textContent);
    if (!destination) return;

    button.setAttribute('data-destination', destination);
    button.onclick = function (event) {
      event.preventDefault();
      window.location.assign(destination);
    };
  }

  function prepareCards() {
    var cards = document.querySelectorAll('.cdh-extension-wrap .front-option');
    cards.forEach(function (card) {
      var action = card.querySelector('.hidden-details .accept');
      var triggerLabel = card.querySelector('.learnmore-cdh .cdh-learnmore-label');
      var title = card.querySelector('h3');

      if (title && title.textContent.trim() === 'Antecipação Saque-Aniversário FGTS!' && action) {
        action.textContent = 'Solicite já';
      }

      if (triggerLabel && action) {
        triggerLabel.textContent = action.textContent.trim();
      }

      bindCardNavigation(card);

      var details = card.querySelector('.hidden-details');
      if (details) details.remove();
    });
  }

  document.addEventListener('click', function (event) {
    var banner = event.target.closest('.cdh-extension-wrap');
    if (!banner) return;

    var trigger = event.target.closest('.cdh-extension-wrap .learnmore-cdh');
    if (!trigger) return;

    var hasRealLink = !!trigger.closest('a[href]');
    if (!hasRealLink) {
      event.preventDefault();
    }

    var card = trigger.closest('.front-option');
    var heading = card && card.querySelector('h3');
    var destination = heading && resolveDestination(heading.textContent);

    if (destination) {
      trigger.setAttribute('data-destination', destination);
      if (!hasRealLink) window.location.assign(destination);
    }
  });

  prepareCards();
})();
