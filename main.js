(function($){
  // Toggle Mobile Navigation on click
  $('div.menu').click(function() {
    $('ul.prinav').toggle('fast', function() {
      // Animation complete.
    });
  });
  // Toggle Additional Content on click
  $('.expand-trigger a').click(function() {
    $('.expand-content').toggle('fast', function() {
      // Animation complete.
    });
    return false;
  });
  // http://stackoverflow.com/questions/8054442/jquery-clearing-and-resetting-predefined-field-input-data-on-focus-and-blur
  $('input[placeholder]').focus(function(ev){
    var $this = $(this);
    if ($this.val() === $this.attr('placeholder')) $this.val('');
  });
  $('input[placeholder]').blur(function(ev){
    var $this = $(this);
    if ($this.val() === '') $this.val($this.attr('placeholder'));
  });

  $('.masking-numeric').each(function(index, el) {
    mask = Array($(el).prop('maxlength') + 1).join('0');
    $(this).mask(mask);
  });
  $('textarea.word-count').each(function(index, el) {
    var pTempContent = $('#' + $(el).attr('id') + '_count');
    if (pTempContent) pTempContent.html("0");
    // start counting
    var pText = trim($(el).val());
    var stripText = pText.replace(/(<([^>]+)>)/ig,"")
                          .replace(/<\/?[^>]+>/g, "")
                          .replace(/(\r\n|\n|\r)/gm," ")
                          .replace(/(&nbsp;)/g," ")
                          .replace(/  +/g, " ")
                          .replace("&nbsp;"," ")
                          .replace(/^[\s(&nbsp;)]+/g,"")
                          .replace(/[\s(&nbsp;)]+$/g,"");
    var pCount = stripText.split(" ").length
    if ((trim(stripText) == "") || (trim(stripText) == "<p><sub></sub></p>")) {
      if (pTempContent) pTempContent.html("0");
    } else {
      if (pTempContent) pTempContent.html(pCount);
    }
    $(this).on('keyup keydown', function(event) {
      /* Act on the event */
      var pTempContent = $('#' + $(this).attr('id') + '_count');
      if (pTempContent) pTempContent.html("0");
      // start counting
      var pText = trim($(this).val());
      var stripText = pText.replace(/(<([^>]+)>)/ig,"")
                            .replace(/<\/?[^>]+>/g, "")
                            .replace(/(\r\n|\n|\r)/gm," ")
                            .replace(/(&nbsp;)/g," ")
                            .replace(/  +/g, " ")
                            .replace("&nbsp;"," ")
                            .replace(/^[\s(&nbsp;)]+/g,"")
                            .replace(/[\s(&nbsp;)]+$/g,"");
      var pCount = stripText.split(" ").length
      if ((trim(stripText) == "") || (trim(stripText) == "<p><sub></sub></p>")) {
        if (pTempContent) pTempContent.html("0");
      } else {
        if (pTempContent) pTempContent.html(pCount);
      }
    });
  });

  //generic-help
  $(window).on('load', function () {
    var html = ''+
    '<a href="#" class="flatui-help-button">' +
    ' <img src="/i/icon-help-alt@2x.png" alt="Help" class="icon-help" width="20px">' +
    '</a>';
    $('.flatui-help-message').prev('label').append(html);

    $('.flatui-help-button').click(function(event) {
      /* Act on the event */
      event.preventDefault();
      $(this).closest('.question-text').find('.flatui-help-message').slideToggle();
    });
  });

  //generic-dropdown-other
  $(window).on('load', function () {
    //tabindex
    $('.tabindex').each(function(ix, el){
      $(el).attr('tabindex', ix + 1);
      $(el).data('tab-index', ix + 1);
    });
    $('.flatui-dropdown-other').change(function(event) {
      var text = $(this).attr('id') + '_Text';
      var text_container = text + '-container';
      if (parseInt($(this).val()) == -1) {
        $('#' + text_container).show();
        if ($(this).hasClass('required')) {
          $('#' + text).addClass('required');
        } else {
          $('#' + text).removeClass('required');
        }
      } else {
        $('#' + text_container).hide();
        $('#' + text).removeClass('required');
      }
    });
  });
})(window.jQuery);