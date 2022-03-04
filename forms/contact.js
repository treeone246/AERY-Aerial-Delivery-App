var price;
var formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
var distance;
function submit_by_name() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var source=document.getElementById("source").value;
    var sourceArr=source.split(',');
    var dest=document.getElementById("destination").value;
    var destArr=dest.split(',');
    distance = calcCrow(sourceArr[0],sourceArr[1],destArr[0],destArr[1]).toFixed(3);
    
    price=4000+(distance*6000);
    var message="========CONFIRMATION========"+
    "\nName         : " + name + 
    "\nEmail          : " + email +
    "\nDistance     :  "+distance+" KM"+
    "\nPrice           : "+formatter.format(price);
    if(validation()){
        let isConfirmed=confirm(message)
        if(isConfirmed){
            sendEmail(message);
            // window.location.replace("contact.html");
        }
    }
    
    
    }
function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }

    function validation(){
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var source = document.getElementById("source").value;
        var destination = document.getElementById("destination").value;
        var sourceArr=source.split(',');
    var dest=document.getElementById("destination").value;
    var destArr=dest.split(',');
    var distance = calcCrow(sourceArr[0],sourceArr[1],destArr[0],destArr[1]).toFixed(3);
        var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if( name ==='' || email ==='' || source===''|| destination===''){
            alert("Please fill all fields !");
            return false;
        }
        else if(!(email).match(emailReg)){
            alert("Invalid Email!");
            return false;
        }
        else if(isNaN(distance)||distance===0){
            alert("Location Not Valid");
            return false;
        }
        else if(distance>20){
            alert("Too Far :(");
            return false;
        }
        else{
            return true;
        }
        }
// untuk kirim email
        function sendEmail() {
            Email.send({
            Host: "smtp.gmail.com",
            Username : "aeryuser@gmail.com",
            Password : "aerialdelivery123",
            To : 'aery.order@gmail.com',
            From : "aeryuser@gmail.com",
            Subject : "ORDER",
            Body :  "Nama: "+document.getElementById("name").value+
                    " || Email : "+document.getElementById("email").value+
                    " || Source : "+document.getElementById("source").value +
                    " || Destination : "+document.getElementById("destination").value +
                    " || Distance : "+distance + "KM"+
                    " || Price : "+formatter.format(price)+
                    " || Subject : "+document.getElementById("subject").value+
                    " || Message : "+document.getElementById("message").value,
            }).then(
                message => alert("Pesanan berhasil diterima !")
            );
        }