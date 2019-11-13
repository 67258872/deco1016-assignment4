var constraints = {
    name: {
      presence: true,
      length: {
        minimum: 3,
      },
      format: {
        pattern: "[a-z ]+",
        flags: "i",
        message: "can only contain letters"
      }
    },
    email: {
      // Email is required
      presence: true,
      email: true
    },
    username: {
      //Pick a username too
      presence: true,
      // Must be between 3 and 20 characters long
      length: {
        minimum: 3,
        maximum: 20
      },
      format: {
        // only a-z and 0-9
        pattern: "[a-z0-9]+",
        // but we don't care if the username is uppercase or lowercase
        flags: "i",
        message: "can only contain a-z and 0-9"
      }
    },
    password: {
      // Password is required
      presence: true,
      // Must be at least 5 characters long
      length: {
        minimum: 5
      }
    },
    },

  // Hook up the form so we can prevent it from being posted
  var form = document.querySelector("form");
  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });

  // Connect inputs to validate on the fly
  var inputs = document.querySelectorAll("input, textarea, select");
  console.log(inputs);
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {

      var errors = validate(form, constraints) || {};
      showErrorsForInput(this, errors[this.name])
    });
  }

  function handleFormSubmit(form, input) {


    // validate form against constraints
    var errors = validate(form, constraints);
    //update form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
    }
  }

  // Updates inputs with the validation errors
  function showErrors(form, errors) {
    // We loop through all the inputs and show the errors for that input
    form.querySelectorAll("input[name], select[name]").forEach( function(input) {
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }

  // Shows errors for a specific input
  function showErrorsForInput(input, errors) {
    var formGroup = closestParent(input.parentNode, "form-group")
      // Find where the error messages will be insert into
      , messages = formGroup.querySelector(".messages");
    // Removes any old messages and resets the classes
    resetFormGroup(formGroup);
    // If errors
    if (errors) {
      // first mark the group has having errors
      formGroup.classList.add("has-error");
      // append the errors
      errors.forEach(function(error) {
        addError(messages, error);
      });
    } else {
      formGroup.classList.add("has-success");
    }
  }

  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    // and removes old messages
    formGroup.querySelectorAll(".help-block.error").forEach(function(el) {
      el.parentNode.removeChild(el);
    });
  }

  function addError(messages, error) {
    var block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = error;
    messages.appendChild(block);
  }
