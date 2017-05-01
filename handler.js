function JobMessager(msg) {
    this.message = msg;

    this.executeJob = function () {
        var el = document.querySelectorAll('.user-note-textarea');
        if (!!el.length) {
            for (var i = 0; i < el.length; i++) {
                var placeholder = el[i].getAttribute('placeholder');
                el[i].value = handleMessage(placeholder, this.message);
            }
        } else {
            // Wrong page, do nothing!
        }
    };

    function handleMessage(placeholder, final_message) {
        var rgxp = /.*Write\sa\snote\sto\s(.*)?\sat\s(?:.*)?\.\sWhat\sexcites\syou\sabout\s([^?]*)\?.*/im;
        var match = rgxp.exec(placeholder);
        if (match) {
            var ret = {
                owner: match[1],
                company: match[2]
            };
            final_message = decodeURI(final_message);
            var msg = final_message.replace(/\$OWNER\$/g, ret.owner).replace(/\$COMPANY\$/g, ret.company);
        }
        return msg || '';
    }
}

chrome.runtime.onMessage.addListener(listener);

function listener(message) {
    chrome.runtime.onMessage.removeListener(listener);
    if (message) {
        var job = new JobMessager(message);
        job.executeJob();
    }
}