requirejs(["jquery.min"], function(util) {
    requirejs(["bootstrap.min"], function(util) {

    });

    requirejs(["ace"], function(util) {

        var register_change_handlers = function(template_editor, context_editor, render_iframe) {

            var prepare_payload = function(template_editor, context_editor) {
                var template = template_editor.getValue();
                var context_raw = context_editor.getValue();

                var context = {};
                try {
                    context = JSON.parse(context_raw);
                } catch (exception) { }

                return {
                    "template": template,
                    "context": context,
                }
            };

            var change_handler = function(e) {
                var data = prepare_payload(template_editor, context_editor);

                jQuery.ajax({
                    url: "/render/",
                    data: JSON.stringify(data),
                    type: "POST",
                    success: function(data, textStatus, jqXHR) {
                        render_iframe.src = "data:text/html;base64," + window.btoa(data);
                    },
                    // dataType:"json",
                    contentType: "application/json"
                });
            };

            template_editor.on("change", change_handler);
            context_editor.on("change", change_handler);

            change_handler();
        };

        var template_editor = ace.edit("template-editor");
        template_editor.setTheme("ace/theme/monokai");
        template_editor.getSession().setMode("ace/mode/django");

        var context_editor = ace.edit("context-editor");
        context_editor.setTheme("ace/theme/monokai");
        context_editor.getSession().setMode("ace/mode/json");

        var render_iframe = document.getElementById("render-iframe");

        register_change_handlers(template_editor, context_editor, render_iframe);
    });
});
