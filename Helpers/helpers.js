module.exports = {
    replaseHtmlFunc: function(html) {
        let text;

        text = html.replace(/<\s*br\/*>/gi, "\n");
        text = text.replace(/<\s*a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 (Link->$1) ");
        text = text.replace(/<\s*\/*.+?>/ig, "\n");
        text = text.replace(/ {2,}/gi, " ");
        text = text.replace(/\n+\s*/gi, "\n\n");

        return text;
    }
};