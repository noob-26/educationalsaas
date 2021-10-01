// assets
import { IconBrandFramer, IconTypography, IconPalette, IconShadow, IconWindmill, IconLayoutGridAdd } from '@tabler/icons';

// constant
const icons = {
    IconTypography,
    IconPalette,
    IconShadow,
    IconWindmill,
    IconBrandFramer,
    IconLayoutGridAdd
};

// ===========================|| UTILITIES MENU ITEMS ||=========================== //

const utilities = {
    id: 'Settings',
    title: 'Settings & More',
    type: 'group',
    children: [
        {
            id: 'util-typography',
            title: 'Support',
            type: 'item',
            url: '/utils/util-typography',
            icon: icons.IconTypography,
            breadcrumbs: false
        }
    ]
};

export default utilities;
