import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const Form = () => {
  const [phone, setPhone] = useState<string | undefined>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [onmessage, setOnmessage] = useState<string>('')
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
          message: onmessage,
          type: 'contact_form'
        }),
      })

      if (!response.ok) {
        throw new Error('Error al enviar formulario')
      }

      setSubmitStatus('success')
      
      // Limpiar el formulario después del envío exitoso
      setName('')
      setEmail('')
      setPhone('')
      setOnmessage('')
    } catch (error) {
      console.error('Error al enviar formulario:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      {submitStatus === 'success' && (
        <div className="bg-green-600 text-white p-4 rounded-lg text-center mb-4 animate-in slide-in-from-top-2 duration-300">
          ¡Gracias! Hemos recibido tu consulta. Nos pondremos en contacto contigo pronto.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-600 text-white p-4 rounded-lg text-center mb-4 animate-in slide-in-from-top-2 duration-300">
          Hubo un error al enviar tu consulta. Por favor, intenta nuevamente.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-[600px]">
        <div className="flex flex-col gap-4 w-full">
          {/* Name - Always full width */}
          <input 
            name="name"
            type="text" 
            placeholder="Name*" 
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
              placeholder="E-mail*" 
              required 
              className="bg-white text-black h-14 p-4 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFA600]" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <PhoneInput
              name="phone"
              international
              defaultCountry="US"
              value={phone}
              onChange={setPhone}
              placeholder="Phone*"
              required
              className="bg-white text-black h-14 p-4 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFA600]"
            />
          </div>
          
          {/* Message - Always full width */}
          <textarea 
            name="message"
            placeholder="Message*"
            required
            className="bg-white text-black h-20 p-4 w-full resize-none border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#FFA600]"
            value={onmessage}
            onChange={(e) => setOnmessage(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="text-white bg-[#FFA600] py-3 px-6 w-full uppercase disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#FF8C00] transition-colors font-medium rounded"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Detalles'}
        </button>
      </form>
    </div>
  )
}

export default Form