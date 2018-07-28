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