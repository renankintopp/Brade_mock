document.addEventListener('DOMContentLoaded', function() {
    if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()) || window.innerWidth <= 768) {
        let customRybenaDiv = document.getElementById('custom-rybena-div');
        if (customRybenaDiv) {
            customRybenaDiv.remove();
        }
        console.log("Rybena script loaded");
        let script = document.createElement('script');
        script.src = "https://cdn.rybena.com.br/dom/master/latest/rybena.js?mode=full&positionPlayer=right&positionBar=right&offsetX=15&offsetY=135";
        script.async = true;
        document.head.appendChild(script);
    }
});