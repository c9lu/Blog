"use strict";
var protractor_1 = require('protractor');
var BlogPage = (function () {
    function BlogPage() {
    }
    BlogPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    BlogPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return BlogPage;
}());
exports.BlogPage = BlogPage;
//# sourceMappingURL=app.po.js.map