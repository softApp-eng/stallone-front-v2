import { FuseNavigationItem } from '@fuse/components/navigation';
export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : 'dashboards',
        title   : 'Acceuil',
        //subtitle: 'Unique dashboard designs',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'home',
                title: 'home',
                type : 'basic',
                icon : 'home',
                roles : ['ADMIN'],
                link : '/home'
            }
        ]
    },{
        id      : 'Article',
        title   : 'Articles',
        //subtitle: 'Unique dashboard designs',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'add',
                title: 'Ajouter',
                type : 'basic',
                icon : 'menu',
                roles : ['ADMIN','EDIT','VIEW'],
                link : '/article/add'
            },{
                id   : 'stock',
                title: 'Stock',
                type : 'basic',
                icon : 'archive',
                roles : ['ADMIN','EDIT','VIEW'],
                link : '/article/stock'
            },
            {
                id   : 'statistique',
                title: 'statistique',
                type : 'basic',
                icon : 'add_chart',
                roles : ['ADMIN','EDIT','VIEW'],
                link : '/article/statistique'
            }
        ]
    },{
        id      : 'settings',
        title   : 'Parametres',
        subtitle: 'Administration',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        roles : ['ADMIN','EDIT','VIEW'],
        children: [
            {
                id   : 'user',
                title: 'comptes',
                type : 'basic',
                icon : 'people_alt',
                link : '/user/list',
                roles : ['ADMIN']
            }
        ]
    }
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    }
];
