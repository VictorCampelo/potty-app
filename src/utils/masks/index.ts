import cep from './formatCEP'
import cnpj from './formatCNPJ'
import cpf from './formatCPF'
import phone from './formatPhone'
import date from './formatDate'
import time from './formatHours'
import card from './formatCard'
import monetaryBRL from './formatMonetaryBRL'
import monetaryUSD from './formatMonetaryUSD'
import number from './formatNumber'
import double from './formatDouble'
import percent from './formatPercent'

export type MasksTypes =
  | 'cep'
  | 'cnpj'
  | 'cpf'
  | 'phone'
  | 'date'
  | 'time'
  | 'card'
  | 'monetaryBRL'
  | 'monetaryUSD'
  | 'number'
  | 'double'
  | 'percent'

const masks = {
  cep,
  cnpj,
  cpf,
  phone,
  date,
  time,
  card,
  monetaryBRL,
  number,
  monetaryUSD,
  double,
  percent
}

export default masks
