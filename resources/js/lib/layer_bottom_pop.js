//bottom popup에 들어가는 스크립트
//레이어팝업 높이 판단하여 block와 position 컨트롤
function layerFunc(_target) {

  if (_target.hasClass('laypop-all')) {
    //전체풀팝업일경우 dimmed 생기지않음 2020-04-10

  } else {
    if (_target.outerHeight() > $(window).height()) {
      _target.css({ 'position': 'absolute', 'top': '50px', 'left': getCenterAlignPos($(window).width(), _target.outerWidth()) });
      addBlock('full');
    } else {
      _target.css({ 'position': 'fixed', 'top': getCenterAlignPos($(window).height(), _target.outerHeight()), 'left': getCenterAlignPos($(window).width(), _target.outerWidth()) });
      if (_target.attr('id') == "loadingLayer") {
        addBlock('removeEvent');
      } else if (_target.attr('id') == "customAlertLayer") {
        addBlock("fixed");
      } else {
        addBlock();
      }
    }
  }



  //예적금담보대출 약관동의 예외처리로 작업
  //공통으로 약관 팝업띄울때만 height 처리하게 바꿈
  if (_target.hasClass('agree-layer')) {
    //20180711 약관레이어팝업
    var winH = localStorage.getItem("winH");
    var layerH = winH * 0.95;
    var layertitH = _target.find('.pop-tit').height();
    var layerScrollH = layerH - (layertitH + 195);
    $('.agree-scroll').height(layerScrollH);
  }
}
//block
var winScrollTop;//180607추가
function addBlock(_full) {
  if (_full == 'full') {
   // $('body').append('<div class="block"></div>').css({ 'height': $('document').outerHeight, 'position': 'absolute' });
  } else if (_full == 'fixed') {
    //$('body').append('<div class="block2"></div>'); //180529
  } else {
   // $('body').append('<div class="block"></div>'); //180529
  }
  /* if(_full != 'removeEvent'){
      $('.block').on('click', function() {
          if ($('.block').length > 0) {
            $('.block').fadeOut(300).empty().remove();
            $('.layer-up').addClass('close').removeClass('show');
          }
      });
  }*/
  $('.close').on('click', function () {
    $('.block').trigger('click');
  });
}
function deleteBlock(_full) {
  if (_full == 'fixed') {
    $('.block2').fadeOut(300);
    $('.block2').remove();
  } else {
    $('.block').fadeOut(300);
    $('.block').detach();
  }
  $('body, html, .wrap').css({ 'height': '', 'overflow': '' });
  //$('body').css({'position':'relative','overflow-x':'hidden'}); 2020-07-09 
  $('body').removeAttr('style'); //2020-07-09
  $(window).scrollTop(winScrollTop);//180607추가
}
//popup
function openPopup(id) {
  var _target = $('#' + id);
  currentTop = $(window).scrollTop();
  $('body').css({ 'position': 'fixed', 'top': -currentTop });
  _target.find('.btn-layer-close').on('click', function () {
    closePopup(id);
    $('body').removeAttr('style');
    $(window).scrollTop(currentTop);
  });
  if (_target.hasClass('layer-up')) {

  } else if (_target.hasClass('type-alert')){
	  _target.fadeIn(600);
    _target.focus();
	  _target.addClass("on");

  }else{
    _target.fadeIn(600);
	_target.addClass("on");
    _target.focus();
  }
}
//open popup slideup 2020-03-31
function openPopupUp(id) {
  var _target = $('#' + id);
  currentTop = $(window).scrollTop();
  $('body').css({ 'position': 'fixed', 'top': -currentTop });//fixed 삭제해야할지도,,,
  //_target.fadeIn(300);
  layerFunc(_target);
  _target.removeClass('close');
  _target.addClass('show').show();
  _target.focus();
  _target.find('.btn-layer-close').on('click', function () {
    closePopupUp(id);
    $('body').removeAttr('style');
    $(window).scrollTop(currentTop);
    _target.removeClass('show');
  });

  if (_target.has('.ly-select-list').length > 0) {
    _target.find('.ly-select-list > li > button').not('.ly-select-list.non-click > li > button').on('click', function () {
      closePopupUp(id);
      $('body').removeAttr('style');
      $(window).scrollTop(currentTop);
      _target.removeClass('show');
    });
  }
  if (_target.has('.ly-acc-select').length > 0) {
    _target.find('.ly-acc-select > .acc-list-area > a').on('click', function (e) {
      closePopupUp(id);
      $('body').removeAttr('style');
      $(window).scrollTop(currentTop);
      _target.removeClass('show');
      e.preventDefault();
    });
  }
}

//close popup slideDown 2020-03-31
function closePopupUp(id) {
  deleteBlock();
  //ADD eunji 2020-10-05
  $('#' + id).scrollTop(0);
  $('#' + id).fadeOut(600);
}


/**
* 중앙정렬 위치
* @param containerSize : 컨테이너의 크기
* @param targetSize : 컨테이너에 들어 있는 오브젝트의 크기
* @return
*/
function getCenterAlignPos(containerSize, targetSize) {
  var pos = (containerSize - targetSize) / 2;
  return pos;
}

