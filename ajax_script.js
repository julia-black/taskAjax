$(document).ready(function(){
    $('#form').on('submit',load);
    call();
    
    $('.previous').on('click', prevOnclick);
	$('.next').on('click', nextOnclick);
    
    function call(param){
	   $(function(){
		$.get('http://demo.webility.ru/api',param,function(dataRequest){
			meta = dataRequest.meta;  
		    var data = dataRequest.data;
		    setPages(meta);
		    setData(data);
            
		    showNext();
		    showPrevious();
		});
	   });
    }
    
    function setPages(meta){    
        var from = meta.from;
        var length = meta.length;
        
        $('#beginElem').html(from+1);
        $('#allCount').html(length);
        $('#endElem').html((from + 9 <= length) ? from + 10 : length);
    }
    
    function setData(data){
        var $tbody = $('tbody');
        $tbody.empty();
        var str = '';
        
        for(var i = 0; i < data.length; i++){
            str += '<tr><td>' + data[i].name + '</td><td>' + data[i].episodes +'</td></tr>';
        }
        
        $tbody.append(str);
    }
    
    function showNext(){
        if((meta.from + 9) >= meta.length){
           $('.next').hide();
        }
        else{
            $('.next').show();
        }
    }
    
    function showPrevious(){ 
        if(meta.from == 0){
            $('.previous').hide();
        }
        else{
            $('.previous').show();
        }
    }
    
    function prevOnclick(){
        call('from='+(meta.from-10)+filter());
    }
    
    function nextOnclick(){
        call('from='+(meta.from+10)+filter());
    }
    
    
    function load(){
        call('q='+($('#input_text').val()));
    }
    
    function filter(){
         if($('#input_text').val() != ''){
             return '&q='+($('#input_text').val());
         }
         return '';
    }

});
