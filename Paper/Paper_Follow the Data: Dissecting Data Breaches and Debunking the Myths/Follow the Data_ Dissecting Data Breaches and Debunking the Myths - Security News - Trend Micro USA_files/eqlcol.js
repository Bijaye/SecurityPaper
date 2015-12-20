$(function(){
	var row_index = 0;

	$(".eqlcol").parent()
				.next("br.clear").each(function(){
				
					row_index++;
					$(this).prevUntil('br.clear,hr.clear').addClass("row_" + row_index);
				});
	
	for(i=1; i <= row_index; i++){
		$(".row_" + i + " .eqlcol").equalHeights();
	}
});