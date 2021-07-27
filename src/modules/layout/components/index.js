import React from 'react';

import FooterComponent from '@/modules/layout/components/footer/components';
import NavbarComponent from '@/modules/layout/components/navbar/components';

const LayoutComponent = ({ children }) => {
	return (
		<>
			<NavbarComponent />
			{children}
			<FooterComponent />
		</>
	);
};

export default LayoutComponent;
