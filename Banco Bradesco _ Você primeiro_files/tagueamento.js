$(document).ready(function () {
    setTimeout(() => {
        $('#btnOk').on('click', function (e) {
            trackPortal('header','clique-botao','ok','portal-bradesco_classic','botoes-fixos');
        });
    }, 1000)
    dataLayer.push({ 'event': 'teste_cro_vd' });
});
