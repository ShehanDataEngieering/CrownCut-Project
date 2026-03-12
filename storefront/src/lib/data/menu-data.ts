import home_1 from '@assets/img/menu/menu-home-1.jpg';
import home_2 from '@assets/img/menu/menu-home-2.jpg';
import home_3 from '@assets/img/menu/menu-home-3.jpg';
import home_4 from '@assets/img/menu/menu-home-4.jpg';

const menu_data = [
  {
    id: 1,
    homes: true,
    title: 'Home',
    link: '/',
    home_pages: [
      {
        img: home_1,
        title: 'Electronics',
        link: '/'
      },
      {
        img: home_2,
        title: 'Fashion',
        link: '/'
      },
      {
        img: home_3,
        title: 'Beauty',
        link: '/'
      },
      {
        img: home_4,
        title: 'Jewelry',
        link: '/'
      }
    ]
  },
  {
    id: 2,
    products: true,
    title: 'Products',
    link: '/categories',
    product_pages: [
      {
        title: 'Shop Page',
        link: '/categories',
        mega_menus: [
          { title: 'Only Categories', link: '/categories' },
          { title: 'Shop Grid with Sideber', link: '/store' },
          { title: 'Product Details', link: '/store' },
        ]
      },
      {
        title: 'Products',
        link: '/store',
        mega_menus: [
          { title: 'All Products', link: '/store' },
        ]
      },
      {
        title: 'eCommerce',
        link: '/store',
        mega_menus: [
          { title: 'Shopping Cart', link: '/cart' },
          { title: 'Compare', link: '/store' },
          { title: 'Wishlist', link: '/store' },
          { title: 'Checkout', link: '/checkout' },
          { title: 'My account', link: '/account' },
        ]
      },
      {
        title: 'More Pages',
        link: '/',
        mega_menus: [
          { title: '404 Error', link: '/404' },
        ]
      },
    ]
  },
  {
    id: 3,
    sub_menu: true,
    title: 'Shop',
    link: '/store',
    sub_menus: [
      { title: 'Shop', link: '/store' },
    ],
  },
  {
    id: 5,
    sub_menu: true,
    title: 'Blog',
    link: '/blog',
    sub_menus: [
      { title: 'Blog', link: '/blog' },
    ]
  },
  {
    id: 6,
    single_link: true,
    title: 'Contact',
    link: '/contact',
  },
]

export default menu_data;

// mobile_menu
export const mobile_menu = [
  {
    id: 1,
    single_link: true,
    title: 'Home',
    link: '/',
  },
  {
    id: 2,
    single_link: true,
    title: 'Shop',
    link: '/store',
  },
  {
    id: 3,
    single_link: true,
    title: 'Categories',
    link: '/categories',
  },
  {
    id: 4,
    single_link: true,
    title: 'Blog',
    link: '/blog',
  },
  {
    id: 5,
    single_link: true,
    title: 'Contact',
    link: '/contact',
  },
  {
    id: 6,
    single_link: true,
    title: 'My Account',
    link: '/account',
  },
]
