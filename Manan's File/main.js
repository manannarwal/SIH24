var calculateButton = document.getElementById("calculateButton");

calculateButton.addEventListener("click", function() {
  var vehicleType = document.getElementById("vehicleType").value;
  var vehicleNumber = document.getElementById("vehicleNumber").value;
  var parkingTime = document.getElementById("parkingTime").value;
  var stationSelect = document.getElementById("stationSelect").value;
  
  if (vehicleType === "Select" || vehicleNumber === "" || parkingTime === "Select" || stationSelect === "Select") {
    alert("Please fill the previous details first!");
  } else {
    calculateParkingCharges(vehicleType, parkingTime); // Pass the selected vehicle type and parking time to the function
  }
});

function calculateParkingCharges(vehicleType, parkingTime) {
  var selectedTime = parseInt(parkingTime, 10);
  var parkingCharges = 0;

  if (vehicleType === "Car") {
    if (selectedTime <= 6) {
      parkingCharges = 30;
    } else if (selectedTime <= 12) {
      parkingCharges = 50;
    } else if (selectedTime <= 24) {
      parkingCharges = 60;
    }
  } else if (vehicleType === "Two Wheelers (Scooter, Motorbike)") {
    if (selectedTime <= 6) {
      parkingCharges = 15;
    } else if (selectedTime <= 12) {
      parkingCharges = 25;
    } else if (selectedTime <= 24) {
      parkingCharges = 30;
    }
  } else if (vehicleType === "Cycle") {
    if (selectedTime <= 6) {
      parkingCharges = 5;
    } else if (selectedTime <= 12) {
      parkingCharges = 5;
    } else if (selectedTime <= 24) {
      parkingCharges = 10;
    }
  }

  var chargesDiv = document.getElementById("charges");
  chargesDiv.textContent = "Parking Charges: ₹" + parkingCharges.toFixed(2) + "/-";
}


var vehicleNumberInput = document.getElementById("vehicleNumber");

vehicleNumberInput.addEventListener("input", function() {

  var inputValue = vehicleNumberInput.value.toUpperCase();

  vehicleNumberInput.value = inputValue;
});
