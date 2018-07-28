import React from 'react'

export const ParagraphWidget =
    ({widget, preview, widgets, updateWidget}) => {
        let text;
        let name;
        return (
            <div>
                <div hidden={preview}>
                <label htmlFor="text">
                    Paragraph Text
                </label>
                <textarea ref={node => text = node}
                          className="form-control"
                          id="text"
                          placeholder="Lorem ipsum"
                          defaultValue={widget.text}
                          onChange={() => {
                              widget.text = text.value;
                              updateWidget(widget)
                          }}/>
                <label htmlFor="widgetname">
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
                </div>
                <h4>Preview</h4>
                <textarea disabled="true" className="form-control"
                          value = {widget.text} />
            </div>
        )
    };