import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./wardsList.scss";
import WardsItem from "../WardsItem/WardsItem";
import { Pagination } from '../Pagination/Pagination';
import { fetchWards, setCurrentPage, getWardsCount, setStatusIdle, clearCheckedList } from './WardsListSlice';
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import successIcon from "../../assets/icons/success.svg";
import errorIcon from "../../assets/icons/alert-error.svg"
import List from "../List/List";

const WardsList = () => {
    const [modalMessageActive, setModalMessageActive] = useState(false);
    const clickModalMessageHandler = () => {
        setModalMessageActive(false);
        dispatch(setStatusIdle());
        if (checkedList !== 0) {
            dispatch(clearCheckedList())
        }

    }

    const status = useSelector(state => state.wards.status)
    const { wards, error, wardsLoadingStatus, currentPage, wardsCount, checkedList } = useSelector(state => state.wards);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.account.token);
    const wardsPerPage = 5;
    let pageCount = Math.ceil(wardsCount / wardsPerPage);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        dispatch(fetchWards([token, wardsPerPage, itemOffset]));

        dispatch(getWardsCount(token));

    }, []);
    useEffect(() => {
        dispatch(fetchWards([token, wardsPerPage, itemOffset]));

        dispatch(getWardsCount(token));

    }, [token]);
    useEffect(() => {
        dispatch(fetchWards([token, wardsPerPage, itemOffset]));
    }, [wardsCount]);
    const handlePageClick = (event) => {
        dispatch(setCurrentPage(event.selected + 1));
        const newOffset = (event.selected * wardsPerPage) % wardsCount;
        setItemOffset(newOffset);
        dispatch(fetchWards([token, wardsPerPage, newOffset]));

    };

    if (wardsLoadingStatus === "loading") {
        return <h5 className="text-center mt-5">Loading</h5>

    } else if (wardsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }
    const renderWardsList = (arr) => {
        if (arr.length === 0 && wardsCount === 0) {
            return (
                <h5 className="text-center mt-5">No Wards found</h5>
            )
        }

        return arr.map(({ ...props }, index) =>
        (

            <WardsItem
                key={index}
                setModalMessageActive={setModalMessageActive}
                {...props}/>

        )


        )

    }
    const elements = renderWardsList(wards);
    let statusIcon = 0;
    let statusMessage = '';

    switch (status) {
        case 'deleted':
            statusMessage = 'Ward successfully deleted';
            statusIcon = successIcon;
            break

        case 'updated':
            statusMessage = 'Ward successfully updated';
            statusIcon = successIcon;
            break;
        case 'added':
            statusMessage = 'Ward successfully added';
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
                    <div id="ward-header-number" className="list__headers__item">Number</div>
                    <div id="ward-header-floor" className="list__headers__item">Floor</div>
                    <div id="ward-header-department" className="list__headers__item">Department</div>
                    <div id="ward-header-purpose" className="list__headers__item">Purpose</div>
                    <div id="ward-header-placeCount" className="list__headers__item">Place count</div>
                    <div id="ward-header-chief" className="list__headers__item">Chief</div>
                </div>

                {elements}
                <Pagination pageCount={pageCount} currentPage={currentPage} onChangePage={handlePageClick} itemsPerPage={wardsPerPage} currentList={wards} />
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
export default WardsList;