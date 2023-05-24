import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./healingsList.scss";
import HealingsItem from "../HealingsItem/HealingsItem";
import { Pagination } from '../Pagination/Pagination';
import { fetchHealings, setCurrentPage, getHealingsCount, setStatusIdle, clearCheckedList } from './HealingsListSlice';
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import successIcon from "../../assets/icons/success.svg";
import errorIcon from "../../assets/icons/alert-error.svg"
import List from "../List/List";
import axios from 'axios';

const HealingsList = () => {
    const [modalMessageActive, setModalMessageActive] = useState(false);
    const clickModalMessageHandler = () => {
        setModalMessageActive(false);
        dispatch(setStatusIdle());
        if (checkedList !== 0) {
            dispatch(clearCheckedList())
        }

    }

    const status = useSelector(state => state.healings.status)
    const { healings, error, healingsLoadingStatus, currentPage, healingsCount, checkedList } = useSelector(state => state.healings);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.account.token);
    const healingsPerPage = 5;
    let pageCount = Math.ceil(healingsCount / healingsPerPage);
    const [itemOffset, setItemOffset] = useState(0);

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        dispatch(fetchHealings([token, healingsPerPage, itemOffset]));

        dispatch(getHealingsCount(token));

        axios.get('/patient/getAllPatients', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setPatients(res.data.map((item) => { console.log(res);return <option value={item._id}>{item.name}</option>})))
            .catch((err) => console.log(err));

        axios.get('/doctor/getAllDoctors', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setDoctors(res.data.map((item) => <option value={item._id}>{item.name}</option>)))
            .catch((err) => console.log(err));

        axios.get('/ward/getAllWards', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setWards(res.data.map((item) => <option value={item._id}>{item.number}</option>)))
            .catch((err) => console.log(err))
    }, []);
    useEffect(() => {
        dispatch(fetchHealings([token, healingsPerPage, itemOffset]));

        dispatch(getHealingsCount(token));

        axios.get('/patient/getAllPatients', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setPatients(res.data.map((item) => { console.log(res);return <option value={item._id}>{item.name}</option>})))
            .catch((err) => console.log(err));

        axios.get('/doctor/getAllDoctors', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setDoctors(res.data.map((item) => <option value={item._id}>{item.name}</option>)))
            .catch((err) => console.log(err));

        axios.get('/ward/getAllWards', {
            headers: {
                Authorization: token
            }
        })
            .then((res) => setWards(res.data.map((item) => <option value={item._id}>{item.number}</option>)))
            .catch((err) => console.log(err))

    }, [token]);
    useEffect(() => {
        dispatch(fetchHealings([token, healingsPerPage, itemOffset]));
    }, [healingsCount]);
    const handlePageClick = (event) => {
        dispatch(setCurrentPage(event.selected + 1));
        const newOffset = (event.selected * healingsPerPage) % healingsCount;
        setItemOffset(newOffset);
        dispatch(fetchHealings([token, healingsPerPage, newOffset]));

    };

    if (healingsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Loading</h5>

    } else if (healingsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }
    const renderHealingsList = (arr) => {
        if (arr.length === 0 && healingsCount === 0) {
            return (
                <h5 className="text-center mt-5">No Healings found</h5>
            )
        }
        console.log(arr);
        return arr.map(({ ...props }, index) =>
        (

            <HealingsItem
                key={index}
                setModalMessageActive={setModalMessageActive}
                patients={patients}
                doctors={doctors}
                wards={wards}
                {...props}/>

        )


        )

    }
    const elements = renderHealingsList(healings);
    let statusIcon = 0;
    let statusMessage = '';

    switch (status) {
        case 'deleted':
            statusMessage = 'Healing successfully deleted';
            statusIcon = successIcon;
            break

        case 'updated':
            statusMessage = 'Healing successfully updated';
            statusIcon = successIcon;
            break;
        case 'added':
            statusMessage = 'Healing successfully added';
            statusIcon = successIcon;
            break;
        case 'failed':
            statusMessage = `${error}`;
            statusIcon = errorIcon;
            break;
        case 'deletedMany':
            statusMessage = `${checkedList.length} items deleted successfully`;
            statusIcon = successIcon;
            break;
        default:
            break;
    }

    return (

        <List>
            <div className="list">
                <div className="list__headers">
                    <div id="healing-header-patient" className="list__headers__item">Patient</div>
                    <div id="healing-header-doctor" className="list__headers__item">Doctor</div>
                    <div id="healing-header-diagnos" className="list__headers__item">Diagnos</div>
                    <div id="healing-header-date" className="list__headers__item">Date</div>
                    <div id="healing-header-status" className="list__headers__item">Status</div>
                    <div id="healing-header-preparations" className="list__headers__item">Preparations</div>
                    <div id="healing-header-ward" className="list__headers__item">Ward</div>
                </div>

                {elements}
                <Pagination pageCount={pageCount} currentPage={currentPage} onChangePage={handlePageClick} itemsPerPage={healingsPerPage} currentList={healings} />
                <Modal active={modalMessageActive} setActive={setModalMessageActive} modalClass={"modal__status"}>
                    <img className="modal__status__img" src={statusIcon} alt="x" />

                    <div className="modal__status__text">
                        <h2>{statusMessage}</h2>
                    </div>
                    <Button

                        onClick={clickModalMessageHandler}
                        width="80px"
                        height="40px"
                        marginTop="10px"
                        borderRadius="14px"
                        bgColor="#25AE88"
                        children="OK"
                        fontSize="20px" />

                </Modal>
            </div>
        </List>
    )
}
export default HealingsList;