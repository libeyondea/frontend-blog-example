import React, { useState } from 'react';
import { useAccordionButton } from 'react-bootstrap';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const CustomToggleComponent = ({ children, eventKey, callback }) => {
	const [isActiveEventKey, setIsActiveEventKey] = useState(false);
	const decoratedOnClick = useAccordionButton(eventKey, () => {
		callback && callback(eventKey);
		setIsActiveEventKey(!isActiveEventKey);
	});

	return (
		<button
			type="button"
			className="d-flex align-items-center border-0 bg-transparent p-2 w-100"
			onClick={decoratedOnClick}
		>
			{children}
			<span className="ms-auto">{isActiveEventKey ? <BsChevronUp /> : <BsChevronDown />}</span>
		</button>
	);
};

export default CustomToggleComponent;
