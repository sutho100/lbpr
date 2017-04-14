//Submit form via Ajax and show error/success below form
$(document).ready(function () {

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return re.test(email);
        
    }
    $("#email").change(function () {
        var emailText = $('#email').val();
        $("#resultEmail").show();

        if (validateEmail(emailText)) {
            console.log(validateEmail(emailText))
            $("#resultEmail").text("Email is valid :)");
            $("#resultEmail").css("color", "#adb929");
        } else {
              $("#resultEmail").text("Email " + emailText + " is not valid :(");
              $("#resultEmail").css("color", "#ad1010");
        }
    });
});

var clearEmail =  function () {
    var emailText = $("#email").val();
    $("#resultEmail").text("");

};

$(function () {
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        //validation
        var validationStatus = true;
        $("#result").text("");      //Default div text

        var name = $('#name').val();

        //validate name
        if (name.length === 0) {
            $('#resultName').text("Please enter your Name"); // This Segment Displays The Validation Rule For All Fields
            $('#resultName').show();
            $("#resultName").css("color", "#ad1010");
            $("#name").focus();
            validationStatus = false;
            return false;
        } else {
            $('#resultName').text("");
            $('#resultName').hide();

        }
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        //validate phoneNumber
        var phoneError = function () {
            $('#resultPhone').text("Please enter your Phone number"); // This Segment Displays The Validation Rule For All Fields
            $('#resultPhone').show();
            $("#resultPhone").css("color", "#ad1010");
            $("#phone").focus();
            validationStatus = false;
            return false;
        }


        var name = $('#phone');
        var phoneno = /^\d+$/;

        if (typeof name.val() === 'undefined') {
            phoneError();
        } else {
            var nameVal = name.val();
            if (!phoneno.test(nameVal)) {
                phoneError();
            } else {
                $('#resultPhone').text("");
                $('#resultPhone').hide();

            }
        }




        //validate email
        var emailText = $('#email').val();
       
       

        if (!validateEmail(emailText)) {
            $("#resultEmail").text("email " + emailText + " is not valid :(");
            $('#resultEmail').show();
            $("#resultEmail").css("color", "#ad1010");
            $("#resultEmail").focus();
            validationStatus = false;
            return false;
        }

        //validate message
        if ($('#message').val().length <= 10) {
            $('#resultMessage').text("Please write a message of at least 10 characters");
            $('#resultMessage').show();
            $("#resultMessage").css("color", "#ad1010");
            $("#message").focus();
            validationStatus = false;
            return false;
        } else {
            $('#resultMessage').text("");
            $('#resultMessage').hide();


        }
        
       
       
       

     

        
        //run the php
        $.ajax({
            type: 'post',
            url: 'php/process.php',
            data: $('form').serialize(),
            success: function () {
                console.log('successful');
                $(".successful").show();
                resetFunction();
                clearEmail();
            }
             
        });
    });
});

var resetFunction = function () {
    $('#contactForm')[0].reset();
    $('#resultName, #resultPhone, #resultEmail, #resultMessage').hide();
};

$(function () {
    $('#contactForm').on('reset', function (e) {
        //e.preventDefault();
        resetFunction();
    });
});