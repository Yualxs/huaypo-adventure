"use client";

import { useTranslations } from "next-intl";
import { BookingState, AddOn } from "@/types/booking";
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, Camera, Tent, Utensils, MountainSnow } from "lucide-react";

interface Props {
  data: BookingState;
  update: (updates: Partial<BookingState>) => void;
  onPrev: () => void;
}

// --- DB DE EXTRAS (Lógica de Negocio Simulada) ---
const getRelevantAddons = (tourSlug: string): AddOn[] => {
  // Lógica: Si el slug contiene "camino-inca" o "salkantay" o "trek", es trekking.
  const isTrekking = tourSlug.includes('inca') || tourSlug.includes('salkantay') || tourSlug.includes('trek') || tourSlug.includes('choquequirao');
  
  if (isTrekking) {
    return [
      { id: 'sleeping-bag', label: 'Bolsa de Dormir (-15°C)', description: 'Pluma certificada. Higiene garantizada.', price: 25, icon: 'sleep' },
      { id: 'walking-sticks', label: 'Bastones de Trekking', description: 'Par profesional Black Diamond.', price: 15, icon: 'mountain' },
      { id: 'porter-extra', label: 'Porteador Extra (7kg)', description: 'Carga tu equipaje personal.', price: 70, icon: 'mountain' },
    ];
  } 
  
  // Default (Day Tours)
  return [
    { id: 'photography', label: 'Paquete de Fotografía', description: '20 fotos profesionales editadas.', price: 35, icon: 'camera' },
    { id: 'buffet', label: 'Almuerzo Buffet Premium', description: 'Upgrade a restaurante exclusivo.', price: 20, icon: 'food' },
  ];
};

