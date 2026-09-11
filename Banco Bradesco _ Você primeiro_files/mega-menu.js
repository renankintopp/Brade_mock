if ($(window).width() > 1024) {

  var produtos = $('#mm-2');
  var canais = $('#mm-3');
  var mimos = $('#mm-4');
  var lastClick;

  document.getElementById("mm-2").innerHTML = generateMegaMenuProducts();
  document.getElementById("mm-3").innerHTML = generateMegaMenuChannels();

  $(document).on('click', function (e) {
    if ($(e.target).closest('#MainMenuMobile').length === 0 && !$('body').hasClass('mobile')) {
      produtos.removeClass('selected');
      produtos.addClass('mm-hidden');
      canais.removeClass('selected');
      canais.addClass('mm-hidden');
      lastClick = undefined;
    }
  });

  function menuDesktop(param) {
    if (param === lastClick) {
      $(`#${param}`).addClass('mm-hidden');
      $(`#${param}`).removeClass('selected');
      lastClick = undefined;
      return false
    }
    switch (param) {
      case 'mm-2':
        produtos.removeClass('mm-hidden')
        produtos.addClass('selected')
        canais.addClass('mm-hidden')
        canais.removeClass('selected')
        mimos.addClass('mm-hidden')
        mimos.removeClass('selected')
        break;
      case 'mm-3':
        produtos.addClass('mm-hidden')
        produtos.removeClass('selected')
        canais.removeClass('mm-hidden')
        canais.addClass('selected')
        mimos.addClass('mm-hidden')
        mimos.removeClass('selected')
        break;
      case 'mm-4':
        mimos.removeClass('mm-hidden')
        mimos.addClass('selected')
        canais.addClass('mm-hidden')
        canais.removeClass('selected')
        produtos.addClass('mm-hidden')
        produtos.removeClass('selected')
        break
    }
    lastClick = param;
  }
} else {
  const lists = $("ul.mobile-item.items-menu li.list");

  for (let list of lists) {
    list.onclick = () => {
      const contetnt = list.getElementsByClassName("list-content")[0];

      contetnt.classList.toggle("mm-opened");
    };
  }

  document.getElementById("mm-2-mobile").innerHTML = generateMegaMenuProducts();
  document.getElementById("mm-3-mobile").innerHTML = generateMegaMenuChannels();
}

function handleMegaMenu(ev) {
  ev.classList.toggle("close");
  MainMenuMobile.classList.toggle("mm-opened");
  document.body.classList.toggle("remove-scroll");
}

