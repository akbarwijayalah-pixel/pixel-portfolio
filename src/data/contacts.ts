export interface ContactInfo {
  id: string;
  platform: string;
  label: string;
  value: string; // URL, email, or handle
  displayValue: string;
  href: string;
  icon: string; // Icon identifier
  isExternal: boolean;
}

export const contacts: ContactInfo[] = [
  {
    id: 'email',
    platform: 'Email',
    label: 'Email Address',
    value: 'akbarwijayalah@gmail.com',
    displayValue: 'akbarwijayalah@gmail.com',
    href: 'mailto:akbarwijayalah@gmail.com',
    icon: 'Mail',
    isExternal: false,
  },
  {
    id: 'github',
    platform: 'GitHub',
    label: 'GitHub Profile',
    value: 'https://github.com/akbarwijayalah-pixel',
    displayValue: 'github.com/akbarwijayalah-pixel',
    href: 'https://github.com/akbarwijayalah-pixel',
    icon: 'Github',
    isExternal: true,
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    label: 'LinkedIn Profile',
    value:
      'https://www.linkedin.com/in/akbar-wijaya-259613446/?lipi=urn%3Ali%3Apage%3Ap_mwlite_feed%3BX%2BLS0T7ZRNG8RTZDCzpOQg%3D%3D',
    displayValue: 'linkedin.com/in/akbar-wijaya',
    href:
      'https://www.linkedin.com/in/akbar-wijaya-259613446/?lipi=urn%3Ali%3Apage%3Ap_mwlite_feed%3BX%2BLS0T7ZRNG8RTZDCzpOQg%3D%3D',
    icon: 'Linkedin',
    isExternal: true,
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    label: 'Instagram',
    value: 'sobble_blublub',
    displayValue: '@sobble_blublub',
    href: 'https://www.instagram.com/sobble_blublub',
    icon: 'Instagram',
    isExternal: true,
  },
];
