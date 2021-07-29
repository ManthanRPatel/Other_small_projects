import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/appsConfigs';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import React from 'react';
import { Redirect } from 'react-router-dom';

const routeConfigs = [
	...appsConfigs,
	...pagesConfigs,
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.null
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, []),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/payment" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
