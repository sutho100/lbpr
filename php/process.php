<?php 
    //check if running on localhost as opposed to the server
    $sapi_type = php_sapi_name();
    if (substr($sapi_type, 0, 3) !== 'cgi') {    
        $con = mysqli_connect("localhost","root","","lbpr");
    } else {
        $con = mysqli_connect("db677720726.db.1and1.com","dbo677720726","october987","db677720726");
    }


    //escape the strings for sql injection
    $name = mysqli_real_escape_string($con, $_POST['name']);
    $phone = mysqli_real_escape_string($con, $_POST['phone']);
    $email = mysqli_real_escape_string($con, $_POST['email']);
    $message = mysqli_real_escape_string($con, $_POST['message']);

    //replace with html special characters for sql injection
    $name = htmlspecialchars($name);
    $phone = htmlspecialchars($phone);
    $email = htmlspecialchars($email);
    $message = htmlspecialchars($message);

    //strip slashes for sql injection
    $name = stripslashes($name);
    $phone = stripslashes($phone);
    $email = stripslashes($email);
    $message = stripslashes($message);

    //trim white space for sql injection
    $name = trim($name);
    $phone = trim($phone);
    $email = trim($email);
    $message = trim($message);


    //add to database
    if(!$con):
        die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
    endif;


    // Check connection
    if (mysqli_connect_errno())
      {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
      } else {
        echo "Successfully connected to MySQL<br />";
      }

    // Perform queries
    $sql = "INSERT INTO `user` (`id`, `name`, `phone`, `email`, `message`) VALUES (NULL, '$name', '$phone', '$email', '$message')";
    
    //check if any mysql errors occurred
    if (!mysqli_query($con,$sql)) {
      die('Error: ' . mysqli_error($con));
    }

    //close the connection
    mysqli_close($con);



    //send email
    $to = 'sutho100@gmail.com';

    $subject = 'Website Change Request';

    $headers = "From: " . strip_tags('sutho100@gmail.com') . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $msg .= '
        <p>Hi Mark,<br/><br/>See below for a new entry to the contact form</p>

        <table cellspacing="0" cellpadding="0" style="width:100%; border: 1px solid #333; border-collapse: separate; border-spacing: 0;">
          <tr style="border: 1px solid #333">
            <th style="border: 1px solid #333; padding: 0px; text-align: left;">Field</th>
            <th style="border: 1px solid #333; padding: 0px; text-align: left;">Value</th> 
          </tr>
          <tr style="border: 1px solid #333">
            <td style="border: 1px solid #333; padding: 0px;">Name</td>
            <td style="border: 1px solid #333; padding: 0px;">'. $name .'</td> 
          </tr>
          <tr style="border: 1px solid #333">
            <td style="border: 1px solid #333; padding: 0px;">Phone</td>
            <td style="border: 1px solid #333; padding: 0px;">' . $phone . '</td> 
          </tr>
          <tr style="border: 1px solid #333">
            <td style="border: 1px solid #333; padding: 0px;">Email</td>
            <td style="border: 1px solid #333; padding: 0px;">' . $email . '</td> 
          </tr>
          <tr style="border: 1px solid #333">
            <td style="border: 1px solid #333; padding: 0px;">Message</td>
            <td style="border: 1px solid #333; padding: 0px;">' . $message . '</td> 
          </tr>
        </table>

        <p><br/>Best regards,<br/>Todd Sutherland</p>
    ';

    mail($to, $subject, $msg, $headers);

    echo "<br/>Email sent, check your inbox!";
?>