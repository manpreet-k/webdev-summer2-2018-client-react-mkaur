import React from 'react'

export const ImageWidget =
    ({widget, updateWidget}) =>
    {
        let url;
        return(
            <div>
                <h3>Image Widget</h3>
                <label htmlFor="url">Image Text</label>
                <input onChange={() => {
                    widget.src = url.value;
                    updateWidget(widget)
                }}
                       ref={node => url = node}
                       className="form-control"
                       id="url"
                       placeholder="Image Text"/>
                <h4>Preview</h4>
                <img src={widget.src}/>
            </div>
        )
    };