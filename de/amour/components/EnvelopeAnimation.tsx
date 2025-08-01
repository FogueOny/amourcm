'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Heart } from 'lucide-react'

interface EnvelopeAnimationProps {
  recipientName: string
  loveMessage: string
}

export default function EnvelopeAnimation({ recipientName, loveMessage }: EnvelopeAnimationProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [showHearts, setShowHearts] = useState(false)

  const handleEnvelopeClick = () => {
    if (!isOpened) {
      setIsOpened(true)
      setShowHearts(true)
      setTimeout(() => setShowHearts(false), 3000)
    }
  }

  // Génération des cœurs pour la pluie
  const hearts = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      initial={{ 
        opacity: 0, 
        y: -20, 
        x: Math.random() * window.innerWidth,
        rotate: Math.random() * 360 
      }}
      animate={{ 
        opacity: [0, 1, 0], 
        y: window.innerHeight + 100,
        rotate: Math.random() * 360 + 180
      }}
      transition={{ 
        duration: 3, 
        delay: Math.random() * 0.5,
        ease: "easeOut"
      }}
      className="fixed pointer-events-none z-10"
    >
      <Heart className="w-6 h-6 text-pink-400 fill-current" />
    </motion.div>
  ))

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence>
        {showHearts && hearts}
      </AnimatePresence>

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnvelopeClick}
                className="cursor-pointer mx-auto mb-8"
                animate={{ 
                  y: [0, -10, 0],
                  rotateY: [0, 5, 0, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <div className="relative w-64 h-40 mx-auto">
                  {/* Enveloppe principale */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg shadow-2xl">
                    {/* Rabat de l'enveloppe */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-pink-300 to-pink-400 rounded-t-lg overflow-hidden">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-32 border-r-32 border-t-20 border-l-transparent border-r-transparent border-t-pink-400"></div>
                    </div>
                    
                    {/* Cœur sur l'enveloppe */}
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <Heart className="w-12 h-12 text-pink-600 fill-current drop-shadow-lg" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Un message vous attend, {recipientName} 💕
                </h2>
                <p className="text-gray-600 mb-6">
                  Cliquez sur l'enveloppe pour découvrir votre surprise
                </p>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-pink-400 text-sm"
                >
                  ✨ Touchez l'enveloppe ✨
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 100 
              }}
              className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-pink-100"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-6"
                >
                  <Heart className="w-8 h-8 text-pink-500 fill-current" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-700 mb-8 font-dancing-script"
                  style={{ fontFamily: 'var(--font-dancing-script)' }}
                >
                  Ma chère {recipientName}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 border border-pink-100 shadow-inner"
                >
                  <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">
                    {loveMessage}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="mt-8 flex justify-center"
                >
                  <div className="flex space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, 0]
                        }}
                        transition={{ 
                          delay: i * 0.1, 
                          duration: 0.8, 
                          repeat: Infinity, 
                          repeatDelay: 3 
                        }}
                      >
                        <Heart className="w-6 h-6 text-pink-400 fill-current" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="text-pink-600 text-sm mt-6 font-medium"
                >
                  💕 Avec tout mon amour 💕
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}