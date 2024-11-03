import classes from './selectnumber.module.css'

const SelectNumber = (prop) => {
    const { Name } = prop;
    return (
        <div className={classes.wrapper}>
            <label for={Name}>{Name}</label>
            <input id={Name} min={0} type="number" ></input>
        </div>
    );
}

export default SelectNumber;