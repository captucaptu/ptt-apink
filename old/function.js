$(document).ready(function(){
	var key = '1aCJdNxlGT2VqckNxuxWWJPXNvNrb3SGgGuqmCN8ty0Y';
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
				$.each(trows, function (i, data) {
					//console.log(data.gsx$訂購數量.$t);
					total += Number(data.gsx$訂購數量.$t);
					$('.total').html(total);
				});
				
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
							console.log(jdata.$t);
							//console.log(booker[i]);
							bookers[i].push(jdata.$t);
						}
					});
				});
				var find = false;
				for (var k = 0; k<bookers.length; k++) {
					if(bookers[k][1]==pttid && (bookers[k][9]==(tel.substring(1,tel.length)) || bookers[k][9] == tel)){
						booker = bookers[k];
						$('li.pttid').text("PTT 帳號："+booker[1]);
						$('li.name').text("訂購人："+booker[2]);
						$('li.num').text("數量："+booker[3]);
						$('li.price').text("金額："+booker[4]);
						$('li.ac').text("對帳資料："+booker[5]);
						$('li.poster').text("海報寄送："+booker[6]);
						$('li.change').text("餘款處理："+booker[7]);
						$('li.receive').text("收件人："+booker[8]);
						if(bookers[k][9]==(tel.substring(1,tel.length))) $('li.tel').text("聯絡電話：0"+booker[9]);
						if(bookers[k][9] == tel) $('li.tel').text("聯絡電話："+booker[9]);
						$('li.adds').text("收件地址："+booker[10]);
						//console.log(booker[12]);
						if(booker[12]=="TRUE"){
							$('li.check').text("處理狀況：匯款已確認收到。");
						}else{
							$('li.check').text("處理狀況：已填單，待確認款項與資料。");
						}
						$('li.trackno-1').text("郵件編號："+booker[13]);
						$('li.trackno-2').text("郵件編號(海報)："+booker[14]);
						//$('li.check').text("PTT 帳號："+booker[1]);
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
				console.log("資料讀取錯誤，請聯絡 captu");
			}
		});

		
	}
	$(".sent-btn").click(function() {
		//console.log($('input[name="tel"]').val().substring(1,$('input[name="tel"]').val().length));
	  queryData($('input[name="ptt"]').val(),$('input[name="tel"]').val());
	});
});

