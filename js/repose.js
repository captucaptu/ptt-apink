$(document).ready(function() {
    //https://docs.google.com/spreadsheets/d/1C_ie6WUjOpI1iiybx9anAb15CuRosJwKyH_kk6mYae0/pubhtml?gid=1163400478&single=true
    //var key = '12fM7M2yrhFMHQedH-npFE3A7BZkd_xX9wbIpmfFi4VY';
    var key = '1C_ie6WUjOpI1iiybx9anAb15CuRosJwKyH_kk6mYae0';
    var userURL = 'https://spreadsheets.google.com/feeds/list/' + key + '/1/public/values?alt=json';

    queryTotal();

    function queryTotal() {
        var total = 0;
        $.ajax({
            url: userURL,
            type: "GET",
            dataType: "json",
            success: function(json) {
                var trowsRegex = /gsx\$/;

                // 呈現表格 rows 資料
                var trows = json.feed.entry;
                //var num = 0;
                $.each(trows, function(i, data) {
                    total += Number(data['gsx$購買數量請填1.2.3這樣ex3'].$t);
                    // console.log(data);
                    // $.each(data, function(j, jdata) {
                    //     if (trowsRegex.test(j)) {
                    //         //console.log(jdata.$t);
                    //         //console.log(booker[i]);
                    //         console.log(jdata.$t);
                    //     }
                    // });
                    //console.log(data['gsx$購買數量請填1.2.3這樣ex3'].$t);
                });
                //total = (red+white);
                $('.all span').html(total);
            },
            //錯誤判斷
            error: function() {
                alert("資料讀取錯誤，請聯絡 captu");
            }
        });


    }

    function queryData(pttid, tel) {
        var bookers = [];
        var booker = [];
        $.ajax({
            url: userURL,
            type: "GET",
            dataType: "json",
            success: function(json) {
                var rowsRegex = /gsx\$/;

                // 呈現表格 rows 資料
                var rows = json.feed.entry;
                $.each(rows, function(i, data) {
                    //console.log(i);
                    bookers[i] = [];
                    $.each(data, function(j, jdata) {
                        if (rowsRegex.test(j)) {
                            //console.log(jdata.$t);
                            //console.log(booker[i]);
                            bookers[i].push(jdata.$t);
                        }
                    });
                });
                var find = false;
                var idmatch = false;
                var telmatch = false;
                for (var k = 0; k < bookers.length; k++) {
                    if (bookers[k][2] == pttid || bookers[k][3] == pttid){
                        idmatch = true;
                    }
                    if((bookers[k][5] == (tel.substring(1, tel.length)) || bookers[k][5] == tel)){
                        telmatch = true;
                    }
                    if ((bookers[k][2] == pttid || bookers[k][3] == pttid) && (bookers[k][5] == (tel.substring(1, tel.length)) || bookers[k][5] == tel)) {
                        booker = bookers[k];
                        $('li.pttid').text("PTT 帳號：" + booker[2]);
                        $('li.email').text("E-MAIL：" + booker[3]);
                        $('li.name').text("姓名：" + booker[1]);
                        $('li.num').text("數量：" + booker[4]);
                        $('li.price').text("金額：" + booker[12]);
                        
                        // if (!isNaN(booker[5])) {
                        //     var tmpNum = booker[5].toString();
                            
                        //     tmpNum = padLeft(tmpNum, 5);
                            
                        //     //console.log(tmpNum)
                        //     booker[5] = tmpNum;
                        // }
                        $('li.acname').text("匯款帳戶名：" + booker[10]);
                        $('li.ac').text("帳號後五碼或無摺局號：" + booker[11]);
                        $('li.post').text("面交或郵寄：" + booker[6]);
                        $('li.point').text("面交地點：" + booker[7]);
                        $('li.adds').text("郵寄地址：" + booker[8]);
                        if (bookers[k][5] == (tel.substring(1, tel.length))) $('li.tel').text("聯絡電話：0" + booker[8]);
                        if (bookers[k][5] == tel) $('li.tel').text("聯絡電話：" + booker[8]);


                        //console.log(booker);
                        if (booker[9] == "已收到") {
                            $('li.check').text("處理狀況：款項已確認收到。");
                        } else {
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
                if (!find) {
                    if (!telmatch){
                        alert('聯絡電話錯誤，請再次確認或聯絡負責人');
                    }
                    if(!idmatch){
                        alert('ptt 帳號或 email 錯誤，請再次確認或聯絡負責人');
                    }
                    if(!idmatch && !telmatch){
                        alert('查無資料，請再次確認或聯絡負責人');
                    }
                    
                }
            },
            //錯誤判斷
            error: function() {
                alert("資料讀取錯誤，請聯絡 captu");
            }
        });


    }
    $(".sent-btn").click(function() {
        //console.log($('input[name="tel"]').val().substring(1,$('input[name="tel"]').val().length));
        queryData($('input[name="ptt"]').val(), $('input[name="tel"]').val());
    });

    function padLeft(str, lenght) {
        if (str.length >= lenght){
            return str;
        }
        else{
            return padLeft("0" + str, lenght);
        }
    }


});
