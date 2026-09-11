(function () {
  function closeCard(card) {
    var details = card.querySelector('.hidden-details');
    var trigger = card.querySelector('.learnmore-cdh');
    if (details) details.classList.remove('is-visible');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('.cdh-extension-wrap .learnmore-cdh');
    var accept = event.target.closest('.cdh-extension-wrap .accept');
    var reject = event.target.closest('.cdh-extension-wrap .reject');

    if (trigger) {
      var card = trigger.closest('.front-option, .tile');
      var details = card && card.querySelector('.hidden-details');
      if (!details) return;
      var visible = details.classList.toggle('is-visible');
      trigger.setAttribute('aria-expanded', String(visible));
      return;
    }

    if (accept || reject) {
      closeCard((accept || reject).closest('.front-option, .tile'));
    }
  });
})();
