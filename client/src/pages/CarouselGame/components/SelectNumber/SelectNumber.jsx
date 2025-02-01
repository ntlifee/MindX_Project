import classes from './selectnumber.module.css'

const SelectNumber = (prop) => {
    const { Id, Name, Value, Min, Action } = prop;
    return (
        <div className={classes.wrapper}>
            <label htmlFor={Id}>{Name}</label>
            <input
                id={Id}
                className={classes.input}
                type="number"
                value={Value}
                onChange={event => {
                    let newValue = event.target.value
                    if (newValue !== '') {
                        newValue = Math.max(parseInt(newValue), Min);
                    }
                    Action && Action(newValue)
                }}
            />
        </div>
    );
}

export default SelectNumber;