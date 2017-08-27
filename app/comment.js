"use strict";
var comment = (function () {
    function comment(_postid, _content, _author, _commentid) {
        this.postid = _postid;
        this.content = _content;
        this.author = _author;
        this.id = _commentid;
    }
    return comment;
}());
exports.comment = comment;
//# sourceMappingURL=comment.js.map