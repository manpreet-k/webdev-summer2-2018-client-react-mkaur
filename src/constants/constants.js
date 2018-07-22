export const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: '5px',
    margin: `0 0 5px 0`,
    border: '1px solid lightgray',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle,
});

export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'white',
    padding: '5px 5px 0 0',
    margin: `5px 0 5px 0`,
    //border: '1px solid lightgray'
});
