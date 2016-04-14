$(document).ready(function(){
	


	$('.send-btn').click(function(e){
		e.preventDefault();
		var cargo = $('input[name="cargo"]:checked').val();
		var pay = $('input[name="pay"]:checked').val();
		var num = $('input[name="num"]').val();

		var cd = 390;
		var ship = 0;
		var shipSet = [0,50,80];
		var wrap = 5;
		var poster = 15;
		var posterShip = 40;

		cd = 390 * num;

		if(num>0 && num<=2){
			ship = shipSet[1];
		}else{
			ship = shipSet[2];
		}

		wrap = 5 * num;
		if(wrap>10) wrap = 10;
		var tempPost = Math.ceil(num/2);
		poster = poster * tempPost;
		posterShip = posterShip * tempPost;

		if(cargo=='no') {
			wrap = 0;
			ship = 0;
			poster = 0;
			posterShip = 0;
		}else if(cargo=='store'){
			//wrap = 10;
			ship = 60;
			poster = 0;
			posterShip = 0;
		}
		
		
	

		var total = cd + ship + wrap + poster + posterShip;

		if(pay=='code') total += 26;


		$('.cd').text('您欲訂購 ' + num + ' 張專輯，每張 390 元，小計 ' + cd + ' 元');

		if(cargo=='post'){
			$('.wrap').show();
			$('.ship').show();
			$('.poster').show();
			$('.pay').hide();
			$('.wrap').text('包材(含氣泡袋、膠帶等等) ' + wrap + ' 元');
			$('.ship').text('您選擇掛號郵寄，運費一共為 ' + ship + ' 元');
			$('.poster').html('海報一共 ' + num + ' 張，海報筒每支 15 元，每支運費 40 元<br>需要海報筒 ' + tempPost + ' 支 '+ poster +' 元，運費 ' + posterShip + ' 元，小計 ' + (poster + posterShip) + ' 元');
		}else if(cargo=='store'){
			$('.wrap').show();
			$('.ship').show();
			$('.poster').show();
			$('.pay').hide();
			$('.wrap').text('包材(含氣泡袋、膠帶等等) ' + wrap + ' 元');
			$('.ship').text('您選擇超商取貨，運費一律 ' + ship + ' 元');
			$('.poster').html('海報一律折疊，無海報筒');
		}else if(cargo=='no'){
			$('.wrap').hide();
			$('.ship').hide();
			$('.poster').hide();
			$('.pay').hide();
		}

		if(pay=='code'){
			$('.pay').show();
			$('.pay').html('超商代碼繳費，須多加手續費 26 元');
		}else{
			$('.pay').hide();
		}
		
		$('.total').text('合計： '+ total +' 元');


	});




});
