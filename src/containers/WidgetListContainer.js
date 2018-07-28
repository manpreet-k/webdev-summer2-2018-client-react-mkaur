import React from 'react';
import {connect} from 'react-redux'
import WidgetItem from '../components/WidgetItem';
import * as constants from '../constants/WidgetConstants';
import * as widgetActions from '../actions/WidgetActions';

class WidgetList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topicId: ''
        };
        this.saveAllWidgets = this.saveAllWidgets.bind(this);
        this.createNewWidget = this.createNewWidget.bind(this);
    }

    saveAllWidgets() {
        this.props.saveWidgets(this.state.topicId);
    }

    componentWillReceiveProps(newProps) {
        this.setState({topicId: newProps.topicId});
        if (this.props.topicId !== newProps.topicId) {
            this.props.findAllWidgetsForTopic(newProps.topicId);
        }
    }

    componentDidMount() {
        this.setState({topicId: this.props.topicId});
    }

    createNewWidget() {
        this.props.createWidget({
            name: 'new widget' + this.props.widgets.length,
            text: '',
            position: this.props.widgets.length,
            id: this.props.widgets.length + 1,
            classname: 'Heading',
            size: '1',
            src: '',
            href: '',
            listItems: ''
        })
    }

    render() {
        let previewChecked;
        return (

            <div className="wbdv-padding-5">
                <div className="wbdv-widget-list-top">
                <div >
                    <label>
                        <input type="checkbox"
                               ref={node => previewChecked = node}
                               checked={this.props.preview}
                               onClick={() => {
                                   this.props.updatedPreview(previewChecked.checked);
                               }}/>
                        Preview
                    </label>
                    <button className="wbdv-margin-5 btn-danger btn"
                            onClick={() => this.createNewWidget()}>
                        <i className="fa fa-plus-circle"/>
                    </button>
                    <button className="wbdv-margin-5 btn btn-success"
                            disabled={this.props.preview}
                            onClick={() => this.saveAllWidgets()}>
                        Save
                    </button>
                </div>
            </div>
                <ul className="wbdv-margin-5 wbdv-bg list-group">
                    {this.props.widgets.map(widget => (
                        <WidgetItem widget={widget}
                                    preview={this.props.preview}
                                    key={widget.id}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}

const stateToPropertyMapper = state => (
    {
        widgets: state.widgets,
        preview: state.preview
    }
);

const dispatcherToPropertyMapper = dispatch => (
    {
        saveWidgets: (topicId) => dispatch({
            type: constants.SAVE_ALL_WIDGETS,
            topicId: topicId
        }),
        createWidget: (w) => dispatch({
            type: constants.CREATE_WIDGET,
            widget: w
        }),
        findAllWidgetsForTopic: (topicId) =>
            widgetActions.findAllWidgetsForTopic(dispatch, topicId),
        updatedPreview: (value) => dispatch({
            type: constants.UPDATE_PREVIEW,
            value: value
        })
    }
);

const WidgetListContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)(WidgetList)

export default WidgetListContainer