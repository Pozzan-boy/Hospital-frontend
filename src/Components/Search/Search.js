import "./search.scss";
import searchIcon from "../../assets/icons/search.svg";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors, searchDoctorItem,setSearchIdle } from "../DoctorsList/DoctorsListSlice";
import CustomSearchSelect from "../ModalAddWindow/CustomSearchSelect";

const Search = ({searchTypeList,fetchItems, itemsPerPage}) => {
    const [search, setSearch] = useState("");
    const numTypes =["age", "salary" , "height", "weight", "placeCount", "number", "floor"]
    const dateTypes =["entryDate", "date" , "birthDate"]
    const token = useSelector((state) => state.account.token);
    
    const [searchType, setSearchType] = useState(searchTypeList[0].value);
    const dispatch = useDispatch();
    useEffect(()=>{
        setSearch('');
    },[searchType])
    const handleSearch = event => {
        const searchData = {}
        searchData[searchType]=search;
        event.preventDefault();
        console.log(search, searchType);
        
        const itemOffset= 0;
        setSearch(numTypes.indexOf(searchType)!==-1? +search:search)
        if(search===''){
            dispatch(setSearchIdle());
            dispatch(fetchItems([token, itemsPerPage, itemOffset]));

        }else{
            
            dispatch(searchDoctorItem([token, searchData]))
        }
        


    }

    return (

        <div className="search">
           <CustomSearchSelect
                label="Search by"
                name="searchby"
                arr={searchTypeList}
                onChange={(e) => setSearchType(e.target.value)}
            >
           
            </CustomSearchSelect>
            <form className="search-bar" onSubmit={handleSearch}>
                <button onClick={handleSearch}>
                    <img src={searchIcon} alt="" />
                </button>
                <input id="search__input" type={numTypes.indexOf(searchType)!==-1? "number" : dateTypes.indexOf(searchType)!==-1? "date" : "text" } value={search} placeholder="Search" onChange={(e) => {setSearch(e.target.value)}} />


            </form>
        </div>
    )
}
export default Search;