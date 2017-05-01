var storage = chrome.storage.local;

var message = document.querySelector('#message');

storage.get('angel_message', function (items) {
    message.innerHTML = 'iniciando';
    if (items.angel_message) {
        message.innerHTML = 'angel_message';
        chrome.tabs.getSelected(null, function(tab){
            message.innerHTML = 'selected';
            chrome.tabs.executeScript(tab.id, {file: '/handler.js'}, function() {
                message.innerHTML = 'Sending message to ' + tab.id;
                chrome.tabs.sendMessage(tab.id, items.angel_message, function() {
                    message.innerHTML = 'Message sent';
                });
            });
        });
    } else {
        message.innerHTML = ':(';
    }
    // if (items.angel_message) {
    //     console.log(items.angel_message);
    //     chrome.tabs.executeScript(null, {
    //         code: "var msg = '" + items.angel_message + "'"
    //     }, function () {
    //         chrome.tabs.executeScript(null, {
    //             file: "/handler.js"
    //         }, function () {
    //             if (chrome.runtime.lastError) {
    //                 message.innerText = 'Not allowed to inject code into special page.';
    //             } else {
    //                 message.innerText = 'Message done!';
    //             }
    //         });
    //     });
    // } else {
    //     var optionsUrl = chrome.extension.getURL('options.html');
    //     message.innerHTML = 'Set a message in the <a target="_blank" href="' +
    //         optionsUrl + '">options page</a> first.';
    // }
});