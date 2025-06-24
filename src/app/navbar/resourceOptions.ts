export interface ResourceOptions {
  name: String;
  link?: String;
  children?: ResourceOptions[];
}

export const RESOURCES: ResourceOptions[] = [
  {
    name: 'Resources',
    children: [
        {
            name: 'DFCI Resource Site',
            link: 'https://sites.google.com/view/dfci-guide/',
        },
        {
            name: 'DFCI Mizuumi Wiki Page',
            link: 'https://wiki.gbl.gg/w/Dengeki_Bunko:_Fighting_Climax/DFCI',
        },
        {
            name: 'Submit a Report',
            link: 'mailto:ignite-boost.net@gmail.com',
        },
    ]
  },
];