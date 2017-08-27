//
"use strict";
exports.getFreqObj = function (freqObj, post, keyName, length, isComment) {
    if (freqObj[keyName] == null) {
        freqObj[keyName] = { count: 1, PostIDs: [post.id], IsComment: isComment };
    }
    else {
        freqObj[keyName].count = freqObj[keyName].count + 1;
        freqObj[keyName].PostIDs.push(post.id);
        freqObj[keyName].IsComment = isComment;
    }
    return freqObj;
};
//# sourceMappingURL=app.functions.js.map