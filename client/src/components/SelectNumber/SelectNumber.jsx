import classes from './selectnumber.module.css'

const SelectNumber = (prop) => {
    const { Name, Value, Min, Action } = prop;
    return (
        <>
            <label for={Name}>{Name}</label>
            <input
                id={Name}
                className={classes.input}
                type="number"
                value={Value}
                min={Min}
                onChange={event => {
                    const newValue = event.target.value
                    Action && Action(newValue)
                }}
            />
        </>
    );
}

export default SelectNumber;