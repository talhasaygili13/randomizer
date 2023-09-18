document.addEventListener("DOMContentLoaded", function() {
  var randomizerTypeSelect = document.getElementById("randomizer-type");
  var inputsContainer = document.getElementById("inputs-container");
  var generateButton = document.getElementById("generate-btn");
  var resultInput = document.getElementById("result-input");
  var copyButton = document.getElementById("copy-btn");
  var copiedMessage = document.getElementById("copied-message");

  randomizerTypeSelect.addEventListener("change", function() {
    var selectedValue = randomizerTypeSelect.value;
    inputsContainer.innerHTML = "";

    if (selectedValue === "number") {
      createInput("Start Value:", "start-input", "number");
      createInput("End Value:", "end-input", "number");
      createInput("Quantity:", "quantity-input", "number");
    } else if (selectedValue === "color") {
      createInput("Quantity:", "quantity-input", "number");
    } else if (selectedValue === "password") {
      createInput("Length:", "length-input", "number");
      createInput("Quantity:", "quantity-input", "number");
    }
  });

  generateButton.addEventListener("click", function() {
    var selectedValue = randomizerTypeSelect.value;
    var result = "";

    if (selectedValue === "number") {
      var startValue = parseInt(document.getElementById("start-input").value);
      var endValue = parseInt(document.getElementById("end-input").value);
      var quantityValue = parseInt(document.getElementById("quantity-input").value);
      result = numberRandomizer(startValue, endValue, quantityValue);
    } else if (selectedValue === "color") {
      var quantityValue = parseInt(document.getElementById("quantity-input").value);
      result = colorRandomizer(quantityValue);
    } else if (selectedValue === "password") {
      var lengthValue = parseInt(document.getElementById("length-input").value);
      var quantityValue = parseInt(document.getElementById("quantity-input").value);
      result = passwordRandomizer(lengthValue, quantityValue);
    }

    resultInput.value = result.join(", ");
  });

  copyButton.addEventListener("click", function() {
    resultInput.select();
    document.execCommand("copy");
  });

  function createInput(labelText, inputId, inputType) {
    var label = document.createElement("label");
    label.setAttribute("for", inputId);
    label.textContent = labelText;
    inputsContainer.appendChild(label);

    var input = document.createElement("input");
    input.setAttribute("type", inputType);
    input.setAttribute("id", inputId);
    inputsContainer.appendChild(input);
  }

  function numberRandomizer(start, end, quantity) {
    var numbers = [];
    for (var i = 0; i < quantity; i++) {
      numbers.push(Math.floor(Math.random() * (end - start + 1)) + start);
    }
    return numbers;
  }

  function colorRandomizer(quantity) {
    var colors = ["Red", "Green", "Blue", "Yellow", "Orange", "Purple"];
    var randomColors = [];
    for (var i = 0; i < quantity; i++) {
      var randomIndex = Math.floor(Math.random() * colors.length);
      randomColors.push(colors[randomIndex]);
    }
    return randomColors;
  }

  function passwordRandomizer(length, quantity) {
    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*";
    var passwords = [];
    for (var i = 0; i < quantity; i++) {
      var password = "";
      for (var j = 0; j < length; j++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
      }
      passwords.push(password);
    }
    return passwords;
  }
});