import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}

export const isAdminOrDelegate: Access = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'delegate'
}

export const isAuthenticated: Access = ({ req: { user } }) => {
  return Boolean(user)
}

export const isOwner: Access = ({ req: { user }, id }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return user.id === id
}

export const isOwnerOrAdmin: Access = ({ req: { user }, data }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return user.id === data?.author
}
