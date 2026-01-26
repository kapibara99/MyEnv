type FuwattoAnimationMessageProps = {
	parentClassName?: string;
	firstLoadDelay?: number;
	message: string;
};
export default function FuwattoAnimationMessage({ parentClassName, firstLoadDelay, message }: FuwattoAnimationMessageProps) {
	return (
		<span className={parentClassName}>
			{[...message].map((char, index) => (
				<span key={index} className="unique-fuwatto-animation" style={{ animationDelay: `${(firstLoadDelay || 0) + index * 0.1}s` }}>
					{char === ' ' ? '\u00A0' : char}
				</span>
			))}
		</span>
	);
}
