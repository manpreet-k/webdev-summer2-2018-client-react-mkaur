import React from 'react'

export const LinkWidget =
    ({widget, updateWidget}) =>
    {
        let text;
        let url;
        return(
            <div>
                <h3>Link Widget</h3>
                <label htmlFor="text">Link Text</label>
                <input onChange={() => {
                    widget.text = text.value;
                    updateWidget(widget)
                }}
                       ref={node => text = node}
                       className="form-control"
                       id="text"
                       placeholder="Link Text"/>
                <label htmlFor="url">Link Text</label>
                <input onChange={() => {
                    widget.href = url.value;
                    updateWidget(widget)
                }}
                       ref={node => url = node}
                       className="form-control"
                       id="url"
                       placeholder="Link URL"/>

                <h4>Preview</h4>
                {widget.href !== '' && <a href ={widget.href}> Go to link </a>}

            </div>
        )
    };