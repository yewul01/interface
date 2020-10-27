(function ($) {

    $.ajax({
        type:'GET',
        url: 'data/newBook.json',
        timeOut: 2000,
        beforeSend : function(xhr) {   
            if (xhr.overrideMimeType) { 
                xhr.overrideMimeType('application/json')
            }
        },
        success: function(data){
                var nbData = data.newBook;

                function dataPrint() {
                    var newContent = ''
                    for (var i in nbData) {
                        var price = '&#8361;' + nbData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')
                        newContent += `<li><img src='${nbData[i].Image}' onerror='this.src="images/noimage.gif"' alt=''>`
                        newContent += `<div><h2>${nbData[i].Title}</h2>`
                        newContent += `<p>${nbData[i].Name}</p>`
                        newContent += `<p>${nbData[i].Company}</p>`
                        newContent += `<p>${nbData[i].Date}</p>`
                        newContent += `<strong>${price}</strong>`
                        newContent += `<p>${nbData[i].Info}</p>`
                        newContent += `<a href='#'>삭제 x</a></div></li>`
                    }
                    $('.book').append(`<ul>${newContent}</ul>`)
                }
                dataPrint()

                
                $('.book').on('click', 'li a', function(e){
                    e.preventDefault()
                    var index = $(this).parents('li').index()
                    nbData.splice(index, 1)
                
                $('.book ul').remove()
                dataPrint()
                })

                
                $('.btn a').on('click',function(e){
                    e.preventDefault()
                    $('.formBox').addClass('on')
                })

                
                var $nbTitle = $('.formBox #nbTitle')
                var $nbName = $('.formBox #nbName')
                var $nbCompany = $('.formBox #nbCompany')
                var $nbDate = $('.formBox #nbDate')
                var $nbWon = $('.formBox #nbWon')
                var $nbInfo = $('.formBox #nbInfo')
                var $nbUrl = $('.formBox #nbUrl')
                $('.formBox button').on('click',function(e){
                    e.preventDefault()
        
                    var lastValue = {
                     Title : $nbTitle.val(),
                     Name : $nbName.val(),
                     Company : $nbCompany.val(),
                     Date : $nbDate.val(),
                     Price : $nbWon.val(),
                     Info : $nbInfo.val(),
                     Image : $nbUrl.val(),
                    }
                    
                    if ($nbTitle.val() !== "" && $nbName.val() !== "" && $nbCompany.val() !== "" && $nbDate.val() !== "" && $nbWon.val() !== "") {
                    nbData.push(lastValue)
                    $('.book ul').remove()
                    dataPrint()
                    }

                    $('.formBox').removeClass('on')
                    $('.formBox input, .formBox textarea').val('')
                    
                    
                })

                
        },
        error: function(){
            $('.book h2').after('<img src="images/noimage.gif">')
        }
    })


})(jQuery);
