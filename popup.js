var storage = chrome.storage.local;

var message = document.querySelector('#message');

storage.get('job_message', function (items) {
    message.innerHTML = 'Starting';
    if (items.job_message) {
        chrome.tabs.getSelected(null, function(tab){
            chrome.tabs.executeScript(tab.id, {file: '/handler.js'}, function() {
                chrome.tabs.sendMessage(tab.id, items.job_message, function() {
                    if (chrome.runtime.lastError) {
                        message.innerText = 'Not allowed to inject code into special page.';
                    } else {
                        message.innerHTML = 'Message ready to be send';
                    }
                });
            });
        });
    } else {
        var optionsUrl = chrome.extension.getURL('options.html');
        message.innerHTML = 'Set a message in the <a target="_blank" href="' +
            optionsUrl + '">options page</a> first.';
    }
});