# jquery_form_validation

This is simple Jquery form validation 
Support image also in ajax
1. create your form

index.html

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Jquery Form Validation</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <!-- Provide your form css -->
    <style>
		.err{
			text-align: center;
			color: red;
			font-weight: 700;
		}
    </style>
  </head>
  <body class="bg-light">
    <div class="container">
  <div class="py-5 text-center">
    <h2>Form Validation</h2>
  </div>

  <div class="row">
    <div class="col-md-12 order-md-1">
      <form class="myform" action="" method="post" ajax-method="True" accept-charset="utf-8">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">Name</label>
            <input type="text" class="form-control" name="name" id="firstName" vali="yes">
            <span class="err"></span>
          </div>
          <div class="col-md-6 mb-3">
            <label for="selectage">Last name</label>
            <select  class="form-control" name="age" id="selectage" vali="yes">
				<option value="">---Select Age--</option>
				<option>Under 18</option>
				<option>Between 18 - 30</option>
				<option>Above 30</option>
            </select>
            <span class="err"></span> <!-- <span class="err" data="Your custom error message"></span> -->
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 mb-3">
            <label for="firstName">Address</label>
            <textarea class="form-control" id="firstName" vali="yes" name="address"></textarea>
            <span class="err" data="Please fill the address"></span>
          </div>
        </div>

        <hr class="mb-4">
        <div class="respHere"></div> <!-- Final out put, in case of ajax will show here -->
        <button class="btn btn-primary btn-lg btn-block" btn_load="Please wait..." type="submit">Submit</button>
      </form>
    </div>
  </div>

</div>
<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
<script>
	//THis is after Ajax method is called || response = response from backend in case of ajac && $responseHere is the "<div class="respHere"></div>" where message will be display, you can fully customize this
let afterCall = function afterCall(response, $responseHere){
	$responseHere.html('<div class="alert alert-danger">'+response+'</div>');
}

//Is used to do any before send acitivity like loading and other thing in case of ajax method is not set then default pre loading will be perform i.e button will be disable and button value will be change as mention in btn_load in button
//let $beforeSend = function afterCall(){
   // $('.addloader').addClass("loader");
//}
$(document).ready(function () {
	$.getScript("form-validation.js");
});
</script>
</body>
</html>

2. Include jquery library

I had use cdn link
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

3. Create js file with any name, here is have to use form-validation.js

form-validation.js

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

4. Include this js to index.html file by

.
.
.
$(document).ready(function () {
	$.getScript("form-validation.js");
});

$.getScript load the script
Note: provide the proper path

5. Use class in the form
To use validation in form, just use "myform" class in the Form tag,
To use ajax use  ajax-method="True" OR remove this if you don't want to use the ajax method

 <form class="myform" action="" method="post" ajax-method="True" accept-charset="utf-8">

Use vali="yes" to validate input OR vali="" for not to validate particular field
<input type="text" class="form-control" name="name" id="firstName" vali="yes">
Down field we have span "were the message will be shown"
<span class="err"></span>

Note: default message will be the name of the input field + missing,
so in this case message will be 
Name is missing 

But if you want to display your own message use
<span class="err" data="your message here></span>

6. If you are using ajax-method="true" for ajax then you have to define afterCall function which take two parameter : 
    1. Response from server
    2. $responseHere Message to display in the form  (<div class="respHere"></div>)

	//THis is after Ajax method is called || response = response from backend in case of ajac && $responseHere is the "<div class="respHere"></div>" where message will be display, you can fully customize this
let afterCall = function afterCall(response, $responseHere){
	$responseHere.html('<div class="alert alert-danger">'+response+'</div>');
}

//Is used to do any before send acitivity like loading and other thing in case of ajax method is not set then default pre loading will be perform i.e button will be disable and button value will be change as mention in btn_load in button
//let $beforeSend = function afterCall(){
   // $('.addloader').addClass("loader");
//}
$(document).ready(function () {
	$.getScript("form-validation.js");
});


