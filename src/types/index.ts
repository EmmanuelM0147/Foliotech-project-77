export interface NavItem {
  title: string;
  href: string;
  children?: NavItem[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  image: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export interface AdmissionStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType;
}

export interface PaymentDetails {
  fullName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  accommodation: boolean;
  totalAmount: number;
}

export interface PaymentBreakdown {
  tuition: number;
  accommodation?: number;
  total: number;
}