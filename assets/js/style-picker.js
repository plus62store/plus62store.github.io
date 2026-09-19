$(function () {
  $('.style-picker div').on('click', function () {
    var target = $(this).attr('id');
    var image = $(this).data('image');

    $(this).addClass('item_color').siblings().removeClass('item_color');
    $('#' + target).show().siblings('div').hide();

    if (image) {
      $('.simpleCart_shelfItem .item_thumb').attr('src', image);
    }
  });

  var selectedStyle = $('.style-picker div.item_color').first();
  if (selectedStyle.length && selectedStyle.data('image')) {
    $('.simpleCart_shelfItem .item_thumb').attr('src', selectedStyle.data('image'));
  }
});
