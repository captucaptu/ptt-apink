$(document).ready(function(){
	$('#submit-btn').click(function(){
		var type = $('input[name="pushTag"]:checked').val();
		var marktype = $('input[name="markTag"]:checked').val();
		$('.test').empty();
		$('.test').append("<span class='loading'>讀取中</span>");
		$.ajax({
			url: $('#url').val(),
			type: 'GET',
			success: function(res) {
				var data = $(res.responseText).find('.push');
				var count = 0;
				$('.test').empty();
				data.each(function(index, cont){
					$(this).prepend("<span class='floor'>"+(index+1)+" 樓 - </span><span class='mark'></span>");
					if(type==1 && $(this).children('.push-tag').text()=="推"){
						count+=1;
						$(this).children('.mark').text((count)+" 推 ： ");
						if(marktype==2 && (count)%$('#hignlight-line').val()==0){
							$(this).addClass('highlight');
						}
					}
					if(type==2 && $(this).children('.push-tag').text()=="噓"){
						count+=1;
						$(this).children('.mark').text((count)+" 噓 ： ");
						if(marktype==2 && (count)%$('#hignlight-line').val()==0){
							$(this).addClass('highlight');
						}
					}
					if(type==3 && $(this).children('.push-tag').text()=="→"){
						count+=1;
						$(this).children('.mark').text((count)+" → ： ");
						if(marktype==2 && (count)%$('#hignlight-line').val()==0){
							$(this).addClass('highlight');
						}
					}
					if(marktype!=2){
						if((index+1)%$('#hignlight-line').val()==0){
							$(this).addClass('highlight');
						}
					}
					$('.test').append($(this));

					
				});
			}
		});
	})
});
