import "./search.scss";
import searchIcon from "../../assets/icons/search.svg";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../DoctorsList/DoctorsListSlice";
import { handleSearchDoctors } from "../DoctorsList/DoctorsListSlice";
const Search = () =>{
    const [search, setSearch] = useState("");
    const token = useSelector((state) => state.account.token);
    const dispatch = useDispatch();
    const handleSearch = event => {
        
        event.preventDefault();
        console.log(event.target.value);
        console.log(search);
        // const matchedDoctors = Object.values(doctors)[0].filter(doctor => doctor.name
        // .toLowerCase().includes(search.toLowerCase()));
        // console.log(filteredDoctors);
        // const matchedDoctorsObj = Object.assign({},matchedDoctors)
        // console.log(matchedDoctorsObj)
        dispatch(handleSearchDoctors(search));
        
       
            
        
    }
    const onChangeInput = (e)=>{
        if(e.target.value===''){
            setSearch(e.target.value);
            handleSearch();
        }else{
            setSearch(e.target.value);;
        }
    }

    return(
        
        <form className="search-bar" onSubmit={handleSearch}>
            <button>
                <img src={searchIcon} alt="" />
            </button>
            <input type="text" value={search} placeholder="Search" onChange={(e)=> setSearch(e.target.value)}/>
          
            
        </form>
    )
}
export default Search;