function generateMegaMenuProducts() {
  return `
        <ul class="mm-listview menulist-produtos">
         <li class="capitalizacao1">
            <a href="https://capitalizacao.bradesco/home" tabindex="0" onclick="trackPortal('menu-lateral', 'clique-botao', 'produtos_capitalizacao-max-premios','portal-bradesco_classic','botoes-fixos');">Capitalização</span></span></a>
          </li>
          <li class="cambio">
            <a href="/html/classic/produtos-servicos/cambio/index.shtm" tabindex="0" onclick="trackPortal('menu-lateral', 'clique-botao', 'produtos_cambio','portal-bradesco_classic','botoes-fixos');">Câmbio</a>
          </li>
          <li class="cartoes1">
            <a href="/html/classic/produtos-servicos/cartoes/credito.shtm" tabindex="0" onclick="trackPortal('menu-lateral', 'home_menu_lateral','produtos_cartoes','portal-bradesco_classic','botoes-fixos');">Cartões</a>
          </li>
          <li class="tarifas">
            <a href="/html/classic/produtos-servicos/tarifas/index.shtm" tabindex="0" onclick="trackPortal('menu-lateral', 'clique-botao', 'produtos_cestas-de-servicos-e-tarifas','portal-bradesco_classic','botoes-fixos');">Cestas de Serviços e Tarifas</a>
          </li>
          <li class="consorcios1">
            <a href="/html/classic/produtos-servicos/consorcios/index.shtm" tabindex="0" onclick="trackPortal('menu-lateral', 'clique-botao', 'produtos_consorcios','portal-bradesco_classic','botoes-fixos');">Consórcios</a>
          </li>
          <li class="emprestimo-e-financiamento">
            <a href="/html/classic/produtos-servicos/emprestimo-e-financiamento/index.shtm" tabindex="0" onclick="trackPortal('menu-lateral', 'clique-botao', 'produtos_emprestimo-e-financiamentos','portal-bradesco_classic','botoes-fixos');">Empréstimos e Financiamentos</a>
          </li>
          <li class="investimentos1">
            <a href="/html/classic/portal-investimentos/index.shtm" tabindex="0" onclick="trackPortal('menu-lateral', 'clique-botao', 'produtos_investimentos','portal-bradesco_classic','botoes-fixos');">Investimentos</a>
          </li>
          <li class="leiloes-de-imoveis">
            <a href="/html/classic/produtos-servicos/leiloes/index.shtm" tabindex="0"" onclick="trackPortal('menu-lateral', 'clique-botao', 'produtos_leiloes','portal-bradesco_classic','botoes-fixos');">Leilões</a>
          </li>
          <li class="renegociacao-de-dividas">
            <a href="https://renegocie.bradesco.com.br/?utm_source=BRA&utm_medium=IB&utm_campaign=card_reneg" target="_blank" tabindex="0" onclick="trackPortal('menu-lateral', 'menu-lateral','produtos_renegociacao-de-divida','portal-bradesco_classic','botoes-fixos');">Renegociação de Dívidas</a>
          </li>
          <li class="seguros1">
            <a href="/html/classic/produtos-servicos/seguros/index.shtm" tabindex="0" onclick="trackPortal('menu-lateral', 'clique-botao', 'produtos_seguros','portal-bradesco_classic','botoes-fixos');">Seguros</a>
          </li>
          <li class="tipos-de-conta">
            <a href="/html/classic/produtos-servicos/tipos-de-conta/index.shtm" tabindex="0" onclick="trackPortal('menu-lateral', 'clique-botao', 'produtos_tipos-de-contas','portal-bradesco_classic','botoes-fixos');">Tipos de Contas</a>
          </li>
          <li class="vida-e-previdencia">
            <a href="https://www.bradescoseguros.com.br/clientes" target="_blank" tabindex="0" onclick="trackPortal('menu-lateral', 'clique-botao', 'produtos_vida-e-previdencia','portal-bradesco_classic','botoes-fixos');">Vida e Previdência</a>
          </li>
          <li class="mais-produtos-servicos">
            <a href="/html/classic/produtos-servicos/servicos/index.shtm" tabindex="0" onclick="trackPortal('menu-lateral', 'clique-botao', 'servicos','portal-bradesco_classic','botoes-fixos');">Serviços</a>
          </li>
        </ul>
	  `;
}

function generateMegaMenuChannels() {
  return `
        <ul class="mm-listview menulist-canais">
          <li class="como-usar-bradesco">
            <a
              href="/como-usar/"
              tabindex="0"
              onclick="trackPortal('menu-lateral', 'clique-botao', 'canais_como-usar-minha-conta-bradesco','portal-bradesco_classic','botoes-fixos');"
              >Como usar minha conta Bradesco</a
            >
          </li>
          <li class="internet-banking">
            <a
              href="/html/classic/canais-digitais/internet-banking/index.shtm"
              tabindex="0"
              onclick="trackPortal('menu-lateral', 'clique-botao', 'canais_internet-banking','portal-bradesco_classic','botoes-fixos');"
              >Internet Banking</a
            >
          </li>
          <li class="aplicativos-bradesco">
            <a
              href="/aplicativo-bradesco/"
              tabindex="0"
              onclick="trackPortal('menu-lateral', 'clique-botao', 'canais_aplicativos-bradesco','portal-bradesco_classic','botoes-fixos');"
              >Aplicativos Bradesco</a
            >
          </li>
          <li class="autoatendimento">
            <a
              href="/html/classic/canais-digitais/caixa-eletronico/index.shtm"
              tabindex="0"
              onclick="trackPortal('menu-lateral', 'clique-botao', 'canais_caixa-eletronico','portal-bradesco_classic','botoes-fixos');"
              >Caixa Eletrônico</a
            >
          </li>
          <li class="bia">
            <a
              href="/bia"
              tabindex="0"
              onclick="trackBradesco('portal_classic', 'home_menu_lateral_vertical', 'bia');"
              >BIA</a
            >
          </li>
        </ul>`;
}
