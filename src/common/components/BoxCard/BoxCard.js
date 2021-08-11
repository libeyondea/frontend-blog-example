import React from 'react';

const BoxCard = ({ children }) => {
	return (
		<div className="p-0 text-center">
			<span className="h5 mb-0">{children}</span>
		</div>
	);
};

export default BoxCard;
