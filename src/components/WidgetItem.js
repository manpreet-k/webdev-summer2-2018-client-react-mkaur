import React from 'react';
import {connect} from "react-redux";
import * as constants from "../constants/WidgetConstants";
import {ParagraphWidget} from './ParagraphWidget';
import {LinkWidget} from './LinkWidget';
import {ImageWidget} from './ImageWidget';
import {HeadingWidget} from "./HeadingWidget";
import {ListWidget} from "./ListWidget";

const WidgetItemComp = ({widget, deleteWidget, updateWidgetType, updateWidget}) =>
{
    let widgetType;
    return(
        <li className="form-control">
            <select ref={input => widgetType = input}
                    className="form-control"
                    defaultValue={widget.classname}
                    onChange={() =>
                        updateWidgetType(widget.id, widgetType.value)} >
                <option value="Heading">Heading Widget</option>
                <option value="Paragraph">Paragraph Widget</option>
                <option value="Link">Link Widget</option>
                <option value="List">List Widget</option>
                <option value="Image">Image Widget</option>
            </select>
            <button className="btn btn-danger"
                    onClick={() => deleteWidget(widget.position)}>
                Delete
            </button>
            <div>
                {widget.classname === 'Paragraph' && <ParagraphWidget widget={widget} updateWidget={updateWidget}/>}
                {widget.classname === 'List' && <ListWidget widget={widget} updateWidget={updateWidget}/>}
                {widget.classname === 'Heading' && <HeadingWidget widget={widget} updateWidget={updateWidget}/>}
                {widget.classname === 'Link' && <LinkWidget widget={widget} updateWidget={updateWidget}/>}
                {widget.classname === 'Image' && <ImageWidget widget={widget} updateWidget={updateWidget}/>}
            </div>
        </li>
    )
}

const dispatcherToPropertyMapper = dispatch => ({
    deleteWidget: wid => dispatch({
        type: constants.DELETE_WIDGET,
        widgetId: wid
    }),
    updateWidget: w => dispatch({
        type: constants.UPDATE_WIDGET,
        widget: w
    }),
    updateWidgetType: (wid, widgetType) => dispatch({
        type: constants.UPDATE_WIDGET_TYPE,
        widgetId: wid,
        widgetType: widgetType
    })
})

const stateToPropertyMapper = state => ({
    widgets:state.widgets,
    preview: state.preview
})

const WidgetItem =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)(WidgetItemComp)

export default WidgetItem