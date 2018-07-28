import React from 'react'

export const LinkWidget =
    ({widget, updateWidget}) => {
        let text;
        let url;
        let name;
        return (
            <div>
                <label htmlFor="text">Link Text</label>
                <input ref={node => text = node}
                       className="form-control"
                       id="text"
                       placeholder="Link Text"
                       onChange={() => {
                           widget.text = text.value;
                           updateWidget(widget)
                       }}/>
                <label htmlFor="url">Link URL</label>
                <input ref={node => url = node}
                       className="form-control"
                       id="url"
                       placeholder="Link URL"
                       onChange={() => {
                           widget.href = url.value;
                           updateWidget(widget)
                       }}/>
                <label for="widgetname">
                    Widget Name
                </label>
                <input ref={node => name = node}
                       className="form-control"
                       id="widgetname"
                       placeholder="Widget Name"
                       value={widget.name}
                       onChange={() => {
                           widget.name = name.value;
                           updateWidget(widget)
                       }}/>
                <h4>Preview</h4>
                {widget.href !== '' && <a href={widget.href}> {widget.text} </a>}

            </div>
        )
    };