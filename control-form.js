function validateForm($form){
  $form.find('.err').html("");
  var btn = true;
  let allError = "";
  $form.find('[vali="yes"]').each(function () {
    if ($.trim($(this).val()) == "") {
      $(this).css("border", "1px solid red");
      let $err = $(this).parent().find('.err');
      let errmsg = ""
      if($err.attr("data"))
        errmsg = $err.attr("data")
      else
        errmsg = $(this).attr("name")+" is missing"
      if(errmsg != "no"){
        allError += "<br>"+errmsg;
        $(this).parent().find('.err').html(errmsg)
      }
      btn = false;
    } else {
      $(this).css("border", "1px solid #dfdfdf");
    }
  });
  if(!btn)
    $form.find('.respHere').html("<div class='alert alert-danger'>"+allError+"</div>")
  return btn;
}
$(document).ready(function(){
  if(typeof $beforeSend === 'undefined')
    $beforeSend = null;
  console.log($beforeSend)
  $('.myform').on('submit', function(){
    let $form = $(this);
    let ajaxMethod = $(this).attr("ajax-method");
    var btn = validateForm($form);
    if(btn){
      if(!ajaxMethod)
        return btn;
      var formData = new FormData(this);
      let $responseHere = $form.find('.respHere')
      sendAjax($form, formData, afterCall, $responseHere, $beforeSend)
      // $form.find('.respHere').html(response);
    }
    return false;
  });
});
function sendAjax($form, formData, afterCall, $responseHere, $beforeSend){
  let $button = $form.find('button[type="submit"]');
  let btn_load = $button.attr("btn_load");
  let btn_aftr = $button.html();
  let kl = $form.attr("action");
  $.ajax({
    type: 'POST',
    url: kl,
    beforeSend: function () {
      $button.html(btn_load);
      $button.attr("disabled", true);
      if($beforeSend != null)
        $beforeSend()
    },
    data: formData,
    contentType: false,
    cache: false,
    processData: false,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    success: function (response) {
      console.log(response)
      $button.html(btn_aftr);
      $button.attr("disabled", false);
      // return response;
      afterCall(response, $responseHere)
    }
  });
}
