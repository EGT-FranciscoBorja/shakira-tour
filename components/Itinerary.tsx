import React from 'react'

interface ItineraryProps {
  id: string;
  title: string;
  day: number;
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
];
interface ItineraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageType: '4d3n' | '3d2n';
}

const Itinerary: React.FC<ItineraryModalProps> = ({ isOpen, onClose, packageType }) => {
  if (!isOpen) return null;

  const itinerary = packageType === '4d3n' ? itinerary4d3n : itinerary3d2n;
  const title = packageType === '4d3n' ? '4 Días - 3 Noches' : '3 Días - 2 Noches';

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Itinerario - {title}</h2>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {itinerary.map((day) => (
            <div key={day.id} className="border-l-4 border-orange-500 pl-4 py-2">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{day.title}</h3>
              <p 
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: day.description.replace(/\n/g, '<br/>') }}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t">
          <button 
            onClick={onClose}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Itinerary