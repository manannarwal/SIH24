$(document).ready(function() {
    $(".generate_qr").click(function() {
        var name = $(".name").val();
        var email = $(".email").val();

        // Check if name and email fields are filled
        if (name === "" || email === "") {
            alert("Kindly fill in the Name & Email fields first!");
            return; // Prevent further action
        }

        $(".form").hide();
        $(".qr_code").show();
        var num = $(".number").val();
        var link = "" + num;
        var upi = "https://raw.githubusercontent.com/iprattham/pratham/main/My%20GitHub%20Gifs/Museum_UPI.png";
        console.log(upi);
        $(".get_qr").attr("src", upi);
    });

    $(".booking").click(function() {
        var name = $(".name").val();
        var num = $(".number").val();
        var email = $(".email").val();
        var id = $(".id").val();

        // Check if all required fields are filled
        if (num !== "" && name !== "" && email !== "" && id !== "") {
            // Uncomment the following block if backend integration is required
            /*$.post("back.php",{name:name,num:num,email:email,id:id},function(res) {
             if(res==1){

             }
             else{

             }
            });*/
        } else {
            // alert("Fill all fields correctly.");
        }
    });
});
