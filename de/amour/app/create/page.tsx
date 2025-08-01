'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Copy, Check } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function CreatePage() {
  const [recipientName, setRecipientName] = useState('')
  const [loveMessage, setLoveMessage] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [errors, setErrors] = useState<{name?: string, message?: string}>({})

  const validateForm = () => {
    const newErrors: {name?: string, message?: string} = {}
    
    if (!recipientName.trim()) {
      newErrors.name = 'Le prénom est obligatoire'
    }
    
    if (!loveMessage.trim()) {
      newErrors.message = 'Le message d\'amour est obligatoire'
    } else if (loveMessage.length > 500) {
      newErrors.message = 'Le message ne peut pas dépasser 500 caractères'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            recipient_name: recipientName.trim(),
            love_message: loveMessage.trim()
          }
        ])
        .select()
        .single()

      if (error) throw error

      const link = `${window.location.origin}/love?id=${data.id}`
      setGeneratedLink(link)
    } catch (error) {
      console.error('Erreur lors de la création:', error)
      alert('Une erreur s\'est produite. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Erreur lors de la copie:', error)
    }
  }

  const resetForm = () => {
    setRecipientName('')
    setLoveMessage('')
    setGeneratedLink('')
    setErrors({})
    setIsCopied(false)
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-br from-pink-100 to-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-2 border-pink-200 romantic-gradient">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4 heartbeat">
              <Heart className="w-8 h-8 text-pink-500 fill-current" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Message d'Amour
            </h1>
            <p className="text-gray-600">
              Créez un message romantique personnalisé
            </p>
          </motion.div>

          {!generatedLink ? (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom de votre bien-aimée *
                </label>
                <input
                  type="text"
                  id="recipientName"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-colors shadow-sm ${
                    errors.name ? 'border-red-300' : 'border-pink-200'
                  } hover:border-pink-300`}
                  placeholder="Sarah, Marie, Emma..."
                  maxLength={100}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="loveMessage" className="block text-sm font-medium text-gray-700 mb-2">
                  Votre message d'amour *
                </label>
                <textarea
                  id="loveMessage"
                  value={loveMessage}
                  onChange={(e) => setLoveMessage(e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-colors resize-none shadow-sm ${
                    errors.message ? 'border-red-300' : 'border-pink-200'
                  } hover:border-pink-300`}
                  placeholder="Tu es la lumière de ma vie, celle qui illumine mes journées..."
                  maxLength={500}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message}</p>
                  )}
                  <p className="text-gray-400 text-sm ml-auto">
                    {loveMessage.length}/500
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-pink-500 hover:to-pink-700 transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed border-2 border-pink-300"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Création en cours...
                  </div>
                ) : (
                  'Créer le message d\'amour 💕'
                )}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  ✨ Message créé avec succès !
                </h3>
                <p className="text-green-700 text-sm">
                  Votre lien magique est prêt à être partagé
                </p>
              </div>

              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Votre lien à partager :</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </motion.button>
                </div>
                {isCopied && (
                  <p className="text-green-600 text-sm mt-2">✓ Lien copié !</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetForm}
                className="w-full bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-gray-500 hover:to-gray-700 transition-all duration-200"
              >
                Créer un nouveau message
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}