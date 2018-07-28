import React from 'react'

export const ListWidget = ({widget, preview, updateWidget}) => {
    let text;
    let ordered;
    let name;
    return (
        <div>
            <div hidden={preview}>
            <textarea ref={node => text = node}
                      className="form-control"
                      onChange={() => {
                          widget.listItems = text.value;
                          updateWidget(widget)
                      }}
                      value={widget.listItems}/>
            <label htmlFor="type">
                List Type
            </label>
            <select ref={node => ordered = node}
                    className="form-control"
                    id="type"
                    onChange={() => {
                        widget.listType = ordered.value;
                        updateWidget(widget)
                    }}>
                <option value="UNORDERED">
                    Unordered List
                </option>
                <option value="ORDERED">
                    Ordered List
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
            </div>
            <h4>Preview</h4>
            {widget.listType === 'UNORDERED' &&
            <ul>
                {widget.listItems.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            }
            {widget.listType === 'ORDERED' &&
            <ol>
                {widget.listItems.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
            }
            {(widget.listType === undefined || widget.listType === null) &&
            <ul>
                {widget.listItems.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            }
        </div>
    );
}