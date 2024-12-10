(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['class'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"class-box\" data-class=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":1,"column":35},"end":{"line":1,"column":43}}}) : helper)))
    + "\">\r\n    <button class=\"remove-class-btn\" aria-label=\"Remove Class\">&times;</button>\r\n    <div class=\"class-name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":3,"column":28},"end":{"line":3,"column":36}}}) : helper)))
    + "</div>\r\n    <div class=\"class-subject\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"subject") || (depth0 != null ? lookupProperty(depth0,"subject") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subject","hash":{},"data":data,"loc":{"start":{"line":4,"column":31},"end":{"line":4,"column":42}}}) : helper)))
    + "</div>\r\n    <div class=\"class-time\">From: "
    + alias4(((helper = (helper = lookupProperty(helpers,"fromTime") || (depth0 != null ? lookupProperty(depth0,"fromTime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fromTime","hash":{},"data":data,"loc":{"start":{"line":5,"column":34},"end":{"line":5,"column":46}}}) : helper)))
    + "</div>\r\n    <div class=\"class-time\">To: "
    + alias4(((helper = (helper = lookupProperty(helpers,"toTime") || (depth0 != null ? lookupProperty(depth0,"toTime") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"toTime","hash":{},"data":data,"loc":{"start":{"line":6,"column":32},"end":{"line":6,"column":42}}}) : helper)))
    + "</div>\r\n</div>\r\n";
},"useData":true});
})();