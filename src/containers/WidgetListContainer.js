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
        if(this.props.topicId !== newProps.topicId){
            this.props.findAllWidgetsForTopic(newProps.topicId);
        }
    }

    componentDidMount() {
        this.setState({topicId: this.props.topicId});
    }

    createNewWidget(){
        this.props.createWidget({
            name:'new widget' + this.props.widgets.length,
            text:'',
            position: this.props.widgets.length,
            id: this.props.widgets.length + 1,
            classname: 'Heading',
            size: '1',
            src: '',
            href:'',
            listItems:''
        })
    }

    render() {
        return (
            <div>
                <div>
                    <button className="float-right btn-success" disabled={this.props.preview} onClick={() => this.saveAllWidgets()}>
                        Save
                    </button>
                </div>
                <div>
                    <button className="float-right btn-info" disabled={this.props.preview} onClick={() => this.saveAllWidgets}>
                        Preview
                    </button>
                </div>
                <div>
                    <button onClick={() => this.createNewWidget()}>
                        Add Widget
                    </button>
                </div>
                <div>
                <ul>
                    {this.props.widgets.map(widget => (
                        <WidgetItem widget={widget}
                                             preview={this.props.preview}
                                             key={widget.id}
                        />
                    ))}
                </ul>
                </div>

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
    }
);

const WidgetListContainer =
    connect(
        stateToPropertyMapper,
        dispatcherToPropertyMapper)(WidgetList)

export default WidgetListContainer