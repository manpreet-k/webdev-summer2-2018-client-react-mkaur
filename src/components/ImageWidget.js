import React from 'react'

export const ImageWidget =
    ({widget, updateWidget}) => {
        let text;
        let url;
        return (
            <div>
                <label htmlFor="url">
                    Image Text
                </label>
                <input ref={node => url = node}
                       className="form-control"
                       id="url"
                       placeholder="Image Text"
                       onChange={() => {
                           widget.src = url.value;
                           updateWidget(widget)
                       }}/>
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
                <img src={widget.src}/>
            </div>
        )
    };