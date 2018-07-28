import React from 'react'

export const ParagraphWidget =
    ({widget, updateWidget}) => {
        let text;
        return (
            <div>
                <label htmlFor="text">
                    Paragraph Text
                </label>
                <input onChange={() => {
                    widget.text = text.value;
                    updateWidget(widget)
                }}
                       ref={node => text = node}
                       className="form-control"
                       id="text"
                       placeholder="Paragraph Text"/>
                <label for="widgetname">
                    Widget Name
                </label>
                <input ref={node => text = node}
                       className="form-control"
                       id="widgetname"
                       placeholder="Widget Name"
                       value={widget.name}
                       onChange={() => {
                           widget.name = text.value;
                           updateWidget(widget)
                       }}/>
                <h4>Preview</h4>
                <h1>{widget.text}</h1>
            </div>
        )
    };