(function () {
  function updateLearnMoreLabels() {
    var labels = document.querySelectorAll('.cdh-extension-wrap .cdh-learnmore-label');
    labels.forEach(function (label) {
      label.textContent = 'Saiba mais';
    });

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
    var accept = event.target.closest('.cdh-extension-wrap .accept');
    var reject = event.target.closest('.cdh-extension-wrap .reject');
    var trigger = event.target.closest('.cdh-extension-wrap .learnmore-cdh');

    if (reject) {
      event.preventDefault();
      event.stopPropagation();
      var card = reject.closest('.front-option, .tile');
      if (card) card.hidden = true;
      return;
    }

    if (accept) {
      closeCard(accept.closest('.front-option, .tile'));
      return;
    }

    if (trigger) {
      event.preventDefault();
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
