"use strict";
var Post = (function () {
    function Post(_id, _title, _image, _content, _createdate) {
        this.title = _title;
        this.image = _image;
        this.id = _id;
        this.content = _content;
        this.createdate = _createdate;
    }
    return Post;
}());
exports.Post = Post;
//# sourceMappingURL=post.js.map