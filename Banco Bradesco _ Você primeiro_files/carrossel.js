"use strict";

(function ($, $document) {

    document.addEventListener("DOMContentLoaded", function () {

        const bannerElement = document.getElementById("banners-bradesco");
        if (!bannerElement) return;
        const segmentoId = bannerElement.querySelector("div") ? bannerElement.querySelector("div").id : "";
        const apiUrl = `https://publish-p128342-e1259725.adobeaemcloud.com/graphql/execute.json/banco-bradesco/banners-get-banner-by-segmento;segmento=${segmentoId}`;
        const urlBannerPath = "https://publish-p128342-e1259725.adobeaemcloud.com";
      
        fetch(apiUrl).then(response => response.json())
            .then(data => {
                let slides = [];
            
                if (
                    data &&
                    data.data &&
                    data.data.bannersModelList &&
                    Array.isArray(data.data.bannersModelList.items) &&
                    data.data.bannersModelList.items.length > 0
                ) {
                    slides = data.data.bannersModelList.items.map(banner => ({
                        desktopWebp: (banner.imageDeskWebp && banner.imageDeskWebp._publishUrl) || null,
                        desktopJpg: (banner.imageDeskJpg && banner.imageDeskJpg._publishUrl) || null,
                        mobileWebp: (banner.imageMobWebp && banner.imageMobWebp._publishUrl) || null,
                        mobileJpg: (banner.imageMobJpg && banner.imageMobJpg._publishUrl) || null,
                        imgTypeDesk: banner.imgTypeDesk || "jpg",
                        imgTypeMob: banner.imgTypeMob || "jpg",
                        alt: banner.alt || "Imagem do banner",
                        title: banner.title || "Imagem do banner",
                        link: banner.link || "",
                        linkMobile: banner.linkMobile || "",
                        track: banner.track || "",
                        priority: banner.priority
                    }));
            
                    slides.sort((a, b) => a.priority - b.priority);
                } else {
                    slides = [{
                        desktopWebp: "https://assets.bradesco/content/dam/portal-bradesco/assets/common/img/banner-padrao-desk.webp",
                        desktopJpg: "https://assets.bradesco/content/dam/portal-bradesco/assets/common/img/banner-padrao-desk.jpg", 
                        mobileWebp: "https://assets.bradesco/content/dam/portal-bradesco/assets/common/img/banner-padrao-mobile.webp",
                        mobileJpg: "https://assets.bradesco/content/dam/portal-bradesco/assets/common/img/banner-padrao-mobile.jpg",
                        alt: "Banner Abra sua conta",
                        title: "Banner Abra sua conta",
                        link: "",
                        linkMobile: "",
                        track: "",
                        priority: 1
                    }];
                }
            
                criarCarrossel(slides);
            })
            .catch(error => {
                console.error("Erro ao buscar os banners:", error);
            
                const fallbackSlide = [{
                    desktopWebp: "https://assets.bradesco/content/dam/portal-bradesco/assets/common/img/banner-padrao-desk.webp",
                    desktopJpg: "https://assets.bradesco/content/dam/portal-bradesco/assets/common/img/banner-padrao-desk.jpg", 
                    mobileWebp: "https://assets.bradesco/content/dam/portal-bradesco/assets/common/img/banner-padrao-mobile.webp", 
                    mobileJpg: "https://assets.bradesco/content/dam/portal-bradesco/assets/common/img/banner-padrao-mobile.jpg",
                    alt: "Banner Abra sua conta",
                    title: "Banner Abra sua conta",
                    link: "",
                    linkMobile: "",
                    track: "",
                    priority: 1
                }];
            
                criarCarrossel(fallbackSlide);
            });

        function criarCarrossel(slides) {

            const targetElement = document.getElementById("banners-bradesco");

            if (!targetElement) return;

            const swiperContainer = document.createElement("div");
            swiperContainer.classList.add("swiper-container");

            const swiperWrapper = document.createElement("div");
            swiperWrapper.classList.add("swiper-wrapper");

            slides.forEach(slideData => {

                const slide = document.createElement("div");
                slide.classList.add("swiper-slide");

                // Verifica se há link para desktop ou mobile
                const hasLink = slideData.link || slideData.linkMobile;
                const anchor = hasLink ? document.createElement("button") : document.createElement("div");
                
                
                
                if (hasLink) {
                    anchor.type = "button";
                    anchor.style.border = "none";
                    anchor.style.background = "none";
                    anchor.style.padding = "0";
                    anchor.style.cursor = "pointer";

                    anchor.setAttribute('onclick', slideData.track);
                    anchor.addEventListener("click", function () {
                        const isMobile = window.innerWidth < 570;
                        
                        // Seleciona o link apropriado com base no dispositivo
                        let linkToUse = isMobile && slideData.linkMobile ? 
                            slideData.linkMobile : slideData.link;

                        if (linkToUse) {
                            window.open(linkToUse, "_blank");
                        }
                    });
                } else {
                    anchor.classList.add('banner-padrao')
                }

                const picture = document.createElement("picture");

                // Desktop WebP
                if (slideData.desktopWebp) {
                    const sourceDesktopWebp = document.createElement("source");
                    sourceDesktopWebp.srcset = slideData.desktopWebp.replace("https://custodia.bradesco", urlBannerPath);
                    sourceDesktopWebp.media = "(min-width: 570px)";
                    sourceDesktopWebp.type = "image/webp";
                    picture.appendChild(sourceDesktopWebp);
                }

                // Desktop JPG (fallback)
                if (slideData.desktopJpg) {
                    const sourceDesktopJpg = document.createElement("source");
                    sourceDesktopJpg.srcset = slideData.desktopJpg.replace("https://custodia.bradesco", urlBannerPath);
                    sourceDesktopJpg.media = "(min-width: 570px)";
                    sourceDesktopJpg.type = "image/jpeg";
                    picture.appendChild(sourceDesktopJpg);
                }

                // Mobile WebP
                if (slideData.mobileWebp) {
                    const sourceMobileWebp = document.createElement("source");
                    sourceMobileWebp.srcset = slideData.mobileWebp.replace("https://custodia.bradesco", urlBannerPath);
                    sourceMobileWebp.media = "(max-width: 569px)";
                    sourceMobileWebp.type = "image/webp";
                    picture.appendChild(sourceMobileWebp);
                }

                // Mobile JPG (fallback)
                if (slideData.mobileJpg) {
                    const sourceMobileJpg = document.createElement("source");
                    sourceMobileJpg.srcset = slideData.mobileJpg.replace("https://custodia.bradesco", urlBannerPath);
                    sourceMobileJpg.media = "(max-width: 569px)";
                    sourceMobileJpg.type = "image/jpeg";
                    picture.appendChild(sourceMobileJpg);
                }

                // Fallback img
                const img = document.createElement("img");
                const defaultSrc = slideData.desktopJpg || slideData.desktopWebp || slideData.mobileJpg || slideData.mobileWebp;
                img.src = defaultSrc.replace("https://custodia.bradesco", urlBannerPath);
                img.alt = slideData.alt;
                img.title = slideData.title;
                img.track = slideData.track || "";
                img.style.width = "100vw";
                img.style.height = "auto";

                picture.appendChild(img);

                anchor.appendChild(picture);
                slide.appendChild(anchor);
                swiperWrapper.appendChild(slide);
            });

            swiperContainer.appendChild(swiperWrapper);

            const paginationContainer = document.createElement("div");
            paginationContainer.classList.add("swiper-pagination");
            swiperContainer.appendChild(paginationContainer);
            targetElement.appendChild(swiperContainer);

            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = "/static/carrossel-banners/swiper/swiper-bundle.min.css";

            document.head.appendChild(link);

            const style = document.createElement("style");
            style.innerHTML = `
                    .swiper-container { overflow: hidden; width: auto; position: relative; }
                    .swiper-wrapper { display: flex; }
                    .swiper-slide { flex: 1 0 100%; display: flex; justify-content: center; align-items: center;}
                    .swiper-pagination { position: absolute; bottom: 20px !important; right: 50px; width: auto !important; left: auto !important; z-index: 8 !important; }
                    .swiper-pagination-bullet { width: 10px; height: 10px; background: gray; opacity: 0.7; transition: opacity 0.3s ease; }
                    .swiper-pagination-bullet-active { width: 24px; height: 24px; border-radius: 50%; background: transparent; position: relative; opacity: 1; overflow: hidden; box-shadow: inset 0 0 0 4px gray; }
                    .swiper-pagination-bullet-active::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; box-shadow: inset 0 0 0 4px red; clip-path: inset(0 0 0 100%); animation: fillBorder 9s linear forwards; }
                    @keyframes fillBorder { from { clip-path: inset(0 0 0 100%); } to { clip-path: inset(0 0 0 0); } }
                    .swiper-slide button { all: unset; display: block; width: 100%; cursor: pointer; }
                `;

            document.head.appendChild(style);

            const script = document.createElement("script");

            script.src = "/static/carrossel-banners/swiper/swiper-bundle.min.js";

            script.onload = function () {
                new Swiper(".swiper-container", {
                    loop: true,
                    autoplay: {
                        delay: 9000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                        renderBullet: function (index, className) {
                            return `<span class="${className}"></span>`;
                        }
                    },
                });
            };

            document.body.appendChild(script);

        }

        function trackPortal(location, action, element, product, flow) {

            var dataLayer = window.dataLayer || [];

            dataLayer.push({
                event: 'Event_Data',
                event_type: 'new',
                ga_event: {
                    location: location,
                    action: action,
                    element_name: element
                },
                product: {
                    product: product,
                    flow: flow
                }
            });
        }

        window.trackPortal = trackPortal;
    });

})($, $(document));