// Mock data store
let customers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      policies: 2,
      status: 'Active',
      createdAt: '2024-03-20',
    },
    // Add more mock customers...
  ];
  
  let claims = [
    {
      id: 'CLM001',
      customer: 'John Doe',
      type: 'Auto Insurance',
      amount: '$2,500',
      status: 'Pending',
      submittedDate: '2024-03-15',
    },
    // Add more mock claims...
  ];
  
  let policies = [
    {
      id: 'POL001',
      customer: 'John Doe',
      type: 'Auto Insurance',
      premium: '$150/month',
      status: 'Active',
      expiryDate: '2025-03-15',
    },
    // Add more mock policies...
  ];
  
  let tasks = [
    {
      id: '1',
      title: 'Review pending claims',
      description: 'Review and process pending insurance claims',
      status: 'pending',
      priority: 'high',
      dueDate: '2024-03-25',
      assignedTo: 'John Doe',
    },
    // Add more mock tasks...
  ];
  
  let notifications = [
    {
      id: '1',
      title: 'New Claim Filed',
      message: 'A new claim has been filed by John Doe',
      type: 'claim',
      read: false,
      createdAt: '2024-03-20T10:00:00Z',
    },
    // Add more mock notifications...
  ];
  
  // Mock API functions
  export const mockApi = {
    // Dashboard
    getDashboardStats: async () => {
      await simulateDelay();
      return {
        totalPolicies: 1234,
        activeClaims: 42,
        newCustomers: 89,
        revenue: 48200,
        recentClaims: claims.slice(0, 5),
        tasks: tasks.slice(0, 5),
      };
    },
  
    // Customers
    getCustomers: async () => {
      await simulateDelay();
      return customers;
    },
  
    createCustomer: async (data: any) => {
      await simulateDelay();
      const newCustomer = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date().toISOString(),
      };
      customers = [...customers, newCustomer];
      return newCustomer;
    },
  
    updateCustomer: async (id: string, data: any) => {
      await simulateDelay();
      customers = customers.map(customer =>
        customer.id === id ? { ...customer, ...data } : customer
      );
      return customers.find(customer => customer.id === id);
    },
  
    deleteCustomer: async (id: string) => {
      await simulateDelay();
      customers = customers.filter(customer => customer.id !== id);
    },
  
    // Claims
    getClaims: async () => {
      await simulateDelay();
      return claims;
    },
  
    createClaim: async (data: any) => {
      await simulateDelay();
      const newClaim = {
        id: `CLM${Math.random().toString(36).substr(2, 6)}`,
        ...data,
        submittedDate: new Date().toISOString().split('T')[0],
      };
      claims = [...claims, newClaim];
      return newClaim;
    },
  
    updateClaim: async (id: string, data: any) => {
      await simulateDelay();
      claims = claims.map(claim =>
        claim.id === id ? { ...claim, ...data } : claim
      );
      return claims.find(claim => claim.id === id);
    },
  
    deleteClaim: async (id: string) => {
      await simulateDelay();
      claims = claims.filter(claim => claim.id !== id);
    },
  
    // Policies
    getPolicies: async () => {
      await simulateDelay();
      return policies;
    },
  
    createPolicy: async (data: any) => {
      await simulateDelay();
      const newPolicy = {
        id: `POL${Math.random().toString(36).substr(2, 6)}`,
        ...data,
        createdAt: new Date().toISOString(),
      };
      policies = [...policies, newPolicy];
      return newPolicy;
    },
  
    updatePolicy: async (id: string, data: any) => {
      await simulateDelay();
      policies = policies.map(policy =>
        policy.id === id ? { ...policy, ...data } : policy
      );
      return policies.find(policy => policy.id === id);
    },
  
    deletePolicy: async (id: string) => {
      await simulateDelay();
      policies = policies.filter(policy => policy.id !== id);
    },
  
    // Tasks
    getTasks: async () => {
      await simulateDelay();
      return tasks;
    },
  
    createTask: async (data: any) => {
      await simulateDelay();
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date().toISOString(),
      };
      tasks = [...tasks, newTask];
      return newTask;
    },
  
    updateTask: async (id: string, data: any) => {
      await simulateDelay();
      tasks = tasks.map(task =>
        task.id === id ? { ...task, ...data } : task
      );
      return tasks.find(task => task.id === id);
    },
  
    deleteTask: async (id: string) => {
      await simulateDelay();
      tasks = tasks.filter(task => task.id !== id);
    },
  
    // Notifications
    getNotifications: async () => {
      await simulateDelay();
      return notifications;
    },
  
    markNotificationAsRead: async (id: string) => {
      await simulateDelay();
      notifications = notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      );
    },
  
    markAllNotificationsAsRead: async () => {
      await simulateDelay();
      notifications = notifications.map(notification => ({
        ...notification,
        read: true,
      }));
    },
  
    // Settings
    getSettings: async () => {
      await simulateDelay();
      return {
        company: {
          name: 'Project Connectivity',
          timezone: 'UTC+0',
          dateFormat: 'MM/DD/YYYY',
        },
        notifications: {
          email: true,
          desktop: true,
          mobile: false,
        },
        security: {
          twoFactorAuth: true,
          sessionTimeout: 30,
        },
      };
    },
  
    updateSettings: async (data: any) => {
      await simulateDelay();
      return data;
    },
  };
  
  // Utility function to simulate API delay
  const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 500));