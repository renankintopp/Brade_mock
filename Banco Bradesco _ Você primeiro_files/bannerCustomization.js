function addBanner(banner) {
  $("#slider > .slides").prepend(banner)
}

function addProgress(banner, number) {
  $("#carousel > .slides").append(`<li data-slides=${banner}" class="progress-bar bar_${number} no-active" data-percent="100" data-duration="10500" data-slide="${number}" style="width: 210px;margin-right: 5px;float: left;display: block;"></li>`)
}

function buildBanner() {
  $('#carousel').flexslider({
    animation: "slide",
    controlNav: true,
    animationLoop: false,
    directionNav: false,
    slideshow: true,
    itemWidth: 400,
    itemMargin: 5,
    asNavFor: '#slider',
    controlsContainer: $(".custom-controls-container"),
  });

  $('#slider').flexslider({
    animation: "fade",
    slideshowSpeed: 4000,
    pausePlay: true,
    animationSpeed: 1000,
    controlNav: true,
    animationLoop: true,
    directionNav: true,
    slideshow: true,
    sync: "#carousel",
    slideshowSpeed: 10500,
    controlsContainer: $(".custom-controls-container"),
    customDirectionNav: $(".custom-navigation a"),
    start: function (flexslider) {
      changeTimer(flexslider);
    },
    after: function (flexslider) {
      changeTimer(flexslider);
    }
  });

  function changeTimer(flexslider) {
    $(".progress-bar").addClass("no-active");
    $(".bar_" + flexslider.currentSlide).removeClass("no-active");
    $(".no-active").children("div").remove();
    $(".bar_" + flexslider.currentSlide + ".flex-active-slide").loading();

    let banner = document.getElementsByClassName("flex-active-slide")[0];
    let tam = parseInt(document.getElementsByClassName('slides')[0].lastElementChild.classList[0]);

    let prev = parseInt(banner.classList[0]) - 1;
    let next = parseInt(banner.classList[0]) + 1;

    if (prev === -1) prev = tam;
    if (next === tam + 1) next = 0;

    document.getElementsByClassName("img_prev")[0].src = document.getElementsByClassName(prev)[0].getAttribute('data-thumb');
    document.getElementsByClassName("img_next")[0].src = document.getElementsByClassName(next)[0].getAttribute('data-thumb');
  }

  $('.flex-nav-prev').mouseover(
    function prevTool() {
      $('.tooltip_prev').addClass('showThis')
    }
  );
  $('.flex-nav-prev').mouseout(
    function prevTool() {
      $('.tooltip_prev').removeClass('showThis')
    }
  );
  $('.flex-nav-next').mouseover(
    function nextTool() {
      $('.tooltip_next').addClass('showThis')
    }
  );
  $('.flex-nav-next').mouseout(
    function prevTool() {
      $('.tooltip_next').removeClass('showThis')
    }
  );


  $('.progress-bar').on('click', function () {
    $('.flexslider').flexslider(parseInt($(this).attr('data-slide')));
    $('.flexslider').flexslider("play");
  });

  var textBanner = document.querySelectorAll(".text__banner");

  for (var i = 0; i < textBanner.length; i++) {
    var e = textBanner[i];
    for (var j = 0; j < e.childElementCount; j++) {
      var title = e.children[j];
      if (title.classList.contains("title")) title.innerHTML = e.children[j].getAttribute('data-title');
      var descri_one = e.children[j];
      if (descri_one.classList.contains("descri_one")) descri_one.innerHTML = e.children[j].getAttribute('data-one');
      var descri_two = e.children[j];
      if (descri_two.classList.contains("descri_two")) descri_two.innerHTML = e.children[j].getAttribute('data-two');
      var button = e.children[j];
      if (button.classList.contains("button")) button.innerHTML = e.children[j].getAttribute('data-button');
    }
  }
};

const wrapper = function (fn) {
  let alreadyRun = false;
  return function () {
    if (!alreadyRun) {
      alreadyRun = true;
      fn(...arguments);
    }
  };
}

const cb = () => {
  $("#carousel-banner").eq(0).fadeTo(0, 1);
  $("#carousel-banner .slides").eq(0).fadeTo(0, 1);
  buildBanner();
};

const bds = wrapper(cb)

setTimeout(bds, 1000)