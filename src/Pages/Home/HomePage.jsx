import Slider from '../Components/Slider';
import ServiceArea from '../Components/ServiceArea';
import Mission from '../Components/Mission';
import Ngo from '../Components/Ngo';
import CountDown from '../Components/CountDown';
import Footer from '../Components/Footer';

export default function Homepage() {

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
