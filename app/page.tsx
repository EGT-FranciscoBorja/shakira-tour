'use client';

import Image from "next/image";
import { useState } from "react";
import Itinerary from "@/components/Itinerary";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<'4d3n' | '3d2n'>('4d3n');

  const openModal = (packageType: '4d3n' | '3d2n') => {
    setSelectedPackage(packageType);
    setIsModalOpen(true);
  };

  return (
    <>
      {/*Hero section */}
      <div className="relative h-screen bg-gradient-to-r from-[#0a1e2e] via-[#0c2838] to-[#0a1e2e] flex justify-center overflow-hidden">
        <div className="relative w-full sm:w-full md:w-full lg:w-full xl:w-[1440px] 2xl:w-[1440px] h-screen">
          <Image 
            src="/shakira/portada.webp" 
            alt="Shakira" 
            fill 
            className="object-cover" 
            priority
          />
        <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-end justify-between p-8 pb-16 z-10">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-4xl font-bold text-white">Noviembre</h1>
              <p className="text-lg text-white">2025</p>
            </div>
            <Image src="/shakira/logo-horizontal.png" alt="Shakira" width={400} height={100} className="object-contain" />
          </div>
        </div>
      </div>
      {/*Grid section */}
      <div className="w-full py-16 px-8">
        <h2 className="text-4xl font-bold text-center mb-4">Quito al Ritmo de Shakira</h2>
        <h3 className="text-2xl text-blue-600 font-semibold text-center mb-12">Quito: donde cada calle tiene ritmo</h3>
        
        <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto">
          {/* Imagen grande a la izquierda */}
          <div className="col-span-2 relative h-[600px]">
            <Image src="/shakira/plaza-grande.jpg" alt="Plaza Grande Quito" fill className="object-cover" />
          </div>
          
          {/* Columna derecha con 3 imágenes */}
          <div className="col-span-1 flex flex-col gap-4">
            <div className="relative h-[292px]">
              <Image src="/shakira/basilica-noche.jpg" alt="Basílica de noche" fill className="object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-[292px]">
                <Image src="/shakira/mitad-del-mundo.JPG" alt="Mitad del Mundo" fill className="object-cover object-left" />
              </div>
              <div className="relative h-[292px]">
                <Image src="/shakira/san-francisco.jpg" alt="San Francisco" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Botón */}
        <div className="flex justify-center mt-12">
          <button className="bg-blue-900 text-white px-12 py-3 text-lg font-semibold hover:bg-blue-800 transition">
            JOIN NOW
          </button>
        </div>
      </div>

      {/* Descripción del tour */}
      <div className="w-full bg-neutral-800 py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-6">Descripción del tour</h2>
            <p className="text-lg leading-relaxed mb-4">
              Vive Quito como nunca antes: un tour diseñado para que combines cultura, música y emoción.
            </p>
            <p className="text-lg leading-relaxed">
              Disfruta del concierto de Shakira, recorre el Centro Histórico o la Mitad del Mundo y siente la energía de una ciudad que late al ritmo de los grandes eventos. Incluye traslados, alojamiento y experiencias pensadas para viajeros que quieren vivir Quito con estilo y buen ritmo.
            </p>
          </div>
          <div className="relative h-[500px]">
            <Image src="/shakira/shakira-baile.jpg" alt="Shakira" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Paquetes turísticos */}
      <div className="w-full py-16 px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Paquete 4 Días - 3 Noches */}
          <div className="border-2 border-gray-300 rounded-lg p-8 bg-orange-50">
            <div className="grid grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="text-3xl font-bold mb-6">4 Días-3 Noches</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Llegas a Quito y la ciudad te recibe con su energía. Te preparas para cantar con Shakira en una noche que vas a recordar, exploras la ciudad a tu ritmo entre historia o Mitad del Mundo, y cuando llega el momento de volver, te llevas más que fotos: te llevas una experiencia vivida con emoción y buen ritmo.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">Día 1.-</p>
                <button 
                  onClick={() => openModal('4d3n')}
                  className="text-sm font-semibold text-gray-600 hover:text-gray-800 tracking-wider transition"
                >
                  LEARN MORE
                </button>
              </div>
              <div className="relative h-[300px]">
                <Image src="/shakira/mitad-del-mundo.JPG" alt="Mitad del Mundo" fill className="object-cover rounded" />
              </div>
            </div>
          </div>

          {/* Paquete 3 Días - 2 Noches */}
          <div className="border-2 border-gray-300 rounded-lg p-8 bg-orange-50">
            <div className="grid grid-cols-2 gap-8 items-start">
              <div>
                <h3 className="text-3xl font-bold mb-6">3 Días-2 Noches</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Llegas a Quito y la ciudad te recibe con su energía. Te preparas para cantar con Shakira en una noche que vas a recordar, exploras la ciudad a tu ritmo entre historia o Mitad del Mundo, y cuando llega el momento de volver, te llevas más que fotos: te llevas una experiencia vivida con emoción y buen ritmo.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">Día 1.-</p>
                <button 
                  onClick={() => openModal('3d2n')}
                  className="text-sm font-semibold text-gray-600 hover:text-gray-800 tracking-wider transition"
                >
                  LEARN MORE
                </button>
              </div>
              <div className="relative h-[300px]">
                <Image src="/shakira/quito-norte-noche.jpg" alt="Quito de noche" fill className="object-cover rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Información importante */}
      <div className="w-full py-8 px-8">
        <div className="max-w-5xl mx-auto border-2 border-blue-400 rounded-lg p-6 bg-blue-50">
          <h4 className="text-blue-600 font-bold text-center mb-2">Información Importante</h4>
          <p className="text-gray-700 text-center text-sm">
            Los itinerarios están sujetos a cambios debido a diferentes razones como clima, seguridad u otros ajenos a Responsible Travel
          </p>
        </div>
      </div>

      {/* Banner Fechas Disponibles con Parallax */}
      <div className="w-full relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url(/shakira/shakira-modelo.jpg)' }}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex items-center px-16">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-8">FECHAS DISPONIBLES</h2>
              <ul className="space-y-3 text-xl font-semibold">
                <li className="italic">Nov 07 -10, 2025</li>
                <li className="italic">Nov 08 -11, 2025</li>
                <li className="italic">Nov 10 – 13, 2025</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Incluye / No Incluye */}
      <div className="w-full py-16 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-12">
          {/* Incluye */}
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image src="/shakira/cocteles.jpg" alt="Incluye" fill className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold italic">&ldquo;Incluye&rdquo;</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>Traslado privado con conductor certificado de habla español en la ruta: Aeropuerto – hotel – aeropuerto</li>
              <li>• Traslado privado con conductor certificado de habla español (el día del concierto) en la ruta: Hotel – Estadio Olímpico Atahualpa – Hotel</li>
              <li>• 3 noches de alojamiento en Quito en el Hotel Río Amazonas en habitaciones sencilla, doble twin/ matrimonial o habitaciones triples de acuerdo a la solicitud del cliente, con desayuno incluido</li>
              <li>• City Tour o visita a la ciudad Mitad del Mundo (incluye entradas) con guía certificado de habla español y transporte privado.</li>
              <li>• Alimentación de acuerdo a la mencionada en el presente itinerario.</li>
              <li>• Asistencia permanente durante el tour</li>
              <li>• IVA 15% en el caso de los turistas ecuatorianos (Turista extranjero se encuentra exento del IVA)</li>
            </ul>
          </div>

          {/* No Incluye */}
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-300">
                {/* Aquí puedes agregar una imagen si la tienes */}
              </div>
              <h3 className="text-2xl font-bold italic">&ldquo;No incluye&rdquo;</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>• Ticket aéreo local hacia la ciudad de Quito</li>
              <li>• Entrada al concierto de Shakira</li>
              <li>• Comidas y excursiones no especificadas en el itinerario</li>
              <li>• Seguro de Salud y de viaje</li>
              <li>• Bebidas alcohólicas y no alcohólicas</li>
              <li>• Servicios no especificados en el itinerario</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-red-500 text-sm font-semibold mt-8">
          IMPORTANTE: Precios por persona en base a la acomodación seleccionada.
        </p>
      </div>

      {/* Sección Destinos */}
      <div className="w-full py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Card Centro Histórico */}
          <div className="rounded-2xl overflow-hidden shadow-2xl relative h-80">
            {/* Imagen de fondo - solo mitad derecha */}
            <div className="absolute inset-y-0 right-0 w-1/2">
              <Image 
                src="/shakira/plaza-grande.jpg" 
                alt="Centro Histórico de Quito" 
                fill 
                className="object-cover"
              />
            </div>
            
            {/* Fondo oscuro hasta la mitad */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-gray-900/90 to-gray-900" />
            
            {/* Contenido de texto */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white max-w-md">
              <div>
                <h3 className="text-orange-400 text-2xl font-bold mb-4">Centro Histórico</h3>
                <h4 className="text-xl font-semibold mb-4 leading-tight">
                  Descubre el corazón colonial de Quito en cada esquina
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Oferta por tiempo limitado, no pierdas la oportunidad.
                </p>
              </div>
              <button className="bg-white text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition w-fit">
                Book Now
              </button>
            </div>
          </div>

          {/* Card Mitad del Mundo */}
          <div className="rounded-2xl overflow-hidden shadow-2xl relative h-80">
            {/* Imagen de fondo - solo mitad derecha */}
            <div className="absolute inset-y-0 right-0 w-1/2">
              <Image 
                src="/shakira/mitad-del-mundo.JPG" 
                alt="Mitad del Mundo" 
                fill 
                className="object-cover"
              />
            </div>
            
            {/* Fondo oscuro hasta la mitad */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-gray-900/90 to-gray-900" />
            
            {/* Contenido de texto */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white max-w-md">
              <div>
                <h3 className="text-orange-400 text-2xl font-bold mb-4">Mitad del Mundo</h3>
                <h4 className="text-xl font-semibold mb-4 leading-tight">
                  Pon un pie en cada hemisferio y siente el mundo desde el centro
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Oferta por tiempo limitado, no pierdas la oportunidad.
                </p>
              </div>
              <button className="bg-white text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition w-fit">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Premium */}
      <footer className="w-full bg-gradient-to-b from-gray-900 to-black text-white py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-12 mb-12">
            {/* Logo y descripción */}
            <div className="col-span-1">
              <div className="relative w-48 h-24 mb-6">
                <Image src="/shakira/logo-color.png" alt="Responsible Travel" fill className="object-contain object-left" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Experiencias únicas que combinan cultura, música y emoción en el corazón de Quito.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h4 className="text-lg font-bold mb-6 text-white">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#paquetes" className="text-gray-400 hover:text-white transition text-sm">
                    Paquetes Turísticos
                  </a>
                </li>
                <li>
                  <a href="#destinos" className="text-gray-400 hover:text-white transition text-sm">
                    Destinos en Quito
                  </a>
                </li>
                <li>
                  <a href="#fechas" className="text-gray-400 hover:text-white transition text-sm">
                    Fechas Disponibles
                  </a>
                </li>
                <li>
                  <a href="#concierto" className="text-gray-400 hover:text-white transition text-sm">
                    Concierto Shakira
                  </a>
                </li>
              </ul>
            </div>

            {/* Contacto */}
            <div className="col-span-1">
              <h4 className="text-lg font-bold mb-6 text-white">Contacto</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:natalia@egt.ec" className="text-gray-400 hover:text-white transition">
                    natalia@egt.ec
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+593996253631" className="text-gray-400 hover:text-white transition">
                    +593 99 6253631
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">
                    Mariscal Foch E4-261 y Río Amazonas,<br />
                    Quito - Ecuador
                  </span>
                </li>
              </ul>
            </div>

            {/* Redes Sociales */}
            <div className="col-span-1">
              <h4 className="text-lg font-bold mb-6 text-white">Síguenos</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
              </div>
              <div className="mt-8">
                <p className="text-xs text-gray-500 mb-2">Métodos de pago</p>
                <div className="flex gap-2">
                  <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs font-bold">
                    VISA
                  </div>
                  <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs font-bold">
                    MC
                  </div>
                  <div className="w-12 h-8 bg-gray-800 rounded flex items-center justify-center text-xs font-bold">
                    AMEX
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Responsible Travel. Todos los derechos reservados.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-500 hover:text-white transition">
                  Términos y Condiciones
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition">
                  Política de Privacidad
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition">
                  Política de Cancelación
                </a>
              </div>
            </div>
      </div>
        </div>
      </footer>

      {/* Modal de Itinerario */}
      <Itinerary 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        packageType={selectedPackage} 
      />
    </>
  );
}
