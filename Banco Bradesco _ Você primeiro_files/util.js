function setCookie(key, value, exdays) {
  const expires = new Date();
  expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000);
  const expiresAux = expires.toUTCString();
  const cookieAux = key + "=" + value + ";expires=" + expiresAux;
  setCookieDocument(cookieAux);
}

function getCookieBusca(cname) {
  const cookieAuxBusca = getCookieDocument();
  const ca = cookieAuxBusca.split(";");

  for (var i = 0; i < ca.length; i++) {
    const c = ca[i].split('=');

    if (c[0].replace(/\s/g, "") == cname) return c[1];
  }

  return "";
}

function setCookieDocument(cookieDoc) {
  localStorage.setItem('cookie-doc-otimizacao', cookieDoc);
}

function getCookieDocument() {
  return localStorage.getItem('cookie-doc-otimizacao') === null || typeof localStorage.getItem('cookie-doc-otimizacao') === 'undefined' ? '' : localStorage.getItem('cookie-doc-otimizacao');
}

function removeAllActiveClass(elements) {
  for (let el of elements)
    el.classList.remove('active');
}

setTimeout(() => {
  var magnificPopup = $.magnificPopup.instance;

  $('.modalFree').magnificPopup({
    fixedContentPos: true,
    type: 'ajax',
    callbacks: {
      parseAjax: function (mfpResponse) {
        var data = $(mfpResponse.data).filter('.modalFree');
        var item = this.st;
        data.find('span.title').text(item.el.attr('title'));
        data.find('div.descrition').text('').append(item.el.attr('description'));
        var modalWidth = $(magnificPopup.st.el).attr('data-width');
        var modalHeight = $(magnificPopup.st.el).attr('data-height');
        $('.mfp-content').css({
          'max-width': modalWidth + 'px'
        });
        data.css({
          'min-height': modalHeight + 'px'
        });
        mfpResponse.data = data;
      },
      open: function () {
        setTimeout(function () {
          $('[data-toggle="tooltip"]').tooltip({
            html: true,
            placement: 'auto',
            viewport: {
              selector: 'section',
              padding: 5
            }
          });
        }, 100);
      },
      ajaxContentAdded: function () {
        if ($.ua.device.type == 'mobile') {

          var naoServico = $(magnificPopup.st.el).attr('data-servico');
          if (naoServico == undefined) { var naoServico = 'nao'; }

          if (naoServico == 'sim') {
            var urlStore = '';
            if ($.ua.os.name == 'Windows Phone') {
              urlStore = 'https://www.microsoft.com/pt-br/store/apps/bradesco/9wzdncrfj2cs';
            } else if ($.ua.os.name == 'iOS') {
              urlStore = 'https://itunes.apple.com/br/app/bradesco/id336954985?mt=8';
            } else if ($.ua.os.name == 'Android') {
              urlStore = 'https://play.google.com/store/apps/details?id=com.bradesco&hl=pt_BR';
            }
            $('div.modal section form').replaceWith('<div class="transacao-no-mobile"><span>Faça essa transação pelo Aplicativo Bradesco. Se não tem o app instalado, baixe agora!</span> <br> <br> <a href="' + urlStore + '" class="btn btn-danger">Baixar App</></div>');
          } else {
            if ($('#mainMenu > span > ul > li > ul > li.consorcios').hasClass('active')) {
              $('div.modal section form').replaceWith('<div class="transacao-no-mobile"><span>Para realizar esta transação, acesse sua conta pelo computador ou tablet.</span></div>');
            } else {
              $('div.modal section form').replaceWith('<div class="transacao-no-mobile">Para adquirir esse título, acesse sua conta pelo computador, tablet ou Aplicativo Bradesco.</div>');
            }
          }

        }

        $('div.modal section div.ncliente').show();

        if ($(magnificPopup.st.el).attr('data-ncliente') == "nao") {
          $('div.modal section div.ncliente').hide();
        }
      }
    }
  });
}, 1000);