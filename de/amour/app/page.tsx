'use client'

import { motion } from 'framer-motion'
import { Heart, MessageCircleHeart, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl mb-6 heartbeat">
            <Heart className="w-12 h-12 text-pink-500 fill-current" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 mb-6 font-dancing-script"
          style={{ fontFamily: 'var(--font-dancing-script)' }}
        >
          Girlfriend Day
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl text-gray-700 mb-8 leading-relaxed"
        >
          Créez des messages d'amour magiques et partagez-les avec une personne spéciale. 
          Une expérience romantique unique qui touchera son cœur.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
            <MessageCircleHeart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Personnalisé</h3>
            <p className="text-sm text-gray-600">
              Créez un message unique avec le prénom de votre bien-aimée
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
            <Sparkles className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Magique</h3>
            <p className="text-sm text-gray-600">
              Animations touchantes avec enveloppe et pluie de cœurs
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-pink-100">
            <Heart className="w-8 h-8 text-pink-500 fill-current mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Éternel</h3>
            <p className="text-sm text-gray-600">
              Votre message d'amour conservé pour toujours
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link href="/create">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:from-pink-500 hover:via-pink-600 hover:to-pink-700 transition-all duration-300 transform hover:shadow-pink-200"
            >
              <Heart className="w-6 h-6 mr-3 fill-current" />
              Créer un message d'amour
              <Sparkles className="w-5 h-5 ml-3" />
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex space-x-1">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  delay: i * 0.1, 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {i === 3 ? (
                  <Heart className="w-4 h-4 text-pink-400 fill-current" />
                ) : (
                  <div className="w-2 h-2 bg-pink-300 rounded-full" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}