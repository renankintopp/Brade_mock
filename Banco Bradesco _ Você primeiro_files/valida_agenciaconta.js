/*#######################################
 Inicio  -  Selecionando Parametro da URL
########################################*/
var protocolo = DOMPurify.sanitize(location.protocol);
var basePathXML = "";

basePathXML = "https://wspf.banco.bradesco/wsstats/";

var localizado = 0;
var xmlResult = "";

/*#######################################
 Inicio  -  Armazenamento de connverso
########################################*/

/* INICIO - funcao para criar, recuperar e deletar valores em cookies */
function setCookieVl(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = DOMPurify.sanitize(cname + "=" + cvalue + "; " + expires + "; path=/");
}

function getCookieVl(cname) {
    var name = cname + "=";
    var ca = DOMPurify.sanitize(document.cookie).split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].replace(" ", "");
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }

    return "";
}

function deleteCookieVl(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
/* FIM - funcao para criar, recuperar e deletar valores em cookies */

function StringtoXML(text) {
    if (window.ActiveXObject) {
        var doc = new ActiveXObject('Microsoft.XMLDOM');
        doc.async = 'false';
        doc.loadXML(text);
    } else {
        var parser = new DOMParser();
        var doc = parser.parseFromString(text, 'text/xml');
    }
    return doc;
}

function loadXML(url) {
    url = DOMPurify.sanitize(url)
    if (window.XMLHttpRequest) {
        var Loader = new XMLHttpRequest();
        Loader.open("GET", url, false);
        Loader.send(null);
        return DOMPurify.sanitize(Loader.responseXML);

    } else if (window.ActiveXObject) {
        var Loader = new ActiveXObject("Msxml2.DOMDocument.3.0");
        Loader.async = false;
        Loader.load(url);
        return Loader;
    }
}
/* Funcao usada para setar a campanha quando feita com Base de clientes */
function setStatCampanhaBaseNew(cmp, ag, conta, desc) {

    var basePathXML = "";
    var protocolo = DOMPurify.sanitize(location.protocol);
    basePathXML = "https://wspf.bradesco.com.br/wsstats/";


    var agencia = ag;
    var conta = conta;
    var url = null;

    if (location.search.indexOf('gclid') > 0) {
        url = 'LP(gclid=' + request.getParameter('gclid') + ')';
    } else {
        if (cmp == 225) {
            if (desc.indexOf('conta') !== -1) {
                url = location.pathname + "?tipo=" + "conta";
            } else {
                url = location.pathname + "?tipo=" + "cartao";
            }
        } else {
            url = location.pathname;
        }
    }
    if (desc == null) {
        basePathXML = basePathXML + "?stragencia=" + agencia + "&strconta=" + conta + "&cmp=" + cmp + "&urls=" + url;
    } else {
        basePathXML = basePathXML + "?stragencia=" + agencia + "&strconta=" + conta + "&cmp=" + cmp + "&urls=" + url + "&desc=" + desc;
    }
    if (window.XDomainRequest) {
        loadIE();
    } else {
        xml = loadXML(basePathXML);
    }
}
// Funcao usada para setar a campanha quando feita com Base de clientes
function setStatCampanhaBase(cmp, agconta, desc) {

    var agencia = agconta.substr(31, 4);
    var conta = agconta.substr(35, 7) + "-" + agconta.substr(42, 1);
    var url = null;

    if (location.search.indexOf('gclid') > 0) {
        url = 'LP(gclid=' + request.getParameter('gclid') + ')';
    } else {

        if (cmp == 225) {
            if (desc.indexOf('corrente') !== -1) {
                url = location.pathname + "?tipo=" + "conta";
            } else {
                url = location.pathname + "?tipo=" + "cartao";
            }
        } else {
            url = location.pathname;
        }
    }

    if (desc == null) {
        basePathXML = basePathXML + "?stragencia=" + agencia + "&strconta=" + conta + "&cmp=" + cmp + "&urls=" + url;
    } else {
        basePathXML = basePathXML + "?stragencia=" + agencia + "&strconta=" + conta + "&cmp=" + cmp + "&urls=" + url + "&desc=" + desc;
    }
    if (window.XDomainRequest) {
        loadIE();
    } else {

        xml = loadXML(basePathXML);
    }


}
var xdr;

function readdata() {
    return xdr.responseText;
}

function err() {
    console.log("XDR onerror");
}

function timeo() {
    console.log("XDR ontimeout");
}

function loadd() {
    var doc = StringtoXML(xdr.responseText);

    loadCidades(doc, "");
    if (localizado == 1) {
        alert('ok');
    }
}

function progres() {
    console.log("XDR onprogress");
    console.log("Got: " + xdr.responseText);
}

function stopdata() {
    xdr.abort();
}

function loadIE() {
    var url = basePathXML;
    var timeout = 1000;
    if (window.XDomainRequest) {
        xdr = new XDomainRequest();
        if (xdr) {
            xdr.onerror = err;
            xdr.ontimeout = timeo;
            xdr.onprogress = progres;
            xdr.onload = loadd;
            xdr.timeout = timeout;
            xdr.open("get", url);
            xdr.send();
        } else {
            console.log('Failed to create');
        }
    }
}

function setStat(cmp, form_name, desc) {
    if (form_name == null) {
        form_name == 'Form611';
    }

    var form_atual = document.getElementById(form_name);
    var agencia = form_atual.AGN.value;
    var conta = form_atual.CTA.value + "-" + form_atual.DIGCTA.value;
    var url = null;

    if (location.search.indexOf('gclid') > 0) {
        url = 'LP(gclid=' + request.getParameter('gclid') + ')';
    } else {
        url = location.pathname;
    }

    if (desc == null) {
        basePathXML = "https://wspf.banco.bradesco/wsstats/Default.aspx" + "?stragencia=" + agencia + "&strconta=" + conta + "&cmp=" + cmp + "&urls=" + url;
    } else {
        basePathXML = "https://wspf.banco.bradesco/wsstats/Default.aspx" + "?stragencia=" + agencia + "&strconta=" + conta + "&cmp=" + cmp + "&urls=" + url + "&desc=" + desc;
    }

    if (window.XDomainRequest) {
        loadIE();
    } else {
        xml = loadXML(basePathXML);
    }
}

/* FIM - ARMAZENAMENTO */

var formAtual;

function PegaForm(campo) {
    node = document.getElementById(campo);

    while (node.nodeName != "FORM" && node.parentNode) {
        node = node.parentNode;
    }

    return node;
}

function Apenas_Numeros(e, campo) {
    var msg = "Favor digitar somente caracteres num\u00e9ricos";
    var monta = "";
    var NS = (navigator.appName == "Netscape")
    var Digit = parseInt(eval(((NS) ? "e.which" : "e.keyCode")))

    formAtual = PegaForm(campo);

    if (!(Digit > 47 && Digit < 58 || Digit == 8 || Digit == 0 || Digit == 13)) {
        alert(msg);
        monta = formAtual.name + "." + campo + ".focus();";
        eval(monta);
        return false;
    } else {
        if (parseInt(Digit) == 13) {
            if (VerificaLogin()) {
                IB2000Open(window.formAtual);
            }
        }
    }
}

function VerificaLogin() {
    var valor = true;

    var Agencia;
    var Conta;
    var Digito;

    var arrayAgencia = document.getElementsByName('AGN');
    var arrayConta = document.getElementsByName('CTA');
    var arrayDigito = document.getElementsByName('DIGCTA');
    var ct = DOMPurify.sanitize(document.getElementById("CTA").value);
    var dig = DOMPurify.sanitize(document.getElementById("DIGCTA").value);
    var arSize = arrayAgencia.length;
    if (ct == "0000000") {
        valor = false;
    } else {
        for (var i = 0; i < arSize; i++) {
            if (arrayAgencia[i].value != '') {
                Agencia = parseInt(arrayAgencia[i].value);
                Conta = parseInt(arrayConta[i].value);
                Digito = parseInt(arrayDigito[i].value);
            }
        }

        if ((isNaN(Agencia)) || (isNaN(Conta)) || (isNaN(Digito))) {
            valor = false;
        } else {
            if (ValidaDigito()) {
                valor = true;
            } else {
                valor = false;
            }
        }
    }

    return valor;
}
var formularioTransacionalName = "";

function ValidaLogin(campo) {

    var cartoes = 5; //cartoes
    var shopinvest = 7; //investimentos
    var prime = 57; // prime
    var capitalizacao = 178; //capitalizacao
    var shopcredit = 65; //emprestimos e financiamentos
    var privates = 75; //private
    var exclusive = 84; //exclusive

    var origem = "";
    var URL = location.href;
    var split = URL.split("/");

    for (i = (split.length - 1); i >= 0; i--) {
        switch ((split[i]).toLowerCase()) {
            case "prime":
                origem = prime;
                i = -1;
                break;
            case "exclusive":
                origem = exclusive;
                i = -1;
                break;
            case "private":
                origem = privates;
                i = -1;
                break;
            case "emprestimo-e-financiamento":
                origem = shopcredit;
                i = -1;
                break;
            case "capitalizacao":
                origem = capitalizacao;
                i = -1;
                break;
            case "cartoes":
                origem = cartoes;
                i = -1;
                break;
        }
    }

    var origens = document.getElementsByName('ORIGEM');
    var qtdOrigens = origens.length;

    if (origem != "") {
        for (var ii = 0; ii < qtdOrigens; ii++) {
            if (origens[ii].value == '') {
                origens[ii].value = origem;
            }
        }
    }

    formAtual = PegaForm(campo);
    var retorno = false;
    if (VerificaLogin()) {

        /*if (location.href.indexOf("/html/classic/index.shtm") == -1) {
            var d = new Date();
            d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = "bra_iscli=true, path=/; " + expires;
        }*/
        GravaBase();
        var ag = DOMPurify.sanitize(document.getElementById('AGN').value);
        var ct = DOMPurify.sanitize(document.getElementById("CTA").value);
        var dig = DOMPurify.sanitize(document.getElementById('DIGCTA').value);
        //AbandonoJornadaSAPP(ag,ct,dig);
        IB2000Open(window.formAtual);
    } else {
        var Agencia;
        var Conta;
        var Digito;

        var arrayAgencia = document.getElementsByName('AGN');
        var arrayConta = document.getElementsByName('CTA');
        var arrayDigito = document.getElementsByName('DIGCTA');

        var arSize = arrayAgencia.length;

        for (var i = 0; i < arSize; i++) {
            if (arrayAgencia[i].value != '') {
                Agencia = parseInt(arrayAgencia[i].value);
                Conta = parseInt(arrayConta[i].value);
                Digito = parseInt(arrayDigito[i].value);
            }
        }

        if (isNaN(Agencia) == true) {
            alert("Favor preencher o campo ag\u00eancia");
            formAtual.AGN.focus();
            return false;
        } else {
            if (isNaN(Conta) == true) {
                alert("Favor preencher o campo conta");
                formAtual.CTA.focus();
                return false;
            } else {
                if (isNaN(Digito) == true) {
                    alert("Favor preencher o d\u00edgito de sua conta");
                    formAtual.DIGCTA.focus();
                    return false;
                } else {
                    alert("Informa\u00e7\u00F5es inv\u00e1lidas. Por favor, verifique ag\u00eancia, conta e d\u00edgito");
                    formAtual.CTA.focus();
                    return false;
                }
            }
        }
    }
}

function btnOK() {
    console.log(" ");
}

function SendModalTransacional(formulario) {
    try {
        if (document.getElementById(formulario.id) == undefined) {
            $(formulario).clone().appendTo("body");
            setTimeout(function () {
                document.getElementById(formulario.id).submit();
            }, 500);
        } else {
            $(formulario).unbind('submit').attr('onsubmit', '').each(function () { // reset `onclick` event handlers
                this.onsubmit = null;
            });
            $(formulario).submit();
        }
    } catch (e) {
        $("#" + formularioTransacionalName).unbind('submit').attr('onsubmit', '').each(function () { // reset `onclick` event handlers
            this.onsubmit = null;
        });
        $("#" + formularioTransacionalName).submit();
    }
}

function ValidaLoginModalCampanha(campo) {
    var cartoes = 5; //cartoes
    var shopinvest = 7; //investimentos
    var prime = 57; // prime
    var capitalizacao = 63; //capitalizacao
    var shopcredit = 65; //emprestimos e financiamentos
    var privates = 75; //private
    var exclusive = 84; //exclusive

    var origem = "";
    var URL = location.href;
    var split = URL.split("/");

    for (i = (split.length - 1); i >= 0; i--) {
        switch ((split[i]).toLowerCase()) {
            case "prime":
                origem = prime;
                i = -1;
                break;
            case "exclusive":
                origem = exclusive;
                i = -1;
                break;
            case "private":
                origem = privates;
                i = -1;
                break;
            case "emprestimo-e-financiamento":
                origem = shopcredit;
                i = -1;
                break;
            case "capitalizacao":
                origem = capitalizacao;
                i = -1;
                break;
            case "cartoes":
                origem = cartoes;
                i = -1;
                break;
        }

    }

    var origens = document.getElementsByName('ORIGEM');
    var qtdOrigens = origens.length;

    if (origem != "") {
        for (var ii = 0; ii < qtdOrigens; ii++) {
            if (origens[ii].value == "") {
                origens[ii].value = origem;
            }
        }
    }

    var idCampanha;
    switch (campo) {
        case 'formIntervencaoCapitalizacaoPeQuente': {
            idCampanha = 72;
            descCampanha = 'Retargeting Capitalizacao';
            break;
        }
        case 'formPoupaTroco': {
            idCampanha = 71;
            descCampanha = 'Poupa Troco';
            break;
        }
        default: {
            idCampanha = 00;
            descCampanha = '';
            break;
        }
    }

    setStat(idCampanha, campo, descCampanha);
    formAtual = PegaForm(campo);

    if (VerificaLogin() == true) {

        /*if (location.href.indexOf("/html/classic/index.shtm") == -1) {

            var d = new Date();
            d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000)); //expire in 30 days
            var expires = "expires=" + d.toGMTString();
            document.cookie = "bra_iscli=true, path=/; " + expires;
        }*/
        IB2000Open(window.formAtual);
    } else {
        var Agencia;
        var Conta;
        var Digito;

        var arrayAgencia = document.getElementsByName('AGN');
        var arSize = arrayAgencia.length;
        var arrayConta = document.getElementsByName('CTA');
        var arrayDigito = document.getElementsByName('DIGCTA');

        for (var i = 0; i < arSize; i++) {
            if (arrayAgencia[i].value != '') {
                Agencia = parseInt(arrayAgencia[i].value);
                Conta = parseInt(arrayConta[i].value);
                Digito = parseInt(arrayDigito[i].value);
            }
        }


        if (isNaN(Agencia) == true) {
            alert("Favor preencher o campo ag\u00eancia");
            formAtual.AGN.focus();
            return false;

        } else {
            if (isNaN(Conta) == true) {
                alert("Favor preencher o campo conta");
                formAtual.CTA.focus();
                return false;
            } else {
                if (isNaN(Digito) == true) {
                    alert("Favor preencher o d\u00edgito de sua conta");
                    formAtual.DIGCTA.focus();
                    return false;
                } else {
                    alert("Informa\u00e7\u00F5es inv\u00e1lidas. Por favor, verifique ag\u00eancia, conta e d\u00edgito");
                    formAtual.CTA.focus();
                    return false;
                }
            }
        }
    }
}

/*############  ValidaÃ§Ã£o de agÃªncia e conta dos modais de cartÃµes  ##########*/

function ValidaLoginCartoes(campo) {
    var cartoes = 5; //cartoes
    var shopinvest = 7; //investimentos
    var prime = 57; // prime
    var capitalizacao = 63; //capitalizacao
    var shopcredit = 65; //emprestimos e financiamentos
    var privates = 75; //private
    var exclusive = 84; //exclusive

    var origem = "";
    var URL = location.href;
    var split = URL.split("/");

    for (i = (split.length - 1); i >= 0; i--) {
        switch ((split[i]).toLowerCase()) {
            case "prime":
                origem = prime;
                i = -1;
                break;
            case "exclusive":
                origem = exclusive;
                i = -1;
                break;
            case "private":
                origem = privates;
                i = -1;
                break;
            case "emprestimo-e-financiamento":
                origem = shopcredit;
                i = -1;
                break;
            case "capitalizacao":
                origem = capitalizacao;
                i = -1;
                break;
            case "cartoes":
                origem = cartoes;
                i = -1;
                break;
        }

    }

    var origens = document.getElementsByName('ORIGEM');
    var qtdOrigens = origens.length;

    formAtual = PegaForm(campo);

    if (VerificaLogin()) {
        IB2000Open(window.formAtual);
    } else {
        var Agencia;
        var Conta;
        var Digito;

        var arrayAgencia = document.getElementsByName('AGN');
        var arrayConta = document.getElementsByName('CTA');
        var arrayDigito = document.getElementsByName('DIGCTA');

        var arSize = arrayAgencia.length;

        for (var i = 0; i < arSize; i++) {
            if (arrayAgencia[i].value != '') {
                Agencia = parseInt(arrayAgencia[i].value);
                Conta = parseInt(arrayConta[i].value);
                Digito = parseInt(arrayDigito[i].value);
            }
        }

        if (isNaN(Agencia)) {
            alert("Favor preencher o campo ag\u00eancia");
            formAtual.AGN.focus();
            return false;
        } else {
            if (isNaN(Conta)) {
                alert("Favor preencher o campo conta");
                formAtual.CTA.focus();
                return false;
            } else {
                if (isNaN(Digito)) {
                    alert("Favor preencher o d\u00edgito de sua conta");
                    formAtual.DIGCTA.focus();
                    return false;
                } else {
                    alert("Informa\u00e7\u00F5es inv\u00e1lidas. Por favor, verifique ag\u00eancia, conta e d\u00edgito");
                    formAtual.CTA.focus();
                    return false;
                }
            }
        }
    }
}

/*############  ValidaÃ§Ã£o de agÃªncia e conta dos modais de cartÃµes - FIM ##########*/

function exibeValor(nomeCampo, lenCampo, controle) {
    if ((nomeCampo.value.length == lenCampo) && (checarTabulacao)) {
        var i = 0;
        for (i = 0; i < document.forms[0].elements.length; i++) {
            if (document.forms[0].elements[i].name == nomeCampo.name) {
                while ((i + 1) < document.forms[0].elements.length) {
                    if (document.forms[0].elements[i + 1].type != "hidden") {
                        document.forms[0].elements[i + 1].focus();
                        break;
                    }
                    i++;
                }
                checarTabulacao = false;
                break;
            }
        }
    }
}

function stopTabCheck(nomeCampo) {
    checarTabulacao = false;
}

function startTabCheck() {
    checarTabulacao = true;
}

function ValidaDigito() {
    if (formAtual == undefined || formAtual == '') {
        formAtual = PegaForm(campo.id);
    }
    var lsoma = 0;
    var ipeso = 2;
    var dv_informado = formAtual.DIGCTA.value;
    var dv_conta = formAtual.CTA.value;
    var tam = formAtual.CTA.value.length;

    //Cria uma array
    var conta = new Array(tam);

    //Desmembra o nÃºmero
    for (i = 0; i <= tam; i++) {
        conta[i] = dv_conta.substr(i, 1);
    }

    while (tam > 0) {
        digito = conta[--tam];
        if ((digito >= 0) && (digito <= 9)) {
            lsoma = lsoma + (digito - 0) * ipeso;
            ipeso = ipeso + 1;
            if (ipeso > 7) {
                ipeso = 2;
            }
        }
    }

    lsoma %= 11;
    lsoma = 11 - lsoma;

    if ((lsoma == 11) || (lsoma == 10)) {
        lsoma = 0;
    }

    return (parseInt(dv_informado) == parseInt(lsoma));
}

function Verificar(event) {
    if (event != undefined) {
        var ctrl = event.ctrlKey;
        var tecla = event.keyCode;

        if (ctrl == true || tecla == 67) {
            return false;
        }
        if (ctrl == true || tecla == 86) {
            return false;
        }
    }
}

var InternetBanking

function IB2000Open(IB2000Form) {
    //window.document.IB2000.action = IB2000Form.action
    //window.document.IB2000.AGN.value = IB2000Form.AGN.value
    //window.document.IB2000.CTA.value = IB2000Form.CTA.value
    //window.document.IB2000.DIGCTA.value = IB2000Form.DIGCTA.value
    //window.document.IB2000.TPCONTA.value = IB2000Form.TPCONTA.value

    //if(IB2000Form.AGN.value != '' && IB2000Form.CTA.value != '' && IB2000Form.DIGCTA.value != '')
    //{
    //InternetBanking = window.open("", "InternetBanking", "toolbar=1,location=1,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,screenX=0,screenY=0,left=0,top=0,width=765,height=528");
    // window.document.IB2000.target = '_top';
    //window.document.IB2000.submit()
    //IB2000Form.reset()
    //}
    return false;
}

function IB2000OpenCadSenha() {
    if (navigator.appName.indexOf("Netscape") != -1)
        IB2K1CADSENHA = window.open("https://wwwss.bradesco.com.br/scripts/ib2k1.dll/CADSENHA/CONDUSO", "IB2K1CADSENHA", "toolbar=1,location=1,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,screenX=0,screenY=0,left=0,top=0,width=765,height=528");
    else
        IB2K1CADSENHA = window.open("https://wwwss.bradesco.com.br/scripts/ib2k1.dll/CADSENHA/CONDUSO", "IB2K1CADSENHA", "toolbar=1,location=1,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,screenX=0,screenY=0,left=0,top=0,width=765,height=528");
    return false;
}

function CadAltSenha() {
    if (navigator.appName.indexOf("Netscape") != -1)
        IB2K1CADSENHA = window.open("https://wwwss.bradesco.com.br/scripts/ib2k1.dll/CADSENHA/CONDUSO", "IB2K1CADSENHA", "toolbar=1,location=1,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,screenX=0,screenY=0,left=0,top=0,width=765,height=528");
    else
        IB2K1CADSENHA = window.open("https://wwwss.bradesco.com.br/scripts/ib2k1.dll/CADSENHA/CONDUSO", "IB2K1CADSENHA", "toolbar=1,location=1,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,screenX=0,screenY=0,left=0,top=0,width=765,height=528");
    return false;
}

function MM_openBrWindow(theURL, winName, features) { //v2.0
    window.open(theURL, winName, features);
}

function abrePopuphf() {
    window.open('/br/hotsite/hiperfundo_ana/index.html', 'pophiper', 'width=779,height=436,top=0,left=10,scrollbars=0,menubar=0,toolbar=no,statusbar=no,resizable=no');
}

function hfundo() {
    var path = top.location.href;

    path = path.toLowerCase();

    if (path.indexOf('hiperfundo') != -1) {
        setTimeout("abrePopuphf()", 1000);
    }
}

function abrePopuphbroker() {
    window.open('/br/hotsite/home_broker/homebroker.html', 'pophb', 'width=700,height=420,top=0,left=10,scrollbars=0,menubar=0,toolbar=no,statusbar=no,resizable=no');
}

function home_broker() {
    var path = top.location.href;

    path = path.toLowerCase();

    if (path.indexOf('homebroker') != -1) {
        setTimeout("abrePopuphbroker()", 1000);
    }
}

function checa_agencia(campo) {
    formAtual = PegaForm(campo);
    switch (campo) {
        case "AGN": {
            //TRATAMENTO SHIFT+TAB ACESSIBILIDADE
            if (document.getElementById('AGN').className != 'js-jump-field') {
                if (!(event.shiftKey && event.keyCode == 9)) {
                    if (event.keyCode != 16) {
                        if (formAtual.AGN.value.length == 4 && ((event.keyCode >= 47 && event.keyCode <= 58) || event.keyCode == 9)) {
                            formAtual.CTA.focus();
                        }
                        break;
                    }
                }
            }
        }

        case "CTA": {
            //TRATAMENTO SHIFT+TAB ACESSIBILIDADE
            if (document.getElementById('AGN').className != 'js-jump-field') {
                if (!(event.shiftKey && event.keyCode == 9)) {
                    if (event.keyCode != 16) {
                        if (formAtual.CTA.value.length == 7 && ((event.keyCode >= 47 && event.keyCode <= 58) || event.keyCode == 9)) {
                            formAtual.DIGCTA.focus();
                        }
                        break;
                    }
                }
            }
        }

        case "DIGCTA": {
            //TRATAMENTO SHIFT+TAB ACESSIBILIDADE
            if (document.getElementById('AGN').className == 'js-jump-field') {
                if ((event.shiftKey && event.keyCode == 9)) {
                    if (event.keyCode == 16) {
                        if (formAtual.DIGCTA.value.length == 1 && ((event.keyCode >= 47 && event.keyCode <= 58) || event.keyCode == 9)) {
                            formAtual.submitAgenciaConta.focus();
                        }
                        break;
                    }
                }
            }
        }
    }
}

window.onload = function () {
    botaoEntrar = document.getElementById("Entra");
};

function popUp(pURL, nWidth, nHeight) {
    window.open(pURL, 'pop', 'width=' + nWidth + ',height=' + nHeight + ', scrollbars=yes, toolbar=no,location=no,status=no');
    void (0);
}

var TabArr = new Array();
var prevlength = 0;
var prevname = "";
var bchange = false;

if (document.layers &&
    parseFloat(navigator.appVersion) < 6 &&
    (navigator.appVersion.indexOf("Linux") != -1 ||
        navigator.appVersion.indexOf("Mac") != -1)) {
    bchange = true;
}

function changefocus(e, evento) {
    if (document.all)
        campo = window.event.srcElement;
    else
        campo = e.target;
    if (campo.name && TabArr[campo.name]) {
        if (bchange && evento == 1) {
            window.focus();
            campo.focus();
        } else {
            if ((campo.value.length >= TabArr[campo.name][0]) &&
                (campo.value.length > prevlength) &&
                (campo.name == prevname) &&
                campo.form.elements[TabArr[campo.name][1]]) {
                if (campo.form.elements[TabArr[campo.name][1]].type != "hidden") {
                    campo.form.elements[TabArr[campo.name][1]].focus();
                } else {
                    campo.form.elements[TabArr[campo.name][2]].focus();
                }
                prevname = campo.form.elements[TabArr[campo.name][1]].name;
            }
        }
    }

    if (document.layers) {
        routeEvent(e);
    }
}

var campo;

function handKeydown(e) {
    if (document.all)
        campo = window.event.srcElement;
    else
        campo = e.target;
    if (campo.name) {
        prevlength = campo.value.length;
        prevname = campo.name;
    }
}

function handKeyup(event) {
    if (!(event.keyCode == 16 || event.keyCode == 9)) {
        changefocus(event, 1);
    }
}

function handChange(event) {
    changefocus(event, 2);
}
window.document.onkeyup = handKeyup;
window.document.onkeydown = handKeydown;
if (document.layers) {
    window.document.captureEvents(Event.KEYUP | Event.KEYDOWN);
    if (bchange) {
        window.document.onChange = handChange;
        window.document.captureEvents(Event.CHANGE);
    }
}

function cont(src, target, id, evt) {
    if (bchange && id == 1) {
        window.focus();
        src.focus();
    } else {
        target.value = src.value.length;
    }
}

TabArr["AGN"] = [4, "CTA"];
TabArr["CTA"] = [7, "DIGCTA"];
TabArr["DIGCTA"] = [1, "submitAgenciaConta"];



function GravaBase() {

    var basePathXML = "";
    var protocolo = DOMPurify.sanitize(location.protocol);
    basePathXML = "https://wspf.bradesco.com.br/wsstats/";

    var ag = document.getElementById("AGN").value;
    var ct = document.getElementById("CTA").value;
    var dig = document.getElementById("DIGCTA").value;
    var camp = DOMPurify.sanitize($('#Form68').find('#campTrans').val());
    var cdS = DOMPurify.sanitize($('#Form68').find('#cdServico').val());

    switch (cdS) {
        case '166': {
            descricao = 'Credito Pessoal On-Line - OK';
            break;
        }
        case '167': {
            descricao = 'Consignado super premiavel - OK';
            break;
        }
        case '199': {
            descricao = 'AntecipaÃ§Ã£o a Fornecedores - OK';
            break;
        }
        case '172495': {
            descricao = 'hiperfundo-bradesco - OK';
            break;
        }
        case '1672018': {
            descricao = 'Modal Super Consignado 2018 - OK';
            break;
        }
        case '225': {

            if (camp == 'corrente') {
                descricao = 'Renegociacao-de-dividas - conta corrente - botao OK';
            } else if (camp == 'cartao') {
                descricao = 'Renegociacao-de-dividas - cartÃ£o - botao - OK';
            }
            break;
        }

    }

    if (ag.length > 0 && ct.length > 0 && dig.length > 0) {
        if (cdS == 199 || cdS == 166 || cdS == 167 || cdS == 172495 || cdS == 1672018 || cdS == 225) {
            setStatCampanhaBaseNew(cdS, ag, ct + '-' + dig, descricao);
            setHasMD5(ag, ct, dig);
        }

        if (cdS == 172495) {
            setImgFace(origem);
        }

    }
    return;
}