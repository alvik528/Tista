var form = document.querySelector('.signup__form');
var $form = $(form);

function displayErrors(errors) {
  errors.forEach(function(message) {
    $form.prepend('<div class="usa-alert usa-alert-error" role="alert"><div class="usa-alert-body"><p class="usa-alert-text">' + message + '</p></div>');
  });
}
function displayErrorMessage(errors) {
    $form.prepend('<div class="usa-alert usa-alert-error" role="alert"><div class="usa-alert-body"><p class="usa-alert-text">' + errors + '</p></div>');
}

function displaySuccessMessage() {
  $form.html('<div class="usa-alert usa-alert-success" role="alert"><div class="usa-alert-body"><h3 class="usa-alert-heading">Account created</h3><p class="usa-alert-text">Welcome!</p></div>');
}

function handleSubmit(evt) {
  evt.preventDefault();
  var formData = $form.serializeArray();
  var errors = validate(formData);

  if (errors.length) {
    displayErrors(errors);
  } else {
    submit(formData);
  }
}

function submit(formData) {
  var submitButton = document.querySelector('.signup__submit');
  submitButton.textContent = 'Creating account...';
  submitButton.classList.add('usa-button-disabled');
  $.ajax({
    dataType: 'json',
    url: form.getAttribute('action'),
    method: form.getAttribute('method'),
    data: {"email": formData[0].value, "password" : encodeURIComponent(formData[1].value)}
  }).done(function(res) {
    if (res.success) {
      displaySuccessMessage();
    } else {
      submitButton.textContent = 'Create account';
      submitButton.classList.remove('usa-button-disabled');
      displayErrorMessage(res.errors);
    }
  }).fail(function(err) {});
}

function validate(formData) {
  var errors = [];

  // Remove previous error messages
  $('.usa-alert').remove();

  formData.forEach(function(field) {
    if (field.value === '') {
      return errors.push(field.name + ' is required');
    }

    if (field.name === 'email') {
      errors = errors.concat(validateEmail(field.value));
    } else if (field.name === 'password') {
      errors = errors.concat(validatePassword(field.value));
    }
  });

  return errors;
}

function validateEmail(value) {
  var errors = [];
  //This doesnt require an email that has a xyz@yahoo(.com) < this is an optimization that can be made
  if (value.split('@').length !== 2) {
    errors.push('Invalid email.');
  }

  return errors;
}

function validatePassword(value) {
  var errors = [];
  var letterNumber = /^[0-9a-zA-Z]+$/;
  if (value.length < 8) {
    errors.push('Password must be at least 8 characters long.');
  } 
  //else if (!value.match(letterNumber)) {
    //errors.push('Password must be alphanumeric');
  //}

  return errors;
}

$form.on('submit', handleSubmit);
