$(document).ready(function(){
	


	$('.send-btn').click(function(e){
		e.preventDefault();
		var cargo = $('input[name="cargo"]:checked').val();
		var num = $('input[name="num"]').val();

		var cd = 513;
		var ship = 0;
		var shipSet = [62,80,110];
		var wrap = 3;
		var poster = 13;
		var posterShip = 40;

		cd = 513 * num;

		if(num>0 && num<=1){
			ship = shipSet[0] * num;
			wrap = wrap * num;
		}else if(num>=2 && num<=4){
			ship = shipSet[1];
			wrap = wrap * num;
		}else if(num>=5){
			ship = shipSet[2];
			wrap = wrap * num;
		}

		if(cargo=='false') ship = 0;
		
		var tempPost = Math.ceil(num/3);
		poster = poster * tempPost;
		posterShip = posterShip * tempPost;


		var total = cd + ship + wrap + poster + posterShip;


		$('.cd').text('您欲訂購 ' + num + ' 張專輯，每張 513 元，小計 ' + cd + ' 元');
		$('.wrap').text('專輯每張酌收 3 元包材(含氣泡袋、膠帶等等)，小計 ' + wrap + ' 元');
		$('.ship').text('您欲訂購 ' + num + ' 張專輯，專輯運費為 ' + ship + ' 元');
		$('.poster').html('海報一共 ' + num + ' 張，海報筒每支 13 元，每支運費 40 元<br>需要海報筒 ' + tempPost + ' 支 '+ poster +' 元，運費 ' + posterShip + ' 元，小計 ' + (poster + posterShip) + ' 元');
		$('.total').text('合計： '+ total +' 元');


	});




});
