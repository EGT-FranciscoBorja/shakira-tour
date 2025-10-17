import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface DownloadItineraryProps {
  packageType?: '4d3n' | '3d2n'
}

const DownloadItinerary: React.FC<DownloadItineraryProps> = ({ packageType }) => {
  const [phone, setPhone] = useState<string | undefined>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [selectedPackage, setSelectedPackage] = useState<'4d3n' | '3d2n'>(packageType || '4d3n')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          packageType: selectedPackage,
          type: 'download_itinerary'
        }),
      })

      if (!response.ok) {
        throw new Error('Error al enviar solicitud')
      }

      setSubmitStatus('success')
      
      // Limpiar el formulario después del envío exitoso
      setName('')
      setEmail('')
      setPhone('')
    } catch (error) {
      console.error('Error al enviar solicitud:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      {submitStatus === 'success' && (
        <div className="bg-green-600 text-white p-4 rounded-lg text-center mb-4 animate-in slide-in-from-top-2 duration-300">
          ¡Gracias! El itinerario ha sido enviado a tu correo electrónico.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-600 text-white p-4 rounded-lg text-center mb-4 animate-in slide-in-from-top-2 duration-300">
          Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[600px]">
        <div className="flex flex-col gap-4 w-full">
          {/* Name - Always full width */}
          <input 
            name="name"
            type="text" 
            placeholder="Nombre*" 
            required 
            className="bg-white text-black h-14 p-4 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFA600]" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          
          {/* Email and Phone - Side by side on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              name="email"
              type="email" 
              placeholder="Correo Electrónico*" 
              required 
              className="bg-white text-black h-14 p-4 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFA600]" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <PhoneInput
              name="phone"
              international
              defaultCountry="EC"
              value={phone}
              onChange={setPhone}
              placeholder="Teléfono*"
              required
              className="bg-white text-black h-14 p-4 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFA600]"
            />
          </div>
          
          {/* Package Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-medium">Selecciona el paquete*</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                selectedPackage === '4d3n' 
                  ? 'border-[#FFA600] bg-orange-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="radio"
                  name="package"
                  value="4d3n"
                  checked={selectedPackage === '4d3n'}
                  onChange={(e) => setSelectedPackage(e.target.value as '4d3n' | '3d2n')}
                  className="mr-3"
                />
                <span className="font-semibold">4 Días - 3 Noches</span>
              </label>
              
              <label className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                selectedPackage === '3d2n' 
                  ? 'border-[#FFA600] bg-orange-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input
                  type="radio"
                  name="package"
                  value="3d2n"
                  checked={selectedPackage === '3d2n'}
                  onChange={(e) => setSelectedPackage(e.target.value as '4d3n' | '3d2n')}
                  className="mr-3"
                />
                <span className="font-semibold">3 Días - 2 Noches</span>
              </label>
            </div>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="text-white bg-[#FFA600] py-3 px-6 w-full uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF8C00] transition-colors font-medium rounded"
        >
          {isSubmitting ? 'Enviando...' : 'Descargar Itinerario'}
        </button>
      </form>
    </div>
  )
}

export default DownloadItinerary