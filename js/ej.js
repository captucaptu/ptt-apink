$(document).ready(function(){
	//https://docs.google.com/spreadsheets/d/1LwMNRe4nhBBcWiUHEOYD9pxG-ykwlFe5vejiyTij2hU/pubhtml
	//var key = '12fM7M2yrhFMHQedH-npFE3A7BZkd_xX9wbIpmfFi4VY';
	var key = '1TBBtEjmQ1VYZZCXrKWStIJYyc7y-93yk6K7iD_02ZCc';
	var userURL = 'https://spreadsheets.google.com/feeds/list/' + key + '/1/public/values?alt=json';
	
	queryTotal();
	function queryTotal(){
		var total = 0;
		$.ajax({
			url: userURL,
			type: "GET",
			dataType: "json",
			success: function (json) {
				var trowsRegex = /gsx\$/;

				// 呈現表格 rows 資料
				var trows = json.feed.entry;
				//var num = 0;
				$.each(trows, function (i, data) {
						total += Number(data.gsx$訂購數量.$t);
					
				});
				//total = (red+white);
				$('.all span').html(total);
			},
			//錯誤判斷
			error: function () {
				alert("資料讀取錯誤，請聯絡 captu");
			}
		});

		
	}
	
	function queryData(pttid,tel){
		var bookers = [];
		var booker = [];
		$.ajax({
			url: userURL,
			type: "GET",
			dataType: "json",
			success: function (json) {
				var rowsRegex = /gsx\$/;

				// 呈現表格 rows 資料
				var rows = json.feed.entry;
				$.each(rows, function (i, data) {
					//console.log(i);
					bookers[i]=[];
					$.each(data, function (j, jdata){
						if(rowsRegex.test(j)){
							//console.log(jdata.$t);
							//console.log(booker[i]);
							bookers[i].push(jdata.$t);
						}
					});
				});
				var find = false;
				for (var k = 0; k<bookers.length; k++) {
					if(bookers[k][2]==pttid && (bookers[k][8]==(tel.substring(1,tel.length)) || bookers[k][8] == tel)){
						booker = bookers[k];
						$('li.pttid').text("訂購人ID："+booker[2]);
						$('li.name').text("訂購人(收件人)："+booker[1]);
						$('li.num').text("數量："+booker[3]);
						$('li.price').text("金額："+booker[4]);
						$('li.ac').text("對帳資料："+booker[5]);
						$('li.post').text("取貨方式："+booker[6]);
						$('li.adds').text("收件地址："+booker[7]);
						if(bookers[k][8]==(tel.substring(1,tel.length))) $('li.tel').text("聯絡電話：0"+booker[8]);
						if(bookers[k][8] == tel) $('li.tel').text("聯絡電話："+booker[8]);
						
						
						console.log(booker);
						if(booker[10]=="TRUE"){
							$('li.check').text("處理狀況：匯款已確認收到。");
						}else{
							$('li.check').text("處理狀況：已填單，待確認款項與資料。");
						}
						//$('li.trackno-1').text("郵件編號："+booker[15]);
						//$('li.trackno-2').text("郵件編號(海報)："+booker[16]);
						//$('li.check').text("PTT 帳號："+booker[1]);
						//console.log(booker);
						find = true;
						break;
					}
				}
				if(!find){
					alert('查無資料');
				}
			},
			//錯誤判斷
			error: function () {
				alert("資料讀取錯誤，請聯絡 captu");
			}
		});

		
	}
	$(".sent-btn").click(function() {
		//console.log($('input[name="tel"]').val().substring(1,$('input[name="tel"]').val().length));
	  queryData($('input[name="ptt"]').val(),$('input[name="tel"]').val());
	});
});

