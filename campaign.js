let inputImgCn = $('input[name="form-TOTAL_FORMS"]');
function addMoreFiles() {
    let imgcnt = inputImgCn.val()
    let infild = imgcnt
    imgcnt++
    inputImgCn.val(imgcnt)
        let dar = `<div class="col-3 tm-dec-img">
                        <input class="addrm" type="file" name="form-`+infild+`-image" accept="image/*" id="id_form-`+infild+`-image">
                        <div class="virtualBtn"></div>
                        <span class="tm-img-rm removeFrom">Remove <i class="fa fa-times"></i></span>
                    </div>`;
        $('.tm-imagesList').append(dar)
}
function removeFrom(t) {
    t.parents('.tm-dec-img').remove()
    let imgcnt = inputImgCn.val()
    imgcnt--
    inputImgCn.val(imgcnt)
}
// function removeFromH(t) {
//     t.parents('.fileinput').remove()
//     let imgcnt = inputImgCn.val()
//     imgcnt--
//     inputImgCn.val(imgcnt)
// }
let afterCall = function afterCall(response, $responseHere){
    if(response == "done"){
        $('.camp-confirm').removeClass("d-none")
        $('body').css("overflow", "none")
    }
    else
      $responseHere.html('<div class="alert alert-danger">'+response+'</div>');
    $('.addloader').removeClass("loader");
}
let $beforeSend = function afterCall(){
    $('.addloader').addClass("loader");
}
$(document).ready(function () {
    // $('.schoolList option:first').remove()
    $('.schoolList').append("<option value=''>Other</option>")

    $('select.schoolList option:eq(0)').remove()
    let sclVal = $('select.schoolList option:eq(1)').attr("value")
    // console.log(sclVal)
    // $('select.schoolList').val(sclVal)

    // $(".datepicker").datepicker();
    // $(".txtEditor").Editor();
    // $('.makeSelect').select2()
    let link = $('input[name="linki"]').val();

    $('.addMoreFile').click(function () {
        addMoreFiles();
    });
    $('.tm-imagesList').on('click', '.tm-dec-img .removeFrom', function () {
        removeFrom($(this));
    });
    // $('.addImgs').on('click', '.removeFromH', function () {
    //     removeFromH($(this));
    // });
    function someExtraBeforeSubmit($this){
        let descii = $this.find('.descii').find('.Editor-editor').html();
        $this.find('textarea.descii').html(descii);
        let lkk = $this.find('.crlinki input').val()
        // if(lkk == "")
        //     $this.find('.crlinki input').val($this.find(".fortitle input").val())
    }

    $('.myform').find('input, textarea, select').attr("required", false)
    $.getScript("/static/owner/somejs/control-form.js");
    //On school change
    $('select.schoolList').on('change', function () {
        let schid = $('select.schoolList').val();
        let valis = $('option:selected', this).html();
        if(schid == ''){
            $('.schoolName').val("").attr("readonly", false)
            $('.schoolName').parents(".form-group").show()
        }
        else{
            $('.schoolName').val(valis).attr("readonly", true)
            $('.schoolName').parents(".form-group").hide()
        }
    });
    $('select.schoolList').change()

    //Next
    $('.goNxt').click(function (e) { 
        let nxt = $(this).attr("nxt")
        let crn = $(this).attr("crn")
        let go = validateSection($('#'+crn))
        if(go){
            $('.nav li').removeClass("active");
            $('#myTab5').find("li a").removeClass('active show')
            $('#myTab5').find("li a[href='#"+nxt+"']").addClass('active show')
            $('#myTabContent5').find(".tab-pane").removeClass('active show')
            $('#myTabContent5').find(".tab-pane#"+nxt).addClass('active show')
        }
    });
    //Back
    $('.goBack').click(function (e) {
        let prev = $(this).attr("prev")
        $('.nav li').removeClass("active");
        $('#myTab5').find("li a").removeClass('active show')
        $('#myTab5').find("li a[href='#"+prev+"']").addClass('active show')
        $('#myTabContent5').find(".tab-pane").removeClass('active show')
        $('#myTabContent5').find(".tab-pane#"+prev).addClass('active show')
    });
    $('#myTab5 a').click(function (e) { 
        e.preventDefault();
        return false;
    });
    function validateSection($section){
        let to = true;
        $section.find('[vali="yes"]').each(function(){
            let $err = $(this).parent().find('.err');
            $err.html("")
            $(this).css("border", "1px solid #dfdfdf");
            if($.trim($(this).val()) == "") {
                $(this).css("border", "1px solid red");
                let errmsg = ""
                if($err.attr("data"))
                  errmsg = $err.attr("data")
                else
                  errmsg = $(this).attr("name")+" is missing"
                if(errmsg != "no")
                  $err.html(errmsg.replace('_', ' '))
                to = false;
            }
        })
        return to;
    }

});