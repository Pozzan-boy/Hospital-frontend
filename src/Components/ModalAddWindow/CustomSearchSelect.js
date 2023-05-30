const CustomSearchSelect = ({ label, ...props }) => {
    return (
        <div className="search__select">
            <label className="search__select__label">{label}</label>
           
            <select {...props}
                className={"search__select__input"} id="search-select"name="select">
                {props.arr.map((item) =>
                    (
                        <option value={item.value}>{item.text}</option>

                    ))}
            </select>

        </div>
    );
};
export default CustomSearchSelect;