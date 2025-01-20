/*인풋포커스 마지막 요소 포커스 이동*/
window.addEventListener('load', function() {
    const lastFormGroup = document.querySelector('.form-wrap.write > .form-group:last-of-type');
    const focusableElement = lastFormGroup.querySelector('input, button, a[href], textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElement) focusableElement.focus();
});

$(document).ready(function() {

  // 체크박스 클릭 시 text 변경
  $(".trans-check").click(function(){
    if($(".trans-check input").prop("checked")){
      $("#change1").html("sqft");
      $("#change2").html("Switch ‘㎡’");
    }else{
      $("#change1").html("㎡");
      $("#change2").html("Switch ‘sqft’");
    }
  });

/** accorion **/
$('.accordion .btn-accordion').click(function() {
  var accordionCont = $(this).closest('.accordion').find('.accordion-cont');
  $(this).parent().toggleClass('on');
  accordionCont.toggleClass('on');
});


  /**  3자리 수마다 콤마 적용 **/
  $(document).on('keyup', 'input[inputmode=numeric]', function (event) {
    this.value = this.value.replace(/[^0-9]/g, ''); // 입력값이 숫자가 아니면 공백
    this.value = this.value.replace(/,/g, ''); // ,값 공백처리
    this.value = this.value.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 정규식을 이용해서 3자리 마다 , 추가
  });

  // 즐겨찾기 on/off 스크립트 (0703 추가)
	$(".btn-set.like").click(function(){
		if( $(this).hasClass("on") ){
			$(this).removeClass("on");
		}else{
			$(this).addClass("on");
		}
	});

  //input focus
  $('.form-control, textarea').focus(function(){
    if (!$(this).hasClass('select') && !$(this).prop("readonly")) {//문자열로 넘겨줘야 함 
      $('.fixed-btn-wrap').hide();
    }
  });

  $('.form-control, textarea').blur(function(){
    if (!$(this).hasClass('select') && !$(this).prop("readonly")) {
      $('.fixed-btn-wrap').show();
    }
  });

   //keyboard focus
   $(document).keydown(function(event){
    if (event.key === "Escape") {
      var inputField = $("input.form-control");
      inputField.blur();
    }
  })

  /** tab **/
	$(".tab-item.type2 > li").click(function(){

		var tabCont = $(this).attr("data-tab");

		$(this).siblings().removeClass("on");
		if (!$(this).hasClass('swiper'))  $(this).addClass("on");

		$(".tab-content").addClass("dp-none");
		$("#" + tabCont).removeClass("dp-none");

		$(".tab-item.scroll > li").click(function() {
			var tabContPosition = $(".tab-item.scroll > li:first-child").offset().left;
			var listItemPosition = $(this).offset().left;
			var distance = listItemPosition - tabContPosition;
	  
			$(".tab-item.scroll").animate({
				scrollLeft: distance
			}, 100);
		});
	});

  //툴팁
	$(".info-tooltip").on('click', function(){
		var $this = $(this).parents(".tooltip-wrap");

		$this.removeClass('on');
		if($this.hasClass('on')){
			$this.removeClass('on');
		}else{
			$this.addClass('on');
		};
	});

	//툴팁 닫기
	$(".tooltip-close").on('click', function(){
		var $this = $(this).parents(".tooltip-wrap");
		$this.removeClass('on');
	});

    /** 이미지 불러오기 **/
    var sel_files = [];
    $(document).ready(function(){
        $('#file').on('change', handleImgsFilesSelect);
    });
    function handleImgsFilesSelect(e){
        var files = e.target.files;
        var filesArr = Array.prototype.slice.call(files);

        filesArr.forEach(function(f){
            sel_files.push(f);

            var reader = new FileReader();
            reader.onload = function(e){
                var img_html = '<li class="delete"><img src=\'' + e.target.result + '\' /></li>';
                $('.ip-file').append(img_html);
                // img_html.addClass('delete');
            }
            reader.readAsDataURL(f);
        })
    }
    /** 이미지 불러오기 삭제 **/
    $('.thumb-wrap ul').on('click', '.delete', function(e) {
        e.stopPropagation();//중단

        $(this).remove();
    });

    $()

});

// var winH2 = $(window).height() || window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
// $(document).on('click', '.btn-top', function (e) {
//   e.preventDefault();
//   $('body, html').animate({
//     scrollTop: 0
//   }, 450);
// });


// //레이어팝업 높이 판단하여 block와 position 컨트롤
function layerFunc(_target) {

  if (_target.hasClass('laypop-all')) {
    //전체풀팝업일경우 dimmed 생기지않음

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
}

//block
var winScrollTop;
function addBlock(_full) {
  $('.close').on('click', function () {
    $('.block').trigger('click');
  });
}
function deleteBlock(_full) {
  if (_full == 'fixed') {
    $('.block').fadeOut(300);
    $('.block').remove();
  }
  $('html, .wrap').css({ 'height': '', 'overflow': '' });
  $('body').removeAttr('style');
  $(window).scrollTop(winScrollTop);
}


// popup
function openPopup(id) {
  var _target = $('#' + id);
  currentTop = $(window).scrollTop();
  $('body').css({ 'position': 'fixed', 'top': -currentTop });
  _target.find('.btn-layer-clos, .btn-close').on('click', function () {
    closePopup(id);
    $('body').removeAttr('style');
    $(window).scrollTop(currentTop);
  });
  if (_target.hasClass('layer-up')) {
    _target.fadeIn(600);
    _target.focus();
    _target.addClass("on");
  } else if (_target.hasClass('type-alert')){
  // _target.css('top','0');
	_target.fadeIn(600);
  _target.focus();
	_target.addClass("on");
  }
}

//open popup slideup
function openPopupUp(id) {
  var _target = $('#' + id);
  currentTop = $(window).scrollTop();
  $('body').css({ 'position': 'fixed', 'top': -currentTop });
  //_target.fadeIn(300);
  layerFunc(_target);
  _target.removeClass('close');
  _target.addClass('show').show();
  _target.focus();
  _target.find('.btn-layer-close, .btn-close').on('click', function () {
    closePopupUp(id);
    $('body').removeAttr('style');
    $(window).scrollTop(currentTop);
    _target.removeClass('show');
  });

  if (_target.has('.ly-select-list').length > 0) {
    _target.find('.ly-select-list > li > button').on('click', function () {

      // 클릭한 버튼의 부모 요소인 li에 active 클래스 추가
      $(this).closest('li').addClass('active').siblings().removeClass('active');

      var selectedText = $(this).text();
      
      $('[onclick="openPopupUp(\'' + id + '\')"]').closest('.form-control.select.between').find('span').text(selectedText);
      
      closePopupUp(id);
      $('body').removeAttr('style');
      $(window).scrollTop(currentTop);
      _target.removeClass('show');
    });

  }
}

function closePopup(id) {
  var _target = $('#' + id);
  deleteBlock();
  $('#' + id).fadeOut(600);
  _target.removeClass('on');
}
//close popup slideDown 
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






