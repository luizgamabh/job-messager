var storage = chrome.storage.local;

var resetButton = document.querySelector('button.reset');
var submitButton = document.querySelector('button.submit');
var textarea = document.querySelector('textarea');

loadChanges();

submitButton.addEventListener('click', saveChanges);
resetButton.addEventListener('click', reset);

function saveChanges() {
  var message = textarea.value;
  if (!message) {
    message('Error: No message written');
    return;
  }
  storage.set({'job_message': encodeURI(message)}, function() {
    message('Settings saved');
  });
}

function loadChanges() {
  storage.get('job_message', function(items) {
    if (items.job_message) {
      textarea.value = decodeURI(items.job_message);
      message('Loaded saved message.');
    }
  });
}

function reset() {
  storage.remove('job_message', function(items) {
    message('Reset stored message');
  });
  textarea.value = '';
}

function message(msg) {
  var message = document.querySelector('#message');
  message.innerText = msg;
  setTimeout(function() {
    message.innerText = '';
  }, 3000);
}
