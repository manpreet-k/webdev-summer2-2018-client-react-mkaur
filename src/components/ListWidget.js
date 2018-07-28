import React from 'react'

export const ListWidget = ({widget, updateWidget}) => {
    let text
    let ordered
    return (
        <div>
            <textarea ref={node => text = node}
                      className="form-control"
                      onChange={() => {
                          widget.listItems = text.value;
                          updateWidget(widget)
                      }}
                      value={widget.listItems}/>
            <label>
                <input ref={node => ordered = node}
                       onClick={() => {
                           widget.ordered = ordered.checked
                           updateWidget(widget)
                       }}
                       checked={widget.ordered}
                       type="checkbox"/>
                Ordered
            </label>
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
            {!widget.ordered &&
            <ul>
                {widget.listItems.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            }
            {widget.ordered &&
            <ol>
                {widget.listItems.split('\n').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ol>
            }
        </div>
    );
}