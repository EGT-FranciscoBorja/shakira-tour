import React, { useState } from 'react'
import Form from './Form'
import DownloadItinerary from './DownloadItinerary'

interface ItineraryProps {
  id: string;
  title: string;
  day?: number;
  description: string;
}

const itinerary4d3n: ItineraryProps[] = [
  {
    id: '1',
    title: 'DIA 1: ¡BIENVENIDO A QUITO! TRASLADO AL HOTEL',
    day: 1,
    description: 'Bienvenido a la ciudad de Quito. Un conductor certificado lo estará esperando en el aeropuerto para trasladarlo al hotel.',
  },
  {
    id: '2',
    title: 'DIA 2: DÍA LIBRE CONCIERTO DE SHAKIRA',
    day: 2,
    description: 'El día de hoy dispondrá de tiempo libre para realizar los preparativos necesarios previos al concierto. El traslado hacia el Estadio Olímpico Atahualpa y el retorno al hotel han sido debidamente programados.',
  },
  {
    id: '3',
    title: 'DIA 3: MAÑANA: QUITO CITY TOUR O CIUDAD MITAD DEL MUNDO/TARDE LIBRE',
    day: 3,
    description: `El día de hoy podrá elegir entre dos actividades en la mañana: <br/>
1. Visitaremos el Centro Histórico de Quito, declarado Patrimonio Cultural de la Humanidad por la UNESCO en 1978, será el escenario de esta experiencia. Visitaremos la Plaza Grande y sus magníficas iglesias, como la Compañía y la Basílica, y daremos un paseo por la tradicional Calle La Ronda. Tiempo Libre para el almuerzo <br />
2. Visitará el Monumento a la Mitad del Mundo, donde tendrá la oportunidad de tomarse una fotografía única, posando con un pie en cada hemisferio y las manos levantadas, simulando sostener la esfera que corona el monumento. Tiempo Libre para el almuerzo`,
  },
  {
    id: '4',
    title: 'DIA 4: TRASLADO AL AEROPUERTO PARA TOMAR SU VUELO DE RETORNO A CASA ',
    day: 4,
    description: 'En la mañana, tendrá el traslado al aeropuerto para tomar su vuelo de retorno a casa.',
  },
  {
    id: '5',
    title: 'IMPORTANTE',
    description: 'Los itinerarios están sujetos a cambios debido a diferentes razones como clima, seguridad u otros ajenos a Responsible Travel',
  }
];

const itinerary3d2n: ItineraryProps[] = [
  {
    id: '1',
    title: 'DIA 1: ¡BIENVENIDO A QUITO! TRASLADO AL HOTEL',
    day: 1,
    description: 'Bienvenido a la ciudad de Quito. Un conductor certificado lo estará esperando en el aeropuerto para trasladarlo al hotel.',
  },
  {
    id: '2',
    title: 'DIA 2: CITY TOUR O MITAD DEL MUNDO/PM LIBRE',
    day: 2,
    description: `El día de hoy podrá elegir entre dos actividades en la mañana: 
1. Visitaremos el Centro Histórico de Quito, declarado Patrimonio Cultural de la Humanidad por la UNESCO en 1978, será el escenario de esta experiencia. Visitaremos la Plaza Grande y sus magníficas iglesias, como la Compañía y la Basílica, y daremos un paseo por la tradicional Calle La Ronda. Tiempo Libre para el almuerzo 
2. Visitará el Monumento a la Mitad del Mundo, donde tendrá la oportunidad de tomarse una fotografía única, posando con un pie en cada hemisferio y las manos levantadas, simulando sostener la esfera que corona el monumento. Tiempo Libre para el almuerzo 

Durante la tarde, dispondrá de tiempo libre para realizar los preparativos necesarios previos al concierto. El traslado hacia el Estadio Olímpico Atahualpa y el retorno al hotel han sido debidamente programados.`
  },
  {
    id: '3',
    title: 'DIA 3: TRASLADO AL AEROPUERTO PARA TOMAR SU VUELO DE RETORNO A CASA',
    day: 3,
    description: 'En la mañana, tendrá el traslado al aeropuerto para tomar su vuelo de retorno a casa.'
  },
  {
    id: '4',
    title: 'IMPORTANTE',
    description: 'Los itinerarios están sujetos a cambios debido a diferentes razones como clima, seguridad u otros ajenos a Responsible Travel',
  }
];
interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageType: '4d3n' | '3d2n';
}

