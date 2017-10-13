// Roburst Handlebars caching (compiled templates and rendered content)

this.Templates = this.Templates || {};

Templates.cache = {};

Templates.getTemplate = function(templateId) {
    if (!Templates.cache[templateId]) {
        var templateElement = document.getElementById(templateId);

        if (templateElement) {
          Templates.cache[templateId] = Handlebars.compile(templateElement.innerHTML);
        }
    }

    return Templates.cache[templateId];
};

Templates.renderTemplate = function(templateId, context) {
    var renderedKey = templateId + JSON.stringify(context);

    if (!Templates.cache[renderedKey]) {
        var template = Templates.getTemplate(templateId);

        if (template) {
          Templates.cache[renderedKey] = template(context).trim();
        }
    }

    return Templates.cache[renderedKey] || '';
};
