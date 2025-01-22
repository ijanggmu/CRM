export interface MenuItem {
    title: string;
    href: string;
    icon: string;
  }
  
  export async function getMenuItems(): Promise<MenuItem[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: 'BarChart3',
      },
      {
        title: 'Customers',
        href: '/customers',
        icon: 'Users',
      },
      {
        title: 'Leads',
        href: '/leads',
        icon: 'UserPlus',
      },
      {
        title: 'Claims',
        href: '/claims',
        icon: 'FileCheck',
      },
      {
        title: 'Policies',
        href: '/policies',
        icon: 'FileText',
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: 'Settings',
      },
    ];
  }