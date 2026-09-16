(function () {
  var actionUrls = {
    'Taxas Especiais para Você!': 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/credito-pessoal/index.shtm',
    'Finalize seu Contrato de Crédito Online': 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/credito-pessoal-consignado.shtm',
    'Antecipação Saque-Aniversário FGTS': 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/antecipacao-saque-aniversario.shtm',
    'Aprovações Rápidas!': 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/credito-pessoal/limite-de-credito-pessoal.shtm'
  };

  function prepareCards() {
    var cards = document.querySelectorAll('.cdh-extension-wrap .front-option');
    cards.forEach(function (card) {
      var action = card.querySelector('.hidden-details .accept');
      var triggerLabel = card.querySelector('.learnmore-cdh .cdh-learnmore-label');
      var title = card.querySelector('h3');

      if (title && title.textContent.trim() === 'Taxas Especiais para Você!' && action) {
        action.textContent = 'Contrate já';
      }

      if (triggerLabel && action) {
        triggerLabel.textContent = action.textContent.trim();
      }

      var details = card.querySelector('.hidden-details');
      if (details) details.remove();
    });
  }

  document.addEventListener('click', function (event) {
    var banner = event.target.closest('.cdh-extension-wrap');
    if (!banner) return;

    var trigger = event.target.closest('.cdh-extension-wrap .learnmore-cdh');

    event.preventDefault();

    if (trigger) {
      var card = trigger.closest('.front-option');
      var heading = card && card.querySelector('h3');
      var destination = heading && actionUrls[heading.textContent.trim()];
      if (destination) window.location.assign(destination);
      return;
    }
  });

  prepareCards();
})();