const Itinerary: React.FC<ItineraryModalProps> = ({ isOpen, onClose, packageType }) => {
  const [showForm, setShowForm] = useState<'contact' | 'download' | null>(null);

  if (!isOpen) return null;

  const itinerary = packageType === '4d3n' ? itinerary4d3n : itinerary3d2n;
  const title = packageType === '4d3n' ? '4 Días - 3 Noches' : '3 Días - 2 Noches';

  if (showForm === 'contact') {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(null)}>
        <div 
          className="bg-neutral-900 rounded-xl md:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del formulario */}
          <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 p-4 md:p-6 rounded-t-xl md:rounded-t-2xl border-b border-neutral-700">
            <div className="flex justify-between items-center gap-2">
              <h2 className="text-lg md:text-2xl font-bold text-white uppercase tracking-wide">Contáctanos</h2>
              <button 
                onClick={() => setShowForm(null)}
                className="text-neutral-400 hover:text-white rounded-full p-1.5 md:p-2 transition flex-shrink-0"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenido del formulario */}
          <div className="p-4 md:p-6 bg-neutral-900">
            <p className="text-neutral-300 mb-6 text-sm md:text-base">
              Envíanos tus datos y nos pondremos en contacto contigo lo antes posible para brindarte toda la información sobre el paquete <strong className="text-white">{title}</strong>.
            </p>
            <Form />
          </div>
        </div>
      </div>
    );
  }

  if (showForm === 'download') {
    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(null)}>
        <div 
          className="bg-neutral-900 rounded-xl md:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del formulario */}
          <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 p-4 md:p-6 rounded-t-xl md:rounded-t-2xl border-b border-neutral-700">
            <div className="flex justify-between items-center gap-2">
              <h2 className="text-lg md:text-2xl font-bold text-white uppercase tracking-wide">Descargar Itinerario</h2>
              <button 
                onClick={() => setShowForm(null)}
                className="text-neutral-400 hover:text-white rounded-full p-1.5 md:p-2 transition flex-shrink-0"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contenido del formulario */}
          <div className="p-4 md:p-6 bg-neutral-900">
            <p className="text-neutral-300 mb-6 text-sm md:text-base">
              Completa el formulario para recibir el itinerario detallado del paquete <strong className="text-white">{title}</strong> en tu correo electrónico.
            </p>
            <DownloadItinerary packageType={packageType} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 md:p-4" onClick={onClose}>
      <div 
        className="bg-neutral-900 rounded-xl md:rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-neutral-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="bg-gradient-to-r from-neutral-800 to-neutral-900 p-4 md:p-6 rounded-t-xl md:rounded-t-2xl flex-shrink-0 border-b border-neutral-700">
          <div className="flex justify-between items-center gap-2">
            <div>
              <h2 className="text-lg md:text-2xl font-bold text-white uppercase tracking-wide">Quito al Ritmo de Shakira</h2>
              <p className="text-neutral-300 text-sm md:text-base mt-1">{title}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-neutral-400 hover:text-white rounded-full p-1.5 md:p-2 transition flex-shrink-0"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 bg-neutral-900">
          {itinerary.map((day) => {
            const isImportant = day.title === 'IMPORTANTE';
            
            if (isImportant) {
              return (
                <div key={day.id} className="bg-red-900/20 border-l-4 border-red-500 p-3 md:p-4 rounded">
                  <h3 className="text-sm md:text-base font-bold text-red-400 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    {day.title}
                  </h3>
                  <p 
                    className="text-xs md:text-sm text-neutral-300 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: day.description.replace(/\n/g, '<br/>') }}
                  />
                </div>
              );
            }
            
            return (
              <div key={day.id} className="border-l-4 border-neutral-600 pl-3 md:pl-4 py-2">
                <h3 className="text-sm md:text-lg font-bold text-white mb-1 md:mb-2">{day.title}</h3>
                <p 
                  className="text-xs md:text-base text-neutral-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: day.description.replace(/\n/g, '<br/>') }}
                />
              </div>
            );
          })}
        </div>

        {/* Footer - Fixed */}
        <div className="bg-neutral-800 p-4 md:p-6 rounded-b-xl md:rounded-b-2xl border-t border-neutral-700 flex-shrink-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button 
              onClick={() => setShowForm('contact')}
              className="w-full bg-neutral-700 hover:bg-neutral-600 text-white font-semibold py-2.5 md:py-3 rounded-lg transition text-sm md:text-base flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Solicitar Información
            </button>
            <button 
              onClick={() => setShowForm('download')}
              className="w-full bg-white hover:bg-neutral-200 text-neutral-900 font-semibold py-2.5 md:py-3 rounded-lg transition text-sm md:text-base flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar Itinerario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Itinerary