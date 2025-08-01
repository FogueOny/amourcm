'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Heart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { supabase, type LoveMessage } from '../../lib/supabase'
import EnvelopeAnimation from '../../components/EnvelopeAnimation'

export default function LovePage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  
  const [message, setMessage] = useState<LoveMessage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMessage = async () => {
      if (!id) {
        setError('Aucun identifiant de message fourni')
        setLoading(false)
        return
      }

      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error

        if (!data) {
          setError('Message non trouvé')
        } else {
          setMessage(data)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération:', error)
        setError('Ce message d\'amour n\'existe pas ou a expiré')
      } finally {
        setLoading(false)
      }
    }

    fetchMessage()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Heart className="w-12 h-12 text-pink-500 fill-current" />
          </motion.div>
          <p className="text-gray-600 text-lg">
            Préparation de votre message d'amour...
          </p>
        </motion.div>
      </div>
    )
  }

  if (error || !message) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-md"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-red-100">
            <div className="text-red-400 mb-4">
              <Heart className="w-16 h-16 mx-auto opacity-50" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Oups ! Message introuvable
            </h2>
            <p className="text-gray-600 mb-6">
              {error || 'Ce message d\'amour n\'existe pas ou a été supprimé.'}
            </p>
            <Link href="/create">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold rounded-xl hover:from-pink-500 hover:to-pink-700 transition-all duration-200 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Créer un nouveau message
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <EnvelopeAnimation 
      recipientName={message.recipient_name}
      loveMessage={message.love_message}
    />
  )
}