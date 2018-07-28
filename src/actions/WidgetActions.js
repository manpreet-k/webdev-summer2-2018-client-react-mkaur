import WidgetServiceClient from "../services/WidgetServiceClient";
import * as constants from '../constants/WidgetConstants';

export const findAllWidgetsForTopic = (dispatch, topicId) => {
    if ('' !== topicId) {
        WidgetServiceClient.instance
            .findAllWidgetsForTopic(topicId)
            .then(widgets => dispatch({
                type: constants.FIND_ALL_WIDGETS_FOR_TOPIC,
                widgets: widgets
            }))
            .catch((e) => console.log(e))
    }

};

export const saveAllWidgets = (dispatch, topicId, widgets) => {
    let widgetService = WidgetServiceClient.instance;
    if ('' === topicId) {
        return [];
    }

    widgetService.saveAllWidgets(topicId, widgets)
        .then(widgets => dispatch({
            type: constants.SAVE_ALL_WIDGETS,
            widgets: widgets
        }))
        .catch((e) => console.log(e))
};

export const moveWidgetUp = (dispatch, widgets, wid) => {
    let i;
    let newwidgets = widgets.slice();
    for (i = 0; i < newwidgets.length; i++) {
        if(newwidgets[i].id === wid){
            break;
        }
    }
    newwidgets = moveWidgets(newwidgets, i, i-1);
    dispatch({
        type: constants.MOVE_WIDGET_UP,
        widgets: newwidgets
    })
}

export const moveWidgetDown = (dispatch, widgets, wid) => {
    let i;
    let newwidgets = widgets.slice();
    for (i = 0; i < newwidgets.length; i++) {
        if(newwidgets[i].id === wid){
            break;
        }
    }
    newwidgets = moveWidgets(newwidgets, i, i+1);
    dispatch({
        type: constants.MOVE_WIDGET_DOWN,
        widgets: newwidgets
    })
}


export const moveWidgets = (widgets, old_index, new_index) => {
    if (new_index >= widgets.length) {
        let k = new_index - widgets.length + 1;
        while (k--) {
            widgets.push(undefined);
        }
    }
    widgets.splice(new_index, 0, widgets.splice(old_index, 1)[0]);
    return widgets;
};
