// src/types/booking.ts

export type ServiceType = 'group' | 'private';
export type PaymentType = 'deposit' | 'full';
export type PaymentGateway = 'paypal' | 'izipay';

// --- NUEVO: Definición de un Add-on ---
export interface AddOn {
  id: string;
  label: string;
  description: string;
  price: number;
  icon: 'mountain' | 'camera' | 'food' | 'sleep'; // Tipos de icono para UI
}

export interface Traveler {
  id: number;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female' | '';
  country: string;
  docType: 'passport' | 'dni' | 'driver_license' | '';
  docNumber: string;
  birthDate: string;
  isStudent: boolean;
}

export interface POC {
  name: string; // Se llena con opciones de los viajeros
  email: string;
  phone: string;
}

export interface BookingState {
  step: number;
  tourSlug: string;
  date: string;
  travelersCount: number;
  serviceType: ServiceType;
  travelers: Traveler[];
  poc: POC;
  paymentPreference: PaymentType;
  paymentMethod: PaymentGateway;
  selectedAddons: string[];
}