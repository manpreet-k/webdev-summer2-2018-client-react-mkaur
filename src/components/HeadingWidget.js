import React from 'react'

export const HeadingWidget =
    ({widget, updateWidget}) => {
        let text;
        let size;
        let name;
        return (
            <div>
                <label htmlFor="text">
                    Heading Text
                </label>
                <input ref={node => text = node}
                       className="form-control"
                       id="text"
                       placeholder="Heading Text"
                       value={widget.text}
                       onChange={() => {
                           widget.text = text.value;
                           updateWidget(widget)
                       }}/>
                <label htmlFor="size">
                    Heading Size
                </label>
                <select ref={node => size = node}
                        className="form-control"
                        id="size"
                        defaultValue={widget.size}
                        onChange={() => {
                            widget.size = size.value;
                            updateWidget(widget)
                        }}>
                    <option value="1">
                        Heading 1
                    </option>
                    <option value="2">
                        Heading 2
                    </option>
                    <option value="3">
                        Heading 3
                    </option>
                    <option value="4">
                        Heading 4
                    </option>
                </select>
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
                <h4>Preview</h4>
                {widget.size === '1' && <h1>{widget.text}</h1>}
                {widget.size === '2' && <h2>{widget.text}</h2>}
                {widget.size === '3' && <h3>{widget.text}</h3>}
                {widget.size === '4' && <h4>{widget.text}</h4>}
            </div>
        )
    }