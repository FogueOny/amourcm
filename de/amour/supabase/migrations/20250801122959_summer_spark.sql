/*
  # Création de la table des messages d'amour

  1. Nouvelle Table
    - `messages`
      - `id` (uuid, clé primaire)
      - `recipient_name` (varchar, nom de la destinataire)
      - `love_message` (text, message d'amour)
      - `created_at` (timestamp, date de création)

  2. Sécurité
    - Activation de RLS sur la table `messages`
    - Politique permettant la lecture publique (pas d'authentification requise)
    - Politique permettant l'insertion publique pour la création de messages
*/

-- Création de la table messages
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_name varchar(100) NOT NULL,
  love_message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Activation de la sécurité au niveau des lignes
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture publique des messages
CREATE POLICY "Messages are publicly readable"
  ON messages
  FOR SELECT
  TO public
  USING (true);

-- Politique pour permettre l'insertion publique de nouveaux messages
CREATE POLICY "Anyone can create messages"
  ON messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Index pour améliorer les performances de recherche par ID
CREATE INDEX IF NOT EXISTS idx_messages_id ON messages(id);

-- Index pour les requêtes par date de création
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);