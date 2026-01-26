import { TourProvider } from '@reactour/tour';
import { ALBUM_TOUR_STEPS } from './step';

export default function AlbumTour({ children }: { children: React.ReactNode }) {
	return (
		<>
			<TourProvider
				styles={{
					popover: base => ({
						...base,
						'--reactour-accent': '#9bc761',
						borderRadius: 10,
					}),
					maskWrapper: base => ({ ...base, color: '#9bc761' }),
					badge: base => ({ ...base, left: 'auto' }),
				}}
				scrollSmooth={true}
				badgeContent={({ totalSteps, currentStep }) => currentStep + 1 + '/' + totalSteps}
				prevButton={() => {
					return <i></i>;
				}}
				nextButton={({ currentStep, stepsLength, setIsOpen: setIsTourOpen, setCurrentStep }) => {
					const last = currentStep === stepsLength - 1;
					const first = currentStep === 0;
					if (first) {
						return <i></i>;
					}
					return (
						<button
							onClick={() => {
								if (last) {
									setIsTourOpen(false);
									return;
								}
								const modalContentLast = document.querySelector('.modal-content-foot');
								if (currentStep === 1 && modalContentLast) {
									modalContentLast.scrollIntoView({
										behavior: 'smooth',
										block: 'end',
									});
									setTimeout(() => {
										setCurrentStep(s => s + 1);
									}, 200);
								} else {
									setCurrentStep(s => s + 1);
								}
							}}>
							{last ? 'ガイドを終了' : '→'}
						</button>
					);
				}}
				disableDotsNavigation={true}
				steps={ALBUM_TOUR_STEPS}>
				<div id="tour-content">{children}</div>
			</TourProvider>
		</>
	);
}
