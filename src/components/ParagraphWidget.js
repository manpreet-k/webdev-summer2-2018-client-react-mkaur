import React from 'react'

export const ParagraphWidget =
    ({widget, updateWidget}) => {
        let text;
        let name;
        return (
            <div>
                <label htmlFor="text">
                    Paragraph Text
                </label>
                <textarea onChange={() => {
                    widget.text = text.value;
                    updateWidget(widget)
                }}
                       ref={node => text = node}
                       className="form-control"
                       id="text"
                       placeholder="Lorem ipsum"/>
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
                <textarea disabled="true" className="form-control"
                          value = {widget.text} />
            </div>
        )
    };