export default function Step3Payment({ data, update, onPrev }: Props) {
  const t = useTranslations("BookingWizard.Step3");
  
  // 1. Calcular Costos Base
  const basePricePerPerson = 500; // Mock
  const baseTotal = basePricePerPerson * data.travelersCount;

  // 2. Obtener Add-ons disponibles
  const availableAddons = getRelevantAddons(data.tourSlug);

  // 3. Calcular Costo de Add-ons Seleccionados
  const addonsTotal = availableAddons
    .filter(addon => data.selectedAddons.includes(addon.id))
    .reduce((sum, addon) => sum + (addon.price * data.travelersCount), 0); // Asumimos precio x persona

  // 4. Totales Finales
  const grandTotal = baseTotal + addonsTotal;
  const deposit = grandTotal * 0.30;

  // Handler para seleccionar/deseleccionar
  const toggleAddon = (addonId: string) => {
    const current = data.selectedAddons;
    const newAddons = current.includes(addonId)
      ? current.filter(id => id !== addonId)
      : [...current, addonId];
    update({ selectedAddons: newAddons });
  };

  const handlePaymentType = (type: 'deposit' | 'full') => {
    update({ paymentPreference: type });
  };

  // Helper para iconos
  const getIcon = (type: string) => {
    switch(type) {
      case 'sleep': return <Tent size={20} />;
      case 'mountain': return <MountainSnow size={20} />;
      case 'camera': return <Camera size={20} />;
      case 'food': return <Utensils size={20} />;
      default: return <CheckCircle2 size={20} />;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-black text-brand-dark mb-2">{t("title")}</h2>
        <p className="text-gray-500 font-medium text-sm">{t("subtitle")}</p>
      </div>

      {/* --- SECCIÓN ORDER BUMP (NUEVO) --- */}
      <div className="bg-brand-pale/30 rounded-3xl p-6 border border-brand-blue/10">
        <div className="flex items-center gap-2 mb-4">
            <span className="bg-brand-yellow text-brand-dark text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md">Recomendado</span>
            <h3 className="text-sm font-black text-brand-dark uppercase tracking-wider">Mejora tu experiencia</h3>
        </div>
        
        <div className="space-y-3">
            {availableAddons.map((addon) => {
                const isSelected = data.selectedAddons.includes(addon.id);
                return (
                    <div 
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`
                            relative flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300
                            ${isSelected 
                                ? 'bg-white border-brand-blue shadow-md' 
                                : 'bg-white/50 border-transparent hover:border-gray-200'
                            }
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center transition-colors
                                ${isSelected ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-400'}
                            `}>
                                {getIcon(addon.icon)}
                            </div>
                            <div>
                                <p className={`text-sm font-bold ${isSelected ? 'text-brand-dark' : 'text-gray-600'}`}>{addon.label}</p>
                                <p className="text-xs text-gray-400">{addon.description}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-black text-brand-dark">+ ${addon.price}</span>
                            <p className="text-[10px] text-gray-400">pp</p>
                        </div>
                        
                        {/* Checkmark animado */}
                        {isSelected && (
                            <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-brand-blue text-white rounded-full p-1 shadow-sm">
                                <CheckCircle2 size={12} />
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
      </div>

      {/* 1. ¿CUÁNTO PAGAR? */}
      <div>
        <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-4 ml-1">Plan de Pagos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Opción Depósito */}
            <div 
                onClick={() => handlePaymentType('deposit')}
                className={`cursor-pointer border-2 rounded-[2rem] p-6 transition-all relative overflow-hidden group ${data.paymentPreference === 'deposit' ? 'border-brand-yellow bg-brand-yellow/5' : 'border-gray-100 hover:border-gray-200'}`}
            >
            <div className="flex justify-between items-start mb-4">
                <span className="font-black text-brand-dark uppercase tracking-wide text-sm">Pagar Depósito</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${data.paymentPreference === 'deposit' ? 'bg-brand-yellow text-brand-dark' : 'bg-gray-200 text-transparent'}`}>
                    <CheckCircle2 size={16} />
                </div>
            </div>
            <div className="text-4xl font-black text-brand-dark mb-1 tracking-tight">${deposit.toLocaleString()} <span className="text-sm font-bold text-gray-400">USD</span></div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-2">Reserva con el 30%</p>
            </div>

            {/* Opción Total */}
            <div 
                onClick={() => handlePaymentType('full')}
                className={`cursor-pointer border-2 rounded-[2rem] p-6 transition-all relative overflow-hidden group ${data.paymentPreference === 'full' ? 'border-green-500 bg-green-50/30' : 'border-gray-100 hover:border-gray-200'}`}
            >
            <div className="flex justify-between items-start mb-4">
                <span className="font-black text-brand-dark uppercase tracking-wide text-sm">Pago Total</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${data.paymentPreference === 'full' ? 'bg-green-500 text-white' : 'bg-gray-200 text-transparent'}`}>
                    <CheckCircle2 size={16} />
                </div>
            </div>
            <div className="text-4xl font-black text-brand-dark mb-1 tracking-tight">${grandTotal.toLocaleString()} <span className="text-sm font-bold text-gray-400">USD</span></div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-2">Todo listo sin preocupaciones</p>
            </div>
        </div>
      </div>

      {/* 2. ¿CÓMO PAGAR? (Método) */}
      <div>
        <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-4 ml-1">Pasarela de Pago</h3>
        <div className="space-y-4">
            
            {/* Opción PayPal */}
            <div 
                onClick={() => update({ paymentMethod: 'paypal' })}
                className={`w-full p-5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                    data.paymentMethod === 'paypal' ? 'border-[#003087] bg-blue-50/50 shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center p-2">
                        <span className="font-black text-[#003087] italic">P</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-brand-dark">PayPal / Tarjeta Internacional</h4>
                        <p className="text-xs text-gray-500">Paga con tu cuenta o tarjeta de crédito.</p>
                    </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${data.paymentMethod === 'paypal' ? 'border-[#003087]' : 'border-gray-300'}`}>
                    {data.paymentMethod === 'paypal' && <div className="w-2.5 h-2.5 bg-[#003087] rounded-full"></div>}
                </div>
            </div>

            {/* Opción Izipay (Local) */}
            <div 
                onClick={() => update({ paymentMethod: 'izipay' })}
                className={`w-full p-5 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                    data.paymentMethod === 'izipay' ? 'border-[#ff4240] bg-red-50/30 shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center p-2">
                        <CreditCard className="text-[#ff4240]" />
                    </div>
                    <div>
                        <h4 className="font-bold text-brand-dark">Izipay (Tarjetas Crédito/Débito)</h4>
                        <p className="text-xs text-gray-500">Visa, Mastercard, Amex, Diners.</p>
                    </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${data.paymentMethod === 'izipay' ? 'border-[#ff4240]' : 'border-gray-300'}`}>
                    {data.paymentMethod === 'izipay' && <div className="w-2.5 h-2.5 bg-[#ff4240] rounded-full"></div>}
                </div>
            </div>

        </div>
      </div>

      <div className="w-full h-px bg-gray-100 my-6"></div>

      {/* ÁREA DE ACCIÓN */}
      <div className="bg-gray-50 rounded-[2rem] p-8 text-center border border-gray-100">
        
        {data.paymentMethod === 'paypal' ? (
            <div className="max-w-sm mx-auto animate-in fade-in zoom-in duration-300">
                <button className="w-full bg-[#ffc439] hover:brightness-95 py-4 rounded-full shadow-lg transition-all flex items-center justify-center group mb-3">
                    <span className="font-bold text-[#003087] italic text-xl mr-2">PayPal</span>
                    <span className="text-[#003087] text-sm font-bold opacity-80 group-hover:opacity-100">Checkout</span>
                </button>
                <p className="text-xs text-gray-400 mt-2">Serás redirigido a PayPal para completar el pago de forma segura.</p>
            </div>
        ) : (
            <div className="max-w-sm mx-auto animate-in fade-in zoom-in duration-300">
                <button className="w-full bg-[#ff4240] text-white hover:bg-[#e6302e] py-4 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 mb-3">
                    <CreditCard size={20} />
                    <span className="font-black tracking-wide text-lg">Pagar con Izipay</span>
                </button>
                <p className="text-xs text-gray-400 mt-2">Formulario seguro de Izipay para todas las tarjetas.</p>
            </div>
        )}

        <div className="mt-8 flex justify-center items-center gap-2 text-[10px] text-green-600 font-bold uppercase tracking-wider bg-green-50 w-fit mx-auto px-4 py-2 rounded-full">
            <ShieldCheck size={14} />
            Pagos 100% encriptados y seguros
        </div>
      </div>

      {/* Navegación */}
      <div className="flex gap-4 pt-4">
        <button onClick={onPrev} className="px-8 py-4 border-2 border-gray-200 text-brand-dark font-bold rounded-2xl hover:border-brand-dark/30 hover:bg-gray-50 transition-all flex items-center gap-2 group">
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /> {t("backBtn")}
        </button>
      </div>

    </div>
  );
}