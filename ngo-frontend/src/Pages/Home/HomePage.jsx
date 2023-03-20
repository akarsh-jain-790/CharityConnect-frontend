import BookItem from '../Components/BookItem';
import Slider from '../Components/Slider';
import ServiceArea from '../Components/ServiceArea';
import Mission from '../Components/Mission';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBooks } from "../../redux/Slices/bookSlice";
import Ngo from '../Components/Ngo';
import CountDown from '../Components/CountDown';
import Footer from '../Components/Footer';

export default function Homepage() {
	let navigate = useNavigate();
	const { book, totalPages, currentPage, pending, error, error_message, success_message } = useSelector((state) => state.book);
	const dispatch = useDispatch();

	const [page, setPage] = useState(1);
	const [booksToShow, setbooksToShow] = useState([]);

	useEffect(() => {
		dispatch(fetchAllBooks(page));
	}, [page]);

	useEffect(() => {
		setbooksToShow((prevValue) => prevValue.concat(book));
	}, [book]);

	const handleShowMoreBooks = () => {
		setPage((prevValue) => prevValue + 1);
	};

    return (
		<>
			{/* <div id="preloader-active">
				<div class="preloader d-flex align-items-center justify-content-center">
					<div class="preloader-inner position-relative">
						<div class="preloader-circle"></div>
						<div class="preloader-img pere-text">
							<img src="assets/img/logo/loder.png" alt="" />
						</div>
					</div>
				</div>
			</div> */}
			<main>
				<Slider/>
				<ServiceArea/>
				<Mission/>
				<Ngo/>
				<CountDown/>
			</main>
			<Footer/>	
			<div id="back-top" >
				<a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
			</div>
		</>
    );
}
