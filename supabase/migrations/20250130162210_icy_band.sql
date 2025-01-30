/*
  # Initial Schema for Pharmacy Financial Management System

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text) - 'expense' or 'revenue'
      - `created_at` (timestamp)
      
    - `payment_methods`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text) - 'payment' or 'receipt'
      - `created_at` (timestamp)
      
    - `suppliers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `contact` (text)
      - `phone` (text)
      - `email` (text)
      - `created_at` (timestamp)
      
    - `transactions`
      - `id` (uuid, primary key)
      - `type` (text) - 'expense' or 'revenue'
      - `date` (date)
      - `amount` (decimal)
      - `category_id` (uuid, foreign key)
      - `payment_method_id` (uuid, foreign key)
      - `supplier_id` (uuid, foreign key)
      - `notes` (text)
      - `is_recurring` (boolean)
      - `recurring_day` (integer)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create categories table
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('expense', 'revenue')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read categories"
  ON categories
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create payment methods table
CREATE TABLE payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('payment', 'receipt')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read payment methods"
  ON payment_methods
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert payment methods"
  ON payment_methods
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create suppliers table
CREATE TABLE suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact text,
  phone text,
  email text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read suppliers"
  ON suppliers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert suppliers"
  ON suppliers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('expense', 'revenue')),
  date date NOT NULL,
  amount decimal(10,2) NOT NULL,
  category_id uuid REFERENCES categories(id),
  payment_method_id uuid REFERENCES payment_methods(id),
  supplier_id uuid REFERENCES suppliers(id),
  notes text,
  is_recurring boolean DEFAULT false,
  recurring_day integer CHECK (recurring_day BETWEEN 1 AND 31),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_category ON transactions(category_id);
CREATE INDEX idx_transactions_payment_method ON transactions(payment_method_id);