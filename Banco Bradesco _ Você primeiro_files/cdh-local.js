(function () {
  var actionUrls = {
    'Taxas Especiais para Você!': 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/credito-pessoal/index.shtm',
    'Finalize seu Contrato de Crédito Online': 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/credito-pessoal-consignado.shtm',
    'Aprovação Rápida de Crédito!': 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/antecipacao-saque-aniversario.shtm',
    'Aprovações Rápidas!': 'https://banco.bradesco/html/classic/produtos-servicos/emprestimo-e-financiamento/credito-pessoal/limite-de-credito-pessoal.shtm'
  };

  function updateLearnMoreLabels() {
    var labels = document.querySelectorAll('.cdh-extension-wrap .cdh-learnmore-label');
    labels.forEach(function (label) {
      label.textContent = 'Saiba mais';
    });

    var firstCard = document.querySelector('.cdh-extension-wrap .front-option');
    var firstCardTitle = firstCard && firstCard.querySelector('h3');
    var firstCardAction = firstCard && firstCard.querySelector('.hidden-details .accept');
    if (firstCardTitle && firstCardAction && firstCardTitle.textContent.trim() === 'Taxas Especiais para Você!') {
      firstCardAction.textContent = 'Contrate já';
    }

    var rejectButtons = document.querySelectorAll('.cdh-extension-wrap .reject');
    rejectButtons.forEach(function (button) {
      button.textContent = 'Ver depois';
    });
  }

  function closeCard(card) {
    var details = card.querySelector('.hidden-details');
    var trigger = card.querySelector('.learnmore-cdh');
    if (details) details.classList.remove('is-visible');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('click', function (event) {
    var banner = event.target.closest('.cdh-extension-wrap');
    if (!banner) return;

    var accept = event.target.closest('.cdh-extension-wrap .accept');
    var reject = event.target.closest('.cdh-extension-wrap .reject');
    var trigger = event.target.closest('.cdh-extension-wrap .learnmore-cdh');

    event.preventDefault();

    if (reject) {
      event.stopPropagation();
      var card = reject.closest('.front-option, .tile');
      if (card) card.hidden = true;
      return;
    }

    if (accept) {
      var card = accept.closest('.front-option, .tile');
      var heading = card && card.querySelector('h3');
      var destination = heading && actionUrls[heading.textContent.trim()];
      closeCard(card);
      if (destination) window.location.assign(destination);
      return;
    }

    if (trigger) {
      event.stopPropagation();
      var card = trigger.closest('.front-option, .tile');
      var details = card && card.querySelector('.hidden-details');
      if (!details) return;
      var visible = details.classList.toggle('is-visible');
      trigger.setAttribute('aria-expanded', String(visible));
      return;
    }
  });

  updateLearnMoreLabels();
})();
