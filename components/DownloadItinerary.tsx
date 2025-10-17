import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface FormErrors {
  name?: string
  email?: string
  phone?: string
}

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
  const [errors, setErrors] = useState<FormErrors>({})
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Validar nombre
    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido'
    } else if (name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    }

    // Validar email
    if (!email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'El email no es válido'
    }

    // Validar teléfono
    if (!phone || !phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setErrors({})
    
    // Validar formulario
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      if (!apiUrl) {
        throw new Error('Configuración incorrecta. Por favor, contacta al administrador.')
      }

      const response = await fetch(`${apiUrl}/shakira-itinerary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone,
          packageType: selectedPackage,
          type: 'download_itinerary'
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        
        // Mensajes específicos según el código de estado
        if (response.status === 400) {
          throw new Error('Los datos enviados no son válidos. Por favor, revisa la información.')
        } else if (response.status === 500) {
          throw new Error('Ocurrió un error en el servidor. Por favor, intenta nuevamente en unos minutos.')
        } else if (response.status === 503) {
          throw new Error('El servicio no está disponible temporalmente. Por favor, intenta más tarde.')
        } else {
          throw new Error(errorData.message || 'No pudimos procesar tu solicitud. Por favor, intenta nuevamente.')
        }
      }

      setSubmitStatus('success')
      
      // Limpiar el formulario después del envío exitoso
      setName('')
      setEmail('')
      setPhone('')
      setErrors({})
    } catch (error) {
      console.error('Error al enviar solicitud:', error)
      setSubmitStatus('error')
      
      // Mensajes de error amigables
      let friendlyMessage = 'Algo salió mal. Por favor, intenta nuevamente.'
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        friendlyMessage = 'No pudimos conectar con el servidor. Por favor, verifica tu conexión a internet e intenta nuevamente.'
      } else if (error instanceof Error) {
        friendlyMessage = error.message
      }
      
      setErrorMessage(friendlyMessage)
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
          {errorMessage || 'Hubo un error al enviar tu solicitud. Por favor, intenta nuevamente.'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[600px]">
        <div className="flex flex-col gap-4 w-full">
          {/* Name - Always full width */}
          <div>
            <input 
              name="name"
              type="text" 
              placeholder="Nombre*" 
              className={`bg-white text-black h-14 p-4 w-full border rounded focus:outline-none focus:ring-2 ${
                errors.name 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-[#FFA600]'
              }`}
              value={name} 
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) {
                  setErrors(prev => ({ ...prev, name: undefined }))
                }
              }} 
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          
          {/* Email and Phone - Side by side on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input 
                name="email"
                type="email" 
                placeholder="Correo Electrónico*" 
                className={`bg-white text-black h-14 p-4 w-full border rounded focus:outline-none focus:ring-2 ${
                  errors.email 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-[#FFA600]'
                }`}
                value={email} 
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) {
                    setErrors(prev => ({ ...prev, email: undefined }))
                  }
                }} 
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <PhoneInput
                name="phone"
                international
                defaultCountry="EC"
                value={phone}
                onChange={(value) => {
                  setPhone(value)
                  if (errors.phone) {
                    setErrors(prev => ({ ...prev, phone: undefined }))
                  }
                }}
                placeholder="Teléfono*"
                className={`bg-white text-black h-14 p-4 w-full border rounded focus:outline-none focus:ring-2 ${
                  errors.phone 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-[#FFA600]'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>
          
          {/* Package Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">Selecciona el paquete*</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                selectedPackage === '4d3n' 
                  ? 'border-[#FFA600] bg-orange-50' 
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}>
                <input
                  type="radio"
                  name="package"
                  value="4d3n"
                  checked={selectedPackage === '4d3n'}
                  onChange={(e) => setSelectedPackage(e.target.value as '4d3n' | '3d2n')}
                  className="mr-3"
                />
                <span className="font-semibold text-black">4 Días - 3 Noches</span>
              </label>
              
              <label className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                selectedPackage === '3d2n' 
                  ? 'border-[#FFA600] bg-orange-50' 
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}>
                <input
                  type="radio"
                  name="package"
                  value="3d2n"
                  checked={selectedPackage === '3d2n'}
                  onChange={(e) => setSelectedPackage(e.target.value as '4d3n' | '3d2n')}
                  className="mr-3"
                />
                <span className="font-semibold text-black">3 Días - 2 Noches</span>
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