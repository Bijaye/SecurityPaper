$(document).ready(function() {
  var switched = false;
  var updateTables = function() {

    if (($(window).width() < 767) && !switched ){
      switched = true;
      $("#tabledata").each(function(i, element) {
        splitTable($(element));
      });
  var winwidth=$(window).width();
  $('.table-wrapper').css('width',winwidth-80)
      return true;
    }
    else if (switched && ($(window).width() > 767)) {
      switched = false;
      $("#tabledata").each(function(i, element) {
        unsplitTable($(element));
      });
    }
  };

var updateTablesResize = function() {
	var winwidth=$(window).width();
        $('.table-wrapper').css('width',winwidth-80)
}
   
  $(window).load(updateTables);
  $(window).on("redraw",function(){switched=false;updateTables;}); // An event to listen for
$(window).on("resize", updateTablesResize);

	
	function splitTable(original)
	{
		original.wrap("<div class='table-wrapper' />");
		
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		$("#tabledata td:nth-child(1)").css("display", "none");
		copy.removeClass("responsive");
		
		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollableTable' />");

    setCellHeights(original, copy);
	}
	
	function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
	}

  function setCellHeights(original, copy) {
    var tr = original.find('tr'),
        tr_copy = copy.find('tr'),
        heights = [];

    tr.each(function (index) {
      var self = $(this),
          tx = self.find('th, td');

      tx.each(function () {
        var height = $(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });

    });

    tr_copy.each(function (index) {
      $(this).height(heights[index]);
    });
  }

});
